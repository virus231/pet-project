"use client";

import { User } from "@/lib/types";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email || !password) {
        set({
          error: "Please provide both email and password",
          isLoading: false,
        });
        return false;
      }

      // Mock successful login
      set({
        user: {
          id: "1",
          email,
          name: email.split("@")[0],
        },
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({ error: "Failed to login. Please try again.", isLoading: false });
      return false;
    }
  },

  register: async (email, password, confirmPassword) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email || !password) {
        set({
          error: "Please provide both email and password",
          isLoading: false,
        });
        return false;
      }

      if (password !== confirmPassword) {
        set({ error: "Passwords do not match", isLoading: false });
        return false;
      }

      // Mock successful registration
      set({
        user: {
          id: "1",
          email,
          name: email.split("@")[0],
        },
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({ error: "Failed to register. Please try again.", isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({ user: null });
  },

  clearError: () => {
    set({ error: null });
  },
  
  setUser: (user) => {
    set({ user });
  },
}));
