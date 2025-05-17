"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginUser = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        return {
          success: "Successfully logged in",
          user: data.user,
        };
      }

      return { failure: "Authentication failed" };
    } catch (error) {
      console.error("Login error:", error);
      return { failure: "An error occurred during login" };
    }
  });
