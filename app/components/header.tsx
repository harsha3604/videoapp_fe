"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/context"; // adjust import path if needed
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import icon from "../favicon.ico";
import { Button } from "@headlessui/react";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // redirect if not logged in
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
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      {/* LEFT SIDE: Navigation */}
      <div className="flex items-center gap-4">
        <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
          Chats
        </Button>
        <Link href="/notes">
          <Button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
            Post it Notes
          </Button>
        </Link>
        <Button
          onClick={() => {
            router.push("/user");
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          Main Page
        </Button>
      </div>

      {/* RIGHT SIDE: User Dropdown */}
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

        {/* Dropdown */}
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
  );
}
