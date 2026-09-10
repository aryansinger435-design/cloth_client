import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { KeyRound, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Crown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function VerifyOTP() {
    const [searchParams] = useSearchParams();
    const { verifyOTP, resendOTP } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get("email") || "customer@chrononix.in");
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
            setError("Email and authentication code are required");
            return;
        }

        try {
            setLoading(true);
            const res = await verifyOTP(email.trim(), otp.trim());
            if (res.success) {
                setSuccessMsg("Provenance credentials verified! Entering the salon...");
                showToast("Account authenticated! Welcome to Chrononix Haute Horlogerie.", "success");
                setTimeout(() => {
                    navigate(`/?verified=true`);
                }, 1200);
            } else {
                setError(res.message || "Code verification failed");
            }
        } catch (err) {
            setError(err.message || "Invalid or expired code");
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
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#040406] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-md w-full space-y-6 bg-[#07080D] p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/40 shadow-2xl shadow-black">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] mb-4">
                        <KeyRound className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Verify Provenance
                    </h2>
                    <p className="mt-2 text-xs text-slate-400">
                        Enter the 6-digit authentication key transmitted to your email
                    </p>
                </div>

                {/* Instant Test OTP Hint Box */}
                <div className="p-3 bg-[#030406] rounded-xl border border-[#151722] text-xs text-[#E5C158] flex items-center justify-between">
                    <div className="flex items-center gap-2 font-medium">
                        <Crown className="w-4 h-4 text-[#D4AF37]" />
                        <span>Demo Master Key:</span>
                    </div>
                    <span className="font-mono font-black text-white bg-[#0A0C13] px-2 py-0.5 rounded border border-[#D4AF37]/40 tracking-widest">
                        123456
                    </span>
                </div>

                {/* Status Messages */}
                {successMsg && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs rounded-xl flex items-start gap-2.5 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{successMsg}</span>
                    </div>
                )}

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
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition placeholder-slate-500"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                            6-Digit Authentication Code
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            className="w-full px-3.5 py-3 text-center text-lg font-mono font-bold tracking-[0.4em] bg-[#030406] text-white border border-[#151722] rounded-xl focus:border-[#D4AF37] outline-none transition"
                        />
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
                                <span>Verify Provenance Key</span>
                                <ArrowRight className="w-4 h-4 text-black" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <button
                        onClick={handleResend}
                        disabled={cooldown > 0 || resending}
                        className="text-xs text-[#D4AF37] hover:text-[#F9E7B9] font-bold underline disabled:opacity-50 inline-flex items-center gap-1.5"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                        <span>{cooldown > 0 ? `Resend Code in (${cooldown}s)` : "Resend Authentication Code"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
