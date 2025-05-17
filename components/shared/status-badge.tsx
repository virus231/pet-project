"use client";

/**
 * Status Badge Component
 * 
 * A visual indicator that displays the status of an order with appropriate colors.
 * Used in order listings and detail views to provide quick visual feedback about order status.
 * 
 * Features:
 * - Color-coded badges for different statuses (success, pending, failed)
 * - Consistent styling across the application
 * - Properly formatted status text with capitalization
 * - Semantic colors with appropriate contrast for accessibility
 * 
 * @module StatusBadge
 */
import { motion } from "framer-motion";

/**
 * Props for the StatusBadge component
 */
interface StatusBadgeProps {
  /** The order status to display */
  status: "success" | "pending" | "failed";
}

/**
 * StatusBadge Component
 * 
 * Renders a colored badge indicating order status.
 * 
 * @param props - Component props
 * @param props.status - The status to display ('success', 'pending', or 'failed')
 * @returns The rendered status badge
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  /**
   * Determine the badge color based on status
   * Returns appropriate Tailwind CSS classes for background and text color
   */
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-[#11B174]"; 
      case "pending":
        return "bg-yellow-500"; 
      case "failed":
        return "bg-red-500"; 
      default:
        return "bg-gray-500"; 
    }
  };

  /**
   * Format the status text for display
   * Capitalizes the first letter for consistent presentation
   */
  const getStatusText = () => {
    switch (status) {
      case "success":
        return "Success";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className={`w-3 h-3 rounded-full ${getStatusColor()}`}
      />
      <span className="text-white">{getStatusText()}</span>
    </div>
  );
}
