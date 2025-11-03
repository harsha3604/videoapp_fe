"use client";

import Header from "../components/header";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>

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
