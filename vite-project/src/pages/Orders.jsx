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
    X
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
        showToast(`Order #${orderId} has been cancelled`, "info");
    };

    const handleReorder = async (order) => {
        for (const item of order.items || []) {
            await addToCart(item.product, item.quantity, item.size, item.color);
        }
        showToast("Items added back to your cart!", "success");
        navigate("/cart");
    };

    const filteredOrders = orders.filter((ord) => {
        if (selectedFilter === "All") return true;
        return ord.order_status?.toLowerCase() === selectedFilter.toLowerCase();
    });

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold";
            case "shipped":
                return "bg-amber-500/10 text-amber-700 border-amber-400/30 font-bold";
            case "processing":
            case "pending":
                return "bg-amber-50 text-amber-700 border-amber-200 font-bold";
            case "cancelled":
                return "bg-rose-50 text-rose-700 border-rose-200 font-bold";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200 font-bold";
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
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            My Orders &amp; Shipments
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Live tracking, package routes, invoices, and past deliveries
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
                        {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setSelectedFilter(f)}
                                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                                    selectedFilter === f
                                        ? "bg-slate-950 text-amber-400 shadow-xs"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center max-w-md mx-auto space-y-5 shadow-sm">
                        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                            <Package className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">No {selectedFilter !== "All" ? selectedFilter : ""} orders found</h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Discover next-gen tech devices and place your order today with fast delivery.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-black transition shadow-sm"
                        >
                            <span>Start Shopping</span>
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
                                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                                >
                                    {/* Order Meta Header */}
                                    <div className="p-5 sm:px-6 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                                        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                                            <div>
                                                <span className="text-slate-500 block font-medium">Order Number</span>
                                                <span className="font-mono font-bold text-slate-900 text-sm">{order._id}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block font-medium">Placed On</span>
                                                <span className="font-semibold text-slate-800">
                                                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-slate-500 block font-medium">Grand Total</span>
                                                <span className="font-black text-slate-900 text-sm">
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
                                        <div className="p-5 sm:px-6 border-b border-slate-200 bg-slate-50/50">
                                            <div className="max-w-2xl mx-auto">
                                                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                                                    <span className={step >= 1 ? "text-amber-700" : ""}>Order Placed</span>
                                                    <span className={step >= 2 ? "text-amber-700" : ""}>Hub Processing</span>
                                                    <span className={step >= 3 ? "text-amber-700" : ""}>Air Express In-Transit</span>
                                                    <span className={step >= 4 ? "text-emerald-700" : ""}>Delivered</span>
                                                </div>

                                                {/* Stepper bar */}
                                                <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                                                        style={{ width: `${(step / 4) * 100}%` }}
                                                    ></div>
                                                </div>

                                                <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                                                    <span>Partner: <strong className="text-slate-700">{order.shipping_partner || "Delhivery FastTrack"}</strong></span>
                                                    <span>AWB: <strong className="text-slate-900 font-mono font-bold">{order.tracking_number}</strong></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div className="p-5 sm:p-6 divide-y divide-slate-100">
                                        {order.items?.map((item, idx) => (
                                            <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-200 flex items-center justify-center p-2">
                                                        <img
                                                            src={item.image || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200"}
                                                            alt={item.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                                                        <p className="text-xs text-slate-500 mt-0.5">
                                                            Edition: <span className="text-slate-800 font-semibold">{item.size}</span>
                                                            {item.color && item.color !== "Standard" && <span> • {item.color}</span>}
                                                            <span> • Qty: {item.quantity}</span>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <span className="font-extrabold text-slate-900 text-sm">
                                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons Bar */}
                                    <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                                        <div className="text-slate-600">
                                            Delivery to: <strong className="text-slate-900">{order.shipping_address?.city}, {order.shipping_address?.state}</strong>
                                        </div>

                                        <div className="flex items-center gap-2.5">
                                            {/* Track Package Modal */}
                                            <button
                                                onClick={() => setTrackingModalOrder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 hover:text-amber-700 font-bold border border-slate-300 flex items-center gap-1.5 transition shadow-xs"
                                            >
                                                <Truck className="w-3.5 h-3.5 text-amber-600" />
                                                <span>Track Package</span>
                                            </button>

                                            {/* Download / Print Invoice */}
                                            <button
                                                onClick={() => setSelectedInvoiceOrder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 flex items-center gap-1.5 transition shadow-xs"
                                            >
                                                <FileText className="w-3.5 h-3.5 text-slate-700" />
                                                <span>Invoice</span>
                                            </button>

                                            {/* Reorder Button */}
                                            <button
                                                onClick={() => handleReorder(order)}
                                                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold flex items-center gap-1.5 transition shadow-xs"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                                <span>Buy Again</span>
                                            </button>

                                            {/* Cancel Button if eligible */}
                                            {(order.order_status === "Processing" || order.order_status === "Pending") && (
                                                <button
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="px-3 py-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-semibold transition"
                                                >
                                                    Cancel Order
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
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 space-y-5 shadow-2xl text-slate-800">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-amber-600" />
                                <h3 className="font-bold text-slate-900 text-sm">Package Tracking Status</h3>
                            </div>
                            <button onClick={() => setTrackingModalOrder(null)} className="text-slate-400 hover:text-slate-700">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                            <p className="text-slate-600">Tracking AWB: <strong className="text-slate-900 font-mono">{trackingModalOrder.tracking_number}</strong></p>
                            <p className="text-slate-600">Carrier: <strong className="text-slate-900">{trackingModalOrder.shipping_partner || "Delhivery Air"}</strong></p>
                            <p className="text-slate-600">Estimated Delivery: <strong className="text-emerald-700">{trackingModalOrder.estimated_delivery || "In 2 Days"}</strong></p>
                        </div>

                        {/* Tracking Milestones */}
                        <div className="space-y-3 text-xs pl-2 border-l-2 border-amber-500 ml-2">
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>
                                <p className="font-bold text-slate-900">Out for Delivery / In-Transit</p>
                                <p className="text-[11px] text-slate-500">Package departed local logistics sorting center</p>
                            </div>
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-amber-500"></div>
                                <p className="font-bold text-slate-800">Hub Dispatch Completed</p>
                                <p className="text-[11px] text-slate-500">Haryana Fulfillment Facility</p>
                            </div>
                            <div className="relative pl-4">
                                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-amber-500"></div>
                                <p className="font-bold text-slate-800">Electronic Shipping Info Received</p>
                                <p className="text-[11px] text-slate-500">Order verification completed</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setTrackingModalOrder(null)}
                            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-xs shadow-sm transition"
                        >
                            Close Tracker
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
