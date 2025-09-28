"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/hooks/useAuth";
import logoutIcon from "../../../public/assets/icons/actions/log-out.svg";
import home from "../../../public/assets/icons/navigation/home.svg";
import coupon from "../../../public/assets/icons/navigation/coupon.svg";
import user from "../../../public/assets/icons/navigation/user-icon.svg";

const navigation = [
  { name: "Inicio", href: "/admin", icon: home },
  { name: "Cupones", href: "/admin/coupons", icon: coupon },
  { name: "Home Usuario", href: "/", icon: user },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

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
              <Image src={item.icon} alt={item.name} width={20} height={20} className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-blue-800 p-4 dark:border-blue-900">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-800 hover:text-white dark:text-blue-200 dark:hover:bg-blue-900"
        >
          <Image src={logoutIcon} alt="Logout" width={20} height={20} className="h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
