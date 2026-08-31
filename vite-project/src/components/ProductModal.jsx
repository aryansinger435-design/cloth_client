import React, { useState } from "react";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Standard");
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Standard");
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const imgUrl = product.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80";
    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            setAdding(true);
            await addToCart(product._id, quantity, selectedSize, selectedColor);
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
                onClose();
            }, 1500);
        } catch (err) {
            alert(err.message || "Failed to add product to cart");
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-[#120F24] rounded-3xl max-w-3xl w-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.25)] border border-purple-900/50 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-[#1A162F]/80 hover:bg-purple-950 rounded-full transition border border-purple-900/40"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Product Image */}
                <div className="relative bg-[#0B0916] aspect-square md:aspect-auto h-full min-h-[300px] overflow-hidden flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-purple-950/40">
                    <img
                        src={imgUrl}
                        alt={product.name}
                        className="w-full h-full object-contain max-h-[350px]"
                    />
                    {hasDiscount && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold rounded-lg shadow-md">
                            {discountPercent}% OFF
                        </div>
                    )}
                </div>

                {/* Right: Product Details & Actions */}
                <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] bg-[#120F24]">
                    <div>
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/70 border border-purple-900/50 px-2.5 py-1 rounded-lg">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-purple-400">
                                <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                                <span className="text-white font-bold text-sm">
                                    {product.ratings?.average ? product.ratings.average.toFixed(1) : "5.0"}
                                </span>
                                <span className="text-slate-500 text-xs">
                                    ({product.ratings?.count || 128} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
                            {product.name}
                        </h2>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-black text-white">
                                ₹{finalPrice.toLocaleString("en-IN")}
                            </span>
                            {hasDiscount && (
                                <span className="text-base text-slate-500 line-through">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-4">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                    Select Specification / Size
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition ${
                                                selectedSize === size
                                                    ? "border-purple-500 bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                                    : "border-purple-900/50 text-slate-400 bg-[#16132A] hover:text-white hover:border-purple-500/50"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                    Select Edition / Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition ${
                                                selectedColor === color
                                                    ? "border-purple-500 bg-purple-950/80 text-purple-300 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                    : "border-purple-900/50 text-slate-400 bg-[#16132A] hover:text-white hover:border-purple-500/50"
                                            }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        {/* Quantity & Add to Cart button */}
                        <div className="flex items-center gap-3 pt-4 border-t border-purple-950/40">
                            <div className="flex items-center border border-purple-900/50 rounded-xl overflow-hidden bg-[#16132A]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3.5 py-2 text-slate-400 hover:text-white hover:bg-purple-950 text-sm font-bold"
                                >
                                    -
                                </button>
                                <span className="px-3 py-2 text-sm font-semibold text-white">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3.5 py-2 text-slate-400 hover:text-white hover:bg-purple-950 text-sm font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding || product.stock <= 0}
                                className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] ${
                                    added
                                        ? "bg-emerald-600 text-white"
                                        : product.stock <= 0
                                        ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                        : "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                                }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-5 h-5" />
                                        Added to Cart!
                                    </>
                                ) : adding ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Extra perks */}
                        <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-purple-950/40 text-center text-[11px] text-slate-400">
                            <div className="flex flex-col items-center gap-1">
                                <Truck className="w-4 h-4 text-purple-400" />
                                <span>Fast Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <RefreshCw className="w-4 h-4 text-purple-400" />
                                <span>30-Day Return</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <ShieldCheck className="w-4 h-4 text-purple-400" />
                                <span>100% Genuine</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

