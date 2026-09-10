import React, { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail, Lock, AlertCircle, CheckCircle2, Crown, Shield, User, Watch } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, loginAsDemo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState(searchParams.get("email") || "customer@chrononix.in");
    const [password, setPassword] = useState("Customer@123");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isVerifiedMessage = searchParams.get("verified") === "true";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            const user = await login(email.trim(), password);
            const origin = location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/");
            navigate(origin, { replace: true });
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    const handleQuickDemo = (role) => {
        const user = loginAsDemo(role);
        const origin = role === "admin" ? "/admin" : "/";
        navigate(origin, { replace: true });
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#040406] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-md w-full space-y-6 bg-[#07080D] p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl shadow-black">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] mb-4">
                        <Crown className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Collector's Salon
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        Sign in to your <span className="text-[#E5C158] font-bold">Chrononix</span> vault account
                    </p>
                </div>

                {/* 1-Click Demo Accounts Selector */}
                <div className="p-3.5 bg-[#030406] rounded-2xl border border-[#151722] space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158] text-center flex items-center justify-center gap-1">
                        <Crown className="w-3 h-3 text-[#D4AF37]" />
                        <span>Instant 1-Click Access</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickDemo("customer")}
                            className="p-2.5 rounded-xl bg-[#07080D] hover:bg-[#0A0C13] border border-[#151722] hover:border-[#D4AF37]/50 text-left transition group shadow-sm"
                        >
                            <div className="flex items-center gap-1.5 text-white font-bold text-xs group-hover:text-[#E5C158]">
                                <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>VIP Collector</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">customer@chrononix.in</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleQuickDemo("admin")}
                            className="p-2.5 rounded-xl bg-[#07080D] hover:bg-[#0A0C13] border border-[#151722] hover:border-[#D4AF37]/50 text-left transition group shadow-sm"
                        >
                            <div className="flex items-center gap-1.5 text-white font-bold text-xs group-hover:text-[#E5C158]">
                                <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>Horology Admin</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">admin@chrononix.in</span>
                        </button>
                    </div>
                </div>

                {/* Verification success banner */}
                {isVerifiedMessage && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Your collector provenance has been verified! Welcome.</span>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Collector Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black text-xs font-extrabold uppercase tracking-wider rounded-xl transition shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Enter Chrononix Vault</span>
                                <ArrowRight className="w-4 h-4 text-black" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                    New connoisseur?{" "}
                    <Link to="/register" className="text-[#D4AF37] hover:text-[#F9E7B9] font-bold underline">
                        Register for Vault Access
                    </Link>
                </p>
            </div>
        </div>
    );
}
