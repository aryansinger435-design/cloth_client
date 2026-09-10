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
        <div className="space-y-6 text-slate-900">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Customer Orders &amp; Fulfillment
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Review customer shipments, update delivery stages, and generate invoices
                    </p>
                </div>

                {/* Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition ${
                                filterStatus === s ? "bg-slate-950 text-amber-400 shadow-xs" : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
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
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {filtered.map((ord) => (
                                <tr key={ord._id} className="hover:bg-slate-50/80 transition">
                                    <td className="py-3.5 px-4">
                                        <p className="font-mono font-bold text-slate-900">{ord._id}</p>
                                        <p className="text-[10px] text-slate-500">
                                            {new Date(ord.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                                        </p>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <p className="font-medium text-slate-700">{ord.shipping_address?.city}, {ord.shipping_address?.state}</p>
                                        <p className="text-[10px] text-slate-500">PIN: {ord.shipping_address?.pincode}</p>
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <span className="font-bold text-slate-900">{ord.items?.length || 1} devices</span>
                                    </td>
                                    <td className="py-3.5 px-3 font-black text-slate-900">
                                        ₹{ord.total_amount?.toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3.5 px-3">
                                        <select
                                            value={ord.payment_status || "Pending"}
                                            onChange={(e) => handlePaymentChange(ord._id, e.target.value)}
                                            className="bg-slate-50 text-xs font-bold text-slate-700 rounded-lg px-2 py-1 border border-slate-200 outline-none focus:border-amber-500 transition"
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
                                            className="bg-amber-50 text-xs font-bold text-amber-800 rounded-lg px-2.5 py-1 border border-amber-200/80 outline-none focus:border-amber-500 transition"
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
                                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 transition"
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
