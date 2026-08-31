import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Package,
    ShoppingBag,
    IndianRupee,
    ArrowUpRight,
    Plus,
    Clock,
    CheckCircle2
} from "lucide-react";
import api from "../../api/axios";

export default function AdminOverview() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchStats = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/stats");
            if (res.data?.success && res.data?.data) {
                setStats(res.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load admin statistics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-slate-200 rounded-3xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    const cards = [
        {
            title: "Total Revenue",
            value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
            icon: IndianRupee,
            color: "from-emerald-500 to-teal-600",
            sub: "Total completed sales"
        },
        {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            icon: ShoppingBag,
            color: "from-indigo-500 to-blue-600",
            sub: "Customer transactions"
        },
        {
            title: "Total Products",
            value: stats?.totalProducts || 0,
            icon: Package,
            color: "from-purple-500 to-indigo-600",
            sub: "Active catalog items"
        },
        {
            title: "Total Users",
            value: stats?.totalUsers || 0,
            icon: Users,
            color: "from-amber-500 to-orange-600",
            sub: "Registered customers"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Admin Dashboard Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Live metrics, store performance, and recent activity
                    </p>
                </div>
                <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </Link>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {card.title}
                                </span>
                                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {card.value}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Dual Grid: Recent Orders & Recent Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-indigo-600" />
                            Recent Orders
                        </h2>
                        <Link to="/admin/orders" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
                            View all <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {stats?.recentOrders?.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {stats.recentOrders.map((ord) => (
                                <div key={ord._id} className="py-3 flex items-center justify-between text-xs">
                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            #{ord._id.slice(-6).toUpperCase()} • {ord.user?.first_name || "Guest"}
                                        </p>
                                        <p className="text-slate-400 text-[11px]">
                                            {new Date(ord.created_at).toLocaleDateString()} • {ord.payment_method}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">₹{ord.total_amount?.toLocaleString()}</p>
                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-semibold rounded-md">
                                            {ord.order_status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-slate-400 py-4 text-center">No orders received yet.</p>
                    )}
                </div>

                {/* Recent Users */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                            <Users className="w-4 h-4 text-indigo-600" />
                            Recent Customers
                        </h2>
                        <Link to="/admin/users" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
                            Manage users <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {stats?.recentUsers?.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {stats.recentUsers.map((u) => (
                                <div key={u._id} className="py-3 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-indigo-600 font-bold flex items-center justify-center text-xs">
                                            {u.first_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {u.first_name} {u.last_name}
                                            </p>
                                            <p className="text-slate-400 text-[11px] truncate max-w-[150px]">{u.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase ${
                                        u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"
                                    }`}>
                                        {u.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-xs text-slate-400 py-4 text-center">No users registered yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
