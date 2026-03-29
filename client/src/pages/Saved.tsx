import { Link, PlusIcon, Trash } from "lucide-react";
import { useSavedStore } from "@/routes/store/useSavedStore";
import { useAddLink, useDeletePlayList, useSavedLinks } from "@/hooks/useSavedLinks";
import { useDeleteNote } from "@/hooks/useNotes";

type SavedProps = {
  onSelectPlaylist: (playlist: any) => void;
};
type CardProps = {
  playlist: any;
  onClick: (playlist: any) => void;
  onDelete: (id: string) => void;
};


const Saved = ({ onSelectPlaylist }: SavedProps) => {
  const { link, setLink } = useSavedStore();
  const { data: urls = [], isLoading } = useSavedLinks();
  const { mutate: deleteLink } = useDeletePlayList();
  const { mutate: addLink, isPending } = useAddLink();

  const savePlayList = () => {
    if (!link.trim()) return;
    addLink(link);
    setLink("");
  };

  return (
    <div className="mt-4">
      <section className="p-4 md:p-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="font-bold text-3xl">Your Library</h1>

          {/* Input */}
          <div className="flex items-center gap-2 bg-zinc-900 rounded-md px-3 py-2 w-full md:w-[420px]">
            <Link size={16} className="text-zinc-400 shrink-0" />

            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste the YouTube URL..."
              className="flex-1 bg-transparent outline-none text-sm text-white"
            />

            <button
              onClick={savePlayList}
              disabled={isPending}
              className="bg-zinc-400 hover:bg-zinc-300 text-black rounded-md p-2 disabled:opacity-50"
            >
              <PlusIcon size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="mt-6 text-zinc-500">Loading...</p>
        ) : urls.length === 0 ? (
          <div className="border border-dashed min-h-[200px] rounded-lg my-6 flex items-center justify-center text-zinc-500">
            No playlists added yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {urls.map((url) => (
              <Card
                key={url._id}
                playlist={url}
                onClick={onSelectPlaylist}
                onDelete={deleteLink}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};


const Card = ({ playlist, onClick, onDelete }: CardProps) => {
  
  return (
    <div
      onClick={() => onClick(playlist)}
      className="relative group cursor-pointer rounded-xl overflow-hidden border bg-neutral-300 dark:bg-zinc-900 hover:scale-[1.02] transition"
    >
      {/* Delete Button */}
      <button
        onClick={(e) => {
       
          e.stopPropagation();
          onDelete(playlist.playlistId)
        }}
        className="absolute top-2 right-2 p-2 rounded-full
                   bg-black/60 opacity-0 group-hover:opacity-100
                   hover:bg-red-500/80 text-red-400 transition"
      >
        <Trash size={14} />
      </button>

      {/* Thumbnail */}
      <img
        src={playlist.thumbnail}
        alt={playlist.title}
        className="aspect-video object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2">
          {playlist.title}
        </h3>
      </div>
    </div>
  );
};


export default Saved;
