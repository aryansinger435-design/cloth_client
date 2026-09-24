import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Crown, ArrowRight, User, Mail, Lock, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        gender: "male",
        pincode: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
            setError("Please fill in all required fields");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const res = await register(formData);
            if (res.success) {
                navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.first_name)}`);
            } else {
                setError(res.message || "Registration failed");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Registration failed. Try another email.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8 bg-[#040406] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-md w-full space-y-6 bg-[#07080D] p-5 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl shadow-black">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] mb-4">
                        <Crown className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Register Provenance
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                        Join <span className="text-[#E5C158] font-bold">Chrononix Haute Horlogerie</span> for bespoke allocations &amp; VIP debuts
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs rounded-xl flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                First Name *
                            </label>
                            <div className="relative">
                                <input
                                    name="first_name"
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Vikram"
                                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                                />
                                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Last Name *
                            </label>
                            <input
                                name="last_name"
                                type="text"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Singhania"
                                className="w-full px-3 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Collector Email *
                        </label>
                        <div className="relative">
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="collector@domain.com"
                                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                            <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Vault Passphrase *
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Min. 6 characters"
                                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                            <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                Salutation
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition cursor-pointer"
                            >
                                <option value="male" className="bg-[#07080D]">Mr.</option>
                                <option value="female" className="bg-[#07080D]">Ms. / Mrs.</option>
                                <option value="other" className="bg-[#07080D]">Dr. / Royal</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                City Pincode
                            </label>
                            <input
                                name="pincode"
                                type="text"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="122002"
                                className="w-full px-3 py-2 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black text-xs font-extrabold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Create Collector Profile</span>
                                <ArrowRight className="w-4 h-4 text-black" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                    Already registered?{" "}
                    <Link to="/login" className="text-[#D4AF37] hover:text-[#F9E7B9] font-bold underline">
                        Sign In Here
                    </Link>
                </p>
            </div>
        </div>
    );
}
