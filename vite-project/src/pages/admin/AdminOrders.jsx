import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, CheckCircle2, Clock, Truck, FileText, ChevronDown } from "lucide-react";
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
        showToast(`Order #${orderId} status updated to "${newStatus}"`, "success");
    };

    const handlePaymentChange = (orderId, newPayment) => {
        updateLocalOrderStatus(orderId, null, newPayment);
        loadOrders();
        showToast(`Order #${orderId} payment status updated to "${newPayment}"`, "success");
    };

    const filtered = orders.filter((ord) => {
        if (filterStatus === "All") return true;
        return ord.order_status?.toLowerCase() === filterStatus.toLowerCase();
    });

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#241D3F]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Customer Orders &amp; Fulfillment
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-300/70 mt-1">
                        Review customer shipments, update delivery stages, and generate invoices
                    </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#131024] border border-[#241D3F] text-xs">
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition ${
                                filterStatus === s
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-400/40"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#131024] rounded-2xl border border-[#241D3F] shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D0A1C] text-purple-300 uppercase tracking-wider font-bold border-b border-[#241D3F]">
                            <tr>
                                <th className="py-3.5 px-4">Order ID &amp; Date</th>
                                <th className="py-3.5 px-3">Destination</th>
                                <th className="py-3.5 px-3">Items</th>
                                <th className="py-3.5 px-3">Total Amount</th>
                                <th className="py-3.5 px-3">Payment</th>
                                <th className="py-3.5 px-3">Order Status</th>
                                <th className="py-3.5 px-4 text-right">Invoice</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#201838] text-slate-200">
                            {filtered.map((ord) => (
                                <tr key={ord._id} className="hover:bg-[#1C1733]/50 transition">
                                    <td className="py-3.5 px-4">
                                        <p className="font-mono font-bold text-white">{ord._id}</p>
                                        <p className="text-[10px] text-purple-300/60">
                                            {new Date(ord.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                                        </p>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <p className="font-medium text-slate-300">{ord.shipping_address?.city}, {ord.shipping_address?.state}</p>
                                        <p className="text-[10px] text-slate-500">PIN: {ord.shipping_address?.pincode}</p>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="font-bold text-white">{ord.items?.length || 1} devices</span>
                                    </td>
                                    <td className="py-3.5 px-3 font-black text-purple-300">
                                        ₹{ord.total_amount?.toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <select
                                            value={ord.payment_status || "Pending"}
                                            onChange={(e) => handlePaymentChange(ord._id, e.target.value)}
                                            className="bg-[#0D0B18] text-xs font-bold text-purple-200 rounded-lg px-2 py-1 border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                        >
                                            <option value="Paid">Paid</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Failed">Failed</option>
                                        </select>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <select
                                            value={ord.order_status || "Processing"}
                                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                                            className="bg-purple-950/70 text-xs font-bold text-purple-300 rounded-lg px-2.5 py-1 border border-purple-500/40 outline-none focus:border-purple-400 transition"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            onClick={() => setSelectedInvoice(ord)}
                                            className="p-1.5 rounded-lg bg-purple-950/60 text-purple-300 hover:text-white hover:bg-purple-900 border border-purple-500/40 transition"
                                            title="View / Print Tax Invoice"
                                        >
                                            <FileText className="w-4 h-4" />
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
