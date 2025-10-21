import { CartItem } from "@/lib/types";
import {
  createContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
  useContext,
} from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (item: CartItem, operation: "minus" | "plus") => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((cartItem: CartItem) => {
    setCart((prev) => {
      const itemExists = prev.find((item) => item.item.id === cartItem.item.id);
      if (itemExists) {
        return prev.map((item) =>
          item.item.id === cartItem.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...cartItem, quantity: cartItem.quantity || 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (cartItem: CartItem, operation: "minus" | "plus") => {
      setCart((prev) => {
        const existingItem = prev.find(
          (item) => item.item.id === cartItem.item.id
        );
        if (!existingItem) {
          return [...prev, { ...cartItem, quantity: 1 }];
        }

        return prev
          .map((item) => {
            if (item.item.id === cartItem.item.id) {
              const newQuantity =
                operation === "plus"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1); // prevent quantity below 1
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getTotal = useCallback(() => {
    const total = cart.reduce(
      (sum, item) =>
        sum + (item.item.sale_price ?? item.item.price ?? 1) * item.quantity,
      0
    );
    return total;
  }, [cart]);

  const contextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotal]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useItem must be used within an ItemProvider");
  }

  return context;
};

export default CartContext;
