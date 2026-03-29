import { useState } from "react";
import type { Playlist } from "@/types/types";
import { usePlaylistVideos } from "@/hooks/useSavedLinks";
import { FileText, MessageSquare, } from "lucide-react";
import { genPdf } from "@/api/notes.api";
import { useGenPdf } from "@/hooks/useNotes";

type PlayerProps = {
  playlist: Playlist | null;
};

const Player = ({ playlist }: PlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { mutate: generatepdf, isPending } = useGenPdf()

  const { data: videos = [], isLoading } =
    usePlaylistVideos(playlist?.playlistId);


  const handleGenerate = (videoId: string) => {
    generatepdf(videoId, {
      onSuccess: (fileURL) => {
        const link = document.createElement('a')
        link.href = fileURL;
        link.download = "notes.pdf"
        link.click()
        URL.revokeObjectURL(fileURL)
      }
    })
  }

  if (!playlist) {
    return <div className="p-6">No playlist selected</div>;
  }

  if (isLoading) {
    return <div className="p-6">Loading videos...</div>;
  }

  if (videos.length === 0) {
    return <div className="p-6">No videos found</div>;
  }
  const currentVideo = videos[currentIndex]
  return (



    <div className="grid grid-cols-[3fr_1fr] gap-3  ">

 
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl w-[320px] text-center space-y-4">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Generating notes… please wait
            </p>
          </div>
        </div>
      )}


      <div className="mb-4 flex flex-col gap-2 p-3">
        <iframe
          key={currentVideo.videoId}
          src={`https://www.youtube.com/embed/${currentVideo.videoId}`}
          className="w-full aspect-video rounded-md"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div
          className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => handleGenerate(currentVideo.videoId)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-all">
            <FileText size={18} /> <span>Generate Notes</span>
          </button>
          
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium transition-all">
            <MessageSquare size={18} /> <span>Chat with PDF</span>
          </button> */}
        </div>
      </div>



      <div className="pt-3   h-full overflow-hidden  rounded-md">
        <div className="space-y-2 max-h-[540px] overflow-y-auto">
          {videos.map((video, index) => (
            <button
              key={video.videoId}
              onClick={() => setCurrentIndex(index)}
              className={`flex gap-2 w-full text-left p-2 rounded-md text-sm transition
  ${index === currentIndex
                  ? "bg-zinc-300 text-black dark:bg-zinc-700 dark:text-white"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }
`}

            >
              {/* Thumbnail */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-14 object-cover rounded"

              />

              {/* Text */}
              <div className="flex flex-col justify-center">
                <span className="line-clamp-2">
                  {video.title}
                </span>


              </div>
            </button>
          ))}
        </div>
      </div>



    </div>
  );
};

export default Player;
