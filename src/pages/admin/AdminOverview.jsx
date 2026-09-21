import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    Package,
    ShoppingBag,
    IndianRupee,
    Plus,
    Clock,
    Crown,
    Watch,
    ShieldCheck
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
    const totalUsers = Object.keys(DEMO_USERS).length + 58;

    const cards = [
        {
            title: "Total Vault Revenue",
            value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            icon: IndianRupee,
            color: "from-[#C5A059] to-[#AA7C1E] text-black",
            sub: "Settled collector acquisitions"
        },
        {
            title: "Total Allocations",
            value: totalOrders,
            icon: ShoppingBag,
            color: "from-[#181D2E] to-[#121522] text-[#E5C158] border border-[#D4AF37]/40",
            sub: "Transactions recorded"
        },
        {
            title: "Vault Catalog Size",
            value: totalProducts,
            icon: Watch,
            color: "from-[#181D2E] to-[#121522] text-[#E5C158] border border-[#D4AF37]/40",
            sub: "Certified timepieces active"
        },
        {
            title: "Registered Connoisseurs",
            value: totalUsers,
            icon: Users,
            color: "from-[#181D2E] to-[#121522] text-[#E5C158] border border-[#D4AF37]/40",
            sub: "VIP Salon accounts"
        }
    ];

    return (
        <div className="space-y-8 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Chrononix Manufacture Hub &amp; Analytics
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Real-time timepiece allocations, revenue metrics, and horology vault health
                    </p>
                </div>

                <Link
                    to="/admin/products"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Manage Timepieces (100)</span>
                </Link>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={idx}
                            className="bg-[#07080D] p-6 rounded-2xl border border-[#151722] hover:border-[#D4AF37]/50 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition duration-300 space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-[#E5C158] uppercase tracking-wider">
                                    {card.title}
                                </span>
                                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-black shadow-[0_0_15px_rgba(212,175,55,0.2)]`}>
                                    <Icon className="w-5 h-5 text-current" />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl sm:text-3xl font-bold text-white font-serif">{card.value}</p>
                                <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
