import React, { useState } from "react";
import { Users, Search, Shield, User, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { DEMO_USERS } from "../../api/shopnixStore";
import { useToast } from "../../context/ToastContext";

export default function AdminUsers() {
    const { showToast } = useToast();

    const [users, setUsers] = useState([
        {
            _id: "u-1",
            first_name: "Aman",
            last_name: "Verma",
            email: "customer@shopnix.in",
            role: "customer",
            is_active: true,
            created_at: "2026-03-01",
            phone: "+91 8607603050"
        },
        {
            _id: "u-2",
            first_name: "Shopnix",
            last_name: "Administrator",
            email: "admin@shopnix.in",
            role: "admin",
            is_active: true,
            created_at: "2026-01-15",
            phone: "+91 8607603050"
        },
        {
            _id: "u-3",
            first_name: "Sneha",
            last_name: "Mukherjee",
            email: "sneha.m@gmail.com",
            role: "customer",
            is_active: true,
            created_at: "2026-04-10",
            phone: "+91 9876543210"
        },
        {
            _id: "u-4",
            first_name: "Rohit",
            last_name: "Kumar",
            email: "rohit.k@yahoo.com",
            role: "customer",
            is_active: true,
            created_at: "2026-05-22",
            phone: "+91 9123456789"
        }
    ]);

    const [search, setSearch] = useState("");

    const handleToggleRole = (id) => {
        setUsers((prev) =>
            prev.map((u) => {
                if (u._id === id) {
                    const newRole = u.role === "admin" ? "customer" : "admin";
                    showToast(`Updated role for ${u.first_name} to ${newRole}`, "success");
                    return { ...u, role: newRole };
                }
                return u;
            })
        );
    };

    const handleToggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((u) => {
                if (u._id === id) {
                    const newStatus = !u.is_active;
                    showToast(`Account ${u.first_name} is now ${newStatus ? "Active" : "Disabled"}`, "info");
                    return { ...u, is_active: newStatus };
                }
                return u;
            })
        );
    };

    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        showToast("User removed from records", "info");
    };

    const filtered = users.filter(
        (u) =>
            u.first_name.toLowerCase().includes(search.toLowerCase()) ||
            u.last_name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 text-slate-900">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        User Accounts &amp; Permissions
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Control customer access, assign administrative roles, and manage credentials
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl border border-slate-200 text-xs outline-none focus:border-amber-500 shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                                <th className="py-3.5 px-4">User Details</th>
                                <th className="py-3.5 px-3">Role</th>
                                <th className="py-3.5 px-3">Account Status</th>
                                <th className="py-3.5 px-3">Contact</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {filtered.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/80 transition">
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs shadow-xs">
                                                {u.first_name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{u.first_name} {u.last_name}</p>
                                                <p className="text-[10px] text-slate-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <button
                                            onClick={() => handleToggleRole(u._id)}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                                                u.role === "admin"
                                                    ? "bg-amber-50 text-amber-800 border-amber-200/80 shadow-xs"
                                                    : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                                            }`}
                                            title="Click to toggle between Admin and Customer"
                                        >
                                            {u.role === "admin" ? "ADMIN" : "CUSTOMER"}
                                        </button>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <button
                                            onClick={() => handleToggleStatus(u._id)}
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
                                                u.is_active
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                    : "bg-rose-50 text-rose-700 border-rose-200"
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                                            <span>{u.is_active ? "Active" : "Disabled"}</span>
                                        </button>
                                    </td>
                                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                                        {u.phone || "—"}
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
