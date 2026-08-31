import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get("/orders/my-orders");
            if (res.data?.success && res.data?.data) {
                setOrders(res.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
            case "Shipped":
                return "bg-purple-950/80 text-purple-300 border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]";
            case "Processing":
                return "bg-indigo-950/80 text-indigo-300 border-indigo-800/60";
            case "Cancelled":
                return "bg-rose-950/80 text-rose-300 border-rose-800/60";
            default:
                return "bg-amber-950/80 text-amber-300 border-amber-800/60";
        }
    };

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        My Orders ({orders.length})
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Track your past purchases, shipment statuses, and delivery updates in ₹ INR
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-950/60 border border-red-800/50 text-red-300 text-sm rounded-2xl flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, idx) => (
                            <div key={idx} className="bg-[#120F24] p-6 rounded-3xl border border-[#241D3F] animate-pulse space-y-4">
                                <div className="h-4 bg-purple-950/50 rounded w-1/4"></div>
                                <div className="h-16 bg-[#1A162F] rounded-xl"></div>
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-[#120F24] p-12 rounded-3xl border border-[#241D3F] text-center max-w-md mx-auto space-y-5">
                        <div className="w-16 h-16 bg-purple-950/70 border border-purple-500/40 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            <Package className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">No orders placed yet</h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Discover next-gen tech devices and place your very first order today.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        >
                            <span>Start Shopping</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-[#120F24] rounded-3xl border border-[#241D3F] shadow-sm overflow-hidden"
                            >
                                {/* Header */}
                                <div className="p-5 sm:px-6 bg-[#0E0C1C] border-b border-purple-950/40 flex flex-wrap items-center justify-between gap-4 text-xs">
                                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                        <div>
                                            <span className="text-slate-500 block font-medium">Order ID</span>
                                            <span className="font-bold text-slate-200">#{order._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Placed On</span>
                                            <span className="font-semibold text-slate-300">
                                                {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Total Amount</span>
                                            <span className="font-black text-purple-400">₹{order.total_amount?.toLocaleString("en-IN")}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(order.order_status)}`}>
                                            {order.order_status}
                                        </span>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="p-5 sm:p-6 divide-y divide-purple-950/30">
                                    {order.items?.map((item, idx) => (
                                        <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-4">
                                            <div className="w-16 h-20 bg-[#0A0815] rounded-xl overflow-hidden shrink-0 border border-purple-900/40 flex items-center justify-center p-1">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-purple-400">
                                                        <ShoppingBag className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                                    <span>Spec: <strong className="text-purple-300">{item.size || "Standard"}</strong></span>
                                                    <span>Qty: <strong className="text-slate-200">{item.quantity}</strong></span>
                                                </div>
                                            </div>
                                            <div className="text-right font-black text-white text-sm">
                                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

