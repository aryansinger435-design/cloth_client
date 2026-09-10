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
    Cpu,
    Sparkles,
    Zap,
    MessageSquare,
    Send
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

    // Interactive user review submission state
    const [reviews, setReviews] = useState([
        {
            name: "Devendra Patel",
            rating: 5,
            date: "3 days ago",
            comment: "Absolute perfection. Build quality is aerospace grade and battery performance exceeds specs."
        },
        {
            name: "Pooja Sharma",
            rating: 5,
            date: "1 week ago",
            comment: "Packaging was premium and delivery was super fast to Mumbai. Shopnix has earned a loyal customer."
        }
    ]);
    const [newReviewAuthor, setNewReviewAuthor] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);
    const [newReviewText, setNewReviewText] = useState("");

    useEffect(() => {
        const allProds = getStoredProducts();
        const found = allProds.find((p) => p._id === id) || allProds[0];
        setProduct(found);
        setSelectedSize(found.sizes?.[0] || "Standard");
        setSelectedColor(found.colors?.[0] || "Standard");
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
            <div className="min-h-[70vh] bg-[#08070E] flex flex-col items-center justify-center p-6 text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Device Not Found</h2>
                <p className="text-sm text-slate-400">The product you are looking for does not exist or has been removed.</p>
                <Link to="/" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    Return to Storefront
                </Link>
            </div>
        );
    }

    const isWishlisted = isInWishlist(product._id);
    const images = product.images && product.images.length > 0
        ? product.images
        : [{ url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800" }];

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
        showToast("Product link copied to clipboard!", "success");
    };

    const handleAddReview = (e) => {
        e.preventDefault();
        if (!newReviewAuthor.trim() || !newReviewText.trim()) {
            showToast("Please provide your name and review feedback", "warning");
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
        showToast("Review submitted successfully! Thank you for your feedback.", "success");
    };

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-8 sm:py-12 selection:bg-purple-600 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button & Breadcrumbs */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 mb-8 pb-4 border-b border-[#1E1736]">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="inline-flex items-center gap-1 hover:text-purple-400 transition font-medium">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Catalog</span>
                        </Link>
                        <span className="text-slate-600">/</span>
                        <Link to={`/?category=${encodeURIComponent(product.category)}`} className="text-purple-400 hover:text-purple-300 hover:underline font-bold">
                            {product.category}
                        </Link>
                        <span className="text-slate-600">/</span>
                        <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
                    </div>

                    <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131024] border border-[#241D3F] text-slate-300 hover:border-purple-500/50 hover:text-white transition shadow-sm"
                    >
                        <Share2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>Share Device</span>
                    </button>
                </div>

                {/* Product Detail Top Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#131024] p-6 sm:p-10 rounded-3xl border border-[#241D3F] shadow-2xl shadow-purple-950/20 mb-14">
                    {/* Left: Gallery & Zoom Preview */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0D0B18] border border-[#241D3F] flex items-center justify-center p-8">
                            <img
                                src={currentImg}
                                alt={product.name}
                                className="w-full h-full object-contain max-h-[420px] transition-transform duration-500 hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                            />
                            {hasDiscount && (
                                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-lg shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                    {discountPercent}% OFF
                                </div>
                            )}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition ${
                                    isWishlisted
                                        ? "bg-purple-950/80 text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                        : "bg-[#131024]/80 text-slate-400 hover:text-purple-400 border-[#241D3F]"
                                }`}
                                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-purple-400 text-purple-400" : ""}`} />
                            </button>
                        </div>

                        {/* Thumbnail Selectors */}
                        {images.length > 1 && (
                            <div className="flex items-center gap-3 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImgIndex(idx)}
                                        className={`w-18 h-18 rounded-xl p-2 bg-[#0D0B18] border shrink-0 transition ${
                                            activeImgIndex === idx
                                                ? "border-purple-500 ring-2 ring-purple-500/40 bg-[#1A1532] scale-105 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                                                : "border-[#241D3F] opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img.url} alt="view" className="w-full h-full object-contain" />
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
                                <span className="px-3 py-1 bg-purple-950/60 text-purple-300 border border-purple-800/40 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-purple-400">
                                    <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                                    <span className="font-bold text-white text-sm">
                                        {product.ratings?.average ? product.ratings.average.toFixed(1) : "4.9"}
                                    </span>
                                    <span className="text-slate-400 text-xs">
                                        ({product.ratings?.count || 128} verified ratings)
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">
                                {product.tagline}
                            </p>

                            {/* Price & Stock */}
                            <div className="flex flex-wrap items-baseline gap-3 my-4 p-4 rounded-xl bg-[#0D0B18] border border-[#241D3F]">
                                <span className="text-3xl font-extrabold text-white">
                                    ₹{finalPrice.toLocaleString("en-IN")}
                                </span>
                                {hasDiscount && (
                                    <span className="text-base text-slate-500 line-through">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>
                                )}
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40 ml-auto">
                                    ✓ In Stock ({product.stock || 25} units ready to dispatch)
                                </span>
                            </div>

                            {/* Description snippet */}
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Size/Spec Selection */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Available Specifications / Edition:
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.sizes.map((sz) => (
                                            <button
                                                key={sz}
                                                type="button"
                                                onClick={() => setSelectedSize(sz)}
                                                className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                                                    selectedSize === sz
                                                        ? "border-purple-500 bg-purple-950/80 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                        : "border-[#241D3F] text-slate-300 bg-[#0D0B18] hover:border-purple-500/40"
                                                }`}
                                            >
                                                {sz}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Color Edition Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                        Select Colorway:
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setSelectedColor(color)}
                                                className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                                                    selectedColor === color
                                                        ? "border-purple-500 bg-purple-950/80 text-purple-200 ring-1 ring-purple-500/50 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                                                        : "border-[#241D3F] text-slate-300 bg-[#0D0B18] hover:border-purple-500/40"
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
                        <div className="pt-6 border-t border-[#1E1736] space-y-4">
                            <div className="flex items-center gap-3">
                                {/* Quantity Incrementer */}
                                <div className="flex items-center border border-[#241D3F] rounded-xl overflow-hidden bg-[#0D0B18]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1A162F] font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-3 text-sm font-black text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-[#1A162F] font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Add to Cart */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all border shadow-lg ${
                                        added
                                            ? "bg-emerald-600 text-white border-emerald-600"
                                            : "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                    }`}
                                >
                                    {added ? (
                                        <>
                                            <Check className="w-5 h-5 text-white" />
                                            <span>Added to Bag</span>
                                        </>
                                    ) : adding ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5 text-purple-200" />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>

                                {/* Buy Now Instant Checkout */}
                                <button
                                    onClick={handleBuyNow}
                                    className="flex-1 py-3.5 px-6 rounded-xl font-black text-sm bg-[#1F193B] hover:bg-[#2A2350] text-purple-200 hover:text-white border border-purple-500/40 transition-all flex items-center justify-center gap-2 shadow-sm hover:border-purple-500/70"
                                >
                                    <Zap className="w-5 h-5 fill-purple-400 text-purple-400" />
                                    <span>Buy Now</span>
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1E1736] text-center text-xs text-slate-400">
                                <div className="flex flex-col items-center gap-1">
                                    <Truck className="w-4 h-4 text-purple-400" />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <RefreshCw className="w-4 h-4 text-purple-400" />
                                    <span>7-Day Return</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                                    <span>100% Genuine</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= INTERACTIVE TABS ================= */}
                <div className="bg-[#131024] rounded-3xl border border-[#241D3F] p-6 sm:p-8 mb-16 shadow-xl">
                    <div className="flex items-center gap-3 border-b border-[#1E1736] pb-4 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "overview"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#1A162F]"
                            }`}
                        >
                            Overview &amp; Features
                        </button>
                        <button
                            onClick={() => setActiveTab("specs")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "specs"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#1A162F]"
                            }`}
                        >
                            Technical Specifications
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                                activeTab === "reviews"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#1A162F]"
                            }`}
                        >
                            <span>Customer Reviews</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${activeTab === "reviews" ? "bg-purple-400/20 text-purple-200" : "bg-purple-950/60 text-purple-300"}`}>
                                {reviews.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab("shipping")}
                            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                                activeTab === "shipping"
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    : "text-slate-400 hover:text-white hover:bg-[#1A162F]"
                            }`}
                        >
                            Shipping &amp; Warranty
                        </button>
                    </div>

                    <div className="pt-6">
                        {/* Tab 1: Overview */}
                        {activeTab === "overview" && (
                            <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-w-3xl">
                                <h3 className="text-lg font-bold text-white">Engineered for Next-Generation Performance</h3>
                                <p>{product.description}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div className="p-4 rounded-xl bg-[#0D0B18] border border-[#241D3F]">
                                        <p className="font-bold text-purple-300 text-xs">⚡ Ultra-Low Latency Tech</p>
                                        <p className="text-xs text-slate-400 mt-1">Experience lag-free spatial precision with custom hardware optimization.</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-[#0D0B18] border border-[#241D3F]">
                                        <p className="font-bold text-purple-300 text-xs">🛡️ Certified Durability</p>
                                        <p className="text-xs text-slate-400 mt-1">Rigorous drop-tested and weather-sealed build for long-lasting endurance.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Technical Specifications */}
                        {activeTab === "specs" && (
                            <div className="max-w-2xl">
                                <div className="rounded-xl border border-[#241D3F] overflow-hidden">
                                    <table className="w-full text-xs sm:text-sm text-left">
                                        <tbody className="divide-y divide-[#1E1736]">
                                            {product.specs ? (
                                                Object.entries(product.specs).map(([key, val]) => (
                                                    <tr key={key} className="hover:bg-[#1A162F] transition">
                                                        <td className="py-3 px-4 font-bold text-purple-300 w-1/3 bg-[#0D0B18]">
                                                            {key}
                                                        </td>
                                                        <td className="py-3 px-4 text-slate-200 font-medium bg-[#131024]">
                                                            {val}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="p-4 text-slate-400">Detailed specifications available in packaging manual.</td>
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
                                <form onSubmit={handleAddReview} className="p-5 rounded-xl bg-[#0D0B18] border border-[#241D3F] space-y-4">
                                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-purple-400" />
                                        <span>Write a Customer Review</span>
                                    </h4>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Full Name"
                                            value={newReviewAuthor}
                                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                                            className="px-3.5 py-2.5 bg-[#131024] text-white rounded-xl text-xs border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                        />

                                        <div className="flex items-center gap-2 px-3 py-2 bg-[#131024] rounded-xl border border-[#2E2452] text-xs">
                                            <span className="text-slate-400">Rating:</span>
                                            <select
                                                value={newReviewRating}
                                                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                                                className="bg-transparent font-bold text-purple-400 outline-none cursor-pointer"
                                            >
                                                <option value={5} className="bg-[#131024] text-white">★★★★★ 5 Stars</option>
                                                <option value={4} className="bg-[#131024] text-white">★★★★☆ 4 Stars</option>
                                                <option value={3} className="bg-[#131024] text-white">★★★☆☆ 3 Stars</option>
                                            </select>
                                        </div>
                                    </div>

                                    <textarea
                                        rows={3}
                                        placeholder="Share your experience with this device..."
                                        value={newReviewText}
                                        onChange={(e) => setNewReviewText(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-[#131024] text-white rounded-xl text-xs border border-[#2E2452] outline-none focus:border-purple-500 placeholder-slate-500"
                                    />

                                    <button
                                        type="submit"
                                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Submit Review</span>
                                    </button>
                                </form>

                                {/* Reviews List */}
                                <div className="space-y-4">
                                    {reviews.map((rev, idx) => (
                                        <div key={idx} className="p-4 rounded-xl bg-[#0D0B18] border border-[#241D3F] space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-white text-xs">{rev.name}</span>
                                                    <span className="text-[10px] text-purple-300 font-semibold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                                                        Verified Buyer
                                                    </span>
                                                </div>
                                                <span className="text-[11px] text-slate-500">{rev.date}</span>
                                            </div>
                                            <div className="flex items-center text-purple-400">
                                                {[...Array(rev.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
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
                                <h4 className="font-bold text-white text-base">Pan-India Express Dispatch</h4>
                                <p>
                                    All orders are processed and dispatched within 24 business hours from our state-of-the-art Haryana fulfillment hub.
                                    Delivery takes 2-4 business days across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, and major tier-1 &amp; 2 cities.
                                </p>
                                <div className="p-4 rounded-xl bg-[#0D0B18] border border-[#241D3F] space-y-2">
                                    <p className="font-bold text-purple-300 text-xs">Official 1-Year Pan-India Replacement Warranty</p>
                                    <p className="text-xs text-slate-400">
                                        Includes door-step pickup and instant replacement for any manufacturing defects or hardware failures.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ================= RELATED PRODUCTS ================= */}
                {relatedProducts.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white">Recommended Smart Devices</h3>
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
