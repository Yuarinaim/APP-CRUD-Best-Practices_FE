"use client";

import { useState } from "react";
import { ProfileSidebar } from "./profile-sidebar";

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-end bg-white px-6 shadow-sm dark:bg-gray-900">
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5-5-5h5V3h0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 3h8v8"
              />
            </svg>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
          </button>

          {/* Profile picture */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
          >
            <img
              src="/diverse-group-profile.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </header>

      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
