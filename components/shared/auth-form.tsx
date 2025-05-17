"use client";

import { LoginForm } from "@/features/auth/login-form";
import { RegisterForm } from "@/features/auth/register-form";
import { socials } from "@/lib/mock-data";
import { AuthMode } from "@/lib/types";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Checkbox } from "../ui/checkbox";

export function AuthForm({ mode }: { mode: AuthMode }): React.ReactElement {
  return (
    <motion.div
      key={mode}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative">
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="text-white" />
            <label
              htmlFor="remember"
              className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <a href="#" className="text-sm text-white hover:underline">
            Forgot password
          </a>
        </div>

        <div className="text-center">
          {socials.length > 0 && (
            <div className="flex justify-center gap-4">
              {" "}
              {socials.map((social) => (
                <button
                  key={social.icon}
                  className="w-12 h-12 cursor-pointer rounded-full bg-[#1a1d29] flex items-center justify-center hover:bg-[#252a3a] transition-colors"
                >
                  <Image
                    src={`/images/${social.icon}.svg`}
                    alt={social.icon}
                    width={32}
                    height={32}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
