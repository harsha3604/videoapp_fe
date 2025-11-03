"use client";

import { Note } from "./types";
import { useState } from "react";
import NoteModal from "./noteModal";
import { Button } from "@headlessui/react";

interface Props {
  note: Note;
  onRefresh: () => void;
}

export default function NoteCard({ note, onRefresh }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/notes/${note.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) onRefresh();
  };

  return (
    <>
      <div className="bg-white shadow rounded-2xl p-4 border hover:shadow-lg transition">
        <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
        <p className="text-gray-600 line-clamp-3">{note.content}</p>
        <div className="flex justify-between mt-3 text-sm text-gray-500">
          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:underline"
            >
              View
            </Button>
            <Button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {showModal && (
        <NoteModal
          note={note}
          onClose={() => setShowModal(false)}
          onRefresh={onRefresh}
        />
      )}
    </>
  );
}
