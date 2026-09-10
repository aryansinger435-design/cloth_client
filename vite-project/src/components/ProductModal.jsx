import React, { useState } from "react";
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw, Heart, ExternalLink } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate, Link } from "react-router-dom";

export default function ProductModal({ product, onClose }) {
    if (!product) return null;

    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "Standard");
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Standard");
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const isWishlisted = isInWishlist(product._id);
    const images = product.images && product.images.length > 0
        ? product.images
        : [{ url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600" }];

    const currentImg = images[activeImgIndex]?.url || images[0]?.url;

    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    const handleAddToCart = async () => {
        try {
            setAdding(true);
            await addToCart(product._id, quantity, selectedSize, selectedColor);
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
                onClose();
            }, 1200);
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-[#120F24] rounded-2xl max-w-3xl w-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-purple-500/40 grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-200 text-slate-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-purple-950/70 hover:bg-purple-900/70 border border-purple-800/40 rounded-full transition shadow-sm"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Product Images (Gallery) */}
                <div className="md:col-span-6 bg-[#0B0916] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-purple-950/60">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-[#131024] p-6 flex items-center justify-center border border-purple-900/40 shadow-inner">
                        <img
                            src={currentImg}
                            alt={product.name}
                            className="w-full h-full object-contain max-h-[300px] transition-all duration-300 drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]"
                        />
                        {hasDiscount && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold rounded-md shadow-sm">
                                {discountPercent}% OFF
                            </div>
                        )}
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition ${
                                isWishlisted
                                    ? "bg-purple-950 text-rose-400 border-purple-500/60 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                                    : "bg-[#1A1633]/80 text-slate-400 hover:text-purple-400 border-purple-900/40"
                            }`}
                        >
                            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
                        </button>
                    </div>

                    {/* Thumbnail Switcher if multi-image */}
                    {images.length > 1 && (
                        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImgIndex(idx)}
                                    className={`w-14 h-14 rounded-lg p-1 bg-[#131024] border shrink-0 transition ${
                                        activeImgIndex === idx
                                            ? "border-purple-500 ring-2 ring-purple-500/40"
                                            : "border-purple-950/60 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <img src={img.url} alt="thumbnail" className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Product Details & Actions */}
                <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[82vh] bg-[#120F24]">
                    <div>
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-md">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1.5 text-purple-400">
                                <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                                <span className="text-white font-bold text-xs">
                                    {product.ratings?.average ? product.ratings.average.toFixed(1) : "4.8"}
                                </span>
                                <span className="text-slate-500 text-xs">
                                    ({product.ratings?.count || 128})
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-1">
                            {product.name}
                        </h2>

                        {/* Price */}
                        <div className="flex items-baseline gap-2.5 my-3">
                            <span className="text-2xl font-extrabold text-white">
                                ₹{finalPrice.toLocaleString("en-IN")}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-slate-500 line-through">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>
                            )}
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                                In Stock ({product.stock || 25})
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 text-xs leading-relaxed mb-4">
                            {product.description}
                        </p>

                        {/* Size/Spec Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-3">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5">
                                    Select Edition / Size:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                                                selectedSize === size
                                                    ? "border-purple-500 bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                                                    : "border-purple-950 bg-[#1A1633] text-slate-300 hover:bg-[#251F45]"
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
                            <div className="mb-4">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-1.5">
                                    Select Colorway:
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-3 py-1 text-xs font-medium rounded-lg border transition ${
                                                selectedColor === color
                                                    ? "border-purple-500 bg-purple-950/80 text-white font-bold ring-1 ring-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                                                    : "border-purple-950 bg-[#1A1633] text-slate-300 hover:bg-[#251F45]"
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
                        <div className="flex items-center gap-3 pt-3 border-t border-purple-950/60">
                            <div className="flex items-center border border-purple-900/50 rounded-lg overflow-hidden bg-[#1A1633]">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-2 text-slate-300 hover:text-white hover:bg-purple-950/60 text-xs font-bold"
                                >
                                    -
                                </button>
                                <span className="px-3 py-2 text-xs font-bold text-white">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-2 text-slate-300 hover:text-white hover:bg-purple-950/60 text-xs font-bold"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className={`flex-1 py-2.5 px-5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                                    added
                                        ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                        : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                                }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Added to Cart!
                                    </>
                                ) : adding ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Direct link to product page */}
                        <div className="mt-3 text-center">
                            <Link
                                to={`/product/${product._id}`}
                                onClick={onClose}
                                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-bold transition"
                            >
                                <span>View Full Product Page &amp; Tech Specs</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {/* Extra perks */}
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-purple-950/60 text-center text-[10px] text-slate-400">
                            <div className="flex flex-col items-center gap-1">
                                <Truck className="w-3.5 h-3.5 text-purple-400" />
                                <span>Express Air</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                                <span>7-Day Return</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                                <span>100% Genuine</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
