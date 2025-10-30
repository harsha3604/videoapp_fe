"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/context";
import Image from "next/image";
import { Button } from "@headlessui/react";
import icon from "../favicon.ico";

export default function UserPage() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        {/* LEFT SIDE: Chats + Post It Notes */}
        <div className="flex items-center gap-4">
          <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Chats
          </Button>
          <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Post it Notes
          </Button>
        </div>

        {/* RIGHT SIDE: Username + User Icon + Dropdown */}
        <div ref={dropdownRef} className="relative">
          <div className="flex items-center gap-3">
            <span className="text-gray-700 font-medium">
              {user?.userName || "User"}
            </span>
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full focus:outline-none hover:ring-2 hover:ring-gray-300 transition"
            >
              <Image
                src={icon}
                alt="User Icon"
                width={32}
                height={32}
                className="rounded-full"
              />
            </button>
          </div>

          {/* Dropdown popup */}
          <div
            className={`absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-200 ease-out overflow-hidden ${
              open ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="p-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to your dashboard
        </h2>
        <p className="text-gray-600 mt-2">
          Here’s where your personalized content will appear.
        </p>
      </main>
    </div>
  );
}
