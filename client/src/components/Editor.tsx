"use client";

import { useState } from "react";

type Props = {
  onSave: (data: { title: string; content: string }) => void;
  isSaving?: boolean;
};

export default function NoteEditorSimple({
  onSave,
  isSaving = false,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="
            text-3xl font-semibold w-full
            outline-none bg-transparent
            placeholder:text-zinc-400
          "
        />

        <button
          onClick={() => onSave({ title, content })}
          disabled={isSaving}
          className="
            ml-4 px-4 py-2 rounded-lg
            bg-black text-white
            hover:bg-zinc-800
            transition disabled:opacity-50
          "
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note..."
        className="
          w-full flex-1 resize-none
          outline-none bg-transparent
          text-lg leading-relaxed
          placeholder:text-zinc-400
        "
      />
    </div>
  );
}
