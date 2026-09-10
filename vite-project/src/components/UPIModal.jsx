import React, { useState, useEffect } from "react";
import { X, QrCode, CheckCircle2, Copy, Clock, ShieldCheck, ArrowRight } from "lucide-react";
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

    const upiId = "shopnix.pay@hdfcbank";

    const handleCopyUPI = () => {
        navigator.clipboard.writeText(upiId);
        showToast("UPI ID copied to clipboard!", "success");
    };

    const handleConfirmPayment = () => {
        setVerifying(true);
        setTimeout(() => {
            setVerifying(false);
            showToast("UPI Payment verified successfully!", "success");
            onPaymentSuccess();
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className="relative bg-[#120F24] rounded-2xl max-w-md w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-purple-500/40 p-6 sm:p-8 text-center text-slate-200 animate-in zoom-in-95 duration-200 space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-purple-950/60 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        <QrCode className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">Scan & Pay with Any UPI App</h3>
                    <p className="text-xs text-slate-400 mt-1">Google Pay, PhonePe, Paytm, BHIM, Cred</p>
                </div>

                {/* Amount to Pay */}
                <div className="p-3.5 bg-[#131024] rounded-xl border border-purple-950/80 flex items-center justify-between px-5">
                    <span className="text-xs text-slate-400 font-medium">Total Amount Payable:</span>
                    <span className="text-xl font-black text-white">₹{amount?.toLocaleString("en-IN")}</span>
                </div>

                {/* QR Code Container */}
                <div className="relative mx-auto w-56 h-56 bg-white p-4 rounded-xl shadow-lg flex flex-col items-center justify-center border-2 border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=shopnix.pay@hdfcbank%26pn=Shopnix%26am=999%26cu=INR"
                        alt="Shopnix UPI QR Code"
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1.5 text-[9px] text-slate-800 font-bold uppercase tracking-wider bg-white/95 py-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Merchant Account</span>
                    </div>
                </div>

                {/* UPI ID Copy & Countdown */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-[#131024] rounded-xl border border-purple-950/80 text-xs">
                        <span className="text-slate-400">UPI ID: <strong className="text-white">{upiId}</strong></span>
                        <button
                            onClick={handleCopyUPI}
                            className="p-1.5 text-purple-400 hover:text-purple-300 hover:bg-purple-950/60 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
                        >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-purple-300 font-medium bg-purple-950/50 py-1 rounded-lg border border-purple-800/40">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>QR Code active for: <strong className="font-mono font-bold text-white">{formattedTime}</strong></span>
                    </div>
                </div>

                {/* Confirm Action Button */}
                <button
                    onClick={handleConfirmPayment}
                    disabled={verifying}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black text-sm rounded-xl transition shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
                >
                    {verifying ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Verifying Transaction...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>I Have Completed Payment</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
