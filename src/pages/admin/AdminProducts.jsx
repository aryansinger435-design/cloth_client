import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Check, X, Package, Star, Eye, Watch, Crown } from "lucide-react";
import { getStoredProducts, saveStoredProducts } from "../../api/shopnixStore";
import { useToast } from "../../context/ToastContext";

const WATCH_CATEGORIES = [
    "Luxury Automatics",
    "Chronographs",
    "Tourbillon & Complications",
    "Skeleton & Mechanical",
    "Dive & Sports Heritage",
    "Minimalist Dress Watches",
    "Smart Luxury"
];

export default function AdminProducts() {
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [form, setForm] = useState({
        name: "",
        category: "Luxury Automatics",
        price: "",
        discount_price: "",
        stock: 12,
        badge: "Manufacture Calibre",
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
            category: "Luxury Automatics",
            price: "",
            discount_price: "",
            stock: 12,
            badge: "Manufacture Calibre",
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
            stock: p.stock || 12,
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
        showToast("Timepiece archived from catalog", "info");
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.name || !form.price) {
            showToast("Please fill in required fields", "warning");
            return;
        }

        const imgObj = {
            url: form.imageUrl || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
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
            showToast("Timepiece updated successfully!", "success");
        } else {
            const newProd = {
                _id: `chrono-prod-${Date.now()}`,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                discount_price: form.discount_price ? Number(form.discount_price) : 0,
                stock: Number(form.stock),
                badge: form.badge,
                description: form.description,
                images: [imgObj],
                ratings: { average: 4.9, count: 1 },
                sizes: ["40mm", "42mm"],
                colors: ["Rose Gold", "Brushed Steel"]
            };
            const updated = [newProd, ...products];
            saveStoredProducts(updated);
            setProducts(updated);
            showToast("New timepiece added to vault catalog!", "success");
        }

        setModalOpen(false);
    };

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 text-slate-100">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                        Chrononix Timepiece Vault ({products.length} Total)
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Curate, edit pricing, reserve stock, and update horological specifications
                    </p>
                </div>

                <button
                    onClick={handleOpenAdd}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Timepiece</span>
                </button>
            </div>

            {/* Search filter */}
            <div className="relative max-w-md">
                <input
                    type="text"
                    placeholder="Search by timepiece name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#07080D] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37] text-xs transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Product Table */}
            <div className="bg-[#07080D] rounded-2xl border border-[#151722] overflow-hidden shadow-xl">
                <div className="overflow-x-auto touch-scroll">
                    <table className="w-full text-left text-xs min-w-[550px]">
                        <thead className="bg-[#030406] text-slate-400 font-bold uppercase tracking-wider border-b border-[#151722]">
                            <tr>
                                <th className="py-3.5 px-4">Timepiece</th>
                                <th className="py-3.5 px-3">Category</th>
                                <th className="py-3.5 px-3">Price</th>
                                <th className="py-3.5 px-3">Vault Stock</th>
                                <th className="py-3.5 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#23293D] text-slate-300">
                            {filtered.slice(0, 50).map((prod) => (
                                <tr key={prod._id} className="hover:bg-[#0A0C13] transition">
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#030406] border border-[#151722] overflow-hidden shrink-0 flex items-center justify-center p-1">
                                            <img
                                                src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100"}
                                                alt={prod.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white font-serif">{prod.name}</p>
                                            <p className="text-[10px] text-[#E5C158]">{prod.brand || "Chrononix"}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="px-2 py-0.5 rounded bg-[#0A0C13] text-[#E5C158] border border-[#D4AF37]/40 text-[10px] font-bold">
                                            {prod.category}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 font-bold text-white">
                                        ₹{(prod.discount_price || prod.price)?.toLocaleString("en-IN")}
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className={`font-bold ${prod.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                            {prod.stock > 0 ? `${prod.stock} in vault` : "Exhausted"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenEdit(prod)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-[#E5C158] hover:bg-[#0A0C13] transition"
                                                title="Edit details"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(prod._id)}
                                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition"
                                                title="Archive"
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

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
                    <div className="bg-[#07080D] rounded-2xl max-w-lg w-full p-4 sm:p-8 border border-[#D4AF37]/50 space-y-4 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto touch-scroll">
                        <div className="flex items-center justify-between pb-3 border-b border-[#151722]">
                            <h3 className="font-bold text-white text-base font-serif">
                                {editingProduct ? "Edit Timepiece Details" : "Add New Timepiece to Vault"}
                            </h3>
                            <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Timepiece Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Chrononix Royal Oak Skeleton"
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Horology Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                    >
                                        {WATCH_CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat} className="bg-[#07080D] text-white">{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Price (₹) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="75000"
                                        className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Privilege Price (₹)</label>
                                    <input
                                        type="number"
                                        value={form.discount_price}
                                        onChange={(e) => setForm({ ...form, discount_price: e.target.value })}
                                        placeholder="68000"
                                        className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 mb-1 font-semibold">Vault Stock</label>
                                    <input
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">High-Res Watch Image URL</label>
                                <input
                                    type="text"
                                    value={form.imageUrl}
                                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/photo-..."
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 mb-1 font-semibold">Horological Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Swiss automatic movement, sapphire crystal caseback, hand-polished bevels..."
                                    className="w-full px-3.5 py-2.5 bg-[#030406] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37]"
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 py-2.5 rounded-xl bg-[#0A0C13] hover:bg-[#20273D] text-slate-300 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold uppercase tracking-wider transition shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                >
                                    Save Timepiece
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
