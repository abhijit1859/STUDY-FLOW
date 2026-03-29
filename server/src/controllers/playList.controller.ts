import type { Request, Response } from "express"
import { errorMiddleware } from "../middlewares/errorMidddleware.js";
import createHttpError from "http-errors";
import { User } from "../models/user.model.js";
import { extractPlaylistId, getMetaData, isValidPlaylist, YT_API_KEY } from "../utils/validateLink.js";
import axios from "axios";
import { getGeminiResponse } from "../services/gemini.js";
import path from "path";
import { genPdf } from "../services/generatePdf.js";



export const handleLink = async (
    req: Request,
    res: Response
) => {
    try {
        const { link } = req.body;
        const userId = req.auth?.userId;
        console.log("hello ji",userId)
        if (!link) {
            throw createHttpError(400, "Playlist link is required");
        }

        if (!userId) {
            throw createHttpError(401, "Unauthorized");
        }


        const playlistId = extractPlaylistId(link);
        if (!playlistId) {
            throw createHttpError(400, "Invalid YouTube playlist URL");
        }


        const exists = await isValidPlaylist(playlistId);
        if (!exists) {
            throw createHttpError(404, "Playlist does not exist or is private");
        }

        const meta = await getMetaData(playlistId);
        if (!meta) {
            throw createHttpError(404, "Playlist not found or private");
        }

        const updatedUser = await User.findOneAndUpdate(
            { userId },
            {
                $addToSet: {
                    playlists: {
                        url: link.trim(),
                        playlistId,
                        title: meta.title,
                        thumbnail: meta.thumbnail
                    }
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            throw createHttpError(404, "User not found in database");
        }

        return res.status(200).json({
            success: true,
            message: "Playlist added successfully",
            data: updatedUser,
        });
    } catch (err: any) {
        console.log(err)
        return res.status(501).json({
            message: "Server Error",
            error: err.message
        })

    }
};

export const getLinkFromDb = async (req: Request, res: Response) => {
    try {

        const userId = req.auth?.userId;
        if (!userId) {
            throw createHttpError("400", "unauthorized")
        }
        const user = await User.findOne({ userId })
        const urls = user?.playlists
        return res.status(201).json({
            success: true,
            message: "Links found",
            urls
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


export const deleteLink = async (req: Request, res: Response) => {

    try {
        const { link } = req.params;
        const userId = req.auth?.userId;
        if (!link) {
            throw createHttpError(400, 'Link not found')
        }
        if (!userId) {
            throw createHttpError(401, "un-athorized")
        }

        const updatedUser = await User.findOneAndUpdate(
            { userId },
            {
                $pull: {
                    playlists: { playlistId:link },
                },
            },
            { new: true }
        );


        if (!updatedUser) {
            throw createHttpError(404, "User not found");
        }


        return res.status(201).json({
            success: true,
            message: "Link deleted succesfully",
            data: updatedUser.playlists
        })
    } catch (error) {
        console.log(error)
    }
}


export const sendVideos = async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.userId
        const { playlistId } = req.params;


        if (!userId) {
            return res.status(404).json({ message: "userid not found" })

        }
        const user = await User.findOne({ userId })
        if (!userId) {
            return res.status(404).json({ message: "user not found" })

        }


        const playlist = user?.playlists.find(
            (p) => p.playlistId === playlistId
        )

        const ytRes = await axios.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            {
                params: {
                    part: "snippet,contentDetails",
                    playlistId: playlistId,
                    maxResults: 50,
                    key: process.env.YOUTUBE_API_KEY,
                },
            }
        );

        const videos = ytRes.data.items.map((item: any) => ({
            videoId: item.contentDetails.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
        }));

        res.json({ videos });

    } catch (error) {
        console.log(error)
    }
}



export const generatePdf = async (req: Request, res: Response) => {
    const { videoId } = req.params;

    if (!videoId) {
        return res.status(400).json({ message: "videoId is required" });
    }

    try {
        
        let transcriptText
       try {
        console.log(videoId)
         const response = await axios.get(
             `https://transcript-backned.onrender.com/${videoId}`,
             { timeout: 10000 }
         );
         transcriptText = response.data.transcript;
       } catch (error) {
        
        return res.status(500).json({
            success:false,
            message:"Server error"
        })
       }
     

         
        const htmlNotes = await getGeminiResponse(transcriptText);

      
        const fileName = `notes_${videoId}_${Date.now()}.pdf`;
        const filePath = path.join("uploads", fileName);

        await genPdf(htmlNotes, filePath);

       
        return res.download(filePath, fileName);

    } catch (error: any) {
        console.error("Error generating PDF:", error);

        return res.status(500).json({
            message: "Failed to generate PDF",
            error: error.message,
        });
    }
};