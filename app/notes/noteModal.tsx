"use client";

import { Note } from "./types";
import { useState } from "react";
import { Button } from "@headlessui/react";

interface Props {
  note: Note;
  onClose: () => void;
  onRefresh: () => void;
}

export default function NoteModal({ note, onClose, onRefresh }: Props) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [editMode, setEditMode] = useState(false);

  const handleSave = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/notes/${note.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      }
    );
    if (res.ok) {
      setEditMode(false);
      onRefresh();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-700"
        >
          ✕
        </Button>

        {editMode ? (
          <>
            <input
              className="w-full border p-2 rounded mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full border p-2 rounded mb-3 h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setEditMode(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Save
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {note.content}
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setEditMode(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
