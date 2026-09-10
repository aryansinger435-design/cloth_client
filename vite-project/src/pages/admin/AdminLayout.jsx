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
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-[#090D1A] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 shadow-xl">
                <div>
                    {/* Admin Header */}
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="font-black text-white text-base tracking-tight">
                                    SHOP<span className="text-amber-400">NIX</span>
                                </h1>
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
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
                                                ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800/70"
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
                <div className="p-4 border-t border-slate-800 space-y-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white border border-slate-700 hover:border-amber-500/40 transition"
                    >
                        <Store className="w-4 h-4 text-amber-400" />
                        <span>Return to Storefront</span>
                    </Link>

                    <div className="px-4 py-1 text-[11px] text-slate-400">
                        Admin User: <strong className="text-white block">{user?.first_name} ({user?.email})</strong>
                    </div>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen bg-[#F8FAFC]">
                <Outlet />
            </main>
        </div>
    );
}
