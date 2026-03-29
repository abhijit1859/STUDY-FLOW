"use client";

import { useState } from "react";
import NoteEditor from "@/components/NoteEditor";
import {
  useNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from "@/hooks/useNotes";
import toast from "react-hot-toast";
import { Plus, Trash } from "lucide-react";

const Notes = () => {
  const { data: notes = [], isLoading } = useNotes();
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote()

  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditorActive, setIsEditorActive] = useState(false);


  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditorActive(true);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setIsEditorActive(true);
  };

  const handleSaveNote = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    if (selectedNote?._id) {
      await updateNote.mutateAsync({
        id: selectedNote._id,
        title,
        content,
      });
    } else {
      await createNote.mutateAsync({
        title,
        content,
      });
    }
    setIsEditorActive(false);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote.mutateAsync(id);
    toast("Note delted ✅")
    if (selectedNote?._id === id) {
      setSelectedNote(null);
      setIsEditorActive(false);

    }
  };


  return (
    <section className="grid grid-cols-4 min-h-screen">
      {/* SIDEBAR */}
      <aside className="col-span-4 md:col-span-1 p-4 border-r">


        <button
          onClick={handleCreateNote}
          className="
                w-full px-4 py-2 rounded-lg
                flex items-center justify-center gap-2

                bg-black text-white

                shadow-lg
                transition-all duration-200 ease-out

                hover:-translate-y-0.5
                hover:shadow-xl
                hover:bg-zinc-800

                active:translate-y-0
                active:shadow-md
                active:scale-[0.98]

                focus:outline-none
                focus:ring-2 focus:ring-zinc-400
  "
        >
          <Plus size={18} />
          Create Note
        </button>


        <div className="space-y-1">
          {isLoading && <p>Loading...</p>}
          {!isLoading && notes.length === 0 && <p>No notes yet</p>}

          {notes.map((note: any) => (
            <div
              key={note._id}
              className="flex items-center justify-between gap-2 rounded-md
      hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <button
                onClick={() => handleSelectNote(note)}
                className={`flex-1 text-left px-3 py-2 rounded-md transition
        ${selectedNote?._id === note._id
                    ? "bg-zinc-200 dark:bg-zinc-700"
                    : ""
                  }
      `}
              >
                <p className="truncate font-medium">
                  {note.title || "Untitled"}
                </p>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note._id);
                }}
                className="
    px-2 py-1
    text-red-600
    transition
    hover:scale-110
    hover:text-red-700
    active:scale-95
  "
              >
                <Trash size={18} />
              </button>

            </div>
          ))}

        </div>
      </aside>

      {/* EDITOR */}
      <main className="col-span-4 md:col-span-3">
        {isEditorActive ? (
          <NoteEditor
            key={selectedNote?._id ?? "new"}
            initialTitle={selectedNote?.title}
            initialContent={selectedNote?.content}
            onSave={handleSaveNote}
            isSaving={createNote.isPending || updateNote.isPending}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-400 bg-zinc-200 dark:bg-zinc-900">
            Select or create a note
          </div>
        )}
      </main>
    </section>
  );
};

export default Notes;
