import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Plus,
    Trash2,
    Shield,
    CheckCircle2,
    ShoppingBag,
    Heart,
    Package
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { getStoredOrders } from "../api/shopnixStore";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user, updateProfile, updateAddress, loginAsDemo, isAdmin } = useAuth();
    const { wishlistCount } = useWishlist();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        phone: user?.phone || "",
        gender: user?.gender || "male",
        pincode: user?.pincode || "136027"
    });

    const [ordersCount, setOrdersCount] = useState(0);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "Haryana",
        country: "India",
        pincode: "",
        phone: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone: user.phone || "",
                gender: user.gender || "male",
                pincode: user.pincode || "136027"
            });
        }
        const ords = getStoredOrders();
        setOrdersCount(ords.length);
    }, [user]);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(formData);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
            showToast("Please fill in required address fields", "warning");
            return;
        }

        await updateAddress(newAddress);
        setShowAddAddress(false);
        setNewAddress({ street: "", city: "", state: "Haryana", country: "India", pincode: "", phone: "" });
    };

    const handleDeleteAddress = async (addrId) => {
        const current = user?.address_list || [];
        const filtered = current.filter((a) => a._id !== addrId);
        await updateProfile({ address_list: filtered });
        showToast("Address removed", "info");
    };

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-10 selection:bg-purple-600 selection:text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Profile Banner */}
                <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="w-20 h-20 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300 text-2xl font-black shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            {user?.first_name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-2xl font-black text-white">{user?.first_name} {user?.last_name}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/60 text-purple-300 border border-purple-700/50 uppercase tracking-wide">
                                    {user?.role || "Customer"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                            <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 text-xs text-emerald-400 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Shopnix Verified Member</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 bg-[#0D0B18] p-3 rounded-2xl border border-[#241D3F] text-center">
                        <Link to="/orders" className="px-3 hover:opacity-80 transition">
                            <p className="text-lg font-black text-white">{ordersCount}</p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Orders</p>
                        </Link>
                        <div className="w-px h-8 bg-[#241D3F]"></div>
                        <div className="px-3">
                            <p className="text-lg font-black text-purple-400 glow-purple-text">{wishlistCount}</p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Wishlist</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Personal Info Form */}
                    <div className="lg:col-span-7 bg-[#131024] rounded-3xl border border-[#241D3F] p-6 sm:p-8 space-y-6 shadow-xl">
                        <h2 className="font-bold text-white text-base flex items-center gap-2">
                            <User className="w-4 h-4 text-purple-400" />
                            <span>Personal Information</span>
                        </h2>

                        <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Primary Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Gender</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition cursor-pointer"
                                    >
                                        <option value="male" className="bg-[#131024]">Male</option>
                                        <option value="female" className="bg-[#131024]">Female</option>
                                        <option value="other" className="bg-[#131024]">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Default Pincode</label>
                                    <input
                                        type="text"
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] transition flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </button>
                        </form>
                    </div>

                    {/* Right: Saved Addresses & Demo Switcher */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Saved Addresses */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-6 space-y-4 shadow-xl">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-white text-base flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-purple-400" />
                                    <span>Saved Addresses</span>
                                </h2>
                                <button
                                    onClick={() => setShowAddAddress(!showAddAddress)}
                                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                </button>
                            </div>

                            {/* Add Address Form Toggle */}
                            {showAddAddress && (
                                <form onSubmit={handleAddAddress} className="p-4 bg-[#0D0B18] rounded-2xl border border-[#241D3F] space-y-3 text-xs">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Street / Building Address"
                                        value={newAddress.street}
                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#131024] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            required
                                            placeholder="City"
                                            value={newAddress.city}
                                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                            className="px-3 py-2 bg-[#131024] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                        />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Pincode"
                                            value={newAddress.pincode}
                                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                            className="px-3 py-2 bg-[#131024] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl transition shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                                    >
                                        Save Address
                                    </button>
                                </form>
                            )}

                            {/* Address Cards */}
                            <div className="space-y-3">
                                {user?.address_list?.map((addr) => (
                                    <div
                                        key={addr._id || addr.street}
                                        className="p-4 rounded-2xl bg-[#0D0B18] border border-[#241D3F] text-xs space-y-1 relative group"
                                    >
                                        <p className="font-bold text-white">{addr.address_type?.toUpperCase() || "HOME"} ADDRESS</p>
                                        <p className="text-slate-300">{addr.street}</p>
                                        <p className="text-slate-300">{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p className="text-purple-300 font-semibold">Ph: {addr.phone || user?.phone || "+91 8607603050"}</p>

                                        <button
                                            onClick={() => handleDeleteAddress(addr._id)}
                                            className="absolute top-3 right-3 p-1 text-slate-500 hover:text-rose-400 transition"
                                            title="Delete address"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Demo Mode Switcher Card */}
                        <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-6 space-y-3 shadow-xl">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <Shield className="w-4 h-4 text-purple-400" />
                                <span>Switch Active User Mode</span>
                            </h3>
                            <p className="text-xs text-slate-400">
                                Switch instantly between the customer storefront and full administrator control panel.
                            </p>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                                <button
                                    onClick={() => loginAsDemo("customer")}
                                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                                        !isAdmin ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]" : "bg-[#0D0B18] text-slate-400 border-[#241D3F] hover:bg-[#1A162F] hover:text-white"
                                    }`}
                                >
                                    Customer
                                </button>
                                <button
                                    onClick={() => loginAsDemo("admin")}
                                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                                        isAdmin ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.3)]" : "bg-[#0D0B18] text-slate-400 border-[#241D3F] hover:bg-[#1A162F] hover:text-white"
                                    }`}
                                >
                                    Admin Panel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
