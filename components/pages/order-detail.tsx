"use client";

/**
 * Order Detail Component
 * 
 * Displays detailed information about a specific order including transaction details and goods.
 * Features responsive design and elegant animations for a polished user experience.
 * 
 * Features:
 * - Responsive layout with flexible containers
 * - Staggered animations using Framer Motion for smooth transitions
 * - Conditional rendering of goods section when available
 * - Interactive elements with hover animations
 * - Formatted currency and quantity values
 * 
 * @module OrderDetail
 */
import { StatusBadge } from "@/components/shared/status-badge";
import { Order } from "@/lib/types";
import { motion } from "framer-motion";

/**
 * Props for the OrderDetail component
 */
interface OrderDetailProps {
  /** The order data to display */
  order: Order;
}

/**
 * OrderDetail Component
 * 
 * Renders a comprehensive view of an order with animated sections.
 * Uses staggered animations for a sequential reveal of information.
 * 
 * @param props - Component props
 * @param props.order - The order data to display
 * @returns The rendered order detail component
 */
export function OrderDetail({ order }: OrderDetailProps) {
  return (
    <div className="w-full">
      {/* Main order information card with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#1a1d29] rounded-xl p-5 mb-6"
      >
        {/* Transaction details section with responsive layout */}
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">Transaction ID</p>
            <p className="text-white font-medium">{order.transactionId}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Date</p>
            <p className="text-white">{order.date}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Status</p>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* Game details section with responsive layout */}
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Game Name</p>
            <p className="text-white">{order.gameName}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Game ID</p>
            <p className="text-white">{order.gameId}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Amount</p>
            <p className="text-white">${order.amount.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      {/* Conditional rendering of goods information with staggered animations */}
      {order.goods && (
        <>
          {/* Goods title with delayed animation */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }} // Slight delay for sequential appearance
            className="text-white text-xl font-semibold mb-4"
          >
            Your Goods:{" "}
            <span className="text-white font-bold">
              1 - {order.goods.price.toFixed(2)}$
            </span>
          </motion.h3>

          {/* Goods details card with further delayed animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }} // More delay for sequential effect
            className="bg-[#1a1d29] rounded-xl p-5 mb-6"
          >
            {/* Quantity information with formatted numbers */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-white text-xl font-bold">
                {order.goods.quantity.toLocaleString()} {/* Format large numbers with commas */}
              </p>
              <div className="bg-[#252a3a] rounded-full px-4 py-1 text-green-400">
                +{order.goods.change.toLocaleString()}
              </div>
            </div>

            {/* Price information with formatted currency and strikethrough for original price */}
            <div className="flex justify-between items-center">
              <p className="text-white text-xl font-bold">
                {order.goods.price.toFixed(2)}$
              </p>
              <p className="text-gray-400 line-through">
                {order.goods.originalPrice.toFixed(2)}$
              </p>
            </div>
          </motion.div>

          {/* Call-to-action button with hover animation and the most delay */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }} // Maximum delay for last element
            whileHover={{ scale: 1.02 }} // Interactive feedback on hover
            className="w-full bg-white text-black font-medium rounded-full py-4 px-6 mt-4"
          >
            Ask ?
          </motion.button>
        </>
      )}
    </div>
  );
}
