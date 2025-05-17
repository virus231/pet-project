import { OrderDetailClient } from "@/components/pages/order-detail-client";
import { mockOrders } from "@/lib/mock-data";

/**
 * This function is required for static site generation with dynamic routes.
 * It tells Next.js which order ID pages to generate at build time.
 * For a real app, this would typically fetch data from an API.
 */
export function generateStaticParams() {
  // Generate params from our mock data to ensure all orders are pre-rendered
  return mockOrders.map((order) => ({
    id: order.id,
  }));
}

/**
 * Order detail page component that renders the client component
 * This is a server component that passes the params to the client component
 */
export default function OrderDetailPage() {
  return <OrderDetailClient />;
}
