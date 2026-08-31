import React, { useState, useEffect } from "react";
import {
    Package,
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Upload,
    CheckCircle2,
    AlertCircle,
    Image as ImageIcon
} from "lucide-react";
import api from "../../api/axios";

const CATEGORIES = ["T-Shirts", "Jackets", "Hoodies", "Pants", "Dresses", "Shirts", "Accessories"];

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        discount_price: "",
        category: "T-Shirts",
        stock: "10",
        sizes: "S, M, L, XL",
        colors: "Black, White",
        is_featured: false,
        image_url: ""
    });

    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            if (selectedCategory !== "All") params.append("category", selectedCategory);
            params.append("limit", "100");

            const res = await api.get(`/admin/products?${params.toString()}`);
            if (res.data?.success && res.data?.data) {
                setProducts(res.data.data.products || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setFormData({
            name: "",
            description: "",
            price: "",
            discount_price: "",
            category: "T-Shirts",
            stock: "10",
            sizes: "S, M, L, XL",
            colors: "Black, White",
            is_featured: false,
            image_url: ""
        });
        setSelectedImageFile(null);
        setImagePreview(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            discount_price: product.discount_price?.toString() || "",
            category: product.category || "T-Shirts",
            stock: product.stock?.toString() || "10",
            sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : "S, M, L, XL",
            colors: Array.isArray(product.colors) ? product.colors.join(", ") : "Black, White",
            is_featured: !!product.is_featured,
            image_url: product.images?.[0]?.url || ""
        });
        setSelectedImageFile(null);
        setImagePreview(product.images?.[0]?.url || null);
        setIsModalOpen(true);
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        if (!formData.name || !formData.price || !formData.category) {
            setError("Please fill required fields (Name, Price, Category)");
            return;
        }

        try {
            setSubmitting(true);
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("discount_price", formData.discount_price || "0");
            data.append("category", formData.category);
            data.append("stock", formData.stock || "10");
            data.append("sizes", JSON.stringify(formData.sizes.split(",").map((s) => s.trim()).filter(Boolean)));
            data.append("colors", JSON.stringify(formData.colors.split(",").map((c) => c.trim()).filter(Boolean)));
            data.append("is_featured", formData.is_featured);

            if (selectedImageFile) {
                data.append("product_img", selectedImageFile);
            } else if (formData.image_url) {
                data.append("image_url", formData.image_url);
            }

            if (editingProduct) {
                // Update product
                await api.put(`/products/${editingProduct._id}`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setSuccessMsg(`Product "${formData.name}" updated successfully!`);
            } else {
                // Create product
                await api.post("/products", data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setSuccessMsg(`Product "${formData.name}" created successfully!`);
            }

            setIsModalOpen(false);
            fetchProducts();
            setTimeout(() => setSuccessMsg(""), 3500);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Operation failed");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (productId, productName) => {
        if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) return;

        try {
            await api.delete(`/products/${productId}`);
            setSuccessMsg(`Product "${productName}" deleted successfully!`);
            fetchProducts();
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to delete product");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Product Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Add, edit details, change product photos, and manage inventory
                    </p>
                </div>
                <button
                    onClick={handleOpenAddModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Notifications */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            {successMsg && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-4 justify-between">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchProducts();
                    }}
                    className="relative flex-1 max-w-md"
                >
                    <input
                        type="text"
                        placeholder="Search product by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500">Category:</span>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600">
                        <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        Loading product catalog...
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        No products found. Click "Add New Product" to create one.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => {
                                    const img = product.images?.[0]?.url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100";
                                    return (
                                        <tr key={product._id} className="hover:bg-slate-50/60 transition">
                                            <td className="px-6 py-3.5 flex items-center gap-3">
                                                <img
                                                    src={img}
                                                    alt={product.name}
                                                    className="w-12 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-xs">{product.name}</h4>
                                                    <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{product.description}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className="px-2.5 py-0.5 bg-slate-100 font-semibold text-slate-700 rounded-md text-[11px]">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className="font-bold text-slate-900">₹{product.price.toLocaleString()}</span>
                                                {product.discount_price > 0 && (
                                                    <span className="block text-[10px] text-emerald-600 font-semibold">
                                                        Sale: ₹{product.discount_price.toLocaleString()}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`font-semibold ${product.stock <= 5 ? "text-red-600" : "text-slate-700"}`}>
                                                    {product.stock} in stock
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5">
                                                {product.is_featured ? (
                                                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 font-bold rounded-md text-[10px]">
                                                        Featured
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-400 text-[10px]">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-3.5 text-right">
                                                <div className="inline-flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleOpenEditModal(product)}
                                                        className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                        title="Edit Product / Change Image"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id, product.name)}
                                                        className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add / Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">
                                    {editingProduct ? "Edit Product & Change Image" : "Add New Product"}
                                </h3>
                                <p className="text-xs text-slate-500">
                                    Fill in product details and upload product image
                                </p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                    Product Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Classic Denim Jacket"
                                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Product description, material details..."
                                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="1999"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Discount / Sale Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.discount_price}
                                        onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                                        placeholder="1499"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        placeholder="20"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none font-medium"
                                    >
                                        {CATEGORIES.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                                        Sizes (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.sizes}
                                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                        placeholder="S, M, L, XL"
                                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-600 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Product Image Section (Upload & URL) */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                                    Product Image
                                </label>

                                <div className="flex items-center gap-4">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-20 h-24 object-cover rounded-xl border border-slate-200 shrink-0"
                                        />
                                    ) : (
                                        <div className="w-20 h-24 bg-slate-200 rounded-xl border border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                                            <ImageIcon className="w-6 h-6" />
                                        </div>
                                    )}

                                    <div className="space-y-2 flex-1">
                                        <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition shadow-2xs">
                                            <Upload className="w-3.5 h-3.5 text-indigo-600" />
                                            <span>Upload Image from Device</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>

                                        <div>
                                            <span className="text-[10px] text-slate-400 block mb-0.5">Or paste direct image URL:</span>
                                            <input
                                                type="url"
                                                value={formData.image_url}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, image_url: e.target.value });
                                                    setImagePreview(e.target.value);
                                                }}
                                                placeholder="https://images.unsplash.com/..."
                                                className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Featured Checkbox */}
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    id="featured-check"
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                                />
                                <label htmlFor="featured-check" className="text-xs font-medium text-slate-700 cursor-pointer">
                                    Feature this product on homepage hero collection
                                </label>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-100 transition flex items-center gap-2"
                                >
                                    {submitting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <span>{editingProduct ? "Save Product Changes" : "Create Product"}</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
