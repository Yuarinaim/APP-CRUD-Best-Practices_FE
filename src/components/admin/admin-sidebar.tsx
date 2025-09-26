"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/theme-context";

const navigation = [
  { name: "Inicio", href: "/admin", icon: "🏠" },
  { name: "Usuarios", href: "/admin/users", icon: "👤" },
  { name: "Roles", href: "/admin/roles", icon: "👥" },
  { name: "Cupones", href: "/admin/coupons", icon: "🎫" },
  { name: "Beneficios", href: "/admin/benefits", icon: "🎁" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-full w-64 flex-col bg-blue-900 dark:bg-blue-950">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-blue-800 dark:border-blue-900">
        <h1 className="text-2xl font-bold text-white">25Watts</h1>
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

      {/* Logout */}
      <div className="border-t border-blue-800 p-4 dark:border-blue-900">
        <Link
          href="/auth/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white dark:text-blue-200 dark:hover:bg-blue-900"
        >
          <span className="text-lg">🚪</span>
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}
