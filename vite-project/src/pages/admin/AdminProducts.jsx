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
        <div className="space-y-6 text-slate-900">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Product Catalog Management
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Add, edit, inspect, and update hardware inventory in real-time
                    </p>
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-bold border border-slate-900 shadow-sm transition"
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
                    className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl border border-slate-200 text-xs outline-none focus:border-amber-500 shadow-2xs"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                                <th className="py-3.5 px-4">Product Details</th>
                                <th className="py-3.5 px-3">Category</th>
                                <th className="py-3.5 px-3">Regular Price</th>
                                <th className="py-3.5 px-3">Sale Price</th>
                                <th className="py-3.5 px-3 text-center">Stock</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {filtered.map((prod) => (
                                <tr key={prod._id} className="hover:bg-slate-50/80 transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-50 rounded-xl p-1 shrink-0 border border-slate-200 flex items-center justify-center">
                                                <img
                                                    src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"}
                                                    alt={prod.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-slate-900 truncate max-w-xs">{prod.name}</p>
                                                <p className="text-[10px] text-slate-500 truncate max-w-xs">{prod.tagline || prod.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200/80">
                                            {prod.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 font-semibold text-slate-500">
                                        ₹{prod.price.toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3 px-3 font-bold text-slate-900">
                                        ₹{(prod.discount_price || prod.price).toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3 px-3 text-center font-bold text-emerald-600">
                                        {prod.stock || 20}
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(prod)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                                                title="Edit product"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prod._id)}
                                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
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
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 space-y-4 shadow-2xl text-slate-900">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">
                                {editingProduct ? "Edit Product Details" : "Add New Hardware Device"}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                            <div>
                                <label className="block text-slate-600 mb-1 font-semibold">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Shopnix Quantum Watch"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-600 mb-1 font-semibold">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                    >
                                        <option value="Smart Devices">Smart Devices</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Gaming">Gaming</option>
                                        <option value="Cameras">Cameras</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="AI Devices">AI Devices</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-slate-600 mb-1 font-semibold">Badge Tag</label>
                                    <input
                                        type="text"
                                        value={form.badge}
                                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                        placeholder="Bestseller / New"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-slate-600 mb-1 font-semibold">Price (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="19999"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 mb-1 font-semibold">Discount Price (₹)</label>
                                    <input
                                        type="number"
                                        value={form.discount_price}
                                        onChange={(e) => setForm({ ...form, discount_price: e.target.value })}
                                        placeholder="14999"
                                        className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-600 mb-1 font-semibold">Stock</label>
                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-600 mb-1 font-semibold">Image URL</label>
                                <input
                                    type="url"
                                    value={form.imageUrl}
                                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 mb-1 font-semibold">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Key features and device specs..."
                                    className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-900 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-amber-500 transition"
                                />
                            </div>

                            <div className="flex gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold transition shadow-sm border border-slate-900"
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
