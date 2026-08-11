"use client";
import { createContext, useContext, useEffect, useState } from "react";
import BasicProvider from "../BasicProvider";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

const LOCAL_STORAGE_KEY = "kodetri_cart";

export default function CartProvider({ children }) {
  const basicProvider = BasicProvider();
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      setCart(localCart);
      const localTotal = localCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
      setCartTotal(localTotal);
      return;
    }

    try {
      setLoading(true);
      const response = await basicProvider.getMethod("public/ecommerce/cart");
      if (response.status === "success") {
        setCart(response.data[0]?.items || []);
        setCartTotal(response.data[0]?.totalAmount || 0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (item) => {
    // item should have: itemId, variantId, quantity, price, and optionally details for guest UI
    const { itemId, variantId, quantity, price, productDetails } = item;

    if (!user) {
      // Guest logic
      const localCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const existingItemIndex = localCart.findIndex(
        (i) => i.itemId === itemId && i.variantId === (variantId || null)
      );

      if (existingItemIndex > -1) {
        localCart[existingItemIndex].quantity += quantity;
      } else {
        localCart.push({
          itemId,
          variantId: variantId || null,
          quantity,
          price,
          productDetails, // Storing minimal details to show in UI without extra fetches
        });
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localCart));
      setCart([...localCart]);
      const localTotal = localCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
      setCartTotal(localTotal);
      toast.success("Item added to cart");
      return;
    }

    // Authenticated logic
    try {
      const response = await basicProvider.postMethod("public/ecommerce/cart/create", {
        itemId,
        variantId: variantId || null,
        quantity,
        price,
      });

      if (response.status === "success") {
        toast.success(response.message);
        fetchCart();
      } else if (response.status === "error" && response.message.includes("already exists")) {
        const existingItem = cart.find(
          (i) => {
            const itemMatch = (i.itemId?._id || i.itemId) === itemId;
            const variantMatch = (i.variantId?._id || i.variantId || null) === (variantId || null);
            return itemMatch && variantMatch;
          }
        );
        if (existingItem) {
          await updateQuantity(existingItem._id, quantity, existingItem.quantity);
          toast.success("Cart quantity updated");
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error(response.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred");
    }
  };

  const removeFromCart = async (id) => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const updatedCart = localCart.filter((item, index) => index !== id && item.itemId !== id); 
      // Note: Guest removal might be by index or itemId. Let's use itemId + variantId for safety.
      // But for simplicity in this initial version, let's assume 'id' passed is the item to remove.
      const newCart = localCart.filter((item) => !(item.itemId === id || item._id === id));
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      setCart(newCart);
      const localTotal = newCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
      setCartTotal(localTotal);
      toast.success("Item removed from cart");
      return;
    }

    try {
      const response = await basicProvider.deleteMethod(`public/ecommerce/cart/delete/${id}`);
      if (response.status === "success") {
        toast.success(response.message);
        fetchCart();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (id, change, currentQuantity) => {
    if (currentQuantity + change < 1) return;

    if (!user) {
      const localCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      const item = localCart.find((i) => i.itemId === id || i._id === id);
      if (item) {
        item.quantity += change;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localCart));
        setCart([...localCart]);
        const localTotal = localCart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
        setCartTotal(localTotal);
      }
      return;
    }

    try {
      const response = await basicProvider.patchMethod(`public/ecommerce/cart/update/${id}`, {
        quantity: change,
      });
      if (response.status === "success") {
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearLocalStorageCart = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    if (!user) {
      setCart([]);
      setCartTotal(0);
    }
  };

  const getLocalStorageCart = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        getLocalStorageCart,
        clearLocalStorageCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
