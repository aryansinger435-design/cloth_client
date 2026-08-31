import React, { useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ShoppingBag, ArrowRight, Mail, Lock, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [password, setPassword] = useState("");
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

            // Redirect to target or admin/home
            const origin = location.state?.from?.pathname || (user.role === "admin" ? "/admin" : "/");
            navigate(origin, { replace: true });
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Invalid email or password";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#08070E] text-slate-100">
            <div className="max-w-md w-full space-y-8 bg-[#120F24] p-8 sm:p-10 rounded-3xl border border-[#241D3F] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Sign in to your <span className="text-purple-400 font-semibold">Shopnix</span> account
                    </p>
                </div>

                {/* Account verified banner */}
                {isVerifiedMessage && (
                    <div className="p-4 bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 text-sm rounded-2xl flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Your account has been verified successfully! Please log in below.</span>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="p-4 bg-red-950/70 border border-red-800/60 text-red-300 text-sm rounded-2xl flex items-start gap-2.5 animate-shake">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <span>{error}</span>
                            {error.toLowerCase().includes("not active") && (
                                <div className="mt-2">
                                    <Link
                                        to={`/verify-otp?email=${encodeURIComponent(email)}`}
                                        className="text-xs font-bold text-purple-400 underline hover:text-purple-300"
                                    >
                                        Click here to enter OTP and activate account →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none transition"
                            />
                            <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Password
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#1A162F] text-white border border-purple-900/40 rounded-xl focus:border-purple-500 outline-none transition"
                            />
                            <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </>
                        )}
                    </button>
                </form>

                {/* Admin credentials hint for testing */}
                <div className="p-3 bg-[#1A162F] border border-purple-900/40 rounded-2xl text-xs text-slate-400 space-y-1">
                    <p className="font-semibold flex items-center gap-1.5 text-purple-400">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Demo Admin Credentials:</span>
                    </p>
                    <p>
                        <strong>Admin:</strong> <code className="bg-[#0B0914] px-1.5 py-0.5 rounded text-purple-300">admin@clothstore.com</code> / <code className="bg-[#0B0914] px-1.5 py-0.5 rounded text-purple-300">Admin@123</code>
                    </p>
                </div>

                {/* Footer link */}
                <div className="text-center pt-2 text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300 underline">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}

