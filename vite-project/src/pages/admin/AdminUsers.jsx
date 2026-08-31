import React, { useState, useEffect } from "react";
import {
    Users,
    Search,
    Trash2,
    Shield,
    CheckCircle2,
    AlertCircle,
    UserCheck,
    UserX,
    Filter
} from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
    const { user: currentAdmin } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            if (roleFilter !== "All") params.append("role", roleFilter);
            params.append("limit", "100");

            const res = await api.get(`/admin/users?${params.toString()}`);
            if (res.data?.success && res.data?.data) {
                setUsers(res.data.data.users || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`Are you sure you want to remove user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await api.delete(`/admin/users/${userId}`);
            setSuccessMsg(`User "${userName}" removed successfully.`);
            fetchUsers();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to remove user");
        }
    };

    const handleRoleChange = async (userId, newRole, userName) => {
        if (!window.confirm(`Change role of "${userName}" to "${newRole}"?`)) return;

        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            setSuccessMsg(`User role updated to ${newRole}.`);
            fetchUsers();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update role");
        }
    };

    const handleToggleStatus = async (userId, currentStatus, userName) => {
        try {
            await api.put(`/admin/users/${userId}/status`);
            setSuccessMsg(`Status updated for "${userName}".`);
            fetchUsers();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to toggle status");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        User Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        View registered users, remove accounts, and control system access roles
                    </p>
                </div>
            </div>

            {/* Notifications */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                </div>
            )}

            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-4 justify-between">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchUsers();
                    }}
                    className="relative flex-1 max-w-md"
                >
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Filter Role:</span>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none"
                    >
                        <option value="All">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Phone / Pincode</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Joined</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        Loading registered users...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => {
                                    const isSelf = user._id === currentAdmin?.id || user.email === currentAdmin?.email;
                                    return (
                                        <tr key={user._id} className="hover:bg-slate-50/60 transition">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                {user.profile_img ? (
                                                    <img
                                                        src={user.profile_img}
                                                        alt={user.first_name}
                                                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                                                        {user.first_name?.charAt(0) || "U"}
                                                    </div>
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-xs">
                                                        {user.first_name} {user.last_name}
                                                        {isSelf && <span className="ml-1.5 text-[10px] text-indigo-600 font-semibold">(You)</span>}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400">{user.email}</p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-[11px]">
                                                <p className="font-medium text-slate-700">{user.phone || "—"}</p>
                                                <p className="text-slate-400">{user.pincode ? `Pincode: ${user.pincode}` : ""}</p>
                                            </td>

                                            <td className="px-6 py-4">
                                                <select
                                                    value={user.role}
                                                    disabled={isSelf}
                                                    onChange={(e) => handleRoleChange(user._id, e.target.value, `${user.first_name} ${user.last_name}`)}
                                                    className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase cursor-pointer border ${
                                                        user.role === "admin"
                                                            ? "bg-purple-50 text-purple-800 border-purple-200"
                                                            : "bg-slate-50 text-slate-700 border-slate-200"
                                                    }`}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleToggleStatus(user._id, user.is_active, user.first_name)}
                                                    disabled={isSelf}
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition ${
                                                        user.is_active
                                                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                            : "bg-red-50 text-red-700 hover:bg-red-100"
                                                    }`}
                                                >
                                                    {user.is_active ? (
                                                        <>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                                            Inactive
                                                        </>
                                                    )}
                                                </button>
                                            </td>

                                            <td className="px-6 py-4 text-[11px] text-slate-500">
                                                {new Date(user.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDeleteUser(user._id, `${user.first_name} ${user.last_name}`)}
                                                    disabled={isSelf}
                                                    className={`p-1.5 rounded-lg transition ${
                                                        isSelf
                                                            ? "text-slate-300 cursor-not-allowed"
                                                            : "text-slate-500 hover:text-red-600 hover:bg-red-50"
                                                    }`}
                                                    title={isSelf ? "Cannot remove yourself" : "Remove user from database"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
