import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";
import { getStoredProducts, VALID_COUPONS } from "../api/shopnixStore";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { showToast } = useToast();

    // Initial cart with 1 sample item so cart is ready to preview
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("shopnix_cart_v2");
            if (saved) return JSON.parse(saved);
            const prods = getStoredProducts();
            const first = prods[0];
            return {
                items: [
                    {
                        _id: "cart-init-01",
                        product: first,
                        quantity: 1,
                        size: first.sizes?.[0] || "Standard",
                        color: first.colors?.[0] || "Standard"
                    }
                ]
            };
        } catch {
            return { items: [] };
        }
    });

    const [appliedCoupon, setAppliedCoupon] = useState(() => {
        try {
            const saved = localStorage.getItem("shopnix_applied_coupon");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    // Save cart whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem("shopnix_cart_v2", JSON.stringify(cart));
        } catch (e) {
            console.error("Failed to persist cart:", e);
        }
    }, [cart]);

    // Save coupon whenever it changes
    useEffect(() => {
        if (appliedCoupon) {
            localStorage.setItem("shopnix_applied_coupon", JSON.stringify(appliedCoupon));
        } else {
            localStorage.removeItem("shopnix_applied_coupon");
        }
    }, [appliedCoupon]);

    // Compute subtotal and total items
    const totalItems = cart.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

    const subtotal = cart.items?.reduce((sum, item) => {
        const p = item.product || {};
        const price = (p.discount_price > 0 && p.discount_price < p.price) ? p.discount_price : (p.price || 0);
        return sum + (price * (item.quantity || 1));
    }, 0) || 0;

    // Coupon discount calculation
    let discountAmount = 0;
    if (appliedCoupon && appliedCoupon.percent) {
        discountAmount = Math.round((subtotal * appliedCoupon.percent) / 100);
    }

    const isFreeShipping = appliedCoupon?.freeShipping || subtotal >= 999 || subtotal === 0;
    const shippingFee = isFreeShipping ? 0 : 99;
    const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

    const addToCart = async (productId, quantity = 1, size = "Standard", color = "Standard") => {
        const allProducts = getStoredProducts();
        const found = allProducts.find((p) => p._id === productId) || allProducts[0];

        setCart((prev) => {
            const existingIndex = prev.items.findIndex(
                (item) => (item.product?._id === productId || item.product === productId) && item.size === size && item.color === color
            );

            let newItems;
            if (existingIndex > -1) {
                newItems = [...prev.items];
                newItems[existingIndex].quantity += quantity;
            } else {
                newItems = [
                    ...prev.items,
                    {
                        _id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
                        product: found,
                        quantity,
                        size,
                        color
                    }
                ];
            }
            return { items: newItems };
        });

        showToast(`Added ${quantity}x "${found.name.slice(0, 22)}..." to your cart! 🛍️`, "success");
        return { success: true };
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCart((prev) => {
            const newItems = prev.items.map((item) => {
                if (item._id === itemId) {
                    return { ...item, quantity };
                }
                return item;
            });
            return { items: newItems };
        });
    };

    const removeFromCart = async (itemId) => {
        setCart((prev) => {
            const target = prev.items.find((i) => i._id === itemId);
            if (target) {
                showToast(`Removed "${target.product?.name?.slice(0, 20)}..." from cart`, "info");
            }
            return { items: prev.items.filter((item) => item._id !== itemId) };
        });
    };

    const clearCart = async () => {
        setCart({ items: [] });
        setAppliedCoupon(null);
    };

    const applyCoupon = (code) => {
        const upper = code.trim().toUpperCase();
        if (VALID_COUPONS[upper]) {
            setAppliedCoupon(VALID_COUPONS[upper]);
            showToast(`Coupon "${upper}" applied successfully! 🎉`, "success");
            return { success: true, coupon: VALID_COUPONS[upper] };
        } else {
            showToast("Invalid coupon code. Try SHOPNIX20 or WELCOME10", "error");
            return { success: false, message: "Invalid coupon code" };
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        showToast("Coupon removed", "info");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                totalItems,
                subtotal,
                discountAmount,
                shippingFee,
                finalTotal,
                appliedCoupon,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                applyCoupon,
                removeCoupon
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
