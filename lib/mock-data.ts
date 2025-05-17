import { Currency, Language, Order } from "./types";

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
];

export const languages: Language[] = [
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "UA", name: "Ukrainian", flag: "🇺🇦" },
  { code: "FR", name: "French", flag: "🇫🇷" },
  { code: "DE", name: "German", flag: "🇩🇪" },
];

export const socials = [
  { icon: "google" },
  { icon: "discord" },
  { icon: "apple" },
  { icon: "facebook" },
  { icon: "telegram" },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    transactionId: "#15325",
    date: "12.06.2024",
    status: "success",
    gameName: "Ernardd",
    gameId: "1523523623",
    amount: 153.26,
    currency: "USD",
    goods: {
      quantity: 40500,
      change: 1500,
      price: 279.99,
      originalPrice: 749.99,
    },
  },
  {
    id: "2",
    transactionId: "#15326",
    date: "13.06.2024",
    status: "success",
    gameName: "Ernardd",
    gameId: "1523523623",
    amount: 153.26,
    currency: "USD",
  },
  {
    id: "3",
    transactionId: "#15327",
    date: "14.06.2024",
    status: "pending",
    gameName: "Ernardd",
    gameId: "1523523623",
    amount: 153.26,
    currency: "USD",
  },
  {
    id: "4",
    transactionId: "#15328",
    date: "15.06.2024",
    status: "success",
    gameName: "Ernardd",
    gameId: "1523523623",
    amount: 153.26,
    currency: "USD",
  },
  {
    id: "5",
    transactionId: "#15329",
    date: "16.06.2024",
    status: "failed",
    gameName: "Ernardd",
    gameId: "1523523623",
    amount: 153.26,
    currency: "USD",
  },
];
