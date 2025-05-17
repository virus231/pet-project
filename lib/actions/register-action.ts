"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

// Validation schema for registration
const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerUser = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { email, password, confirmPassword } }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, confirmPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        return {
          success: "Registration successful",
          user: data.user,
        };
      }

      return { failure: "Registration failed" };
    } catch (error) {
      console.error("Registration error:", error);
      return { failure: "An error occurred during registration" };
    }
  });
