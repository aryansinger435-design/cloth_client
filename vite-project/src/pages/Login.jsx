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
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white">
            <div className="max-w-md w-full space-y-6 bg-[#131024] p-8 sm:p-10 rounded-3xl border border-purple-500/40 shadow-2xl shadow-purple-950/60">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-1 text-xs text-slate-400">
                        Sign in to your <span className="text-purple-400 font-bold">Shopnix</span> account
                    </p>
                </div>

                {/* 1-Click Demo Accounts Selector */}
                <div className="p-3.5 bg-[#0D0B18] rounded-2xl border border-[#241D3F] space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400 text-center flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>Instant 1-Click Demo Access</span>
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleQuickDemo("customer")}
                            className="p-2.5 rounded-xl bg-[#131024] hover:bg-[#1A162F] border border-[#241D3F] hover:border-purple-500/50 text-left transition group shadow-sm"
                        >
                            <div className="flex items-center gap-1.5 text-white font-bold text-xs group-hover:text-purple-300">
                                <User className="w-3.5 h-3.5 text-purple-400" />
                                <span>Demo Customer</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">customer@shopnix.in</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleQuickDemo("admin")}
                            className="p-2.5 rounded-xl bg-[#131024] hover:bg-[#1A162F] border border-[#241D3F] hover:border-purple-500/50 text-left transition group shadow-sm"
                        >
                            <div className="flex items-center gap-1.5 text-white font-bold text-xs group-hover:text-purple-300">
                                <Shield className="w-3.5 h-3.5 text-purple-400" />
                                <span>Demo Admin</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5 truncate">admin@shopnix.in</span>
                        </button>
                    </div>
                </div>

                {/* Verification success banner */}
                {isVerifiedMessage && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Your account has been verified! You are logged in.</span>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs rounded-xl flex items-start gap-2.5 font-medium animate-shake">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
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
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 outline-none transition placeholder-slate-500"
                            />
                            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl transition shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
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

                <div className="text-center pt-2 text-xs text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 hover:underline">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
