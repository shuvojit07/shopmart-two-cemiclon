"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // LocalStorage theke data load kora
  useEffect(() => {
    const savedCart = localStorage.getItem("shopmart_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Cart update hole save kora
  useEffect(() => {
    localStorage.setItem("shopmart_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      // Jodi same product thake tobe update, na thakle add
      const existing = prev.find((item) => item._id === product._id);
      if (existing) return prev; 
      return [...prev, product];
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("shopmart_cart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Ekhane hook-ti export kora hochhe
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};