import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,
    ArrowLeft,
    Shield,
    Store
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
    const { user } = useAuth();

    const navItems = [
        { path: "/admin", name: "Overview & Metrics", icon: LayoutDashboard, end: true },
        { path: "/admin/products", name: "Product Catalog", icon: Package },
        { path: "/admin/orders", name: "Customer Orders", icon: ShoppingBag },
        { path: "/admin/users", name: "Users & Roles", icon: Users }
    ];

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 flex flex-col md:flex-row selection:bg-purple-600 selection:text-white">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-[#0D0A1A] text-slate-300 flex flex-col justify-between shrink-0 border-r border-[#241D3F] shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                <div>
                    {/* Admin Header */}
                    <div className="p-6 border-b border-[#241D3F] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="font-black text-white text-base tracking-tight">
                                    SHOP<span className="text-purple-400">NIX</span>
                                </h1>
                                <span className="text-[10px] text-purple-400/90 font-bold uppercase tracking-wider block">
                                    Admin Control Hub
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
                                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.35)] border border-purple-400/40"
                                                : "text-slate-400 hover:text-white hover:bg-purple-950/30"
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
                <div className="p-4 border-t border-[#241D3F] space-y-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#131024] hover:bg-[#1C1733] text-xs font-bold text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 shadow-sm transition"
                    >
                        <Store className="w-4 h-4 text-purple-400" />
                        <span>Return to Storefront</span>
                    </Link>

                    <div className="px-4 py-1 text-[11px] text-slate-400">
                        Admin User: <strong className="text-purple-200 block">{user?.first_name} ({user?.email})</strong>
                    </div>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen bg-[#08070E]">
                <Outlet />
            </main>
        </div>
    );
}
