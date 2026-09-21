import React, { useState, useEffect } from "react";
import { X, QrCode, CheckCircle2, Copy, Clock, ShieldCheck, Crown } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function UPIModal({ amount, isOpen, onClose, onPaymentSuccess }) {
    if (!isOpen) return null;

    const { showToast } = useToast();
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
    const [verifying, setVerifying] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const upiId = "chrononix.vault@hdfcbank";

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        showToast("Chrononix Vault UPI ID copied to clipboard!", "success");
    };

    const handleConfirmPayment = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            showToast("Vault settlement verified! Timepiece allocation confirmed.", "success");
            onPaymentSuccess();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className="relative bg-[#07080D] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#D4AF37]/50 p-6 sm:p-8 text-center text-slate-200 animate-in zoom-in-95 duration-200 space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0A0C13] transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-xl font-bold text-white font-serif">Instant Vault Settlement (UPI)</h3>
                    <p className="text-xs text-slate-400 mt-1">GPay, PhonePe, Paytm, BHIM, Cred, Banking Apps</p>
                </div>

                {/* Amount to Pay */}
                <div className="p-3.5 bg-[#030406] rounded-xl border border-[#151722] flex items-center justify-between px-5">
                    <span className="text-xs text-slate-400 font-medium">Allocation Payable:</span>
                    <span className="text-xl font-black text-[#E5C158] font-serif">₹{amount?.toLocaleString("en-IN")}</span>
                </div>

                {/* QR Code Container */}
                <div className="relative mx-auto w-56 h-56 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-[#D4AF37]/70 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=chrononix.vault@hdfcbank%26pn=Chrononix%20Horology%26cu=INR"
                        alt="Chrononix Vault UPI QR Code"
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1.5 text-[9px] text-slate-800 font-bold uppercase tracking-wider bg-white/95 py-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Chrononix Escrow Verified</span>
                    </div>
                </div>

                {/* UPI ID Copy & Countdown */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-[#030406] rounded-xl border border-[#151722] text-xs">
                        <span className="text-slate-400">Merchant VPA: <strong className="text-white">{upiId}</strong></span>
                        <button
                            onClick={handleCopyUPI}
                            className="p-1.5 text-[#D4AF37] hover:text-[#F9E7B9] hover:bg-[#0A0C13] rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
                        >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-[#E5C158] font-medium bg-[#0A0C13] py-1 rounded-lg border border-[#D4AF37]/30">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Vault Window Active: <strong className="font-mono font-bold text-white">{formattedTime}</strong></span>
                    </div>
                </div>

                {/* Confirm Action Button */}
                <button
                    onClick={handleConfirmPayment}
                    disabled={verifying}
                    className="w-full py-3.5 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                >
                    {verifying ? (
                        <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying Settlement with Escrow...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-4 h-4 text-black" />
                            <span>I Have Completed Settlement</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
