"use client";

import NoteCard from "./noteCard";
import { Note } from "./types";

interface Props {
  notes: Note[];
  view: "list" | "grid";
  onRefresh: () => void;
}

export default function NoteList({ notes, view, onRefresh }: Props) {
  if (notes.length === 0)
    return <p className="text-center mt-6 text-gray-500">No notes yet.</p>;

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-4"
      }
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
