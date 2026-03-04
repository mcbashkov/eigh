import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine and normalize multiple class name inputs into a single, optimized class string suitable for Tailwind usage.
 *
 * @param inputs - One or more class name values (strings, arrays, or objects) to be combined
 * @returns A single space-separated class string with redundant classes resolved and order optimized for Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric value as an en-US currency string using two decimal places.
 *
 * @param value - The numeric amount to format
 * @param currency - The ISO 4217 currency code to use (default: "USD")
 * @returns The formatted currency string, e.g. "$1,234.56"
 */
export function formatCurrency(value: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
