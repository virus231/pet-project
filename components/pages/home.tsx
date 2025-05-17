"use client";

/**
 * Home Page Component
 * 
 * The main landing page of the application that displays navigation buttons
 * to access different parts of the application.
 * 
 * Features:
 * - Animated UI elements using Framer Motion
 * - Navigation buttons for registration, login, and orders
 * - Smooth hover effects and staggered animations
 * 
 * @module Home
 */
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Header } from "../shared/header";

/**
 * Animation variants for the navigation buttons
 * Defines how buttons appear, animate, and respond to hover
 */
const buttonVariants = {
  // Initial hidden state
  initial: { opacity: 0, y: 20 },
  
  /**
   * Animation to visible state with staggered delay
   * @param custom - Custom delay factor for staggered animation
   */
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1, // Stagger effect based on custom parameter
      duration: 0.4,
    },
  }),
  
  // Hover animation for interactive feedback
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

/**
 * Home Component
 * 
 * Main landing page with animated navigation buttons
 * 
 * @returns The rendered home page
 */
export function Home() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header component */}
      <Header />

      {/* Main container with staggered animation */}
      <motion.div
        className="w-full flex flex-col gap-4 mt-auto mb-auto container px-4 mx-auto"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1, // Creates cascade effect for child elements
            },
          },
        }}
      >
        {/* Registration button */}
        <motion.button
          custom={1} // First button in sequence
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => router.push("/auth?mode=register")}
          className="w-full bg-white text-black font-medium rounded-full py-4 px-6"
        >
          Registration
        </motion.button>

        {/* Login button */}
        <motion.button
          custom={2} // Second button in sequence
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => router.push("/auth?mode=login")}
          className="w-full bg-white text-black font-medium rounded-full py-4 px-6"
        >
          Login
        </motion.button>

        {/* Orders button */}
        <motion.button
          custom={3} // Third button in sequence
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => router.push("/orders")}
          className="w-full bg-white text-black font-medium rounded-full py-4 px-6"
        >
          Orders
        </motion.button>
      </motion.div>
    </div>
  );
}
