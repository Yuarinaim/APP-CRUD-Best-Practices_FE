"use client";

import type React from "react";

import { useTheme } from "@/contexts/theme-context";
import Image from "next/image";

import moon from "../../../public/assets/icons/actions/moon.svg";
import notification from "../../../public/assets/icons/actions/notification.svg";
import { useEffect } from "react";
interface AdminNavbarProps {
  title: string;
  breadcrumb?: string;
  children?: React.ReactNode;
}

export function AdminNavbar({ title, breadcrumb, children }: AdminNavbarProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch("http://localhost:3001/api/users/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <header className="bg-white px-6 py-4 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">25Watts</h1>
          {breadcrumb && (
            <nav className="text-sm text-gray-600 dark:text-gray-400">{breadcrumb}</nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {children}

          {/* Notification bell */}
          <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
            <Image src={notification} alt="notification bell" width={20} height={20} />
            {/* <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span> */}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {theme === "dark" ? <Image src={moon} alt="moon" width={20} height={20} /> : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
