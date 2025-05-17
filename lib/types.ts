/**
 * Application Type Definitions
 * 
 * This file contains TypeScript interface definitions for the application's data models.
 * These types provide structure and type safety throughout the application.
 * 
 * @module Types
 */

/**
 * User Interface
 * Represents a user account in the application.
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address (used for authentication) */
  email: string;
  /** Optional user's display name */
  name?: string;
}

/**
 * Currency Interface
 * Represents a currency option in the application settings.
 */
export interface Currency {
  /** ISO currency code (e.g., USD, EUR) */
  code: string;
  /** Currency symbol (e.g., $, €) */
  symbol: string;
  /** Full currency name for display */
  name: string;
}

/**
 * Language Interface
 * Represents a language option in the application settings.
 */
export interface Language {
  /** Language code (e.g., en, es) */
  code: string;
  /** Language name for display */
  name: string;
  /** Flag emoji for visual representation */
  flag: string;
}

/**
 * Order Interface
 * Represents a transaction/order in the application.
 * Central data model for the orders management feature.
 */
export interface Order {
  /** Unique identifier for the order */
  id: string;
  /** Transaction identifier (for display and referencing) */
  transactionId: string;
  /** Date of the transaction (formatted string) */
  date: string;
  /** Status of the order - affects display and available actions */
  status: 'success' | 'pending' | 'failed';
  /** Name of the game associated with the order */
  gameName: string;
  /** ID of the game associated with the order */
  gameId: string;
  /** Total monetary amount of the order */
  amount: number;
  /** Currency code of the order */
  currency: string;
  /** 
   * Optional goods details included with the order 
   * Only present for orders that include digital goods
   */
  goods?: {
    /** Quantity of goods */
    quantity: number;
    /** Change in quantity (for display purposes) */
    change: number;
    /** Current price */
    price: number;
    /** Original price before discount */
    originalPrice: number;
  };
}

/**
 * Authentication Mode Type
 * Represents the current authentication screen mode.
 * Used to toggle between login and registration views.
 */
export type AuthMode = 'login' | 'register';