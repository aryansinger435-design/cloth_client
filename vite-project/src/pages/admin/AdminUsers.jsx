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
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#241D3F]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        User Accounts &amp; Permissions
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-300/70 mt-1">
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
                    className="w-full pl-10 pr-4 py-2.5 bg-[#131024] text-white rounded-xl border border-[#241D3F] text-xs outline-none focus:border-purple-500 shadow-sm placeholder:text-slate-500"
                />
                <Search className="w-4 h-4 text-purple-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Users Table */}
            <div className="bg-[#131024] rounded-2xl border border-[#241D3F] shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D0A1C] text-purple-300 uppercase tracking-wider font-bold border-b border-[#241D3F]">
                            <tr>
                                <th className="py-3.5 px-4">User Details</th>
                                <th className="py-3.5 px-3">Role</th>
                                <th className="py-3.5 px-3">Account Status</th>
                                <th className="py-3.5 px-3">Contact</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#201838] text-slate-200">
                            {filtered.map((u) => (
                                <tr key={u._id} className="hover:bg-[#1C1733]/50 transition">
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-xs shadow-sm">
                                                {u.first_name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{u.first_name} {u.last_name}</p>
                                                <p className="text-[10px] text-purple-300/60">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <button
                                            onClick={() => handleToggleRole(u._id)}
                                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                                                u.role === "admin"
                                                    ? "bg-purple-900/60 text-purple-200 border-purple-500/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                    : "bg-[#1C1733] text-slate-400 border-[#2E2452] hover:text-white"
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
                                                    ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/60"
                                                    : "bg-rose-950/60 text-rose-300 border-rose-800/60"
                                            }`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? "bg-emerald-400" : "bg-rose-400"}`}></span>
                                            <span>{u.is_active ? "Active" : "Disabled"}</span>
                                        </button>
                                    </td>
                                    <td className="py-3.5 px-3 text-slate-400 font-medium">
                                        {u.phone || "—"}
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 transition"
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
