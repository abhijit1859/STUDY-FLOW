import axios from "axios";

export const YT_API_KEY = "AIzaSyC3966AOJ6BS7Nd1dv1-YvQAzJTLInpRs4";

export async function isValidPlaylist(playlistId: string): Promise<boolean> {
  console.log("playlistId:", playlistId);
    console.log("YT API KEY",YT_API_KEY)
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          part: "snippet",
          id: playlistId,
          key: YT_API_KEY,
        },
      }
    );

 
    return Array.isArray(res.data.items) && res.data.items.length > 0;
  } catch (error: any) {
    console.error(
      "YT API error:",
      error.response?.data || error.message
    );
    return false;
  }
}

export function extractPlaylistId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    return parsed.searchParams.get("list");
  } catch {
    return null;
  }
}


export async function getMetaData(playlistId:String){
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlists",
      {
        params: {
          part: "snippet",
          id: playlistId,
          key: YT_API_KEY,
        },
      }
    );

    if(!res.data.items||res.data.items.length===0) return null

    const snippet=res.data.items[0].snippet;
    

    return {
    title: snippet.title,
    description: snippet.description,
    thumbnail:
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url,
  };
  } catch (error) {
    console.log(error)
  }
}