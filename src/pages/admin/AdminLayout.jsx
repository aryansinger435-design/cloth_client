import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,
    Crown,
    Watch,
    Store
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
    const { user } = useAuth();

    const navItems = [
        { path: "/admin", name: "Overview & Metrics", icon: LayoutDashboard, end: true },
        { path: "/admin/products", name: "Timepiece Catalog (100)", icon: Watch },
        { path: "/admin/orders", name: "Collector Orders", icon: ShoppingBag },
        { path: "/admin/users", name: "Connoisseurs & Roles", icon: Users }
    ];

    return (
        <div className="min-h-screen bg-[#040406] text-slate-100 flex flex-col md:flex-row selection:bg-[#D4AF37] selection:text-black">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-[#030406] text-slate-300 flex flex-col justify-between shrink-0 border-r border-[#151722] shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <div>
                    {/* Admin Header */}
                    <div className="p-6 border-b border-[#151722] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                                <Crown className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-base tracking-tight font-serif">
                                    CHRONO<span className="text-[#D4AF37]">NIX</span>
                                </h1>
                                <span className="text-[10px] text-[#E5C158] font-bold uppercase tracking-wider block">
                                    Horology Command Center
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="p-4 space-y-1.5 text-xs font-semibold">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                                                : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                                        }`
                                    }
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom section: Store Link & Admin info */}
                <div className="p-4 border-t border-[#151722] space-y-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#07080D] hover:bg-[#0A0C13] text-xs font-bold text-[#E5C158] hover:text-white border border-[#D4AF37]/40 shadow-sm transition"
                    >
                        <Store className="w-4 h-4 text-[#D4AF37]" />
                        <span>Return to Front Salon</span>
                    </Link>

                    <div className="px-4 py-1 text-[11px] text-slate-400">
                        Horologist: <strong className="text-white block font-serif">{user?.first_name} ({user?.email})</strong>
                    </div>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen bg-[#040406]">
                <Outlet />
            </main>
        </div>
    );
}
