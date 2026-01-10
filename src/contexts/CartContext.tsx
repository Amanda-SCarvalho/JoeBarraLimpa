"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "@/types/Product";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextData | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* 🔄 CARREGAR DO LOCALSTORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  /* 💾 SALVAR NO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ➕ ADICIONAR */
  function addToCart(product: Product) {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }

  /* ➖ REMOVER */
  function removeFromCart(id: number) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  /* 🧹 LIMPAR */
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
