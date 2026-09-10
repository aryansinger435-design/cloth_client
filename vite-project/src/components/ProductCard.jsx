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
            className="group relative bg-[#131024] rounded-2xl border border-[#241D3F] hover:border-purple-500/60 p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:-translate-y-1"
        >
            {/* Top Image Container */}
            <div className="relative aspect-square w-full bg-[#0B0916] rounded-xl overflow-hidden mb-4 flex items-center justify-center p-3 border border-purple-950/40">
                <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    loading="lazy"
                />

                {/* Wishlist Heart Icon Button (Top Right) */}
                <button
                    onClick={handleToggleWishlist}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-sm z-10 ${
                        isWishlisted
                            ? "bg-purple-950/80 text-rose-400 border border-purple-500/60 scale-105 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                            : "bg-[#1A162F]/80 text-slate-400 hover:text-purple-400 hover:bg-[#251F42] border border-purple-900/40"
                    }`}
                    title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                    <Heart
                        className={`w-4 h-4 transition ${
                            isWishlisted ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-purple-400"
                        }`}
                    />
                </button>

                {/* Discount & Featured Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {hasDiscount && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] font-black rounded shadow-sm tracking-wide">
                            {discountPercent}% OFF
                        </span>
                    )}
                    {product.badge && (
                        <span className="px-2 py-0.5 bg-purple-950/80 text-purple-300 border border-purple-700/50 text-[10px] font-bold rounded shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                            {product.badge}
                        </span>
                    )}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none group-hover:pointer-events-auto backdrop-blur-[2px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onQuickView) onQuickView(product);
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-bold rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)] transition transform translate-y-2 group-hover:translate-y-0 duration-300 flex items-center gap-1.5"
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
                        <span className="text-[11px] font-extrabold text-purple-400 uppercase tracking-wider">
                            {product.category}
                        </span>
                        {product.stock && product.stock <= 15 && (
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
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
                        className="font-bold text-white text-sm sm:text-base line-clamp-1 group-hover:text-purple-400 transition cursor-pointer"
                        title={product.name}
                    >
                        {product.name}
                    </h3>

                    {/* Tagline / short description */}
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {product.tagline || product.description}
                    </p>

                    {/* Star Rating with Count */}
                    <div className="flex items-center gap-1.5 my-2">
                        <div className="flex items-center text-purple-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                        i < Math.floor(ratingAvg)
                                            ? "fill-purple-400 text-purple-400"
                                            : "fill-purple-950/60 text-purple-900"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-purple-200 text-xs font-bold">
                            {ratingAvg.toFixed(1)} <span className="text-slate-500 font-normal">({ratingCount})</span>
                        </span>
                    </div>
                </div>

                {/* Bottom Row with Price & Add to Cart button */}
                <div className="flex items-center justify-between pt-3 border-t border-purple-950/40 mt-2">
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg font-black text-white leading-tight">
                            ₹{finalPrice.toLocaleString("en-IN")}
                        </span>
                        {hasDiscount && (
                            <span className="text-[11px] text-slate-500 line-through leading-none mt-0.5 font-medium">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={handleAddToCart}
                            disabled={adding || (product.stock !== undefined && product.stock <= 0)}
                            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                                added
                                    ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                                    : (product.stock !== undefined && product.stock <= 0)
                                    ? "bg-[#1A1633] text-slate-500 cursor-not-allowed border border-purple-950/60"
                                    : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_22px_rgba(168,85,247,0.7)]"
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
