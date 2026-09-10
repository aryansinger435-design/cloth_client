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
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] text-slate-900">
            <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-md">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md mb-4">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Verify Your Account
                    </h2>
                    <p className="mt-2 text-xs text-slate-500">
                        Enter the 6-digit one-time code sent to your registered email
                    </p>
                </div>

                {/* Instant Test OTP Hint Box */}
                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 text-xs text-amber-950 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Demo Verification Code:</span>
                    </div>
                    <span className="font-mono font-black text-amber-900 bg-white px-2.5 py-0.5 rounded border border-amber-200 shadow-2xs">
                        123456
                    </span>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2.5 animate-shake font-medium">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Banner */}
                {successMsg && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{successMsg}</span>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none transition"
                            />
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            6-Digit Verification Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                            placeholder="1 2 3 4 5 6"
                            className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl focus:bg-white focus:border-amber-500 outline-none transition"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center justify-center gap-2 border border-slate-900"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
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
                        <p className="text-slate-500">
                            Resend code in <span className="font-mono text-amber-600 font-bold">{cooldown}s</span>
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="text-amber-600 hover:text-amber-700 font-semibold underline"
                        >
                            {resending ? "Sending..." : "Resend Verification Code"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
