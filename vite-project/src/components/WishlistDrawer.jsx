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

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-900 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                    {/* Header */}
                    <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-900 tracking-tight">Your Saved Wishlist</h2>
                                <p className="text-xs text-rose-600 font-semibold">{wishlistCount} saved {wishlistCount === 1 ? "item" : "items"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {wishlistCount > 0 && (
                                <button
                                    onClick={clearWishlist}
                                    className="text-xs text-slate-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                                >
                                    Clear all
                                </button>
                            )}
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content List */}
                    <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100">
                        {wishlistCount === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                                <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">Your wishlist is empty</h3>
                                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                                    Browse our products catalog and click the heart icon on any device to save it for later.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsDrawerOpen(false);
                                        const el = document.getElementById("products-section");
                                        if (el) el.scrollIntoView({ behavior: "smooth" });
                                        else navigate("/");
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-black shadow-sm transition"
                                >
                                    Explore Products
                                </button>
                            </div>
                        ) : (
                            wishlist.map((item) => {
                                const hasDiscount = item.discount_price > 0 && item.discount_price < item.price;
                                const finalPrice = hasDiscount ? item.discount_price : item.price;
                                const img = item.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300";

                                return (
                                    <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4 group">
                                        <div
                                            onClick={() => {
                                                setIsDrawerOpen(false);
                                                navigate(`/product/${item._id}`);
                                            }}
                                            className="w-18 h-18 sm:w-20 sm:h-20 bg-slate-50 rounded-xl overflow-hidden p-2 shrink-0 border border-slate-200 flex items-center justify-center cursor-pointer hover:border-amber-400 transition"
                                        >
                                            <img
                                                src={img}
                                                alt={item.name}
                                                className="w-full h-full object-contain group-hover:scale-105 transition"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                                                {item.category}
                                            </span>
                                            <h4
                                                onClick={() => {
                                                    setIsDrawerOpen(false);
                                                    navigate(`/product/${item._id}`);
                                                }}
                                                className="text-sm font-bold text-slate-800 hover:text-amber-600 transition truncate cursor-pointer"
                                            >
                                                {item.name}
                                            </h4>

                                            <div className="flex items-baseline gap-2 mt-1">
                                                <span className="text-sm font-extrabold text-slate-900">
                                                    ₹{finalPrice.toLocaleString("en-IN")}
                                                </span>
                                                {hasDiscount && (
                                                    <span className="text-[11px] text-slate-400 line-through">
                                                        ₹{item.price.toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleMoveToCart(item)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-lg text-xs font-bold shadow-xs transition"
                                                >
                                                    <ShoppingBag className="w-3.5 h-3.5" />
                                                    <span>Move to Cart</span>
                                                </button>

                                                <button
                                                    onClick={() => removeFromWishlist(item._id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                                                    title="Remove from Wishlist"
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
                        <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                            <button
                                onClick={async () => {
                                    for (const item of wishlist) {
                                        await handleMoveToCart(item);
                                    }
                                    setIsDrawerOpen(false);
                                    navigate("/cart");
                                }}
                                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4 text-slate-950" />
                                <span>Move All Items to Cart</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
