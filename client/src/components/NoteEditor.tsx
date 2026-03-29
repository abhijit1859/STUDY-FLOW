"use client";

import { useState } from "react";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  onSave: (data: { title: string; content: string }) => void;
  isSaving?: boolean;
};

const NoteEditor = ({
  initialTitle = "",
  initialContent = "",
  onSave,
  isSaving = false,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;
    onSave({ title, content });
  };

  return (
    <div className="p-6 h-full flex flex-col bg-zinc-200 dark:bg-zinc-900">
      <div className="flex items-center justify-between mb-6 gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="text-3xl font-semibold w-full outline-none bg-transparent"
        />

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 rounded-lg bg-white text-black disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..."
        className="flex-1 resize-none outline-none text-lg bg-transparent"
      />
    </div>
  );
};

export default NoteEditor;
