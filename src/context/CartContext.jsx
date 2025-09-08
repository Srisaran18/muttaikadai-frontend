import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((p) => p._id === product._id);
      if (existingIndex !== -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.max(1, (next[existingIndex].quantity || 0) + quantity),
        };
        return next;
      }
      return [...prev, { ...product, quantity: Math.max(1, quantity) }];
    });
  };

  const removeItemByIndex = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index, quantity) => {
    setItems((prev) =>
      prev.map((p, i) => (i === index ? { ...p, quantity: Math.max(1, quantity) } : p))
    );
  };

  const clearCart = () => setItems([]);

  const total = useMemo(() => {
    return items.reduce((acc, item) => {
      const unitPrice = item.quantity >= item.bulkQuantity ? item.bulkPrice : item.price;
      return acc + unitPrice * item.quantity;
    }, 0);
  }, [items]);

  const value = { items, addItem, removeItemByIndex, updateItemQuantity, clearCart, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};


