import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function VerifyOTP() {
    const [searchParams] = useSearchParams();
    const { verifyOTP, resendOTP } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get("email") || "");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [cooldown, setCooldown] = useState(30);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setInterval(() => setCooldown((c) => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!email.trim() || !otp.trim()) {
            setError("Email and OTP are required");
            return;
        }

        try {
            setLoading(true);
            const res = await verifyOTP(email.trim(), otp.trim());
            if (res.success) {
                setSuccessMsg("Account verified successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate(`/login?verified=true&email=${encodeURIComponent(email)}`);
                }, 1500);
            } else {
                setError(res.message || "OTP verification failed");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Invalid or expired OTP";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email.trim() || cooldown > 0 || resending) return;
        setError("");
        setSuccessMsg("");

        try {
            setResending(true);
            const res = await resendOTP(email.trim());
            if (res.success) {
                setSuccessMsg("A new verification OTP has been sent to your email!");
                setCooldown(60);
            } else {
                setError(res.message || "Failed to resend OTP");
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Failed to resend OTP";
            setError(msg);
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 mb-4">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Verify Your Account
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Enter the 6-digit verification code sent to your email
                    </p>
                </div>

                {/* Notifications */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-start gap-2.5 animate-shake">
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

                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                            6-Digit OTP Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            placeholder="• • • • • •"
                            className="w-full text-center text-2xl tracking-[0.6em] font-mono py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || otp.length < 4}
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-indigo-200 flex items-center justify-center gap-2 group disabled:opacity-60"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Verify & Activate Account</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </>
                        )}
                    </button>

                    {/* Resend OTP section */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                        <span>Didn't receive the code?</span>
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={cooldown > 0 || resending}
                            className="font-semibold text-indigo-600 hover:text-indigo-700 disabled:text-slate-400 flex items-center gap-1"
                        >
                            {resending ? (
                                <>
                                    <RefreshCw className="w-3 h-3 animate-spin" />
                                    Sending...
                                </>
                            ) : cooldown > 0 ? (
                                `Resend in ${cooldown}s`
                            ) : (
                                "Resend OTP"
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer link */}
                <div className="text-center pt-2 text-sm text-slate-600">
                    Already verified?{" "}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 underline">
                        Sign In here
                    </Link>
                </div>
            </div>
        </div>
    );
}
