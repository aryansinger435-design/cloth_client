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
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div
                className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-8 text-center text-slate-800 animate-in zoom-in-95 duration-200 space-y-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                        <QrCode className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">Scan & Pay with Any UPI App</h3>
                    <p className="text-xs text-slate-500 mt-1">Google Pay, PhonePe, Paytm, BHIM, Cred</p>
                </div>

                {/* Amount to Pay */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between px-5">
                    <span className="text-xs text-slate-600 font-medium">Total Amount Payable:</span>
                    <span className="text-xl font-black text-slate-950">₹{amount?.toLocaleString("en-IN")}</span>
                </div>

                {/* QR Code Container */}
                <div className="relative mx-auto w-56 h-56 bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center border-2 border-slate-200">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=shopnix.pay@hdfcbank%26pn=Shopnix%26am=999%26cu=INR"
                        alt="Shopnix UPI QR Code"
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-x-0 bottom-1 flex items-center justify-center gap-1.5 text-[9px] text-slate-700 font-bold uppercase tracking-wider bg-white/95 py-0.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Verified Merchant Account</span>
                    </div>
                </div>

                {/* UPI ID Copy & Countdown */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="text-slate-600">UPI ID: <strong className="text-slate-900">{upiId}</strong></span>
                        <button
                            onClick={handleCopyUPI}
                            className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition flex items-center gap-1 text-[11px] font-bold"
                        >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-amber-700 font-medium bg-amber-50 py-1 rounded-lg border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        <span>QR Code active for: <strong className="font-mono font-bold">{formattedTime}</strong></span>
                    </div>
                </div>

                {/* Confirm Action Button */}
                <button
                    onClick={handleConfirmPayment}
                    disabled={verifying}
                    className="w-full py-3.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
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
