"use client";
import { createContext, useContext, useEffect, useState } from "react";
import BasicProvider from "../BasicProvider";

export const CurrencyContext = createContext();

export default function CurrencyProvider({ children }) {
  const basicProvider = BasicProvider();

  // The single active default currency
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDefaultCurrency = async () => {
    try {
      setLoading(true);
      const response = await basicProvider.getMethod(
        "public/configuration/currencies"
      );
      if (response?.status === "success" && response.data?.length > 0) {
        // API returns currencies sorted with is_default first
        const defaultCurrency =
          response.data.find((c) => c.is_default) || response.data[0];
        setCurrency(defaultCurrency);
      }
    } catch (error) {
      console.error("Failed to fetch default currency:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultCurrency();
  }, []);

  /**
   * Format a number as a price string with the active currency symbol.
   * e.g. formatPrice(1299) => "₹1,299.00"
   * @param {number} amount
   * @returns {string}
   */
  const formatPrice = (amount) => {
    if (amount === null || amount === undefined || amount === "") return "";
    const symbol = currency?.symbol || "";
    const num = Number(amount);
    if (isNaN(num)) return `${symbol}0.00`;
    return `${symbol}${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        loading,
        formatPrice,
        symbol: currency?.symbol || "",
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

/**
 * Hook to consume CurrencyContext.
 * Usage:
 *   const { formatPrice, symbol, currency } = useCurrency();
 *   <span>{formatPrice(product.price)}</span>
 */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
