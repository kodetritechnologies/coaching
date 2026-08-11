"use client";
import { createContext, useContext, useEffect, useState } from "react";
import BasicProvider from "../BasicProvider";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const basicProvider = BasicProvider();
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    try {
      setLoading(true);
      const response = await basicProvider.getMethod("public/ecommerce/wishlist");
      if (response.status === "success") {
        setWishlist(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const toggleWishlist = async (itemId, varient_id = null) => {
    if (!user) {
      toast.error("Please login to manage your wishlist");
      return;
    }

    try {
      const response = await basicProvider.postMethod("public/ecommerce/wishlist/toggle", {
        item: itemId,
        varient_id: varient_id,
      });

      if (response.status === "success") {
        toast.success(response.message);
        fetchWishlist(); // Refresh wishlist after toggle
        return response.action; // 'added' or 'removed'
      } else {
        toast.error(response.message || "Failed to update wishlist");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error("An error occurred");
    }
  };

  const isInWishlist = (itemId, varient_id = null) => {
    if (!itemId) return false;
    
    // Ensure we are comparing strings if possible
    const targetItemId = itemId.toString();
    const targetVarientId = varient_id ? varient_id.toString() : null;

    return wishlist.some((wishlistItem) => {
      const wishItem = wishlistItem.item?._id || wishlistItem.item;
      const itemMatch = wishItem?.toString() === targetItemId;
      
      // If varient_id is provided, check for a match
      if (targetVarientId) {
        const wishVarId = wishlistItem.varient_id?._id || wishlistItem.varient_id;
        return itemMatch && wishVarId?.toString() === targetVarientId;
      }
      
      // If no varient_id is provided, ensure the wishlist item also has no variant
      return itemMatch && !wishlistItem.varient_id;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
