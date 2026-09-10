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
    Sparkles,
    Tag,
    QrCode,
    FileText,
    Check,
    Plus,
    X
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { createLocalOrder } from "../api/shopnixStore";
import UPIModal from "../components/UPIModal";
import InvoiceModal from "../components/InvoiceModal";

export default function Cart() {
    const {
        cart,
        subtotal,
        totalItems,
        discountAmount,
        shippingFee,
        finalTotal,
        appliedCoupon,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
    } = useCart();

    const { user, updateAddress } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [couponInput, setCouponInput] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(null);
    const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    // Address management
    const defaultAddress = user?.address_list?.find((a) => a.is_default) || user?.address_list?.[0] || {
        street: "Flat 402, Cyber Tower, Sector 14",
        city: "Kaithal",
        state: "Haryana",
        country: "India",
        pincode: "136027",
        phone: "+91 8607603050"
    };

    const [shippingAddress, setShippingAddress] = useState(defaultAddress);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [newAddressForm, setNewAddressForm] = useState({
        street: "",
        city: "",
        state: "Haryana",
        country: "India",
        pincode: "",
        phone: ""
    });

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (!couponInput.trim()) return;
        applyCoupon(couponInput.trim());
        setCouponInput("");
    };

    const handlePlaceOrderProcess = () => {
        if (!cart.items || cart.items.length === 0) return;

        if (paymentMethod === "UPI") {
            setIsUpiModalOpen(true);
        } else {
            completeOrderCreation();
        }
    };

    const completeOrderCreation = () => {
        setIsPlacingOrder(true);

        setTimeout(() => {
            const orderPayload = {
                items: cart.items.map((item) => {
                    const p = item.product || {};
                    const price = (p.discount_price > 0 && p.discount_price < p.price) ? p.discount_price : (p.price || 0);
                    return {
                        product: p._id || "prod-snx-001",
                        name: p.name || "Cyber Tech Device",
                        price: price,
                        quantity: item.quantity,
                        size: item.size || "Standard",
                        color: item.color || "Standard",
                        image: p.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                    };
                }),
                shipping_address: shippingAddress,
                payment_method: paymentMethod,
                total_amount: finalTotal
            };

            const createdOrder = createLocalOrder(orderPayload);
            clearCart();
            setOrderSuccess(createdOrder);
            setIsPlacingOrder(false);
            showToast("Order placed successfully! Delivery tracking activated.", "success");
        }, 800);
    };

    const handleSaveNewAddress = async (e) => {
        e.preventDefault();
        if (!newAddressForm.street || !newAddressForm.city || !newAddressForm.pincode) {
            showToast("Please fill in required address fields", "warning");
            return;
        }

        const added = { ...newAddressForm, is_default: true };
        setShippingAddress(added);
        await updateAddress(added);
        setShowAddressModal(false);
        setNewAddressForm({ street: "", city: "", state: "Haryana", country: "India", pincode: "", phone: "" });
    };

    // ================= ORDER SUCCESS VIEW =================
    if (orderSuccess) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#08070E] text-slate-100 py-12 selection:bg-purple-600 selection:text-white">
                <div className="max-w-lg w-full bg-[#131024] rounded-3xl p-8 sm:p-10 border border-purple-500/40 shadow-2xl shadow-purple-950/60 text-center space-y-6 animate-in zoom-in-95">
                    <div className="w-20 h-20 bg-purple-950/80 border border-purple-500/50 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <CheckCircle2 className="w-10 h-10 text-purple-400" />
                    </div>

                    <div>
                        <span className="px-3 py-1 bg-purple-950/60 border border-purple-700/50 text-purple-300 text-xs font-bold rounded-full uppercase tracking-wider">
                            Order Confirmed &amp; Dispatched
                        </span>
                        <h2 className="text-3xl font-black text-white mt-3">Order Placed Successfully!</h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Thank you for shopping with <span className="text-purple-400 font-bold">Shopnix</span>. Your order #{orderSuccess._id} has been received and booked for express air delivery.
                        </p>
                    </div>

                    {/* Order Details Card */}
                    <div className="p-5 bg-[#0D0B18] rounded-2xl text-left text-xs space-y-2.5 border border-[#241D3F]">
                        <div className="flex justify-between text-slate-400">
                            <span>Order Number:</span>
                            <span className="font-mono font-bold text-white">{orderSuccess._id}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Airway Bill / Tracking:</span>
                            <span className="text-white font-mono font-bold">{orderSuccess.tracking_number}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Courier Partner:</span>
                            <span className="text-purple-300 font-medium">{orderSuccess.shipping_partner}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>Payment Mode:</span>
                            <span className="text-slate-200 font-medium">{orderSuccess.payment_method} ({orderSuccess.payment_status})</span>
                        </div>
                        <div className="border-t border-[#1E1736] pt-2 flex justify-between font-extrabold text-sm text-white">
                            <span>Amount Paid:</span>
                            <span className="text-purple-300 font-black text-base">₹{orderSuccess.total_amount?.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            onClick={() => setIsInvoiceModalOpen(true)}
                            className="flex-1 py-3 bg-[#1A1532] hover:bg-[#251E45] text-purple-200 rounded-xl font-bold text-xs border border-purple-500/40 flex items-center justify-center gap-2 transition shadow-sm"
                        >
                            <FileText className="w-4 h-4 text-purple-400" />
                            <span>View Tax Invoice</span>
                        </button>

                        <Link
                            to="/orders"
                            className="flex-1 py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-black text-xs shadow-[0_0_15px_rgba(168,85,247,0.4)] transition flex items-center justify-center gap-2"
                        >
                            <span>Track in My Orders</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <Link to="/" className="inline-block text-xs text-purple-400 hover:text-purple-300 font-bold transition">
                        Continue Shopping More Devices →
                    </Link>

                    <InvoiceModal
                        order={orderSuccess}
                        isOpen={isInvoiceModalOpen}
                        onClose={() => setIsInvoiceModalOpen(false)}
                    />
                </div>
            </div>
        );
    }

    // ================= EMPTY CART VIEW =================
    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white">
                <div className="max-w-md w-full bg-[#131024] rounded-3xl p-10 border border-[#241D3F] shadow-2xl text-center space-y-6">
                    <div className="w-20 h-20 bg-purple-950/60 border border-purple-500/40 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-2">
                            Explore next-gen smart devices, audio headphones, and gaming gear to add to your cart.
                        </p>
                    </div>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-black text-sm transition shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    >
                        <span>Start Shopping</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-8 sm:py-12 selection:bg-purple-600 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1E1736]">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">Review your items, apply coupon codes, and select your delivery address</p>
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-xs text-slate-400 hover:text-rose-400 font-semibold px-3 py-1.5 rounded-lg hover:bg-rose-950/30 transition"
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Left: Cart Items & Shipping Address */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Items List */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-5 sm:p-6 divide-y divide-[#1E1736] shadow-xl">
                            {cart.items.map((item) => {
                                const p = item.product || {};
                                const price = (p.discount_price > 0 && p.discount_price < p.price) ? p.discount_price : (p.price || 0);
                                const img = p.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300";

                                return (
                                    <div key={item._id} className="py-4 sm:py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div
                                                onClick={() => navigate(`/product/${p._id}`)}
                                                className="w-20 h-20 sm:w-24 sm:h-24 bg-[#0D0B18] rounded-2xl p-2 shrink-0 border border-[#241D3F] flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition"
                                            >
                                                <img src={img} alt={p.name} className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                                            </div>

                                            <div>
                                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                                                    {p.category}
                                                </span>
                                                <h3
                                                    onClick={() => navigate(`/product/${p._id}`)}
                                                    className="font-bold text-white text-sm sm:text-base hover:text-purple-300 transition cursor-pointer line-clamp-1"
                                                >
                                                    {p.name}
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    Edition: <span className="text-slate-200 font-semibold">{item.size}</span>
                                                    {item.color && item.color !== "Standard" && (
                                                        <span> • Color: <span className="text-slate-200 font-semibold">{item.color}</span></span>
                                                    )}
                                                </p>
                                                <p className="text-sm font-black text-white sm:hidden mt-2">
                                                    ₹{price.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                                            {/* Quantity Incrementer */}
                                            <div className="flex items-center border border-[#241D3F] rounded-xl overflow-hidden bg-[#0D0B18]">
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-[#1A162F] text-xs font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1.5 text-xs font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className="px-3 py-1.5 text-slate-400 hover:text-white hover:bg-[#1A162F] text-xs font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Total Item Price */}
                                            <div className="hidden sm:block text-right">
                                                <span className="text-base font-extrabold text-white">
                                                    ₹{(price * item.quantity).toLocaleString("en-IN")}
                                                </span>
                                                {item.quantity > 1 && (
                                                    <span className="block text-[11px] text-slate-400">
                                                        ₹{price.toLocaleString("en-IN")} each
                                                    </span>
                                                )}
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition"
                                                title="Remove item"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Shipping Address Selector */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-5 sm:p-6 space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-purple-400" />
                                    <span>Delivery Address</span>
                                </h3>
                                <button
                                    onClick={() => setShowAddressModal(true)}
                                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline"
                                >
                                    Change / Add Address
                                </button>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#0D0B18] border border-[#241D3F] text-xs space-y-1">
                                <p className="font-bold text-white text-sm">{user?.first_name} {user?.last_name}</p>
                                <p className="text-slate-300">{shippingAddress.street}</p>
                                <p className="text-slate-300">{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}</p>
                                <p className="text-purple-300 font-medium">Contact: {shippingAddress.phone || user?.phone || "+91 8607603050"}</p>
                            </div>
                        </div>

                        {/* Payment Method Selector */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-5 sm:p-6 space-y-4 shadow-xl">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-purple-400" />
                                <span>Select Payment Method</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <label
                                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition ${
                                        paymentMethod === "UPI"
                                            ? "border-purple-500 bg-purple-950/60 ring-1 ring-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "border-[#241D3F] bg-[#0D0B18] hover:border-purple-500/40 hover:bg-[#1A162F]"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <QrCode className="w-5 h-5 text-purple-400" />
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={paymentMethod === "UPI"}
                                            onChange={() => setPaymentMethod("UPI")}
                                            className="text-purple-600 focus:ring-0"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <p className="font-bold text-white text-xs">UPI / QR Code</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Instant Scan &amp; Pay</p>
                                    </div>
                                </label>

                                <label
                                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition ${
                                        paymentMethod === "Card"
                                            ? "border-purple-500 bg-purple-950/60 ring-1 ring-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "border-[#241D3F] bg-[#0D0B18] hover:border-purple-500/40 hover:bg-[#1A162F]"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <CreditCard className="w-5 h-5 text-purple-400" />
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={paymentMethod === "Card"}
                                            onChange={() => setPaymentMethod("Card")}
                                            className="text-purple-600 focus:ring-0"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <p className="font-bold text-white text-xs">Debit / Credit Card</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Visa, Mastercard, RuPay</p>
                                    </div>
                                </label>

                                <label
                                    className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition ${
                                        paymentMethod === "COD"
                                            ? "border-purple-500 bg-purple-950/60 ring-1 ring-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "border-[#241D3F] bg-[#0D0B18] hover:border-purple-500/40 hover:bg-[#1A162F]"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <Truck className="w-5 h-5 text-purple-400" />
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            checked={paymentMethod === "COD"}
                                            onChange={() => setPaymentMethod("COD")}
                                            className="text-purple-600 focus:ring-0"
                                        />
                                    </div>
                                    <div className="mt-3">
                                        <p className="font-bold text-white text-xs">Cash on Delivery</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Pay at Doorstep</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right: Coupon & Order Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Coupon Code Section */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-5 sm:p-6 space-y-4 shadow-xl">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Tag className="w-4 h-4 text-purple-400" />
                                <span>Have a Promo Coupon?</span>
                            </h3>

                            {appliedCoupon ? (
                                <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-700/50 flex items-center justify-between">
                                    <div>
                                        <span className="font-mono font-bold text-purple-300 text-xs">{appliedCoupon.code}</span>
                                        <p className="text-[10px] text-slate-300">{appliedCoupon.description}</p>
                                    </div>
                                    <button
                                        onClick={removeCoupon}
                                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Code (e.g. SHOPNIX20)"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="flex-1 px-3 py-2 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none text-xs uppercase font-mono focus:border-purple-500 placeholder-slate-500"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                                    >
                                        Apply
                                    </button>
                                </form>
                            )}

                            {/* Quick Coupon Suggestions */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                <button
                                    onClick={() => applyCoupon("SHOPNIX20")}
                                    className="px-2.5 py-1 rounded-lg bg-[#0D0B18] hover:bg-[#1A162F] text-[11px] font-mono text-purple-300 hover:text-purple-200 border border-[#241D3F] transition"
                                >
                                    SHOPNIX20 (20% OFF)
                                </button>
                                <button
                                    onClick={() => applyCoupon("WELCOME10")}
                                    className="px-2.5 py-1 rounded-lg bg-[#0D0B18] hover:bg-[#1A162F] text-[11px] font-mono text-purple-300 hover:text-purple-200 border border-[#241D3F] transition"
                                >
                                    WELCOME10 (10% OFF)
                                </button>
                            </div>
                        </div>

                        {/* Order Summary Card */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-5 sm:p-6 space-y-4 shadow-xl">
                            <h3 className="text-base font-bold text-white">Order Summary</h3>

                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between text-slate-400">
                                    <span>Subtotal ({totalItems} items):</span>
                                    <span className="font-semibold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-rose-400 font-semibold">
                                        <span>Coupon Discount ({appliedCoupon?.percent}%):</span>
                                        <span>- ₹{discountAmount.toLocaleString("en-IN")}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-slate-400">
                                    <span>Pan-India Express Shipping:</span>
                                    <span className="text-emerald-400 font-bold">
                                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                                    </span>
                                </div>

                                <div className="flex justify-between text-slate-400 text-[11px]">
                                    <span>GST (Included):</span>
                                    <span>₹{Math.round(finalTotal * 0.18).toLocaleString("en-IN")}</span>
                                </div>

                                <div className="border-t border-[#1E1736] pt-3 flex justify-between items-baseline">
                                    <span className="font-bold text-white text-base">Grand Total:</span>
                                    <span className="font-black text-purple-300 text-xl glow-purple-text">
                                        ₹{finalTotal.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrderProcess}
                                disabled={isPlacingOrder}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isPlacingOrder ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Proceed to Checkout</span>
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>256-Bit SSL Encrypted &amp; Verified Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* UPI QR Payment Modal */}
            {isUpiModalOpen && (
                <UPIModal
                    amount={finalTotal}
                    isOpen={isUpiModalOpen}
                    onClose={() => setIsUpiModalOpen(false)}
                    onPaymentSuccess={() => {
                        setIsUpiModalOpen(false);
                        completeOrderCreation();
                    }}
                />
            )}

            {/* Add Address Modal */}
            {showAddressModal && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-[#131024] rounded-3xl max-w-md w-full p-6 border border-purple-500/40 space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-[#1E1736]">
                            <h3 className="font-bold text-white text-sm">Add New Delivery Address</h3>
                            <button onClick={() => setShowAddressModal(false)} className="text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveNewAddress} className="space-y-3 text-xs">
                            <div>
                                <label className="block text-slate-400 mb-1">Street / House / Building</label>
                                <input
                                    type="text"
                                    required
                                    value={newAddressForm.street}
                                    onChange={(e) => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
                                    placeholder="House 12, Cyber Valley"
                                    className="w-full px-3 py-2 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-400 mb-1">City</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddressForm.city}
                                        onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                                        placeholder="Kaithal"
                                        className="w-full px-3 py-2 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-1">Pincode</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAddressForm.pincode}
                                        onChange={(e) => setNewAddressForm({ ...newAddressForm, pincode: e.target.value })}
                                        placeholder="136027"
                                        className="w-full px-3 py-2 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={newAddressForm.phone}
                                    onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                                    placeholder="+91 8607603050"
                                    className="w-full px-3 py-2 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddressModal(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-[#1A162F] hover:bg-[#251E45] text-slate-300 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                >
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
