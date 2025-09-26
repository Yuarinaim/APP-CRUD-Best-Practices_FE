import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "App CRUD - Best Practices",
  description: "Aplicación CRUD con mejores prácticas en React y Next.js 14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <Suspense>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
