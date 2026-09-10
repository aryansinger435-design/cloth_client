import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Mail, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function VerifyOTP() {
    const [searchParams] = useSearchParams();
    const { verifyOTP, resendOTP } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get("email") || "customer@shopnix.in");
    const [otp, setOtp] = useState("123456");
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
                setSuccessMsg("Account verified successfully! Redirecting to storefront...");
                showToast("Account verified successfully! Welcome to Shopnix.", "success");
                setTimeout(() => {
                    navigate(`/?verified=true`);
                }, 1200);
            } else {
                setError(res.message || "OTP verification failed");
            }
        } catch (err) {
            setError(err.message || "Invalid or expired OTP");
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
            setSuccessMsg("A new verification code (123456) has been generated!");
            showToast("New OTP generated: 123456", "info");
            setCooldown(45);
        } catch (err) {
            setError(err.message || "Failed to resend OTP");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-md w-full space-y-6 bg-[#131024] p-8 sm:p-10 rounded-2xl border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-4">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Verify Your Account
                    </h2>
                    <p className="mt-2 text-xs text-purple-300/70">
                        Enter the 6-digit one-time code sent to your registered email
                    </p>
                </div>

                {/* Instant Test OTP Hint Box */}
                <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-800/40 text-xs text-purple-300 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Demo Verification Code:</span>
                    </div>
                    <span className="font-mono font-black text-purple-200 bg-purple-900/60 px-2.5 py-0.5 rounded border border-purple-500/40 shadow-sm">
                        123456
                    </span>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-950/50 border border-rose-800/50 text-rose-300 text-xs rounded-xl flex items-start gap-2.5 animate-shake font-medium">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Banner */}
                {successMsg && (
                    <div className="p-3.5 bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{successMsg}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[11px] font-bold text-purple-300/80 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#0D0B18] text-white border border-[#2E2452] rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 outline-none transition"
                            />
                            <Mail className="w-4 h-4 text-purple-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-purple-300/80 uppercase tracking-wider mb-1.5">
                            6-Digit Verification Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            placeholder="1 2 3 4 5 6"
                            className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 bg-[#0D0B18] text-purple-300 border border-[#2E2452] rounded-xl focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.25)] outline-none transition"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition flex items-center justify-center gap-2 border border-purple-400/40"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Verify &amp; Activate Account</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-2 text-xs">
                    {cooldown > 0 ? (
                        <p className="text-slate-400">
                            Resend code in <span className="font-mono text-purple-400 font-bold">{cooldown}s</span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-purple-400 hover:text-purple-300 font-semibold underline"
                        >
                            {resending ? "Sending..." : "Resend Verification Code"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
