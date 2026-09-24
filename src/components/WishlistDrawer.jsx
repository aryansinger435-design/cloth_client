import React from "react";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function WishlistDrawer() {
    const { wishlist, wishlistCount, removeFromWishlist, clearWishlist, isDrawerOpen, setIsDrawerOpen } = useWishlist();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (!isDrawerOpen) return null;

    const handleMoveToCart = async (product) => {
        const size = product.sizes?.[0] || "Standard";
        const color = product.colors?.[0] || "Standard";

        try {
            await addToCart(product._id, 1, size, color);
            removeFromWishlist(product._id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
                onClick={() => setIsDrawerOpen(false)}
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
                <div className="w-screen max-w-full sm:max-w-md bg-[#0D0F18] border-l border-[#252B3E] text-slate-100 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-right duration-300">
                    {/* Header */}
                    <div className="p-5 border-b border-[#202538] flex items-center justify-between bg-[#090B12]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#1A1F30] border border-[#C5A059]/40 flex items-center justify-center text-[#E5C158]">
                                <Heart className="w-5 h-5 fill-[#E5C158] text-[#E5C158]" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white tracking-tight font-serif">Collector's Vault</h2>
                                <p className="text-xs text-[#E5C158] font-semibold">{wishlistCount} curated {wishlistCount === 1 ? "timepiece" : "timepieces"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {wishlistCount > 0 && (
                                <button
                                    onClick={clearWishlist}
                                    className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 rounded-lg hover:bg-rose-950/30 transition"
                                >
                                    Clear all
                                </button>
                            )}
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1A1F30] transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#202538] scrollbar-none">
                        {wishlistCount === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-[#1A1F30] border border-[#C5A059]/40 flex items-center justify-center text-[#E5C158] shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-bold text-white font-serif">Your vault is empty</h3>
                                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                                    Browse our 100-piece luxury horology catalog and click the vault icon on any timepiece to curate your private collection.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsDrawerOpen(false);
                                        const el = document.getElementById("products-section");
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                        else navigate("/");
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#E5C158] hover:from-[#E5C158] hover:to-[#D4AF37] text-slate-950 text-xs font-black shadow-[0_0_15px_rgba(212,175,55,0.4)] transition"
                                >
                                    Explore Timepieces
                                </button>
                            </div>
                        ) : (
                            wishlist.map((item) => {
                                const hasDiscount = item.discount_price > 0 && item.discount_price < item.price;
                                const finalPrice = hasDiscount ? item.discount_price : item.price;
                                const img = item.images?.[0]?.url || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300";

                                return (
                                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4 group">
                                        <div
                                            onClick={() => {
                                                setIsDrawerOpen(false);
                                                navigate(`/product/${item._id}`);
                                            }}
                                            className="w-16 h-16 sm:w-20 sm:h-20 bg-[#07080D] rounded-xl overflow-hidden p-2 shrink-0 border border-[#252B3E] flex items-center justify-center cursor-pointer hover:border-[#C5A059]/60 transition"
                                        >
                                            <img
                                                src={img}
                                                alt={item.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5C158] block">
                                                {item.category}
                                            </span>
                                            <h4
                                                onClick={() => {
                                                    setIsDrawerOpen(false);
                                                    navigate(`/product/${item._id}`);
                                                }}
                                                className="text-sm font-bold text-white hover:text-[#E5C158] transition truncate cursor-pointer font-serif"
                                            >
                                                {item.name}
                                            </h4>

                                            <div className="flex items-baseline gap-2 mt-1">
                                                <span className="text-sm font-extrabold text-white">
                                                    ₹{finalPrice.toLocaleString("en-IN")}
                                                </span>
                                                {hasDiscount && (
                                                    <span className="text-[11px] text-slate-500 line-through">
                                                        ₹{item.price.toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleMoveToCart(item)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] hover:from-[#E5C158] hover:to-[#D4AF37] text-slate-950 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(212,175,55,0.35)] transition"
                                                >
                                                    <ShoppingBag className="w-3.5 h-3.5" />
                                                    <span>Move to Cart</span>
                                                </button>

                                                <button
                                                    onClick={() => removeFromWishlist(item._id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition"
                                                    title="Remove from Vault"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer actions */}
                    {wishlistCount > 0 && (
                        <div className="p-5 border-t border-[#202538] bg-[#090B12] space-y-3">
                            <button
                                onClick={async () => {
                                    for (const item of wishlist) {
                                        await handleMoveToCart(item);
                                    }
                                    setIsDrawerOpen(false);
                                    navigate("/cart");
                                }}
                                className="w-full py-3 bg-gradient-to-r from-[#C5A059] via-[#E5C158] to-[#AA771C] hover:from-[#E5C158] hover:to-[#D4AF37] text-slate-950 font-black text-sm rounded-xl transition shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4 text-slate-950" />
                                <span>Move All Timepieces to Acquisition Cart</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
