"use client";

import { useState } from "react";
import { ProfileSidebar } from "./profile-sidebar";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

import notification from "../../../public/assets/icons/actions/notification.svg";

export function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <header className="flex h-16 items-center justify-end bg-white px-6 shadow-sm dark:bg-gray-900">
        <div className="flex items-center gap-4">
          {/* Notification bell */}
          <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <Image src={notification} alt="notification bell" width={20} height={20} />
          </button>

          {/* Profile picture */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="h-10 w-10 rounded-full bg-blue-600 text-white font-semibold hover:ring-2 hover:ring-blue-500 transition-all flex items-center justify-center"
          >
            {user ? getInitials(user.name) : "U"}
          </button>
        </div>
      </header>

      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
