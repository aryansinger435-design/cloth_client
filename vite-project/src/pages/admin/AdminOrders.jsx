import React, { useState, useEffect } from "react";
import {
    ShoppingBag,
    Search,
    CheckCircle2,
    AlertCircle,
    Clock,
    Truck,
    PackageCheck,
    Filter
} from "lucide-react";
import api from "../../api/axios";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (statusFilter !== "All") params.append("status", statusFilter);
            params.append("limit", "100");

            const res = await api.get(`/admin/orders?${params.toString()}`);
            if (res.data?.success && res.data?.data) {
                setOrders(res.data.data.orders || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [statusFilter]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/admin/orders/${orderId}/status`, { order_status: newStatus });
            setSuccessMsg(`Order #${orderId.slice(-6).toUpperCase()} updated to ${newStatus}`);
            fetchOrders();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update order status");
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "Delivered":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "Shipped":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "Processing":
                return "bg-purple-50 text-purple-700 border-purple-200";
            case "Cancelled":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-amber-50 text-amber-700 border-amber-200";
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Customer Orders Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Track orders, update shipment statuses, and view delivery details
                    </p>
                </div>
            </div>

            {/* Notifications */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <button
                    onClick={() => setStatusFilter("All")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        statusFilter === "All"
                            ? "bg-slate-900 text-white shadow-xs"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                    }`}
                >
                    All Orders
                </button>
                {ORDER_STATUSES.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                            statusFilter === status
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Order ID & Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        Loading customer orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        No orders found for this status.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/60 transition">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-slate-900 block text-xs">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </span>
                                            <span className="text-[11px] text-slate-400">
                                                {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-800">
                                                {order.user?.first_name} {order.user?.last_name || "Guest Customer"}
                                            </p>
                                            <p className="text-[11px] text-slate-400">{order.user?.email || "—"}</p>
                                            <p className="text-[10px] text-slate-500 mt-0.5">
                                                {order.shipping_address?.city ? `${order.shipping_address.city}, ${order.shipping_address.pincode}` : "Standard Shipping"}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="space-y-1 max-w-xs">
                                                {order.items?.map((item, idx) => (
                                                    <p key={idx} className="text-[11px] text-slate-700 truncate">
                                                        • <strong>{item.quantity}x</strong> {item.name} ({item.size})
                                                    </p>
                                                ))}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-extrabold text-slate-900 text-sm">
                                                ₹{order.total_amount?.toLocaleString()}
                                            </span>
                                            <span className="block text-[10px] text-slate-400">
                                                {order.payment_method} ({order.payment_status})
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <select
                                                value={order.order_status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${getStatusStyle(order.order_status)}`}
                                            >
                                                {ORDER_STATUSES.map((st) => (
                                                    <option key={st} value={st}>{st}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
