'use client';

import { create } from 'zustand';
import { Currency, Language } from '@/lib/types';
import { currencies, languages } from '@/lib/mock-data';

interface SettingsState {
  currentCurrency: Currency;
  currentLanguage: Language;
  isLanguageMenuOpen: boolean;
  isCurrencyMenuOpen: boolean;
  setCurrency: (currency: Currency) => void;
  setLanguage: (language: Language) => void;
  toggleLanguageMenu: () => void;
  toggleCurrencyMenu: () => void;
  closeAllMenus: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  currentCurrency: currencies[0],
  currentLanguage: languages[0],
  isLanguageMenuOpen: false,
  isCurrencyMenuOpen: false,
  
  setCurrency: (currency) => {
    set({ currentCurrency: currency, isCurrencyMenuOpen: false });
  },
  
  setLanguage: (language) => {
    set({ currentLanguage: language, isLanguageMenuOpen: false });
  },
  
  toggleLanguageMenu: () => {
    set((state) => ({ 
      isLanguageMenuOpen: !state.isLanguageMenuOpen, 
      isCurrencyMenuOpen: false 
    }));
  },
  
  toggleCurrencyMenu: () => {
    set((state) => ({ 
      isCurrencyMenuOpen: !state.isCurrencyMenuOpen, 
      isLanguageMenuOpen: false 
    }));
  },
  
  closeAllMenus: () => {
    set({ isLanguageMenuOpen: false, isCurrencyMenuOpen: false });
  },
}));