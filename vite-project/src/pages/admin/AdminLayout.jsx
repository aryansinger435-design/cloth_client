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
        { path: "/admin", name: "Overview", icon: LayoutDashboard, end: true },
        { path: "/admin/products", name: "Products", icon: Package },
        { path: "/admin/users", name: "Users", icon: Users },
        { path: "/admin/orders", name: "Orders", icon: ShoppingBag }
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 shadow-xl">
                <div>
                    {/* Admin Header */}
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="font-extrabold text-white text-base tracking-tight">
                                    ADMIN<span className="text-indigo-400">PANEL</span>
                                </h1>
                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                                    Cloth Store Hub
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="p-4 space-y-1.5 text-sm font-medium">
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
                                                ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-900/50"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800"
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
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                    >
                        <Store className="w-4 h-4 text-indigo-400" />
                        <span>Return to Store</span>
                    </Link>

                    <div className="px-4 py-2 text-xs text-slate-500">
                        Logged in as: <strong className="text-slate-300">{user?.first_name} {user?.last_name}</strong>
                    </div>
                </div>
            </aside>

            {/* Main Admin Content Canvas */}
            <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
                <Outlet />
            </main>
        </div>
    );
}
