import React, { useState, useEffect } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Save,
    Plus,
    Trash2,
    Crown,
    ShieldCheck,
    Watch,
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
        pincode: user?.pincode || "122002"
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
                pincode: user.pincode || "122002"
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
        showToast("Address removed from registry", "info");
    };

    return (
        <div className="min-h-screen bg-[#040406] text-slate-100 py-10 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Profile Banner */}
                <div className="bg-[#07080D] rounded-3xl border border-[#151722] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                        <div className="w-20 h-20 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] text-2xl font-black font-serif shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                            {user?.first_name?.[0]?.toUpperCase() || "C"}
                        </div>
                        <div>
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-2xl font-bold text-white font-serif">{user?.first_name} {user?.last_name}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A0C13] text-[#E5C158] border border-[#D4AF37]/40 uppercase tracking-wider">
                                    {user?.role === "admin" ? "Master Horologist" : "VIP Collector"}
                                </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                            <p className="text-[11px] text-[#D4AF37] mt-1 font-medium flex items-center justify-center sm:justify-start gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>Verified Provenance Tier • 5-Year Global Heritage Member</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => loginAsDemo(isAdmin ? "customer" : "admin")}
                            className="px-4 py-2 rounded-xl bg-[#0A0C13] hover:bg-[#20273D] text-xs font-bold text-[#E5C158] border border-[#D4AF37]/40 transition shadow-sm"
                        >
                            Switch to {isAdmin ? "Collector View" : "Admin Panel"}
                        </button>
                    </div>
                </div>

                {/* Overview Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        to="/orders"
                        className="p-5 rounded-2xl bg-[#07080D] border border-[#151722] hover:border-[#D4AF37]/50 transition flex items-center gap-4 group shadow-md"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white font-serif">{ordersCount}</p>
                            <p className="text-xs text-slate-400">Timepiece Acquisitions</p>
                        </div>
                    </Link>

                    <div className="p-5 rounded-2xl bg-[#07080D] border border-[#151722] flex items-center gap-4 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                            <Heart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white font-serif">{wishlistCount}</p>
                            <p className="text-xs text-slate-400">Vault Wishlist Timepieces</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#07080D] border border-[#151722] flex items-center gap-4 shadow-md">
                        <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                            <Crown className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-[#E5C158] font-serif">Salon VIP</p>
                            <p className="text-xs text-slate-400">Patron Membership</p>
                        </div>
                    </div>
                </div>

                {/* Personal Information & Edit Profile */}
                <div className="bg-[#07080D] rounded-3xl border border-[#151722] p-6 sm:p-8 space-y-6 shadow-xl">
                    <div className="border-b border-[#151722] pb-4">
                        <h3 className="text-lg font-bold text-white font-serif">Collector Provenance Details</h3>
                        <p className="text-xs text-slate-400">Update your name, contact phone, and regional postal code</p>
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 mb-1 font-bold">First Name</label>
                                <input
                                    type="text"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 mb-1 font-bold">Last Name</label>
                                <input
                                    type="text"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-slate-400 mb-1 font-bold">Contact Phone</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91 8607603050"
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-400 mb-1 font-bold">Postal Code</label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            >
                                <Save className="w-3.5 h-3.5 text-black" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
