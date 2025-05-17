"use client";

/**
 * Authentication Toggle Component
 * 
 * An animated toggle switch for transitioning between login and registration modes.
 * Features a sliding indicator that moves based on the selected mode.
 * 
 * Features:
 * - Spring-based animation using Framer Motion for natural feel
 * - Responsive design with different text sizes for mobile/desktop
 * - Clear visual indication of the active mode
 * - Accessible button controls
 * - Close button for exiting the authentication flow
 * 
 * @module AuthToggle
 */
import { AuthMode } from "@/lib/types";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Props for the AuthToggle component
 */
interface AuthToggleProps {
  /** Current authentication mode */
  mode: AuthMode;
  /** Callback for mode changes */
  onChange: (mode: AuthMode) => void;
}

/**
 * AuthToggle Component
 * 
 * @param props - Component props
 * @param props.mode - Current authentication mode (login/register)
 * @param props.onChange - Function to call when mode changes
 * @returns The rendered auth toggle component
 */
export function AuthToggle({ mode, onChange }: AuthToggleProps) {
  const router = useRouter();

  /**
   * Handle closing the authentication screen
   * Navigates back to the home page
   */
  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="flex w-full relative items-center mb-6 gap-4">
      {/* Toggle container with background */}
      <div className="relative w-full flex items-center bg-[#3b3e45] rounded-full p-1">
        {/* Animated sliding indicator */}
        <div className="absolute inset-1 z-0">
          <motion.div
            initial={false} // Don't animate on initial render
            animate={{
              x: mode === "login" ? "0%" : "100%", // Move to right for register mode
              width: "50%", // Take up half of the container
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, // Higher stiffness for quicker animation
              damping: 30    // Enough damping to prevent excessive bouncing
            }}
            className="h-full cursor-pointer bg-white rounded-full"
          />
        </div>

        {/* Login button */}
        <button
          onClick={() => onChange("login")}
          className={`relative z-10 flex-1 text-xs md:text-base py-2 px-4 rounded-full font-medium transition-colors ${
            mode === "login" ? "text-black" : "text-white"
          }`}
        >
          Login
        </button>
        
        {/* Registration button */}
        <button
          onClick={() => onChange("register")}
          className={`relative z-10 flex-1 text-xs md:text-base py-2 px-4 rounded-full font-medium transition-colors ${
            mode === "register" ? "text-black" : "text-white"
          }`}
        >
          Registration
        </button>
      </div>
      
      {/* Close button */}
      <button
        onClick={handleClose}
        className="flex items-center flex-none cursor-pointer justify-center size-8 rounded-full bg-white"
        aria-label="Close authentication"
      >
        <X size={24} className="text-black" />
      </button>
    </div>
  );
}
