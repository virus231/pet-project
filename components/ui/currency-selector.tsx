"use client";

import { currencies } from "@/lib/mock-data";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function CurrencySelector() {
  const {
    currentCurrency,
    isCurrencyMenuOpen,
    toggleCurrencyMenu,
    setCurrency,
    closeAllMenus,
  } = useSettingsStore();

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    if (isCurrencyMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCurrencyMenuOpen, closeAllMenus]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleCurrencyMenu}
        className="flex items-center justify-center-safe min-w-[100px] gap-1.5 bg-[#1a1d29] rounded-2xl text-white py-2 px-3 transition-all hover:bg-[#252a3a]"
      >
        <span>
          <Image src="/images/symbol.svg" alt="Symbol" width={20} height={20} />
        </span>
        <span>{currentCurrency.code}</span>
      </button>

      <AnimatePresence>
        {isCurrencyMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-[#2c4451] rounded-xl overflow-hidden shadow-lg z-50 min-w-[100px]"
          >
            <div className="space-y-0">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setCurrency(currency)}
                  className={`w-full flex items-center gap-1.5 px-3 py-3 hover:bg-[#252a3a] transition-colors justify-center-safe ${
                    currentCurrency.code === currency.code ? "bg-[#4e626d]" : ""
                  }`}
                >
                  <span className="text-blue-400">
                    <Image
                      src="/images/symbol.svg"
                      alt="Symbol"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="text-white">{currency.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
