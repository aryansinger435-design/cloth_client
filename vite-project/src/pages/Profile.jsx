import React, { useState, useEffect } from "react";
import {
    User,
    Camera,
    Mail,
    Phone,
    MapPin,
    Globe,
    FileText,
    CheckCircle2,
    AlertCircle,
    Shield,
    Plus,
    Save,
    Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { user, updateProfile, updateAddress, refreshProfile } = useAuth();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        gender: "male",
        bio: "",
        website: "",
        pincode: ""
    });

    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
        phone: "",
        address_type: "home"
    });

    const [showAddAddress, setShowAddAddress] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone: user.phone || "",
                gender: user.gender || "male",
                bio: user.bio || "",
                website: user.website || "",
                pincode: user.pincode || ""
            });
            setImagePreview(user.profile_img || null);
        }
    }, [user]);

    const handleTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
        if (successMsg) setSuccessMsg("");
    };

    const handleImageSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(file));

        // Directly upload image to backend
        try {
            setUploadingImg(true);
            setError("");
            const imgFormData = new FormData();
            imgFormData.append("profile_img", file);

            await updateProfile(imgFormData, true);
            setSuccessMsg("Profile picture updated successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to upload image");
        } finally {
            setUploadingImg(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        try {
            setSaving(true);
            await updateProfile(formData, false);
            setSuccessMsg("Profile details saved successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        if (!newAddress.street || !newAddress.city || !newAddress.pincode) {
            setError("Please fill required address fields");
            return;
        }

        try {
            setSaving(true);
            // Submit address list update
            const updatedAddresses = [...(user.address_list || []), newAddress];
            await updateProfile({ address_list: updatedAddresses }, false);
            await refreshProfile();
            setShowAddAddress(false);
            setNewAddress({
                street: "",
                city: "",
                state: "",
                country: "India",
                pincode: "",
                phone: "",
                address_type: "home"
            });
            setSuccessMsg("Address added successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.message || "Failed to add address");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                        My Profile & Account
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage your personal info, profile picture, and delivery addresses
                    </p>
                </div>

                {/* Notifications */}
                {error && (
                    <div className="mb-6 p-4 bg-red-950/60 border border-red-800/50 text-red-300 text-sm rounded-2xl flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {successMsg && (
                    <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-sm rounded-2xl flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{successMsg}</span>
                    </div>
                )}

                <div className="space-y-8">
                    {/* User Card with Avatar */}
                    <div className="bg-[#120F24] p-6 sm:p-8 rounded-3xl border border-[#241D3F] shadow-sm flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar & Upload Trigger */}
                        <div className="relative group">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.4)] bg-[#1A162F] flex items-center justify-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt={user?.first_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl font-black text-purple-400">
                                        {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                                    </span>
                                )}
                            </div>

                            <label
                                htmlFor="profile-img-input"
                                className="absolute bottom-0 right-0 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-lg cursor-pointer transition transform hover:scale-105"
                                title="Change Profile Picture"
                            >
                                <Camera className="w-4 h-4" />
                            </label>
                            <input
                                id="profile-img-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                        </div>

                        {/* Summary Info */}
                        <div className="text-center sm:text-left space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                                <h2 className="text-2xl font-bold text-white">
                                    {user?.first_name} {user?.last_name}
                                </h2>
                                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider ${
                                    user?.role === "admin"
                                        ? "bg-purple-950/80 text-purple-300 border border-purple-800/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                        : "bg-[#1A162F] text-slate-300 border border-purple-900/40"
                                }`}>
                                    {user?.role === "admin" ? "Admin" : "Verified Customer"}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                                <Mail className="w-4 h-4 text-purple-400" />
                                {user?.email}
                            </p>
                            {uploadingImg && (
                                <p className="text-xs text-purple-400 font-medium animate-pulse">
                                    Uploading and compressing image...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Edit Profile Form */}
                    <div className="bg-[#120F24] p-6 sm:p-8 rounded-3xl border border-[#241D3F] shadow-sm space-y-6">
                        <div className="border-b border-purple-950/40 pb-4">
                            <h3 className="text-lg font-bold text-white">Personal Information</h3>
                            <p className="text-xs text-slate-400">Update your account details and contact information</p>
                        </div>

                        <form onSubmit={handleProfileSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        First Name *
                                    </label>
                                    <input
                                        name="first_name"
                                        type="text"
                                        required
                                        value={formData.first_name}
                                        onChange={handleTextChange}
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Last Name *
                                    </label>
                                    <input
                                        name="last_name"
                                        type="text"
                                        required
                                        value={formData.last_name}
                                        onChange={handleTextChange}
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Phone Number
                                    </label>
                                    <input
                                        name="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleTextChange}
                                        placeholder="+91 8607603050"
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleTextChange}
                                        className="w-full px-3 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                    >
                                        <option value="male" className="bg-[#1A162F]">Male</option>
                                        <option value="female" className="bg-[#1A162F]">Female</option>
                                        <option value="other" className="bg-[#1A162F]">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Pincode / Postal Code
                                    </label>
                                    <input
                                        name="pincode"
                                        type="text"
                                        value={formData.pincode}
                                        onChange={handleTextChange}
                                        placeholder="136027"
                                        className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Bio / About Me
                                </label>
                                <textarea
                                    name="bio"
                                    rows={3}
                                    value={formData.bio}
                                    onChange={handleTextChange}
                                    placeholder="Tell us a little bit about yourself or your tech preferences..."
                                    className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Website / Portfolio
                                </label>
                                <input
                                    name="website"
                                    type="url"
                                    value={formData.website}
                                    onChange={handleTextChange}
                                    placeholder="https://yourwebsite.com"
                                    className="w-full px-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm transition shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
                            >
                                {saving ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Address Book */}
                    <div className="bg-[#120F24] p-6 sm:p-8 rounded-3xl border border-[#241D3F] shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-purple-950/40 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Saved Delivery Addresses</h3>
                                <p className="text-xs text-slate-400">Manage shipping addresses for faster checkout</p>
                            </div>
                            <button
                                onClick={() => setShowAddAddress(!showAddAddress)}
                                className="px-3.5 py-1.5 bg-purple-950/80 text-purple-300 hover:bg-purple-900 border border-purple-900/50 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                {showAddAddress ? "Cancel" : "Add Address"}
                            </button>
                        </div>

                        {/* Add Address Form */}
                        {showAddAddress && (
                            <form onSubmit={handleAddAddress} className="p-4 bg-[#1A162F] rounded-2xl border border-purple-900/50 space-y-4 animate-in fade-in">
                                <h4 className="text-xs font-bold uppercase text-slate-300 tracking-wider">New Address</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Street Address *"
                                        required
                                        value={newAddress.street}
                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                        className="px-3 py-2 text-xs bg-[#120F24] text-white border border-purple-900/40 rounded-xl outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="City *"
                                        required
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="px-3 py-2 text-xs bg-[#120F24] text-white border border-purple-900/40 rounded-xl outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        value={newAddress.state}
                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                        className="px-3 py-2 text-xs bg-[#120F24] text-white border border-purple-900/40 rounded-xl outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Pincode *"
                                        required
                                        value={newAddress.pincode}
                                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                        className="px-3 py-2 text-xs bg-[#120F24] text-white border border-purple-900/40 rounded-xl outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-500 transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                >
                                    Save Address
                                </button>
                            </form>
                        )}

                        {/* Address Cards */}
                        {user?.address_list && user.address_list.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {user.address_list.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-2xl border border-purple-900/40 bg-[#1A162F]/60 space-y-1.5 text-xs text-slate-300"
                                    >
                                        <div className="flex items-center justify-between font-bold text-white">
                                            <span className="capitalize">{addr.address_type || "Home"} Address</span>
                                            {addr.is_default && (
                                                <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800 text-[10px] rounded-full">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                        <p>{addr.street}</p>
                                        <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                                        <p>{addr.country}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-500 italic">No saved addresses yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

