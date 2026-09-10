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
    CheckCircle2,
    Shield,
    Truck
} from "lucide-react";
import { getStoredOrders, getStoredProducts, DEMO_USERS } from "../../api/shopnixStore";

export default function AdminOverview() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setOrders(getStoredOrders());
        setProducts(getStoredProducts());
    }, []);

    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.total_amount || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalUsers = Object.keys(DEMO_USERS).length + 42; // Simulated active user count

    const cards = [
        {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: IndianRupee,
            color: "from-purple-600 to-indigo-700 text-purple-200 border border-purple-500/40",
            sub: "Total customer sales"
        },
        {
            title: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
            color: "from-indigo-600 to-purple-800 text-indigo-200 border border-indigo-500/40",
            sub: "Transactions recorded"
        },
        {
            title: "Active Products",
            value: totalProducts,
            icon: Package,
            color: "from-purple-700 to-pink-600 text-purple-100 border border-pink-500/40",
            sub: "Items in live catalog"
        },
        {
            title: "Registered Users",
            value: totalUsers,
            icon: Users,
            color: "from-slate-800 to-purple-900 text-purple-300 border border-purple-700/40",
            sub: "Active accounts"
        }
    ];

    return (
        <div className="space-y-8 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#241D3F]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Store Analytics &amp; Control Hub
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-300/70 mt-1">
                        Real-time revenue metrics, order pipeline, and catalog health
                    </p>
                </div>

                <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Manage Catalog</span>
                </Link>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-[#131024] p-6 rounded-2xl border border-[#241D3F] hover:border-purple-500/50 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition duration-300 space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-purple-300/70 uppercase tracking-wider">
                                    {card.title}
                                </span>
                                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    {card.value}
                                </h3>
                                <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders & Quick Management */}
            <div className="bg-[#131024] p-6 sm:p-7 rounded-2xl border border-[#241D3F] shadow-[0_4px_25px_rgba(0,0,0,0.5)] space-y-4">
                <div className="flex items-center justify-between border-b border-[#241D3F] pb-4">
                    <h2 className="font-bold text-white text-base flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-purple-400" />
                        <span>Recent Customer Orders</span>
                    </h2>
                    <Link to="/admin/orders" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition">
                        View All Orders →
                    </Link>
                </div>

                <div className="divide-y divide-[#201838] text-xs">
                    {orders.slice(0, 5).map((ord) => (
                        <div key={ord._id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                            <div>
                                <p className="font-bold text-white font-mono">{ord._id}</p>
                                <p className="text-[11px] text-slate-400">
                                    {ord.items?.length || 1} items • {new Date(ord.created_at).toLocaleDateString("en-IN")}
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="font-black text-purple-300">
                                    ₹{ord.total_amount?.toLocaleString("en-IN")}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/70 text-purple-300 border border-purple-500/40">
                                    {ord.order_status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
