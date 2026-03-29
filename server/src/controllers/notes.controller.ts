import type { Request, Response } from "express"
import { Note } from "../models/notes.model.js";

export const createNotes = async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.userId

        if (!userId) {
            return res.status(400).json({
                message: "Un-authorized access"
            })
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            })
        }

        const note = await Note.create({
            userID: userId,
            title,
            content
        })
        res.status(201).json({
            message: "Notes saved",
            note
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to save note"
        })
    }
}


export const getAllNotes = async (req: Request, res: Response) => {
    try {
       
        const userId = req.auth?.userId
        console.log(userId)
        if (!userId) {
            return res.status(400).json({
                message: "Un-authorized access"
            })
        }

        const notes = await Note.find({ userID: userId })
            .sort({ updatedAt: -1 })
            .select("title content")
        console.log(notes)
        res.status(201).json(notes)
    } catch (error) {
        res.status(500).json({
            message: "errror fetching notes"
        })
    }
}

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.userId

        if (!userId) {
            return res.status(400).json({
                message: "Un-authorized access"
            })
        }

        const { id } = req.params;

        const note = await Note.findOne({ _id: id, userID: userId })

        if (!note) {
            return res.status(404).json(
                { message: "note not dound" }
            )
        }

        res.json(note)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch note"
        })
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.userId;
        const { id } = req.params;
        const { title, content } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const note = await Note.findOneAndUpdate({ _id: id, userID: userId },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        return res.json(note);
    } catch (err) {
        return res.status(500).json({ message: "Failed to update note" });
    }
};


export const deleteNote = async (req: Request, res: Response) => {
    try {
        const userId = req.auth?.userId;
        const { id } = req.params;
        console.log("initiated")
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const note = await Note.findOneAndDelete({
            _id: id,
            userID:userId, 
        });

        if (!note) {
            console.log("note not found")
            return res.status(404).json({ message: "Note not found" });
        }

        return res.status(200).json({
            message: "Note deleted successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server error"
        })
    }
}