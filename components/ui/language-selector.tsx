"use client";

import { languages } from "@/lib/mock-data";
import { useSettingsStore } from "@/lib/stores/settings-store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function LanguageSelector() {
  const {
    currentLanguage,
    isLanguageMenuOpen,
    toggleLanguageMenu,
    setLanguage,
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

    if (isLanguageMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageMenuOpen, closeAllMenus]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleLanguageMenu}
        className="flex items-center justify-center-safe min-w-[100px] gap-1.5 bg-[#1a1d29] rounded-2xl text-white py-2 px-3 transition-all hover:bg-[#252a3a]"
      >
        <span>{currentLanguage.flag}</span>
        <span>{currentLanguage.code}</span>
      </button>

      <AnimatePresence>
        {isLanguageMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-[#2c4451] rounded-xl overflow-hidden shadow-lg z-50 min-w-[100px]"
          >
            <div className="space-y-0">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => setLanguage(language)}
                  className={`w-full flex items-center gap-1.5 px-3 py-3 hover:bg-[#252a3a] transition-colors justify-center-safe ${
                    currentLanguage.code === language.code ? "bg-[#252a3a]" : ""
                  }`}
                >
                  <span>{language.flag}</span>
                  <span className="text-white">{language.code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
