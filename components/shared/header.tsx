"use client";

/**
 * Header Component
 * 
 * The application's main header that appears at the top of most pages.
 * Provides navigation controls and access to language and currency selectors.
 * 
 * Features:
 * - Animated entrance with Framer Motion
 * - Optional back button for navigation
 * - Customizable title
 * - Integration with language and currency selectors
 * - Responsive design that works on all screen sizes
 * - Sticky positioning to remain visible during scroll
 * 
 * @module Header
 */
import { CurrencySelector } from "@/components/ui/currency-selector";
import { LanguageSelector } from "@/components/ui/language-selector";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Props for the Header component
 */
interface HeaderProps {
  /** Optional title to display in the header */
  title?: string;
  /** Whether to show a back button for navigation */
  showBackButton?: boolean;
}

/**
 * Header Component
 * 
 * @param props - Component props
 * @param props.title - Optional title to display in the header
 * @param props.showBackButton - Whether to show a back button for navigation
 * @returns The rendered header component
 */
export function Header({ title, showBackButton }: HeaderProps) {
  const router = useRouter();

  /**
   * Handle back button click
   * Uses the router to navigate to the previous page
   */
  const handleBack = () => {
    router.back();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }} // Start from slightly above with 0 opacity
      animate={{ opacity: 1, y: 0 }} // Animate to final position with full opacity
      transition={{ duration: 0.3 }} // Smooth animation duration
      className="w-full bg-[#0b1019] sticky top-0 z-50 flex items-center justify-between gap-4 py-4 mb-6"
    >
      <div className="container px-4 w-full justify-start mx-auto items-center">
        {/* Navigation section with conditional back button */}
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="text-white rounded-lg p-1.5 bg-[#1a1d29] hover:bg-[#252a3a] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        {/* Main header content with logo and selectors */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo area with home navigation */}
          <div
            onClick={() => router.push("/")}
            className="w-20 h-10 bg-[#232830] rounded-3xl cursor-pointer"
          />
          {/* Language and currency selector group */}
          <div className="flex items-center gap-2">
            <CurrencySelector />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
