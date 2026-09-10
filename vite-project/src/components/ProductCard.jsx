import React, { useState } from "react";
import { ShoppingBag, Star, Eye, Check, Heart, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onQuickView }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const isWishlisted = isInWishlist(product._id);
    const selectedSize = product.sizes?.[0] || "Standard";
    const selectedColor = product.colors?.[0] || "Standard";

    const imgUrl = product.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80";

    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        try {
            setAdding(true);
            await addToCart(product._id, 1, selectedSize, selectedColor);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        toggleWishlist(product);
    };

    const ratingAvg = product.ratings?.average || 4.8;
    const ratingCount = product.ratings?.count || 128;

    return (
        <div
            onClick={() => onQuickView && onQuickView(product)}
            className="group relative bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:-translate-y-1"
        >
            {/* Top Image Container */}
            <div className="relative aspect-square w-full bg-slate-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 border border-slate-100">
                <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Wishlist Heart Icon Button (Top Right) */}
                <button
                    onClick={handleToggleWishlist}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-sm z-10 ${
                        isWishlisted
                            ? "bg-rose-50 text-rose-600 border border-rose-200 scale-105"
                            : "bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white border border-slate-200"
                    }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                    <Heart
                        className={`w-4 h-4 transition ${
                            isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"
                        }`}
                    />
                </button>

                {/* Discount & Featured Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {hasDiscount && (
                        <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded shadow-sm tracking-wide">
                            {discountPercent}% OFF
                        </span>
                    )}
                    {product.badge && (
                        <span className="px-2 py-0.5 bg-slate-900 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded shadow-sm">
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto backdrop-blur-[2px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onQuickView) onQuickView(product);
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold rounded-full shadow-lg transition transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center gap-1.5"
                        title="Quick View"
                    >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                    </button>
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {/* Category */}
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider">
                            {product.category}
                        </span>
                        {product.stock && product.stock <= 15 && (
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Only {product.stock} left
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product._id}`);
                        }}
                        className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-amber-600 transition cursor-pointer"
                        title={product.name}
                    >
                        {product.name}
                    </h3>

                    {/* Tagline / short description */}
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {product.tagline || product.description}
                    </p>

                    {/* Star Rating with Count */}
                    <div className="flex items-center gap-1.5 my-2">
                        <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                        i < Math.floor(ratingAvg)
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-slate-100 text-slate-200"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-slate-800 text-xs font-bold">
                            {ratingAvg.toFixed(1)} <span className="text-slate-400 font-normal">({ratingCount})</span>
                        </span>
                    </div>
                </div>

                {/* Bottom Row with Price & Add to Cart button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                            ₹{finalPrice.toLocaleString("en-IN")}
                        </span>
                        {hasDiscount && (
                            <span className="text-[11px] text-slate-400 line-through leading-none mt-0.5 font-medium">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={handleAddToCart}
                            disabled={adding || (product.stock !== undefined && product.stock <= 0)}
                            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                                added
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                                    : (product.stock !== undefined && product.stock <= 0)
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                    : "bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white hover:scale-105 active:scale-95 shadow-md shadow-slate-900/10"
                            }`}
                            title={product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                        >
                            {added ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-white" />
                                    <span>Added</span>
                                </>
                            ) : adding ? (
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>Add</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
