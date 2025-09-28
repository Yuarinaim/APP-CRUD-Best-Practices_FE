"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/contexts/theme-context";

import home from "../../../public/assets/icons/navigation/home.svg";
import coupon from "../../../public/assets/icons/navigation/coupon.svg";
import Image from "next/image";
import moon from "../../../public/assets/icons/actions/moon.svg";
import roles from "../../../public/assets/icons/navigation/roles.svg";

const navigation = [
  { name: "Inicio", href: "/", icon: home },
  { name: "Cupones", href: "/coupons", icon: coupon },
  { name: "Panel de administración", href: "/admin", icon: roles },
  { name: "Canjear cupones", href: "/redeem", icon: coupon },
];

export function Sidebar() {
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
              <Image src={item.icon} alt={item.name} width={20} height={20} className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <div className="flex flex-col items-center justify-center border-t border-blue-800 p-4 dark:border-blue-900">
        <div className="mb-2">
          <span className="text-sm text-blue-100 dark:text-blue-200">Darkmode</span>
        </div>
        <button
          onClick={toggleTheme}
          className="flex h-8 w-16 items-center rounded-full bg-primary-600 p-1 transition-colors dark:bg-gray-600"
        >
          <Image
            src={moon}
            alt="theme toggle"
            width={20}
            height={20}
            className={[
              `h-6 w-6 rounded-full transition-transform`,
              theme === "dark" ? "translate-x-8" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </div>
    </div>
  );
}
