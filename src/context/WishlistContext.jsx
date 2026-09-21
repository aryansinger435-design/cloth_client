import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredWishlist, saveStoredWishlist } from "../api/shopnixStore";
import { useToast } from "./ToastContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => getStoredWishlist());
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { showToast } = useToast();

    useEffect(() => {
        saveStoredWishlist(wishlist);
    }, [wishlist]);

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item._id === productId);
    };

    const toggleWishlist = (product) => {
        if (!product || !product._id) return;

        if (isInWishlist(product._id)) {
            setWishlist((prev) => prev.filter((item) => item._id !== product._id));
            showToast(`Removed "${product.name.slice(0, 24)}..." from your Wishlist`, "info");
        } else {
            setWishlist((prev) => [...prev, product]);
            showToast(`Saved "${product.name.slice(0, 24)}..." to your Wishlist ❤️`, "success");
        }
    };

    const removeFromWishlist = (productId) => {
        const item = wishlist.find((i) => i._id === productId);
        setWishlist((prev) => prev.filter((i) => i._id !== productId));
        if (item) {
            showToast(`Removed "${item.name.slice(0, 24)}..." from Wishlist`, "info");
        }
    };

    const clearWishlist = () => {
        setWishlist([]);
        showToast("Wishlist cleared", "info");
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistCount: wishlist.length,
                isInWishlist,
                toggleWishlist,
                removeFromWishlist,
                clearWishlist,
                isDrawerOpen,
                setIsDrawerOpen
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};

export default WishlistContext;
