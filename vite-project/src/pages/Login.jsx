import React, { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ShoppingBag, ArrowRight, Mail, Lock, AlertCircle, CheckCircle2, Sparkles, Shield, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login, loginAsDemo } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState(searchParams.get("email") || "customer@shopnix.in");
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
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-slate-900">
            <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-md">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md mb-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                        Sign in to your <span className="text-amber-600 font-bold">Shopnix</span> account
                    </p>
                </div>

                {/* 1-Click Demo Accounts Selector */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 text-center flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Instant 1-Click Demo Access</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickDemo("customer")}
                            className="p-2.5 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 text-left transition group shadow-xs"
                        >
                            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs group-hover:text-amber-700">
                                <User className="w-3.5 h-3.5 text-amber-600" />
                                <span>Demo Customer</span>
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5 truncate">customer@shopnix.in</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleQuickDemo("admin")}
                            className="p-2.5 rounded-xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 text-left transition group shadow-xs"
                        >
                            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs group-hover:text-amber-700">
                                <Shield className="w-3.5 h-3.5 text-amber-600" />
                                <span>Demo Admin</span>
                            </div>
                            <span className="text-[10px] text-slate-500 block mt-0.5 truncate">admin@shopnix.in</span>
                        </button>
                    </div>
                </div>

                {/* Verification success banner */}
                {isVerifiedMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Your account has been verified! You are logged in.</span>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5 font-medium animate-shake">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-400 outline-none transition"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-400 outline-none transition"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-black rounded-xl transition shadow-sm flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Sign In to Shopnix</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-2 text-xs text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-amber-700 font-bold hover:underline">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
