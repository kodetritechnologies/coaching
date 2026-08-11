"use client";
import React, { createContext, useContext, useState } from "react";

const QuickAddContext = createContext();

export const QuickAddProvider = ({ children }) => {
  const [quickAddProduct, setQuickAddProduct] = useState(null);

  return (
    <QuickAddContext.Provider value={{ quickAddProduct, setQuickAddProduct }}>
      {children}
    </QuickAddContext.Provider>
  );
};

export const useQuickAdd = () => {
  const context = useContext(QuickAddContext);
  if (!context) {
    throw new Error("useQuickAdd must be used within a QuickAddProvider");
  }
  return context;
};
