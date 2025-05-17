/**
 * Loading Component
 * 
 * A reusable loading spinner that indicates loading state across the application.
 * Used during data fetching operations to provide user feedback.
 * 
 * Features:
 * - Animated spinner with CSS animation
 * - Customizable loading text
 * - Centered layout with consistent spacing
 * - Appropriate ARIA attributes for accessibility
 * 
 * @module Loading
 */
import { Loader2 } from "lucide-react";

/**
 * Props for the Loading component
 */
interface LoadingProps {
  /** Optional text to display below the spinner */
  text?: string;
}

/**
 * Loading Component
 * 
 * @param props - Component props
 * @param props.text - Optional text to display (defaults to "Loading...")
 * @returns The rendered loading indicator
 */
export function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[300px] w-full gap-4"
      role="status"
      aria-live="polite"
    >
      {/* Animated spinner with continuous rotation */}
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      
      {/* Loading text for additional context */}
      <p className="text-muted-foreground">{text}</p>
      
      {/* Screen reader text for accessibility */}
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}