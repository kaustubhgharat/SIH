import { useState, useEffect, useCallback } from "react";

// --- Types ---
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type ToastMessage = { id: number; message: string };

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(savedCart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Toast helper
  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // 🔹 Add item with quantity
const addToCart = useCallback(
  (
    product: { id: string; name: string; price: number; image: string; quantity: number },
    quantity: number = 1
  ) => {
    if (quantity < 1) return;

    const existingItem = cart.find((item) => item.id === product.id);
    const currentQty = existingItem ? existingItem.qty : 0;

    // 🔹 Cap at available stock
    if (currentQty + quantity > product.quantity) {
      addToast(`Only ${product.quantity} kg of ${product.name} available.`);
      return;
    }

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + quantity } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: quantity,
        },
      ];
    }

    saveCart(updatedCart);
    addToast(`${product.name} added (x${quantity}) to cart!`);
  },
  [cart]
);

  // Remove
  const removeFromCart = useCallback(
    (id: string) => {
      const updatedCart = cart.filter((item) => item.id !== id);
      saveCart(updatedCart);
    },
    [cart]
  );

  // Update quantity
const updateQuantity = useCallback(
  (
    id: string,
    newQty: number,
    availableQty: number // 🔹 pass from UI
  ) => {
    if (newQty < 1) {
      removeFromCart(id);
      return;
    }

    if (newQty > availableQty) {
      addToast(`Max available: ${availableQty} kg`);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );
    saveCart(updatedCart);
  },
  [cart]
);


  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    total,
    toasts,
  };
};
