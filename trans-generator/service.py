from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    NoTranscriptFound,
    TranscriptsDisabled,
    CouldNotRetrieveTranscript
)
import time

ytt_api = YouTubeTranscriptApi()

def extract_transcript(video_id: str) -> str:
    try:
        # 🔁 retry mechanism (important for deployment)
        for attempt in range(3):
            try:
                # Try English
                transcript = ytt_api.fetch(video_id, languages=['en'])
                break
            except NoTranscriptFound:
                # fallback Hindi
                transcript = ytt_api.fetch(video_id, languages=['hi'])
                break
            except CouldNotRetrieveTranscript:
                if attempt == 2:
                    raise
                time.sleep(1)  # wait before retry

        full_text = " ".join(snippet.text for snippet in transcript)
        return full_text

    except TranscriptsDisabled:
        raise Exception("❌ Transcripts are disabled for this video")

    except NoTranscriptFound:
        raise Exception("❌ No transcript available in English or Hindi")

    except CouldNotRetrieveTranscript:
        raise Exception("❌ Blocked by YouTube / Could not retrieve transcript")