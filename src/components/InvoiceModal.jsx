import React from "react";
import { X, Printer, Crown, ShieldCheck, Download } from "lucide-react";

export default function InvoiceModal({ order, isOpen, onClose }) {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || order.total_amount;
    const shipping = order.total_amount > subtotal ? order.total_amount - subtotal : 0;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-[#07080D] rounded-2xl max-w-2xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#D4AF37]/50 flex flex-col text-slate-200 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Action Bar */}
                <div className="p-3.5 sm:px-6 border-b border-[#151722] flex items-center justify-between bg-[#030406] gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-[#C5A059] to-[#D4AF37] flex items-center justify-center text-black shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                        </div>
                        <span className="font-bold text-white text-xs sm:text-base tracking-tight font-serif truncate">Chrononix Official Horological Invoice</span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-[#0A0C13] hover:bg-[#20273D] text-[#E5C158] rounded-lg text-[11px] sm:text-xs font-semibold border border-[#D4AF37]/40 transition shadow-xs"
                        >
                            <Printer className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#D4AF37]" />
                            <span className="hidden xs:inline sm:inline">Print / PDF</span>
                            <span className="xs:hidden sm:hidden">PDF</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0A0C13] transition"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* Printable Invoice Body */}
                <div id="printable-invoice" className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto max-h-[80vh] bg-[#FAF8F5] text-slate-900 touch-scroll">
                    {/* Invoice Meta */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pb-6 border-b border-[#D4AF37]/30">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-[#08090D] font-serif flex items-center gap-2">
                                <span>CHRONONIX</span>
                                <span className="text-xs font-sans font-bold px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#8E7127] border border-[#D4AF37]/40">HAUTE HORLOGERIE</span>
                            </h2>
                            <p className="text-xs text-slate-600 mt-1">Chrononix India Horology & Luxury Retail Pvt. Ltd.</p>
                            <p className="text-xs text-slate-500">GSTIN: 06AAACC9872D1ZX | CIN: U72200HR2026PTC099124</p>
                            <p className="text-xs text-slate-500">Manufacture Atelier: Golf Course Road, Gurugram, Haryana 122002, India</p>
                        </div>

                        <div className="text-left sm:text-right space-y-1">
                            <div className="inline-block px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#68531A] text-xs font-bold uppercase font-serif">
                                Tax Invoice &amp; Provenance Certificate
                            </div>
                            <p className="text-xs text-slate-600 mt-2">
                                Invoice No: <strong className="text-slate-900 font-mono">CHRONO-INV-{order._id?.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()}</strong>
                            </p>
                            <p className="text-xs text-slate-500">
                                Date: <span className="text-slate-800">{new Date(order.created_at || Date.now()).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
                            </p>
                            <p className="text-xs text-slate-500">
                                Settlement: <span className="text-[#8E7127] font-semibold">{order.payment_method || "UPI"} ({order.payment_status || "Settled"})</span>
                            </p>
                        </div>
                    </div>

                    {/* Customer & Shipping Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-white border border-[#E8DFC8] text-xs">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7127] block mb-1">
                                Registered Collector / Vault Delivery
                            </span>
                            <p className="font-bold text-slate-900 text-sm font-serif">
                                {order.shipping_address?.name || "Dr. Rajesh Singhania"}
                            </p>
                            <p className="text-slate-600 mt-0.5">{order.shipping_address?.street || "Imperial Tower, Suite 1204"}</p>
                            <p className="text-slate-600">{order.shipping_address?.city || "Gurugram"}, {order.shipping_address?.state || "Haryana"} - {order.shipping_address?.pincode || "122002"}</p>
                            <p className="text-slate-600 mt-1">Tel: {order.shipping_address?.phone || "+91 8607603050"}</p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E7127] block mb-1">
                                Armored Logistics &amp; Security Seal
                            </span>
                            <p className="text-slate-600">Carrier: <strong className="text-slate-900">{order.shipping_partner || "Chrononix Armored Courier Service"}</strong></p>
                            <p className="text-slate-600">Waybill: <strong className="text-slate-900 font-mono">{order.tracking_number || `CHRONO-${order._id}`}</strong></p>
                            <p className="text-slate-600">Transit Status: <span className="text-emerald-700 font-semibold">{order.order_status}</span></p>
                        </div>
                    </div>

                    {/* Ordered Items Table */}
                    <div className="border border-[#E8DFC8] rounded-xl overflow-x-auto touch-scroll">
                        <table className="w-full text-left text-xs min-w-[480px]">
                            <thead className="bg-[#F3EFE6] text-slate-800 font-bold uppercase tracking-wider border-b border-[#E8DFC8]">
                                <tr>
                                    <th className="py-3 px-4">Timepiece Description</th>
                                    <th className="py-3 px-3 text-center">Case / Finish</th>
                                    <th className="py-3 px-3 text-right">Unit Price</th>
                                    <th className="py-3 px-3 text-center">Qty</th>
                                    <th className="py-3 px-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8DFC8] text-slate-700">
                                {order.items?.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-amber-50/40 transition">
                                        <td className="py-3 px-4 font-semibold text-slate-900 font-serif">
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-3 text-center text-slate-600">
                                            {item.size} {item.color && item.color !== "Standard" ? `• ${item.color}` : ""}
                                        </td>
                                        <td className="py-3 px-3 text-right text-slate-600">
                                            ₹{item.price?.toLocaleString("en-IN")}
                                        </td>
                                        <td className="py-3 px-3 text-center font-bold text-slate-900">
                                            {item.quantity}
                                        </td>
                                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Totals */}
                    <div className="flex justify-end pt-2">
                        <div className="w-full sm:w-72 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-600">
                                <span>Timepiece Subtotal:</span>
                                <span className="text-slate-900 font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>GST &amp; Custom Duty (18% Included):</span>
                                <span className="text-slate-600">₹{Math.round(subtotal * 0.18).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Armored White-Glove Transit:</span>
                                <span className="text-emerald-700 font-semibold">{shipping === 0 ? "COMPLIMENTARY" : `₹${shipping}`}</span>
                            </div>
                            <div className="border-t border-[#D4AF37]/30 pt-2 flex justify-between text-sm font-bold text-slate-900">
                                <span>Total Acquisition Value:</span>
                                <span className="text-[#8E7127] font-black text-base font-serif">₹{order.total_amount?.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Guarantee note */}
                    <div className="pt-4 border-t border-[#E8DFC8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5 text-emerald-700">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>COSC Certified Chronometer • 5-Year Global Heritage Warranty Included</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Computer Generated Provenance Document</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
