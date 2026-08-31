import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Trash2,
    ShoppingBag,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Truck,
    CreditCard,
    MapPin,
    AlertCircle,
    Sparkles
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Cart() {
    const { cart, subtotal, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [placingOrder, setPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [error, setError] = useState("");

    // Selected shipping address
    const defaultAddress = user?.address_list?.find((a) => a.is_default) || user?.address_list?.[0] || {
        street: "123 Tech Park, Cyber City",
        city: "Kaithal",
        state: "Haryana",
        country: "India",
        pincode: user?.pincode || "136027",
        phone: user?.phone || "8607603050"
    };

    const [shippingAddress, setShippingAddress] = useState(defaultAddress);

    const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
    const finalTotal = subtotal + shippingFee;

    const handleCheckout = async () => {
        if (!cart.items || cart.items.length === 0) return;
        setError("");

        try {
            setPlacingOrder(true);
            const orderPayload = {
                items: cart.items.map((item) => ({
                    product: item.product?._id,
                    name: item.product?.name || "Tech Device",
                    price: item.product?.discount_price > 0 ? item.product.discount_price : item.product?.price || 0,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color,
                    image: item.product?.images?.[0]?.url || ""
                })),
                shipping_address: shippingAddress,
                payment_method: paymentMethod,
                total_amount: finalTotal
            };

            const res = await api.post("/orders", orderPayload);
            if (res.data?.success && res.data?.data) {
                setOrderSuccess(res.data.data);
                clearCart();
            } else {
                setError(res.data?.message || "Failed to place order");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to place order";
            setError(msg);
        } finally {
            setPlacingOrder(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#08070E] text-slate-100">
                <div className="max-w-md w-full bg-[#120F24] rounded-3xl p-8 border border-purple-900/50 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-center space-y-5 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-purple-950/80 border border-purple-500/50 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                        <CheckCircle2 className="w-10 h-10 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white">Order Placed Successfully!</h2>
                    <p className="text-sm text-slate-400">
                        Thank you for shopping with Shopnix. We have received your order #{orderSuccess._id.slice(-6).toUpperCase()} and are preparing it for shipment.
                    </p>
                    <div className="p-4 bg-[#1A162F] rounded-2xl text-left text-xs space-y-2 border border-purple-900/40">
                        <div className="flex justify-between font-semibold text-slate-200">
                            <span>Total Amount:</span>
                            <span className="text-purple-400 font-bold">₹{orderSuccess.total_amount?.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Payment Method:</span>
                            <span className="text-slate-200 font-medium">{orderSuccess.payment_method}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Status:</span>
                            <span className="text-emerald-400 font-semibold">{orderSuccess.order_status}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        <Link
                            to="/orders"
                            className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                            View My Orders
                        </Link>
                        <Link
                            to="/"
                            className="w-full py-2.5 text-slate-400 hover:text-white rounded-xl font-medium text-xs transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#08070E] text-slate-100">
                <div className="max-w-md w-full bg-[#120F24] rounded-3xl p-10 border border-[#241D3F] shadow-[0_4px_30px_rgba(0,0,0,0.5)] text-center space-y-6">
                    <div className="w-20 h-20 bg-purple-950/70 border border-purple-500/40 text-purple-400 rounded-3xl flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty</h2>
                        <p className="text-sm text-slate-400 mt-2">
                            Explore next-gen tech gadgets, smart wearables, and gaming devices to add to your bag.
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-sm transition shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                    >
                        <span>Explore Futuristic Store</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Review your selected gadgets and complete your order with prices in ₹ INR
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-950/60 border border-red-800/50 text-red-300 text-sm rounded-2xl flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        {cart.items.map((item) => {
                            const product = item.product || {};
                            const imgUrl = product.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300";
                            const itemPrice = product.discount_price > 0 ? product.discount_price : product.price || 0;

                            return (
                                <div
                                    key={item._id}
                                    className="bg-[#120F24] p-4 sm:p-5 rounded-3xl border border-[#241D3F] shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-24 h-28 sm:w-28 sm:h-32 bg-[#0A0815] rounded-2xl overflow-hidden shrink-0 border border-purple-900/40 flex items-center justify-center p-2">
                                        <img
                                            src={imgUrl}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 w-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-bold text-white text-base">
                                                    {product.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-950/40 transition"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Size & Color attributes */}
                                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                                <span className="bg-[#1A162F] border border-purple-900/40 px-2 py-0.5 rounded-md font-medium text-purple-300">
                                                    Spec: {item.size || "Standard"}
                                                </span>
                                                <span className="bg-[#1A162F] border border-purple-900/40 px-2 py-0.5 rounded-md font-medium text-slate-300">
                                                    Color: {item.color || "Standard"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price and Quantity Modifier */}
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-purple-950/40">
                                            <div className="flex items-center border border-purple-900/50 rounded-xl overflow-hidden bg-[#16132A]">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-purple-950 text-xs font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1.5 text-xs font-semibold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-purple-950 text-xs font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <span className="text-base font-black text-white">
                                                    ₹{(itemPrice * item.quantity).toLocaleString("en-IN")}
                                                </span>
                                                <p className="text-[11px] text-slate-500">
                                                    ₹{itemPrice.toLocaleString("en-IN")} each
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary & Checkout Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#120F24] p-6 rounded-3xl border border-[#241D3F] shadow-sm space-y-6 sticky top-28">
                            <h2 className="text-lg font-bold text-white border-b border-purple-950/40 pb-3">
                                Order Summary
                            </h2>

                            {/* Shipping Address Summary */}
                            <div className="space-y-2">
                                <label className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    <span>Delivery Address</span>
                                    <Link to="/profile" className="text-purple-400 lowercase font-medium hover:underline">
                                        change
                                    </Link>
                                </label>
                                <div className="p-3 bg-[#1A162F] border border-purple-900/40 rounded-xl text-xs text-slate-400 flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-white">
                                            {user?.first_name} {user?.last_name}
                                        </p>
                                        <p>{shippingAddress.street || "Kaithal, Haryana"}</p>
                                        <p>{shippingAddress.city} {shippingAddress.pincode}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Selector */}
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Payment Method
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("COD")}
                                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition ${
                                            paymentMethod === "COD"
                                                ? "border-purple-500 bg-purple-950/80 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                                : "border-purple-900/40 bg-[#16132A] text-slate-400 hover:border-purple-500/50 hover:text-white"
                                        }`}
                                    >
                                        <Truck className="w-4 h-4" />
                                        Cash on Delivery
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("UPI")}
                                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition ${
                                            paymentMethod === "UPI"
                                                ? "border-purple-500 bg-purple-950/80 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                                : "border-purple-900/40 bg-[#16132A] text-slate-400 hover:border-purple-500/50 hover:text-white"
                                        }`}
                                    >
                                        <CreditCard className="w-4 h-4" />
                                        UPI / Online
                                    </button>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-2.5 text-xs text-slate-400 pt-3 border-t border-purple-950/40">
                                <div className="flex justify-between">
                                    <span>Items Subtotal:</span>
                                    <span className="font-semibold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Shipping:</span>
                                    <span>
                                        {shippingFee === 0 ? (
                                            <span className="text-emerald-400 font-semibold">FREE</span>
                                        ) : (
                                            `₹${shippingFee}`
                                        )}
                                    </span>
                                </div>
                                {subtotal < 999 && subtotal > 0 && (
                                    <p className="text-[11px] text-purple-400 bg-purple-950/60 border border-purple-900/40 p-2 rounded-xl">
                                        💡 Add ₹{(999 - subtotal).toLocaleString("en-IN")} more to get FREE shipping!
                                    </p>
                                )}
                                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-purple-950/40">
                                    <span>Order Total:</span>
                                    <span className="text-purple-400 font-extrabold">₹{finalTotal.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            {/* Checkout Action Button */}
                            <button
                                onClick={handleCheckout}
                                disabled={placingOrder || cart.items.length === 0}
                                className="w-full py-3.5 px-6 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 group disabled:opacity-60"
                            >
                                {placingOrder ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Confirm Order (₹{finalTotal.toLocaleString("en-IN")})</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                                <ShieldCheck className="w-4 h-4 text-purple-400" />
                                <span>Safe and encrypted checkout guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

