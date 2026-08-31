import React, { useState } from "react";
import { ShoppingBag, Star, Eye, Check, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onQuickView }) {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const selectedSize = product.sizes?.[0] || "Standard";

    const imgUrl = product.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80";

    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            setAdding(true);
            await addToCart(product._id, 1, selectedSize, product.colors?.[0] || "Standard");
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            alert(err.message || "Could not add to cart");
        } finally {
            setAdding(false);
        }
    };

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    const ratingAvg = product.ratings?.average || 4.8;
    const ratingCount = product.ratings?.count || 128;

    return (
        <div
            onClick={() => onQuickView && onQuickView(product)}
            className="group relative bg-[#131024] rounded-3xl border border-[#241D3F] hover:border-purple-500/60 p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-[0_0_30px_rgba(168,85,247,0.22)]"
        >
            {/* Top Image Container */}
            <div className="relative aspect-square w-full bg-[#0B0916] rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-4 border border-purple-950/40">
                <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Wishlist Heart Icon Button (Top Right) */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#1A162F]/80 backdrop-blur-md text-slate-400 hover:text-purple-400 transition shadow-sm z-10"
                    title="Add to Wishlist"
                >
                    <Heart
                        className={`w-4 h-4 transition ${
                            isWishlisted ? "fill-purple-500 text-purple-500" : "text-slate-400 hover:text-purple-400"
                        }`}
                    />
                </button>

                {/* Discount & Featured Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    {hasDiscount && (
                        <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] font-bold rounded-lg shadow-sm">
                            {discountPercent}% OFF
                        </span>
                    )}
                    {product.is_featured && (
                        <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                            Featured
                        </span>
                    )}
                </div>

                {/* Quick View Button on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (onQuickView) onQuickView(product);
                        }}
                        className="p-3 bg-purple-600 text-white rounded-full shadow-[0_0_15px_rgba(168,85,247,0.6)] hover:bg-purple-500 transition transform translate-y-3 group-hover:translate-y-0 duration-300"
                        title="Quick View"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {/* Title */}
                    <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-purple-400 transition">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-1.5 mb-2">
                        <span className="text-lg font-extrabold text-white">
                            ₹{finalPrice.toLocaleString("en-IN")}
                        </span>
                        {hasDiscount && (
                            <span className="text-xs text-slate-500 line-through">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>
                        )}
                    </div>

                    {/* Star Rating with Count */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center text-purple-400">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                        i < Math.floor(ratingAvg)
                                            ? "fill-purple-400 text-purple-400"
                                            : "fill-purple-950 text-purple-800"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-slate-400 text-xs font-medium">
                            ({ratingCount})
                        </span>
                    </div>
                </div>

                {/* Bottom Row with Category tag & Cart Button */}
                <div className="flex items-center justify-between pt-2 border-t border-purple-950/40">
                    <span className="text-[11px] font-medium text-purple-400/80 bg-purple-950/50 px-2.5 py-0.5 rounded-lg border border-purple-900/40">
                        {product.category}
                    </span>

                    <button
                        onClick={handleAddToCart}
                        disabled={adding || product.stock <= 0}
                        className={`w-9 h-9 rounded-xl font-medium text-xs flex items-center justify-center transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)] ${
                            added
                                ? "bg-emerald-600 text-white"
                                : product.stock <= 0
                                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-500 text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                        }`}
                        title={product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    >
                        {added ? (
                            <Check className="w-4 h-4 text-white" />
                        ) : adding ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <ShoppingBag className="w-4 h-4 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

