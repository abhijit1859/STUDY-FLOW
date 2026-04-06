from fastapi import FastAPI, HTTPException
from service import extract_transcript
import asyncio

app = FastAPI(title="YouTube Transcript API")

@app.get("/")
def health():
    return {"message": "server is working"}

@app.get("/transcript/{video_id}")
async def transcript_route(video_id: str):
    try:
        # run blocking function in thread
        text = await asyncio.to_thread(extract_transcript, video_id)
        print(text)
        return {
            "video_id": video_id,
            "transcript": text
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))