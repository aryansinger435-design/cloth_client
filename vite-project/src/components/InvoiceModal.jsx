import React from "react";
import { X, Printer, ShoppingBag, CheckCircle2, ShieldCheck, Download } from "lucide-react";

export default function InvoiceModal({ order, isOpen, onClose }) {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || order.total_amount;
    const shipping = order.total_amount > subtotal ? order.total_amount - subtotal : 0;

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col text-slate-800 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Action Bar */}
                <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 shadow-xs">
                            <ShoppingBag className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-slate-900 text-base tracking-tight">Shopnix Official Tax Invoice</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition shadow-xs"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print / PDF</span>
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Printable Invoice Body */}
                <div id="printable-invoice" className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[78vh] bg-white">
                    {/* Invoice Meta */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pb-6 border-b border-slate-200">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                                Shop<span className="text-amber-500">nix</span>
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">Shopnix India Technology Retail Ltd.</p>
                            <p className="text-xs text-slate-500">GSTIN: 06AABCS1429B1ZX | CIN: U72200HR2026PTC099124</p>
                            <p className="text-xs text-slate-500">Kaithal, Haryana 136027, India</p>
                        </div>

                        <div className="text-left sm:text-right space-y-1">
                            <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase">
                                Tax Invoice / Receipt
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Invoice No: <strong className="text-slate-900">INV-{order._id?.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()}</strong>
                            </p>
                            <p className="text-xs text-slate-500">
                                Date: <span className="text-slate-800">{new Date(order.created_at || Date.now()).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
                            </p>
                            <p className="text-xs text-slate-500">
                                Payment Mode: <span className="text-amber-700 font-semibold">{order.payment_method || "COD"} ({order.payment_status || "Completed"})</span>
                            </p>
                        </div>
                    </div>

                    {/* Customer & Shipping Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                                Billed To / Shipping Address
                            </span>
                            <p className="font-bold text-slate-900 text-sm">
                                {order.shipping_address?.name || "Aman Verma"}
                            </p>
                            <p className="text-slate-600 mt-0.5">{order.shipping_address?.street || "Flat 402, Cyber Tower, Sector 14"}</p>
                            <p className="text-slate-600">{order.shipping_address?.city || "Kaithal"}, {order.shipping_address?.state || "Haryana"} - {order.shipping_address?.pincode || "136027"}</p>
                            <p className="text-slate-600 mt-1">Phone: {order.shipping_address?.phone || "+91 8607603050"}</p>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                                Shipment & Logistics
                            </span>
                            <p className="text-slate-600">Courier Partner: <strong className="text-slate-900">{order.shipping_partner || "Delhivery FastTrack Surface"}</strong></p>
                            <p className="text-slate-600">Tracking AWB: <strong className="text-slate-900 font-mono">{order.tracking_number || `DELHIVERY-${order._id}`}</strong></p>
                            <p className="text-slate-600">Delivery Status: <span className="text-emerald-700 font-semibold">{order.order_status}</span></p>
                        </div>
                    </div>

                    {/* Ordered Items Table */}
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                                <tr>
                                    <th className="py-3 px-4">Item Description</th>
                                    <th className="py-3 px-3 text-center">Specs</th>
                                    <th className="py-3 px-3 text-right">Unit Price</th>
                                    <th className="py-3 px-3 text-center">Qty</th>
                                    <th className="py-3 px-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150 text-slate-700">
                                {order.items?.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition">
                                        <td className="py-3 px-4 font-medium text-slate-900">
                                            {item.name}
                                        </td>
                                        <td className="py-3 px-3 text-center text-slate-500">
                                            {item.size} {item.color && item.color !== "Standard" ? `• ${item.color}` : ""}
                                        </td>
                                        <td className="py-3 px-3 text-right text-slate-600">
                                            ₹{item.price?.toLocaleString("en-IN")}
                                        </td>
                                        <td className="py-3 px-3 text-center font-bold text-slate-900">
                                            {item.quantity}
                                        </td>
                                        <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary Totals */}
                    <div className="flex justify-end pt-2">
                        <div className="w-full sm:w-64 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal:</span>
                                <span className="text-slate-900 font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>GST Included (18%):</span>
                                <span className="text-slate-600">₹{Math.round(subtotal * 0.18).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping:</span>
                                <span className="text-emerald-700 font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                            </div>
                            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
                                <span>Grand Total:</span>
                                <span className="text-amber-600 font-black text-base">₹{order.total_amount?.toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Guarantee note */}
                    <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                        <div className="flex items-center gap-1.5 text-emerald-600">
                            <ShieldCheck className="w-4 h-4" />
                            <span className="text-slate-700 font-medium">100% Genuine Certified Tech with Manufacturer Warranty</span>
                        </div>
                        <span className="text-slate-400">Thank you for ordering with Shopnix!</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
