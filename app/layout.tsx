/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps all pages in the application.
 * It provides the basic HTML structure and includes global elements like fonts and the toast notification system.
 * 
 * @module RootLayout
 */
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Initialize the Inter font with Latin subset for optimal performance
const inter = Inter({ subsets: ["latin"] });

/**
 * Metadata for the application
 * Used by Next.js for SEO and browser tab information
 */
export const metadata: Metadata = {
  title: "Trading Platform",
  description: "Modern trading platform with beautiful UI",
};

/**
 * Root Layout Component
 * 
 * @param props.children - Child components to be rendered within the layout
 * @returns The base HTML structure for all pages
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-[#01060F]`}
        suppressHydrationWarning
      >
        {/* Main content area with minimum height and centered content */}
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        {/* Global toast notification component */}
        <Toaster />
      </body>
    </html>
  );
}
