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
            {/* Admin Header / Sidebar */}
            <aside className="w-full md:w-64 bg-[#030406] text-slate-300 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-[#151722] shadow-[0_0_40px_rgba(0,0,0,0.8)] z-20">
                <div>
                    {/* Admin Header */}
                    <div className="p-4 sm:p-6 border-b border-[#151722] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] shrink-0">
                                <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-sm sm:text-base tracking-tight font-serif">
                                    CHRONO<span className="text-[#D4AF37]">NIX</span>
                                </h1>
                                <span className="text-[9px] sm:text-[10px] text-[#E5C158] font-bold uppercase tracking-wider block">
                                    Horology Command Center
                                </span>
                            </div>
                        </div>

                        {/* Mobile return link shortcut */}
                        <Link
                            to="/"
                            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080D] text-[11px] font-bold text-[#E5C158] border border-[#D4AF37]/40 shadow-xs"
                        >
                            <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Salon</span>
                        </Link>
                    </div>

                    {/* Nav Links - horizontal scrollable on mobile, vertical list on md+ */}
                    <nav className="p-2 sm:p-3 md:p-4 flex md:flex-col gap-1.5 text-xs font-semibold overflow-x-auto scrollbar-none touch-scroll">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 sm:gap-3 px-3.5 py-2 md:py-3 rounded-xl transition whitespace-nowrap shrink-0 md:shrink ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] text-black font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                                                : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                                        }`
                                    }
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span>{item.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom section: Store Link & Admin info (Desktop) */}
                <div className="hidden md:block p-4 border-t border-[#151722] space-y-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#07080D] hover:bg-[#0A0C13] text-xs font-bold text-[#E5C158] hover:text-white border border-[#D4AF37]/40 shadow-sm transition"
                    >
                        <Store className="w-4 h-4 text-[#D4AF37]" />
                        <span>Return to Front Salon</span>
                    </Link>

                    <div className="px-4 py-1 text-[11px] text-slate-400 truncate">
                        Horologist: <strong className="text-white block font-serif truncate">{user?.first_name} ({user?.email})</strong>
                    </div>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-3.5 sm:p-6 md:p-10 overflow-y-auto max-h-none md:max-h-screen bg-[#040406] touch-scroll">
                <Outlet />
            </main>
        </div>
    );
}
