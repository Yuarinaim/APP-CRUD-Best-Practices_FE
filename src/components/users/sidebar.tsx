"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/theme-context";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: "🏠" },
  { name: "Mi cuenta", href: "/dashboard/account", icon: "👤" },
  { name: "Mis beneficios", href: "/dashboard/benefits", icon: "🎁" },
  { name: "Mis cupones", href: "/dashboard/coupons", icon: "🎫" },
  { name: "Recomendá", href: "/dashboard/referrals", icon: "💝" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-full w-64 flex-col bg-blue-900 dark:bg-blue-950">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-blue-800 dark:border-blue-900">
        <h1 className="text-2xl font-bold text-white">LOGO</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={[
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors`,
                isActive
                  ? "bg-blue-800 text-white dark:bg-blue-900"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white dark:text-blue-200 dark:hover:bg-blue-900",
              ].join(" ")}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div className="border-t border-blue-800 p-4 dark:border-blue-900">
        <div className="mb-2">
          <span className="text-sm text-blue-100 dark:text-blue-200">Darkmode</span>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-8 w-16 items-center rounded-full bg-white p-1 transition-colors dark:bg-gray-600"
        >
          <div
            className={[
              `h-6 w-6 rounded-full bg-gray-400 transition-transform dark:bg-white`,
              theme === "dark" ? "translate-x-8" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
    </div>
  );
}
