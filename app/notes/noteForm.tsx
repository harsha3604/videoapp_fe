"use client";

import { useState } from "react";
import { Button } from "@headlessui/react";

interface Props {
  onCreated: () => void;
}

export default function NoteForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/notes/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, content }),
        }
      );
      if (res.ok) {
        setTitle("");
        setContent("");
        onCreated();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="bg-gray-50 border rounded-2xl p-4 mb-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-3">Create a new note</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded-lg"
      />
      <textarea
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-3 p-2 border rounded-lg h-24"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Add Note"}
      </Button>
    </form>
  );
}
