"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/types/Product";
import { CartItem } from "@/types/CartItem";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        if (exists.quantity >= product.stock) return prev;

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function increaseQuantity(id: number) {
    setCart(prev =>
      prev.map(item => {
        if (item.id !== id) return item;

        if (item.quantity >= item.stock) {
          return item; // 🔒 trava no estoque máximo
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  }


  function decreaseQuantity(id: number) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }

  return context;
}
