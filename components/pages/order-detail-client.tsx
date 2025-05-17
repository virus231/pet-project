"use client";

import { useOrderStore } from "@/lib/stores/order-store";
import { Order } from "@/lib/types";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "../shared/header";

export function OrderDetailClient() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id as string;

  // State for order data
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for quantity selector
  const [quantity, setQuantity] = useState(40500);
  const incrementAmount = 1500;
  const originalPrice = 749.99;
  const discountedPrice = 279.99;

  // Get order data from store
  const { getOrderById, loading } = useOrderStore();

  useEffect(() => {
    async function loadOrder() {
      try {
        if (orderId) {
          const orderData = await getOrderById(orderId);
          setOrder(orderData);
          // Initialize quantity with order data if available
          if (orderData?.goods?.quantity) {
            setQuantity(orderData.goods.quantity);
          }
        }
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrder();
  }, [orderId, getOrderById]);

  const handleIncrement = () => {
    setQuantity(quantity + incrementAmount);
  };

  // Show loading state
  if (isLoading || loading) {
    return (
      <>
        <Header />
        <div className="container px-4 mx-auto text-center py-12">
          <p className="text-lg">Loading order details...</p>
        </div>
      </>
    );
  }

  // Show error state
  if (error || !order) {
    return (
      <>
        <Header />
        <div className="container px-4 mx-auto text-center py-12">
          <p className="text-lg text-red-500">{error || "Order not found"}</p>
          <button
            onClick={() => router.push("/orders")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Back to Orders
          </button>
        </div>
      </>
    );
  }

  // Format date from ISO string
  const formattedDate = new Date(order.date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 24 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <>
      <Header />
      {/* Header with close button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex w-full container mx-auto px-4 pb-6 items-center justify-start"
      >
        <button
          onClick={() => router.push("/orders")}
          className="rounded-full cursor-pointer bg-white bg-opacity-10 p-1 mr-3"
        >
          <X size={32} className="text-black" />
        </button>
        <h1 className="text-base md:text-2xl font-bold text-white">
          {order.transactionId}
        </h1>
      </motion.div>
      <div className="min-h-screen container px-4 mx-auto text-white">
        {/* Order detail modal/card */}
        <motion.div
          className="flex flex-col gap-6 pb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Transaction details card */}
          <motion.div
            className="bg-[#1F242C] rounded-2xl p-4"
            variants={itemVariants}
          >
            <div className="grid grid-cols-3 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Transaction ID</p>
                <p className="font-medium">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Date</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      order.status === "success"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } mr-2`}
                  ></div>
                  <p className="font-medium">
                    {order.status === "success" ? "Success" : order.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-gray-700 pt-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Game Name</p>
                <p className="font-medium">{order.gameName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Game ID</p>
                <p className="font-medium">{order.gameId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Amount</p>
                <p className="font-medium">
                  ${order.amount.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Your Goods section */}
          <motion.div className="" variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Goods:</h2>
              <p className="text-xl font-bold">
                {order.goods?.quantity || 1} -{" "}
                {discountedPrice.toLocaleString().replace(".", ",")}$
              </p>
            </div>

            {/* Quantity selector */}
            <div className="bg-[#1F242C] w-full flex justify-center-safe flex-col items-center-safe rounded-2xl p-4">
              <div className="flex justify-start gap-2 items-center mb-2">
                <p className="text-3xl font-bold">
                  {quantity.toLocaleString()}
                </p>
                <motion.button
                  onClick={handleIncrement}
                  className="bg-gray-700 rounded-full px-4 py-2 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  +{incrementAmount.toLocaleString()}
                </motion.button>
              </div>

              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  {(order.goods?.price || discountedPrice)
                    .toLocaleString()
                    .replace(".", ",")}
                  $
                </span>
                <span className="text-gray-400 line-through">
                  {(order.goods?.originalPrice || originalPrice)
                    .toLocaleString()
                    .replace(".", ",")}
                  $
                </span>
              </div>
            </div>
          </motion.div>

          {/* Ask button */}
          <motion.div className="" variants={itemVariants}>
            <motion.button
              className="w-full bg-white text-black cursor-pointer font-bold py-4 rounded-full"
              variants={buttonVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ask ?
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
