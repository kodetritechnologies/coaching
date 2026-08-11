"use client";
import React, { createContext, useContext, useState } from "react";

const QuickViewContext = createContext();

export const QuickViewProvider = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <QuickViewContext.Provider value={{ quickViewProduct, setQuickViewProduct }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => useContext(QuickViewContext);
