'use client';

/**
 * Order Store
 * 
 * Zustand store for managing orders data and operations.
 * Provides a central state for orders, with loading and error states,
 * and functions to fetch all orders or individual order details.
 * 
 * Features:
 * - Centralized order state management
 * - Asynchronous data fetching with loading states
 * - Error handling for failed operations
 * - Caching mechanism for order details to improve performance
 * - Mock data integration for development and testing
 * 
 * @module OrderStore
 */
import { create } from 'zustand';
import { Order } from '@/lib/types';
import { mockOrders } from '@/lib/mock-data';

/**
 * Order state interface defining the store's state and actions
 */
interface OrderState {
  /** List of available orders */
  orders: Order[];
  /** Loading state flag */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Fetch all orders */
  fetchOrders: () => Promise<Order[]>;
  /** Get a specific order by ID */
  getOrderById: (id: string) => Promise<Order | null>;
}

/**
 * Order store implementation using Zustand
 * Creates a store with state and actions for order management
 */
export const useOrderStore = create<OrderState>((set, get) => ({
  // Initial state
  orders: [],
  loading: false,
  error: null,
  
  /**
   * Fetch all orders
   * Simulates an API call with mock data and manages loading state
   * 
   * @returns Promise resolving to the fetched orders
   */
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call with delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ orders: mockOrders, loading: false });
      return mockOrders;
    } catch (error) {
      set({ error: 'Failed to fetch orders', loading: false });
      return [];
    }
  },
  
  /**
   * Get a specific order by ID
   * First checks the cache, then fetches if needed
   * Implements a smart caching strategy for better performance
   * 
   * @param id - ID of the order to retrieve
   * @returns Promise resolving to the found order or null
   */
  getOrderById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Check cache first to avoid redundant fetches
      let orders = get().orders;
      if (orders.length === 0) {
        // If cache is empty, fetch orders first
        orders = await get().fetchOrders();
      }
      
      // Find the order by ID
      const order = orders.find(order => order.id === id) || null;
      set({ loading: false });
      return order;
    } catch (error) {
      set({ error: 'Failed to fetch order details', loading: false });
      return null;
    }
  },
}));