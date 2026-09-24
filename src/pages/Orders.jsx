import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    AlertCircle,
    ShoppingBag,
    ArrowRight,
    FileText,
    RotateCcw,
    XCircle,
    MapPin,
    ExternalLink,
    ChevronRight,
    X,
    Crown,
    Watch
} from "lucide-react";
import { getStoredOrders, cancelLocalOrder } from "../api/shopnixStore";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import InvoiceModal from "../components/InvoiceModal";

export default function Orders() {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
    const [trackingModalOrder, setTrackingModalOrder] = useState(null);

    const loadOrders = () => {
        const stored = getStoredOrders();
        setOrders(stored);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleCancelOrder = (orderId) => {
        cancelLocalOrder(orderId);
        loadOrders();
        showToast(`Acquisition #${orderId} has been revoked`, "info");
    };

    const handleReorder = async (order) => {
        for (const item of order.items || []) {
            await addToCart(item.product, item.quantity, item.size, item.color);
        }
        showToast("Timepieces reserved back into your portfolio!", "success");
        navigate("/cart");
    };

    const filteredOrders = orders.filter((ord) => {
        if (selectedFilter === "All") return true;
        return ord.order_status?.toLowerCase() === selectedFilter.toLowerCase();
    });

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-emerald-950/60 text-emerald-400 border-emerald-800/40 font-bold";
            case "shipped":
                return "bg-[#0A0C13] text-[#E5C158] border-[#D4AF37]/50 font-bold";
            case "processing":
            case "pending":
                return "bg-[#1A1F30] text-[#D4AF37] border-[#D4AF37]/40 font-bold";
            case "cancelled":
                return "bg-rose-950/60 text-rose-400 border-rose-800/40 font-bold";
            default:
                return "bg-[#07080D] text-slate-300 border-[#151722] font-bold";
        }
    };

    const getTrackerStep = (status) => {
        switch (status?.toLowerCase()) {
            case "pending": return 1;
            case "processing": return 2;
            case "shipped": return 3;
            case "delivered": return 4;
            default: return 0;
        }
    };

    return (
        <div className="min-h-screen bg-[#040406] text-slate-100 py-10 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                            Vault Acquisitions &amp; Provenance Registry
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Live armored tracking, tamper-proof seals, official tax invoices, and past timepiece acquisitions
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#07080D] border border-[#151722] text-xs shadow-sm overflow-x-auto scrollbar-none touch-scroll max-w-full">
                        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setSelectedFilter(f)}
                                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap shrink-0 ${
                                    selectedFilter === f
                                        ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-[#07080D] p-12 rounded-3xl border border-[#151722] text-center max-w-md mx-auto space-y-5 shadow-xl">
                        <div className="w-16 h-16 bg-[#0A0C13] border border-[#D4AF37]/40 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                            <Crown className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white font-serif">No {selectedFilter !== "All" ? selectedFilter : ""} Acquisitions Found</h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Discover certified horological automatics and reserve your next heirloom timepiece today.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black rounded-xl text-xs font-extrabold uppercase tracking-wider transition shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        >
                            <span>Explore The Vault</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order) => {
                            const step = getTrackerStep(order.order_status);
                            const isCancelled = order.order_status === "Cancelled";

                            return (
                                <div
                                    key={order._id}
                                    className="bg-[#07080D] rounded-3xl border border-[#151722] shadow-xl overflow-hidden"
                                >
                                    {/* Order Meta Header */}
                                    <div className="p-5 sm:px-6 bg-[#030406] border-b border-[#151722] flex flex-wrap items-center justify-between gap-4 text-xs">
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                                            <div>
                                                <span className="text-slate-400 block font-medium">Acquisition ID</span>
                                                <span className="font-mono font-bold text-white text-sm">{order._id}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block font-medium">Registered Date</span>
                                                <span className="font-semibold text-slate-300">
                                                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block font-medium">Settlement Total</span>
                                                <span className="font-black text-[#E5C158] text-sm font-serif">
                                                    ₹{order.total_amount?.toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 text-xs rounded-full border ${getStatusStyle(order.order_status)}`}>
                                                {order.order_status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Shipment Tracker Stepper */}
                                    {!isCancelled && (
                                        <div className="p-4 sm:px-6 border-b border-[#151722] bg-[#030406]/60">
                                            <div className="max-w-2xl mx-auto">
                                                <div className="grid grid-cols-4 text-[9px] sm:text-[11px] font-bold text-slate-400 mb-2 gap-1 text-center">
                                                    <span className={`truncate ${step >= 1 ? "text-[#E5C158]" : ""}`}>Verified</span>
                                                    <span className={`truncate ${step >= 2 ? "text-[#E5C158]" : ""}`}>Calibration</span>
                                                    <span className={`truncate ${step >= 3 ? "text-[#E5C158]" : ""}`}>Air Transit</span>
                                                    <span className={`truncate ${step >= 4 ? "text-emerald-400" : ""}`}>Delivered</span>
                                                </div>

                                                {/* Stepper bar */}
                                                <div className="relative h-2 bg-[#0A0C13] rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-emerald-400 rounded-full transition-all duration-500"
                                                        style={{ width: `${(step / 4) * 100}%` }}
                                                    ></div>
                                                </div>

                                                <div className="flex flex-col xs:flex-row xs:items-center justify-between mt-2 text-[10px] text-slate-400 gap-1">
                                                    <span>Courier: <strong className="text-[#E5C158]">{order.shipping_partner || "Chrononix Armored Logistics"}</strong></span>
                                                    <span>Waybill: <strong className="text-white font-mono font-bold">{order.tracking_number}</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div className="p-4 sm:p-6 divide-y divide-[#23293D]">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-start sm:items-center justify-between gap-3">
                                                <div className="flex items-center gap-3 sm:gap-4">
                                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#030406] rounded-2xl overflow-hidden shrink-0 border border-[#151722] flex items-center justify-center p-1">
                                                        <img
                                                            src={item.image || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200"}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover rounded-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-white text-xs sm:text-sm font-serif line-clamp-1">{item.name}</h4>
                                                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                                                            Case: <span className="text-slate-200 font-semibold">{item.size}</span>
                                                            {item.color && item.color !== "Standard" && <span> • Finish: {item.color}</span>}
                                                            <span> • Qty: {item.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right shrink-0">
                                                    <span className="font-extrabold text-white text-xs sm:text-sm">
                                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons Bar */}
                                    <div className="p-4 sm:px-6 bg-[#030406] border-t border-[#151722] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                        <div className="text-slate-400">
                                            Destination: <strong className="text-white">{order.shipping_address?.city}, {order.shipping_address?.state}</strong>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                                            {/* Track Package Modal */}
                                            <button
                                                onClick={() => setTrackingModalOrder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-[#0A0C13] hover:bg-[#20273D] text-[#E5C158] hover:text-white font-bold border border-[#D4AF37]/40 flex items-center gap-1.5 transition shadow-sm"
                                            >
                                                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                <span>Track Armored Parcel</span>
                                            </button>

                                            {/* Download / Print Invoice */}
                                            <button
                                                onClick={() => setSelectedInvoiceOrder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-[#0A0C13] hover:bg-[#20273D] text-[#E5C158] font-semibold border border-[#D4AF37]/40 flex items-center gap-1.5 transition shadow-sm"
                                            >
                                                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                                                <span>Tax Invoice</span>
                                            </button>

                                            {/* Reorder Button */}
                                            <button
                                                onClick={() => handleReorder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5 text-black" />
                                                <span>Acquire Again</span>
                                            </button>

                                            {/* Cancel Button if eligible */}
                                            {(order.order_status === "Processing" || order.order_status === "Pending") && (
                                                <button
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="px-3 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 font-semibold transition"
                                                >
                                                    Cancel Acquisition
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Invoice Modal */}
            {selectedInvoiceOrder && (
                <InvoiceModal
                    order={selectedInvoiceOrder}
                    isOpen={!!selectedInvoiceOrder}
                    onClose={() => setSelectedInvoiceOrder(null)}
                />
            )}

            {/* Tracking Modal */}
            {trackingModalOrder && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-[#07080D] rounded-3xl max-w-md w-full p-6 border border-[#D4AF37]/40 space-y-5 shadow-2xl text-slate-200">
                        <div className="flex items-center justify-between pb-3 border-b border-[#151722]">
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-[#D4AF37]" />
                                <h3 className="font-bold text-white text-sm font-serif">Armored Courier Tracking</h3>
                            </div>
                            <button onClick={() => setTrackingModalOrder(null)} className="text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-3 bg-[#030406] rounded-2xl border border-[#151722] text-xs space-y-1">
                            <p className="text-slate-400">Vault Waybill: <strong className="text-white font-mono">{trackingModalOrder.tracking_number}</strong></p>
                            <p className="text-slate-400">Armored Logistics: <strong className="text-[#E5C158]">{trackingModalOrder.shipping_partner || "Chrononix Secured Transit"}</strong></p>
                            <p className="text-slate-400">Estimated Delivery: <strong className="text-emerald-400">{trackingModalOrder.estimated_delivery || "Within 48 Hours"}</strong></p>
                        </div>

                        {/* Tracking Milestones */}
                        <div className="space-y-3 text-xs pl-2 border-l-2 border-[#D4AF37] ml-2">
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-950"></div>
                                <p className="font-bold text-white">Armored Vehicle In-Transit</p>
                                <p className="text-[11px] text-slate-400">Package departed secured regional vault sorting station</p>
                            </div>
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                                <p className="font-bold text-slate-200">Quality Inspection &amp; Seal Affixed</p>
                                <p className="text-[11px] text-slate-400">Chrononix Central Ateliers &amp; Vaults</p>
                            </div>
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                                <p className="font-bold text-slate-200">COSC Paperwork &amp; Provenance Certificate Attached</p>
                                <p className="text-[11px] text-slate-400">Official authentication registry completed</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setTrackingModalOrder(null)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] transition"
                        >
                            Close Armored Tracker
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
