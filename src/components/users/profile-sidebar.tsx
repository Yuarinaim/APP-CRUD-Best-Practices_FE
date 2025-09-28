"use client";

import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import user from "../../../public/assets/icons/navigation/user-icon.svg";
import logoutIcon from "../../../public/assets/icons/actions/log-out.svg";

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const { logout, user } = useAuth();

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
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={[
          `fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl transition-transform duration-300 dark:bg-gray-900`,
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Profile info */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white font-bold text-2xl flex items-center justify-center">
                {user ? getInitials(user.name) : "U"}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.name || "Usuario"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user?.email || "email@ejemplo.com"}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rol: {user?.role === "admin" ? "Administrador" : "Usuario"}
            </p>
          </div>
        </div>

        {/* Menu options */}
        <div className="border-t px-4 py-2 dark:border-gray-700">
          <button
            onClick={logout}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:text-gray-300 dark:hover:bg-blue-800"
          >
            <div className="flex items-center gap-3">
              <Image
                src={logoutIcon}
                alt="Cerrar sesión"
                width={20}
                height={20}
                className="h-5 w-5"
              />
              <span>Cerrar sesión</span>
            </div>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
