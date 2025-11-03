"use client";

import { useEffect, useState } from "react";
import NoteList from "./noteList";
import NoteForm from "./noteForm";
import { Note } from "./types";
import { Button } from "@headlessui/react";
import Header from "../components/header";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState<"list" | "grid">("grid");
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/notes?page=${pageNum}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes);
        setTotalPages(data.totalPages);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(page);
  }, [page]);

  const handleCreated = () => {
    fetchNotes(page);
  };

  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">My Notes</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded ${
                view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              List
            </Button>
            <Button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded ${
                view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Grid
            </Button>
          </div>
        </div>

        <NoteForm onCreated={handleCreated} />

        {loading ? (
          <div className="text-center mt-6">Loading...</div>
        ) : (
          <NoteList notes={notes} view={view} onRefresh={fetchNotes} />
        )}

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </Button>
          <span>
            Page {page} / {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
