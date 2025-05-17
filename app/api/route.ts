import { mockOrders } from "@/lib/mock-data";
import { NextResponse } from "next/server";

// Helper function to handle API routes
async function handleRequest(url: URL) {
  const path = url.pathname;
  console.log("path", path);

  // Mock login
  if (path === "/api/auth/login") {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        email: "user@example.com",
      },
    });
  }

  // Mock registration
  if (path === "/api/auth/register") {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        email: "user@example.com",
      },
    });
  }

  // Mock getting orders
  if (path === "/api/orders") {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      data: mockOrders,
    });
  }

  // Mock getting a specific order
  const orderId = url.searchParams.get("id");
  if (path === "/api/orders/detail" && orderId) {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const order = mockOrders.find((order) => order.id === orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  }

  return NextResponse.json(
    { success: false, error: "Not found" },
    { status: 404 }
  );
}

// Handle GET requests
export async function GET(request: Request) {
  const url = new URL(request.url);
  return handleRequest(url);
}

// Handle POST requests
export async function POST(request: Request) {
  const url = new URL(request.url);
  return handleRequest(url);
}
