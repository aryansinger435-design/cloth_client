import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, FileText, ChevronDown, Crown } from "lucide-react";
import { getStoredOrders, updateLocalOrderStatus } from "../../api/shopnixStore";
import { useToast } from "../../context/ToastContext";
import InvoiceModal from "../../components/InvoiceModal";

export default function AdminOrders() {
    const { showToast } = useToast();
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const loadOrders = () => {
        setOrders(getStoredOrders());
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
        updateLocalOrderStatus(orderId, newStatus, null);
        loadOrders();
        showToast(`Acquisition #${orderId} transit status updated to "${newStatus}"`, "success");
    };

    const handlePaymentChange = (orderId, newPayment) => {
        updateLocalOrderStatus(orderId, null, newPayment);
        loadOrders();
        showToast(`Acquisition #${orderId} settlement updated to "${newPayment}"`, "success");
    };

    const filtered = orders.filter((ord) => {
        if (filterStatus === "All") return true;
        return ord.order_status?.toLowerCase() === filterStatus.toLowerCase();
    });

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Collector Acquisitions &amp; Armored Dispatch
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Manage white-glove logistics, confirm bank settlements, and generate official provenance invoices
                    </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#07080D] border border-[#151722] text-xs overflow-x-auto scrollbar-none touch-scroll max-w-full">
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition whitespace-nowrap shrink-0 ${
                                filterStatus === s
                                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] font-extrabold"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#07080D] rounded-2xl border border-[#151722] overflow-hidden shadow-xl">
                <div className="overflow-x-auto touch-scroll">
                    <table className="w-full text-left text-xs min-w-[640px]">
                        <thead className="bg-[#030406] text-slate-400 font-bold uppercase tracking-wider border-b border-[#151722]">
                            <tr>
                                <th className="py-3.5 px-4">Acquisition Ref</th>
                                <th className="py-3.5 px-3">Collector / Coordinates</th>
                                <th className="py-3.5 px-3">Timepieces</th>
                                <th className="py-3.5 px-3">Settlement</th>
                                <th className="py-3.5 px-3">Transit Status</th>
                                <th className="py-3.5 px-3 text-right">Provenance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23293D] text-slate-300">
                            {filtered.map((ord) => (
                                <tr key={ord._id} className="hover:bg-[#0A0C13] transition">
                                    <td className="py-3.5 px-4">
                                        <p className="font-mono font-bold text-white text-xs">{ord._id}</p>
                                        <p className="text-[10px] text-slate-400">
                                            {new Date(ord.created_at).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short"
                                            })}
                                        </p>
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <p className="font-bold text-white font-serif">{ord.shipping_address?.name || "VIP Collector"}</p>
                                        <p className="text-[11px] text-slate-400 truncate max-w-xs">
                                            {ord.shipping_address?.city}, {ord.shipping_address?.state}
                                        </p>
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <div className="space-y-1">
                                            {ord.items?.map((item, idx) => (
                                                <p key={idx} className="font-medium text-slate-200">
                                                    {item.quantity}x {item.name} <span className="text-slate-500">({item.size})</span>
                                                </p>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <p className="font-black text-[#E5C158] text-sm font-serif">
                                            ₹{ord.total_amount?.toLocaleString("en-IN")}
                                        </p>
                                        <select
                                            value={ord.payment_status}
                                            onChange={(e) => handlePaymentChange(ord._id, e.target.value)}
                                            className="bg-[#030406] text-[10px] text-slate-300 border border-[#151722] rounded px-1.5 py-0.5 mt-1 cursor-pointer outline-none focus:border-[#D4AF37]"
                                        >
                                            <option value="Completed">Settled (Verified)</option>
                                            <option value="Pending">Pending Escrow</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                    </td>

                                    <td className="py-3.5 px-3">
                                        <select
                                            value={ord.order_status}
                                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                                            className="bg-[#030406] text-xs font-bold text-[#E5C158] border border-[#151722] rounded-lg px-2.5 py-1 cursor-pointer outline-none focus:border-[#D4AF37]"
                                        >
                                            <option value="Processing">Processing / Atelier</option>
                                            <option value="Shipped">Armored In-Transit</option>
                                            <option value="Delivered">Delivered to Salon</option>
                                            <option value="Cancelled">Archived / Cancelled</option>
                                        </select>
                                    </td>

                                    <td className="py-3.5 px-3 text-right">
                                        <button
                                            onClick={() => setSelectedInvoice(ord)}
                                            className="p-1.5 rounded-lg text-[#D4AF37] hover:text-[#F9E7B9] hover:bg-[#0A0C13] transition inline-flex items-center gap-1 border border-[#D4AF37]/30 font-bold"
                                            title="View Tax Invoice"
                                        >
                                            <FileText className="w-3.5 h-3.5" />
                                            <span>Invoice</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedInvoice && (
                <InvoiceModal
                    order={selectedInvoice}
                    isOpen={!!selectedInvoice}
                    onClose={() => setSelectedInvoice(null)}
                />
            )}
        </div>
    );
}
