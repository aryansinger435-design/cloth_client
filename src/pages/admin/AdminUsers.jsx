import React, { useState } from "react";
import { Users, Search, Shield, User, Trash2, CheckCircle2, Crown } from "lucide-react";
import { DEMO_USERS } from "../../api/shopnixStore";
import { useToast } from "../../context/ToastContext";

export default function AdminUsers() {
    const { showToast } = useToast();

    const [users, setUsers] = useState([
        {
            _id: "u-1",
            first_name: "Aman",
            last_name: "Verma",
            email: "customer@chrononix.in",
            role: "customer",
            is_active: true,
            created_at: "2026-03-01",
            phone: "+91 8607603050"
        },
        {
            _id: "u-2",
            first_name: "Chrononix",
            last_name: "Master Horologist",
            email: "admin@chrononix.in",
            role: "admin",
            is_active: true,
            created_at: "2026-01-15",
            phone: "+91 8607603050"
        },
        {
            _id: "u-3",
            first_name: "Sneha",
            last_name: "Mukherjee",
            email: "sneha.m@collector.in",
            role: "customer",
            is_active: true,
            created_at: "2026-04-10",
            phone: "+91 9876543210"
        },
        {
            _id: "u-4",
            first_name: "Dr. Rohit",
            last_name: "Kumar",
            email: "rohit.k@collector.in",
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
                    showToast(`Updated role for ${u.first_name} to ${newRole === "admin" ? "Master Horologist" : "Collector"}`, "success");
                    return { ...u, role: newRole };
                }
                return u;
            })
        );
    };

    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        showToast("Collector credentials archived", "info");
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Collector Registry &amp; Privileges
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Manage registered horology connoisseurs, salon permissions, and role authorizations
                    </p>
                </div>
            </div>

            {/* Search filter */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#07080D] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37] text-xs transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Users Table */}
            <div className="bg-[#07080D] rounded-2xl border border-[#151722] overflow-hidden shadow-xl">
                <div className="overflow-x-auto touch-scroll">
                    <table className="w-full text-left text-xs min-w-[580px]">
                        <thead className="bg-[#030406] text-slate-400 font-bold uppercase tracking-wider border-b border-[#151722]">
                            <tr>
                                <th className="py-3.5 px-4">Connoisseur Name</th>
                                <th className="py-3.5 px-3">Email Address</th>
                                <th className="py-3.5 px-3">Privilege Tier</th>
                                <th className="py-3.5 px-3">Provenance Status</th>
                                <th className="py-3.5 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23293D] text-slate-300">
                            {filtered.map((u) => (
                                <tr key={u._id} className="hover:bg-[#0A0C13] transition">
                                    <td className="py-3.5 px-4 flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-[#0A0C13] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-serif font-bold">
                                            {u.first_name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white font-serif">{u.first_name} {u.last_name}</p>
                                            <p className="text-[10px] text-slate-500">{u.phone}</p>
                                        </div>
                                    </td>

                                    <td className="py-3.5 px-3 font-mono text-slate-300">
                                        {u.email}
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                                            u.role === "admin"
                                                ? "bg-[#0A0C13] text-[#E5C158] border-[#D4AF37]/50"
                                                : "bg-[#030406] text-slate-300 border-[#151722]"
                                        }`}>
                                            {u.role === "admin" ? <Crown className="w-3 h-3 text-[#D4AF37]" /> : <User className="w-3 h-3 text-slate-400" />}
                                            <span>{u.role === "admin" ? "Master Horologist" : "VIP Collector"}</span>
                                        </span>
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            <span>Active Provenance</span>
                                        </span>
                                    </td>

                                    <td className="py-3.5 px-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleRole(u._id)}
                                                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white bg-[#030406] hover:bg-[#0A0C13] border border-[#151722] transition text-[11px] font-semibold"
                                            >
                                                Toggle Role
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(u._id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition"
                                                title="Archive user"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
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
