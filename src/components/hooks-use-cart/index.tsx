"use client";

import { CartItemType } from "@/lib/type";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface CartContextType {
  items: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: string, selectedOptions?: string[]) => void;
  updateQuantity: (
    id: string,
    quantity: number,
    selectedOptions?: string[]
  ) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Generate a unique key for cart items based on id and selected options
  const getItemKey = (id: string, selectedOptions?: string[]) => {
    if (!selectedOptions || selectedOptions.length === 0) return id;
    return `${id}-${selectedOptions.sort().join("-")}`;
  };

  const addItem = (newItem: CartItemType) => {
    setItems((prevItems) => {
      const itemKey = getItemKey(newItem.id, newItem.selectedOptions);

      // Check if item with same options already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => getItemKey(item.id, item.selectedOptions) === itemKey
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (id: string, selectedOptions?: string[]) => {
    setItems((prevItems) => {
      const itemKey = getItemKey(id, selectedOptions);
      return prevItems.filter(
        (item) => getItemKey(item.id, item.selectedOptions) !== itemKey
      );
    });
  };

  const updateQuantity = (
    id: string,
    quantity: number,
    selectedOptions?: string[]
  ) => {
    setItems((prevItems) => {
      const itemKey = getItemKey(id, selectedOptions);
      return prevItems.map((item) =>
        getItemKey(item.id, item.selectedOptions) === itemKey
          ? { ...item, quantity }
          : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate total price
  const total = items.reduce((sum, item) => {
    const itemPrice = item.price;
    if (item.selectedOptions && item.selectedOptions.length > 0) {
    }

    return sum + itemPrice * item.quantity;
  }, 0);

  // Calculate total number of items
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
