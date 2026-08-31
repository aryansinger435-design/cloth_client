import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [totalItems, setTotalItems] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        if (!isAuthenticated) {
            setCart({ items: [] });
            setTotalItems(0);
            setSubtotal(0);
            return;
        }

        try {
            setLoading(true);
            const res = await api.get("/cart");
            if (res.data?.success && res.data?.data) {
                setCart(res.data.data.cart || { items: [] });
                setTotalItems(res.data.data.totalItems || 0);
                setSubtotal(res.data.data.subtotal || 0);
            }
        } catch (error) {
            console.error("Fetch cart error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [isAuthenticated]);

    const addToCart = async (productId, quantity = 1, size = "M", color = "Standard") => {
        if (!isAuthenticated) {
            throw new Error("Please log in to add items to your cart");
        }

        try {
            const res = await api.post("/cart/add", {
                productId,
                quantity,
                size,
                color
            });

            if (res.data?.success && res.data?.data) {
                setCart(res.data.data.cart);
                setTotalItems(res.data.data.totalItems);
                setSubtotal(res.data.data.subtotal);
                return res.data.data;
            }
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Failed to add item to cart";
            throw new Error(msg);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (!isAuthenticated) return;

        try {
            const res = await api.put("/cart/update", { itemId, quantity });
            if (res.data?.success && res.data?.data) {
                setCart(res.data.data.cart);
                setTotalItems(res.data.data.totalItems);
                setSubtotal(res.data.data.subtotal);
            }
        } catch (error) {
            console.error("Update quantity error:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!isAuthenticated) return;

        try {
            const res = await api.delete(`/cart/remove/${itemId}`);
            if (res.data?.success && res.data?.data) {
                setCart(res.data.data.cart);
                setTotalItems(res.data.data.totalItems);
                setSubtotal(res.data.data.subtotal);
            }
        } catch (error) {
            console.error("Remove from cart error:", error);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) return;

        try {
            await api.delete("/cart/clear");
            setCart({ items: [] });
            setTotalItems(0);
            setSubtotal(0);
        } catch (error) {
            console.error("Clear cart error:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                totalItems,
                subtotal,
                loading,
                fetchCart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartContext;
