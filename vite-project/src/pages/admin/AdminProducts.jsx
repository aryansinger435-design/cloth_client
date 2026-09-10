import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Check, X, Package, Star, Eye } from "lucide-react";
import { getStoredProducts, saveStoredProducts } from "../../api/shopnixStore";
import { useToast } from "../../context/ToastContext";

export default function AdminProducts() {
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "Smart Devices",
        price: "",
        discount_price: "",
        stock: 20,
        badge: "New Launch",
        description: "",
        imageUrl: ""
    });

    const loadProducts = () => {
        setProducts(getStoredProducts());
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setForm({
            name: "",
            category: "Smart Devices",
            price: "",
            discount_price: "",
            stock: 20,
            badge: "New Launch",
            description: "",
            imageUrl: ""
        });
        setModalOpen(true);
    };

    const handleOpenEdit = (p) => {
        setEditingProduct(p);
        setForm({
            name: p.name,
            category: p.category,
            price: p.price,
            discount_price: p.discount_price || "",
            stock: p.stock || 20,
            badge: p.badge || "",
            description: p.description,
            imageUrl: p.images?.[0]?.url || ""
        });
        setModalOpen(true);
    };

    const handleDelete = (id) => {
        const updated = products.filter((p) => p._id !== id);
        saveStoredProducts(updated);
        setProducts(updated);
        showToast("Product deleted from catalog", "info");
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.name || !form.price) {
            showToast("Please fill in required fields", "warning");
            return;
        }

        const imgObj = {
            url: form.imageUrl || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600"
        };

        if (editingProduct) {
            const updated = products.map((p) => {
                if (p._id === editingProduct._id) {
                    return {
                        ...p,
                        name: form.name,
                        category: form.category,
                        price: Number(form.price),
                        discount_price: form.discount_price ? Number(form.discount_price) : 0,
                        stock: Number(form.stock),
                        badge: form.badge,
                        description: form.description,
                        images: [imgObj]
                    };
                }
                return p;
            });
            saveStoredProducts(updated);
            setProducts(updated);
            showToast("Product updated successfully!", "success");
        } else {
            const newProd = {
                _id: `prod-snx-${Date.now()}`,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                discount_price: form.discount_price ? Number(form.discount_price) : 0,
                stock: Number(form.stock),
                badge: form.badge,
                description: form.description,
                images: [imgObj],
                ratings: { average: 5.0, count: 1 },
                sizes: ["Standard"],
                colors: ["Standard"],
                is_featured: true
            };
            const updated = [newProd, ...products];
            saveStoredProducts(updated);
            setProducts(updated);
            showToast("New product added to store!", "success");
        }

        setModalOpen(false);
    };

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#241D3F]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Product Catalog Management
                    </h1>
                    <p className="text-xs sm:text-sm text-purple-300/70 mt-1">
                        Add, edit, inspect, and update hardware inventory in real-time
                    </p>
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Device</span>
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search devices in inventory..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#131024] text-white rounded-xl border border-[#241D3F] text-xs outline-none focus:border-purple-500 shadow-sm placeholder:text-slate-500"
                />
                <Search className="w-4 h-4 text-purple-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Products Table */}
            <div className="bg-[#131024] rounded-2xl border border-[#241D3F] shadow-[0_4px_25px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-[#0D0A1C] text-purple-300 uppercase tracking-wider font-bold border-b border-[#241D3F]">
                            <tr>
                                <th className="py-3.5 px-4">Product Details</th>
                                <th className="py-3.5 px-3">Category</th>
                                <th className="py-3.5 px-3">Regular Price</th>
                                <th className="py-3.5 px-3">Sale Price</th>
                                <th className="py-3.5 px-3 text-center">Stock</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#201838] text-slate-200">
                            {filtered.map((prod) => (
                                <tr key={prod._id} className="hover:bg-[#1C1733]/50 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-[#0D0B18] rounded-xl p-1 shrink-0 border border-[#2E2452] flex items-center justify-center">
                                                <img
                                                    src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"}
                                                    alt={prod.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-white truncate max-w-xs">{prod.name}</p>
                                                <p className="text-[10px] text-purple-300/60 truncate max-w-xs">{prod.tagline || prod.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="px-2.5 py-0.5 rounded-lg bg-purple-950/70 text-purple-300 font-semibold text-[10px] border border-purple-500/40">
                                            {prod.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 font-semibold text-slate-400">
                                        ₹{prod.price.toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3 px-3 font-bold text-purple-300">
                                        ₹{(prod.discount_price || prod.price).toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3 px-3 text-center font-bold text-emerald-400">
                                        {prod.stock || 20}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(prod)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-purple-300 hover:bg-purple-950/60 border border-transparent hover:border-purple-500/30 transition"
                                                title="Edit product"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prod._id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/60 border border-transparent hover:border-rose-500/30 transition"
                                                title="Delete product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-[#131024] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-purple-500/40 space-y-4 shadow-[0_10px_50px_rgba(0,0,0,0.8)] text-slate-100">
                        <div className="flex items-center justify-between pb-3 border-b border-[#241D3F]">
                            <h3 className="font-bold text-white text-base">
                                {editingProduct ? "Edit Product Details" : "Add New Hardware Device"}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                            <div>
                                <label className="block text-purple-300/80 mb-1 font-semibold">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Shopnix Quantum Watch"
                                    className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-purple-300/80 mb-1 font-semibold">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    >
                                        <option value="Smart Devices">Smart Devices</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Cameras">Cameras</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="AI Devices">AI Devices</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Apparel">Apparel</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-purple-300/80 mb-1 font-semibold">Badge Tag</label>
                                    <input
                                        type="text"
                                        value={form.badge}
                                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                        placeholder="Bestseller / New"
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-purple-300/80 mb-1 font-semibold">Price (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="19999"
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-purple-300/80 mb-1 font-semibold">Discount Price (₹)</label>
                                    <input
                                        type="number"
                                        value={form.discount_price}
                                        onChange={(e) => setForm({ ...form, discount_price: e.target.value })}
                                        placeholder="14999"
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-purple-300/80 mb-1 font-semibold">Stock</label>
                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-purple-300/80 mb-1 font-semibold">Image URL</label>
                                <input
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-purple-300/80 mb-1 font-semibold">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Key features and device specs..."
                                    className="w-full px-3.5 py-2.5 bg-[#0D0B18] text-white rounded-xl border border-[#2E2452] outline-none focus:border-purple-500 transition"
                                />
                            </div>

                            <div className="flex gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-[#1C1733] hover:bg-[#251F42] text-slate-300 font-semibold transition border border-[#2E2452]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition shadow-[0_0_15px_rgba(168,85,247,0.3)] border border-purple-400/40"
                                >
                                    {editingProduct ? "Save Changes" : "Add to Store"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
