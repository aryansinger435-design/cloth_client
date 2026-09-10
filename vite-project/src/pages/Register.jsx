import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, User, Mail, Lock, MapPin, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
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
                // Navigate to OTP page passing email
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
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white">
            <div className="max-w-md w-full space-y-8 bg-[#131024] p-8 sm:p-10 rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/60">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Join <span className="text-purple-400 font-bold">Shopnix</span> to explore authentic electronics &amp; offers
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 bg-rose-950/60 border border-rose-800/40 text-rose-300 text-sm rounded-xl flex items-start gap-2.5 animate-shake">
                        <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                First Name *
                            </label>
                            <div className="relative">
                                <input
                                    name="first_name"
                                    type="text"
                                    required
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Aman"
                                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                                />
                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Last Name *
                            </label>
                            <input
                                name="last_name"
                                type="text"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Verma"
                                className="w-full px-3.5 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Email address *
                        </label>
                        <div className="relative">
                            <input
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Minimum 6 characters"
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition cursor-pointer"
                            >
                                <option value="male" className="bg-[#131024]">Male</option>
                                <option value="female" className="bg-[#131024]">Female</option>
                                <option value="other" className="bg-[#131024]">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                                Pincode
                            </label>
                            <div className="relative">
                                <input
                                    name="pincode"
                                    type="text"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="136027"
                                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                                />
                                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-black rounded-xl transition shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Create Account &amp; Verify OTP</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer link */}
                <div className="text-center pt-2 text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300 underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}

