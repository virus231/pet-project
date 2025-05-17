"use client";

/**
 * Authentication Page Component
 * 
 * Handles both login and registration functionality with animated transitions
 * between modes. Uses URL parameters to determine the current mode.
 * 
 * Features:
 * - Toggle between login and registration forms
 * - URL-based mode persistence
 * - Animated transitions between forms
 * - Suspense fallback for loading state
 * 
 * @module Auth
 */
import { AuthForm } from "@/components/shared/auth-form";
import { AuthToggle } from "@/components/shared/auth-toggle";
import { AuthMode } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

/**
 * AuthContent Component
 * 
 * Internal component that handles the auth mode state and form rendering
 * 
 * @returns The rendered authentication content
 */
function AuthContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");

  // Synchronize the mode with URL parameters on initial load and changes
  useEffect(() => {
    const paramMode = searchParams.get("mode") as AuthMode | null;
    if (paramMode === "login" || paramMode === "register") {
      setMode(paramMode);
    }
  }, [searchParams]);

  /**
   * Handle switching between login and registration modes
   * Updates both the state and the URL
   * 
   * @param newMode - The authentication mode to switch to
   */
  const handleChangeMode = (newMode: AuthMode) => {
    setMode(newMode);
    router.push(`/auth?mode=${newMode}`);
  };

  return (
    <div className="w-full container px-4">
      {/* Animated container for the auth form */}
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#1a1d29] mx-auto rounded-2xl p-6 mt-4"
      >
        {/* Mode toggle component */}
        <AuthToggle mode={mode} onChange={handleChangeMode} />

        {/* AnimatePresence for smooth transitions between forms */}
        <AnimatePresence mode="wait">
          <AuthForm key={mode} mode={mode} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/**
 * Auth Component
 * 
 * Main exported component wrapped with Suspense for loading states
 * 
 * @returns The rendered authentication page with loading fallback
 */
export function Auth() {
  return (
    <Suspense
      fallback={<div className="w-full container px-4 py-6">Loading...</div>}
    >
      <AuthContent />
    </Suspense>
  );
}
