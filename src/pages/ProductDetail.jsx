import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Star,
    ShoppingBag,
    Check,
    Truck,
    RefreshCw,
    ShieldCheck,
    ArrowLeft,
    Share2,
    Heart,
    Crown,
    Award,
    Sparkles,
    Zap,
    MessageSquare,
    Send,
    Watch,
    Clock
} from "lucide-react";
import { getStoredProducts } from "../api/shopnixStore";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { showToast } = useToast();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Interactive connoisseur review submission state
    const [reviews, setReviews] = useState([
        {
            name: "Maharaja Samarjit Singh",
            rating: 5,
            date: "3 days ago",
            comment: "Exceptional horological finishing. The bevelled bridges, hand-blued screws, and sweeping second hand rival top Swiss manufactures. Outstanding timekeeping accuracy."
        },
        {
            name: "Vikramaditya Oberoi",
            rating: 5,
            date: "1 week ago",
            comment: "Received via armored courier in an exquisite lacquered mahogany box with official COSC papers. The sapphire crystal anti-reflective clarity is simply mesmerizing."
        }
    ]);
    const [newReviewAuthor, setNewReviewAuthor] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [newReviewText, setNewReviewText] = useState("");

    useEffect(() => {
        const allProds = getStoredProducts();
        const found = allProds.find((p) => p._id === id) || allProds[0];
        setProduct(found);
        setSelectedSize(found.sizes?.[0] || "41mm");
        setSelectedColor(found.colors?.[0] || "Brushed Gold / Black Ceramic");
        setActiveImgIndex(0);

        // Related category products
        const related = allProds
            .filter((p) => p.category === found.category && p._id !== found._id)
            .slice(0, 4);
        setRelatedProducts(related);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-[70vh] bg-[#040406] flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Crown className="w-12 h-12 text-[#D4AF37]" />
                <h2 className="text-2xl font-bold text-white font-serif">Timepiece Not Found</h2>
                <p className="text-sm text-slate-400">The requested timepiece is not cataloged or has been archived into our private reserve.</p>
                <Link to="/" className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Return to The Vault
                </Link>
            </div>
        );
    }

    const isWishlisted = isInWishlist(product._id);
    const images = product.images && product.images.length > 0
        ? product.images
        : [{ url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800" }];

    const currentImg = images[activeImgIndex]?.url || images[0]?.url;

    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    const handleAddToCart = async () => {
        try {
            setAdding(true);
            await addToCart(product._id, quantity, selectedSize, selectedColor);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const handleBuyNow = async () => {
        await addToCart(product._id, quantity, selectedSize, selectedColor);
        navigate("/cart");
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast("Timepiece link copied to clipboard!", "success");
    };

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReviewAuthor.trim() || !newReviewText.trim()) {
            showToast("Please provide your name and connoisseur feedback", "warning");
            return;
        }

        const newReview = {
            name: newReviewAuthor.trim(),
            rating: newReviewRating,
            date: "Just now",
            comment: newReviewText.trim()
        };

        setReviews([newReview, ...reviews]);
        setNewReviewAuthor("");
        setNewReviewText("");
        showToast("Connoisseur review recorded in timepiece provenance registry.", "success");
    };

    return (
        <div className="min-h-screen bg-[#040406] text-slate-100 py-8 sm:py-12 selection:bg-[#D4AF37] selection:text-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button & Breadcrumbs */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-8 pb-4 border-b border-[#151722]">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="inline-flex items-center gap-1 hover:text-[#D4AF37] transition font-medium">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Vault Catalog</span>
                        </Link>
                        <span className="text-slate-600">/</span>
                        <Link to={`/?category=${encodeURIComponent(product.category)}`} className="text-[#D4AF37] hover:text-[#F9E7B9] hover:underline font-bold">
                            {product.category}
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
                    </div>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080D] border border-[#151722] text-slate-300 hover:border-[#D4AF37]/50 hover:text-white transition shadow-sm"
                    >
                        <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Share Timepiece</span>
                    </button>
                </div>

                {/* Product Detail Top Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#07080D] p-6 sm:p-10 rounded-3xl border border-[#151722] shadow-2xl shadow-black/80 mb-14">
                    {/* Left: Gallery & Zoom Preview */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#030406] border border-[#151722] flex items-center justify-center p-8">
                            <img
                                src={currentImg}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                            />
                            {hasDiscount && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black text-xs font-black uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                    {discountPercent}% ALLOCATION PRIVILEGE
                                </div>
                            )}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition ${
                                    isWishlisted
                                        ? "bg-[#0A0C13] text-[#D4AF37] border-[#D4AF37]/80 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                        : "bg-[#07080D]/80 text-slate-400 hover:text-[#D4AF37] border-[#151722]"
                                }`}
                                title={isWishlisted ? "Remove from Collector's Vault" : "Store in Collector's Vault"}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#D4AF37] text-[#D4AF37]" : ""}`} />
                            </button>
                        </div>

                        {/* Thumbnail Selectors */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImgIndex(idx)}
                                        className={`w-20 h-20 rounded-xl p-1 bg-[#030406] border shrink-0 transition overflow-hidden ${
                                            activeImgIndex === idx
                                                ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/50 bg-[#0A0C13] scale-105 shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                                                : "border-[#151722] opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img.url} alt="view" className="w-full h-full object-cover rounded-lg" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info & Buy Box */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div>
                            {/* Category & Rating */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="px-3 py-1 bg-[#0A0C13] text-[#E5C158] border border-[#D4AF37]/40 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-[#D4AF37]">
                                    <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                                    <span className="font-bold text-white text-sm">
                                        {product.ratings?.average ? product.ratings.average.toFixed(1) : "4.9"}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                        ({product.ratings?.count || 85} verified connoisseurs)
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-serif">
                                {product.name}
                            </h1>

                            <p className="text-[#D4AF37] font-medium text-xs sm:text-sm mt-1 tracking-wide">
                                {product.tagline}
                            </p>

                            {/* Price & Stock */}
                            <div className="flex flex-wrap items-baseline gap-3 my-4 p-4 rounded-xl bg-[#030406] border border-[#151722]">
                                <span className="text-3xl font-extrabold text-white">
                                    ₹{finalPrice.toLocaleString("en-IN")}
                                </span>
                                {hasDiscount && (
                                    <span className="text-base text-slate-500 line-through">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>
                                )}
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40 ml-auto">
                                    ✓ In Vault ({product.stock || 8} allocations reserved)
                                </span>
                            </div>

                            {/* Description snippet */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Case Diameter Selector */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Case Diameter / Dimension:
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.sizes.map((sz) => (
                                            <button
                                                key={sz}
                                                type="button"
                                                onClick={() => setSelectedSize(sz)}
                                                className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                                                    selectedSize === sz
                                                        ? "border-[#D4AF37] bg-[#0A0C13] text-[#E5C158] shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                                        : "border-[#151722] text-slate-300 bg-[#030406] hover:border-[#D4AF37]/40"
                                                }`}
                                            >
                                                {sz}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dial & Strap Finish Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Dial &amp; Strap Finish:
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                                                    selectedColor === color
                                                        ? "border-[#D4AF37] bg-[#0A0C13] text-[#E5C158] ring-1 ring-[#D4AF37]/60 shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                                                        : "border-[#151722] text-slate-300 bg-[#030406] hover:border-[#D4AF37]/40"
                                                }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons Box */}
                        <div className="pt-6 border-t border-[#151722] space-y-4">
                            <div className="flex items-center gap-3">
                                {/* Quantity Incrementer */}
                                <div className="flex items-center border border-[#151722] rounded-xl overflow-hidden bg-[#030406]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-[#0A0C13] font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-3 text-sm font-black text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-[#0A0C13] font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className={`flex-1 py-3.5 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all border shadow-lg ${
                                        added
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black border-[#E5C158] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                                    }`}
                                >
                                    {added ? (
                                        <>
                                            <Check className="w-5 h-5 text-black" />
                                            <span>Reserved in Vault</span>
                                        </>
                                    ) : adding ? (
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5 text-black" />
                                            <span>Acquire Timepiece</span>
                                        </>
                                    )}
                                </button>

                                {/* Buy Now Instant Checkout */}
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#0A0C13] hover:bg-[#20273D] text-[#E5C158] hover:text-white border border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 shadow-sm hover:border-[#D4AF37]"
                                >
                                    <Crown className="w-4 h-4 text-[#D4AF37]" />
                                    <span>Instant Acquisition</span>
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#151722] text-center text-xs text-slate-400">
                                <div className="flex flex-col items-center gap-1">
                                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                                    <span>Armored Courier</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
                                    <span>7-Day Inspection</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                                    <span>COSC & 5-Yr Warranty</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= INTERACTIVE TABS ================= */}
                <div className="bg-[#07080D] rounded-3xl border border-[#151722] p-6 sm:p-8 mb-16 shadow-xl">
                    <div className="flex items-center gap-3 border-b border-[#151722] pb-4 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "overview"
                                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                            }`}
                        >
                            Horological Architecture
                        </button>
                        <button
                            onClick={() => setActiveTab("specs")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "specs"
                                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                            }`}
                        >
                            Calibre &amp; Technical Specs
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                                activeTab === "reviews"
                                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                            }`}
                        >
                            <span>Connoisseur Reviews</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${activeTab === "reviews" ? "bg-black/20 text-black" : "bg-[#0A0C13] text-[#E5C158]"}`}>
                                {reviews.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("shipping")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "shipping"
                                    ? "bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#0A0C13]"
                            }`}
                        >
                            Provenance &amp; Warranty
                        </button>
                    </div>

                    <div className="pt-6">
                        {/* Tab 1: Overview */}
                        {activeTab === "overview" && (
                            <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-w-3xl">
                                <h3 className="text-lg font-bold text-white font-serif">Hand-Finished In The Purest Horological Tradition</h3>
                                <p>{product.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="p-4 rounded-xl bg-[#030406] border border-[#151722]">
                                        <p className="font-bold text-[#E5C158] text-xs flex items-center gap-1.5">
                                            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                                            <span>Manufacture Calibre Heritage</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">High-frequency escapement calibrated to COSC precision tolerances (-2/+2 sec/day).</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#030406] border border-[#151722]">
                                        <p className="font-bold text-[#E5C158] text-xs flex items-center gap-1.5">
                                            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                                            <span>Sapphire Crystal &amp; Metallurgy</span>
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">Double-anti-reflective sapphire front & exhibition caseback with 316L/Grade 5 titanium casing.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Technical Specifications */}
                        {activeTab === "specs" && (
                            <div className="max-w-2xl">
                                <div className="rounded-xl border border-[#151722] overflow-hidden">
                                    <table className="w-full text-xs sm:text-sm text-left">
                                        <tbody className="divide-y divide-[#23293D]">
                                            {product.specs ? (
                                                Object.entries(product.specs).map(([key, val]) => (
                                                    <tr key={key} className="hover:bg-[#0A0C13] transition">
                                                        <td className="py-3 px-4 font-bold text-[#D4AF37] w-1/3 bg-[#030406]">
                                                            {key}
                                                        </td>
                                                        <td className="py-3 px-4 text-slate-200 font-medium bg-[#07080D]">
                                                            {val}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="p-4 text-slate-400">Detailed movement specs provided in leather-bound certificate booklet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Customer Reviews */}
                        {activeTab === "reviews" && (
                            <div className="space-y-8 max-w-3xl">
                                {/* Write a Review Form */}
                                <form onSubmit={handleAddReview} className="p-5 rounded-xl bg-[#030406] border border-[#151722] space-y-4">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2 font-serif">
                                        <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                                        <span>Submit Provenance Feedback</span>
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Connoisseur Name"
                                            value={newReviewAuthor}
                                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                                            className="px-3.5 py-2.5 bg-[#07080D] text-white rounded-xl text-xs border border-[#151722] outline-none focus:border-[#D4AF37] placeholder-slate-500"
                                        />

                                        <div className="flex items-center gap-2 px-3 py-2 bg-[#07080D] rounded-xl border border-[#151722] text-xs">
                                            <span className="text-slate-400">Rating:</span>
                                            <select
                                                value={newReviewRating}
                                                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                                                className="bg-transparent font-bold text-[#E5C158] outline-none cursor-pointer"
                                            >
                                                <option value={5} className="bg-[#07080D] text-white">★★★★★ 5 Stars (Masterpiece)</option>
                                                <option value={4} className="bg-[#07080D] text-white">★★★★☆ 4 Stars (Excellent)</option>
                                                <option value={3} className="bg-[#07080D] text-white">★★★☆☆ 3 Stars (Good)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <textarea
                                        rows={3}
                                        placeholder="Share your impressions on the movement, finishing, and wrist presence..."
                                        value={newReviewText}
                                        onChange={(e) => setNewReviewText(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-[#07080D] text-white rounded-xl text-xs border border-[#151722] outline-none focus:border-[#D4AF37] placeholder-slate-500"
                                    />

                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                    >
                                        <Send className="w-3.5 h-3.5 text-black" />
                                        <span>Record Review</span>
                                    </button>
                                </form>

                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {reviews.map((rev, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-[#030406] border border-[#151722] space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-xs">{rev.name}</span>
                                                    <span className="text-[10px] text-[#E5C158] font-bold bg-[#0A0C13] px-2 py-0.5 rounded border border-[#D4AF37]/40">
                                                        Verified Collector
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-500">{rev.date}</span>
                                            </div>
                                            <div className="flex items-center text-[#D4AF37]">
                                                {[...Array(rev.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                                                ))}
                                            </div>
                                            <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab 4: Shipping & Warranty */}
                        {activeTab === "shipping" && (
                            <div className="space-y-4 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                                <h4 className="font-bold text-white text-base font-serif">Armored White-Glove Transit</h4>
                                <p>
                                    Every Chrononix timepiece is dispatched inside a tamper-evident locked presentation vault via bonded armored couriers. Direct transit tracking with GPS and personalized identification delivery to ensure pristine arrival.
                                </p>
                                <div className="p-4 rounded-xl bg-[#030406] border border-[#151722] space-y-2">
                                    <p className="font-bold text-[#E5C158] text-xs">Chrononix 5-Year Global Heritage Warranty</p>
                                    <p className="text-xs text-slate-400">
                                        Includes full movement servicing, lubrication renewal, gasket replacement, water-resistance pressure chamber testing, and ultrasonic case cleaning at authorized service ateliers worldwide.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ================= RELATED PRODUCTS ================= */}
                {relatedProducts.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white font-serif">Complementary Horological Creations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
