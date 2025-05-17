"use client";

/**
 * Orders Page Component
 * 
 * Displays a list of orders with their details and allows navigation to 
 * individual order pages. Uses Zustand store for state management.
 * 
 * Features:
 * - Fetches and displays orders from the store
 * - Animated list rendering with staggered animations
 * - Loading state handling
 * - Navigation to order details
 * 
 * @module Orders
 */
import { StatusBadge } from "@/components/shared/status-badge";
import { Loading } from "@/components/ui/loading";
import { useOrderStore } from "@/lib/stores/order-store";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../shared/header";

/**
 * Orders Component
 * 
 * @returns The rendered orders page
 */
export function Orders() {
  // Access order data and functions from the Zustand store
  const { orders, loading, fetchOrders } = useOrderStore();
  const router = useRouter();

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * Navigate to the details page for a specific order
   * 
   * @param id - The ID of the order to view
   */
  const handleOrderClick = (id: string) => {
    router.push(`/orders/${id}`);
  };

  // Show loading indicator while fetching initial data
  if (loading && orders.length === 0) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header component */}
      <Header />
      
      {/* Back navigation and page title */}
      <div className="flex text-white container px-4 cursor-pointer w-full justify-start mx-auto items-center gap-3 mb-4">
        <button
          onClick={() => router.push("/")}
          className="text-white rounded-lg p-1.5 bg-[#1a1d29] cursor-pointer hover:bg-[#252a3a] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        Orders
      </div>
      
      {/* Orders list with animation */}
      <div className="space-y-4 container px-4 w-full justify-start mx-auto items-center ">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }} // Staggered animation based on index
            onClick={() => handleOrderClick(order.id)}
            className="bg-[#1a1d29] rounded-xl p-5 cursor-pointer hover:bg-[#252a3a] transition-colors"
          >
            {/* Transaction details section */}
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-[#fff]/50 text-sm">Transaction ID</p>
                <p className="text-white font-medium">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-[#fff]/50 text-sm">Date</p>
                <p className="text-white">{order.date}</p>
              </div>
              <div>
                <p className="text-[#fff]/50 text-sm">Status</p>
                <StatusBadge status={order.status} />
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-[#353a41] my-4" />
            
            {/* Game details section */}
            <div className="flex justify-between">
              <div>
                <p className="text-[#fff]/50 text-sm">Game Name</p>
                <p className="text-white">{order.gameName}</p>
              </div>
              <div>
                <p className="text-[#fff]/50 text-sm">Game ID</p>
                <p className="text-white">{order.gameId}</p>
              </div>
              <div>
                <p className="text-[#fff]/50 text-sm">Amount</p>
                <p className="text-white">${order.amount.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
