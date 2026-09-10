import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Search,
    Sparkles,
    ArrowRight,
    X,
    Play,
    Truck,
    ShieldCheck,
    RefreshCw,
    Headphones,
    Monitor,
    Watch,
    Gamepad2,
    Camera,
    Cpu,
    Star,
    Clock,
    CheckCircle2,
    Flame
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import VideoModal from "../components/VideoModal";
import { getStoredProducts } from "../api/shopnixStore";
import { useToast } from "../context/ToastContext";

const CATEGORIES = [
    { name: "All", icon: Sparkles },
    { name: "Smart Devices", icon: Watch },
    { name: "Audio", icon: Headphones },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Cameras", icon: Camera },
    { name: "Electronics", icon: Monitor },
    { name: "AI Devices", icon: Cpu }
];

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { showToast } = useToast();

    const currentCategory = searchParams.get("category") || "All";
    const currentSearch = searchParams.get("search") || "";

    const [allProducts, setAllProducts] = useState(() => getStoredProducts());
    const [selectedSort, setSelectedSort] = useState("featured");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState("");

    // Live Flash Sale Timer (Hours:Minutes:Seconds)
    const [countdown, setCountdown] = useState({ hours: 14, minutes: 28, seconds: 45 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return { hours: 24, minutes: 0, seconds: 0 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Filter and sort products using useMemo
    const filteredProducts = useMemo(() => {
        let list = [...allProducts];

        // Category filter
        if (currentCategory && currentCategory !== "All") {
            list = list.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase());
        }

        // Search query filter
        if (currentSearch) {
            const q = currentSearch.toLowerCase();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        // Price range filter
        if (minPrice) {
            list = list.filter((p) => (p.discount_price || p.price) >= Number(minPrice));
        }
        if (maxPrice) {
            list = list.filter((p) => (p.discount_price || p.price) <= Number(maxPrice));
        }

        // In-stock only filter
        if (inStockOnly) {
            list = list.filter((p) => p.stock > 0);
        }

        // Sorting
        if (selectedSort === "price_asc") {
            list.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        } else if (selectedSort === "price_desc") {
            list.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        } else if (selectedSort === "rating") {
            list.sort((a, b) => (b.ratings?.average || 0) - (a.ratings?.average || 0));
        } else if (selectedSort === "featured") {
            list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        }

        return list;
    }, [allProducts, currentCategory, currentSearch, minPrice, maxPrice, selectedSort, inStockOnly]);

    const handleCategorySelect = (cat) => {
        const next = new URLSearchParams(searchParams);
        if (cat === "All") {
            next.delete("category");
        } else {
            next.set("category", cat);
        }
        setSearchParams(next);
    };

    const handleClearSearch = () => {
        const next = new URLSearchParams(searchParams);
        next.delete("search");
        setSearchParams(next);
    };

    const handleResetAllFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setInStockOnly(false);
        setSelectedSort("featured");
        setSearchParams({});
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!newsletterEmail || !newsletterEmail.includes("@")) {
            showToast("Please enter a valid email address", "warning");
            return;
        }
        showToast("Subscribed successfully! You will receive VIP launch deals.", "success");
        setNewsletterEmail("");
    };

    // Flash sale top 4 items
    const flashSaleProducts = allProducts.filter((p) => p.discount_price > 0).slice(0, 4);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-amber-500 selection:text-slate-950">
            {/* ================= HERO SECTION ================= */}
            <section className="relative bg-gradient-to-b from-[#090D1A] via-[#0F172A] to-[#090D1A] text-white pt-12 pb-20 overflow-hidden border-b border-slate-800">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Hero Content */}
                        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] font-extrabold tracking-widest text-amber-400 uppercase">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>ORIGINAL BRAND ELECTRONICS • 2026 FLAGSHIP EDITION</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
                                Next-Gen <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
                                    Smart Devices
                                </span>
                            </h1>

                            <p className="text-slate-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                                Discover India's curated destination for authentic wearables, spatial audio, 4K action cameras, and gaming hardware with manufacturer warranty &amp; express shipping.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                                <a
                                    href="#products-section"
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/25 hover:scale-105 flex items-center gap-2 group"
                                >
                                    <span>Explore Catalog</span>
                                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition" />
                                </a>

                                <button
                                    onClick={() => setVideoModalOpen(true)}
                                    className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm transition border border-slate-700 flex items-center gap-2.5 shadow-sm"
                                >
                                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                                        <Play className="w-3.5 h-3.5 fill-amber-400 ml-0.5" />
                                    </div>
                                    <span>Watch Showcase</span>
                                </button>
                            </div>

                            {/* Trust metrics bar */}
                            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                <div>
                                    <p className="text-xl font-black text-white">25k+</p>
                                    <p className="text-xs text-slate-400">Happy Shoppers</p>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-amber-400">100%</p>
                                    <p className="text-xs text-slate-400">Genuine Devices</p>
                                </div>
                                <div>
                                    <p className="text-xl font-black text-white">4.9 ★</p>
                                    <p className="text-xs text-slate-400">Verified Rating</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Hero Stage */}
                        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[440px]">
                            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
                                {/* Subtle pedestal glow */}
                                <div className="absolute inset-8 rounded-full bg-amber-500/10 blur-3xl"></div>
                                <div className="absolute inset-12 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
                                    <div className="w-52 h-52 rounded-full border border-amber-500/20"></div>
                                </div>

                                {/* Centerpiece Product */}
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                                    alt="Shopnix Audio Headset"
                                    className="relative z-20 w-72 h-72 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-float"
                                />

                                {/* Floating Card 1: Spatial Audio */}
                                <div
                                    onClick={() => setQuickViewProduct(allProducts[2] || allProducts[0])}
                                    className="absolute -top-2 left-2 z-30 bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl cursor-pointer hover:scale-105 transition"
                                >
                                    <p className="text-[10px] text-amber-400 font-bold mb-1">Spatial Audio 7.1</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                                            <Headphones className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">Lossless LDAC</p>
                                            <p className="text-[10px] text-emerald-400 font-medium">Quick Preview</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Card 2: Titanium Smart Watch */}
                                <div
                                    onClick={() => setQuickViewProduct(allProducts[0])}
                                    className="absolute -bottom-3 left-4 z-30 bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-slate-700 p-1 flex items-center justify-center text-amber-400">
                                        <Watch className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-white">Quantum Ultra</p>
                                        <p className="text-[10px] text-slate-300">ECG &amp; SpO2 Sensor</p>
                                    </div>
                                </div>

                                {/* Floating Card 3: Flash Discount */}
                                <div className="absolute top-1/3 -right-2 z-30 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black shadow-lg">
                                    UP TO 35% OFF
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FLASH DEALS SECTION ================= */}
            <section id="flash-deals-section" className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-rose-600 text-xs font-extrabold uppercase tracking-widest mb-1">
                                <Flame className="w-4 h-4 fill-rose-600" />
                                <span>LIMITED TIME LIGHTNING DEALS</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                Flash Deals of the Day
                            </h2>
                        </div>

                        {/* Countdown Timer Box */}
                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                            <Clock className="w-4 h-4 text-rose-600" />
                            <span className="text-xs font-semibold text-slate-600">Ends in:</span>
                            <div className="flex items-center gap-1 font-mono font-bold text-xs text-white">
                                <span className="bg-slate-900 px-2 py-0.5 rounded">
                                    {String(countdown.hours).padStart(2, "0")}h
                                </span>
                                <span className="text-slate-900">:</span>
                                <span className="bg-slate-900 px-2 py-0.5 rounded">
                                    {String(countdown.minutes).padStart(2, "0")}m
                                </span>
                                <span className="text-slate-900">:</span>
                                <span className="bg-rose-600 px-2 py-0.5 rounded">
                                    {String(countdown.seconds).padStart(2, "0")}s
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Flash Sale Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {flashSaleProducts.map((prod) => (
                            <ProductCard
                                key={`flash-${prod._id}`}
                                product={prod}
                                onQuickView={(p) => setQuickViewProduct(p)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CATEGORY PILLS BAR ================= */}
            <section className="py-4 bg-white/95 border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 backdrop-blur-md shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = currentCategory.toLowerCase() === cat.name.toLowerCase();
                            const count = cat.name === "All"
                                ? allProducts.length
                                : allProducts.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;

                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => handleCategorySelect(cat.name)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                                        isActive
                                            ? "bg-slate-950 text-amber-400 border-slate-950 shadow-md shadow-slate-950/20"
                                            : "bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:text-slate-950 hover:bg-slate-50"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    <span>{cat.name}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? "bg-amber-400/20 text-amber-300" : "bg-slate-100 text-slate-600"}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= MAIN CATALOG SECTION ================= */}
            <section id="products-section" className="py-12 lg:py-16 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Catalog Header & Filters Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                {currentCategory === "All" ? "Featured Tech Catalog" : `${currentCategory} Collection`}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Showing {filteredProducts.length} devices available with pan-India fast shipping
                            </p>
                        </div>

                        {/* Sorting & Filter Controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* In Stock toggle */}
                            <button
                                onClick={() => setInStockOnly(!inStockOnly)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                                    inStockOnly
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm"
                                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>In Stock Only</span>
                            </button>

                            {/* Sort Selector */}
                            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-xs">
                                <span className="text-slate-400 font-medium">Sort:</span>
                                <select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    className="bg-transparent text-slate-900 font-bold outline-none cursor-pointer"
                                >
                                    <option value="featured">Featured First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="rating">Highest Customer Rating</option>
                                </select>
                            </div>

                            {/* Price Filter Inputs */}
                            <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-xs">
                                <span className="text-slate-400 font-medium">₹ Price:</span>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-16 bg-slate-50 text-slate-900 px-2 py-1 rounded text-center outline-none border border-slate-200"
                                />
                                <span className="text-slate-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-16 bg-slate-50 text-slate-900 px-2 py-1 rounded text-center outline-none border border-slate-200"
                                />
                                {(minPrice || maxPrice) && (
                                    <button
                                        onClick={() => {
                                            setMinPrice("");
                                            setMaxPrice("");
                                        }}
                                        className="text-slate-400 hover:text-slate-600"
                                        title="Clear price filter"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active search filter banner if searching */}
                    {currentSearch && (
                        <div className="mt-4 p-3 bg-amber-500/10 rounded-xl border border-amber-400/30 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-amber-600" />
                                <span className="text-slate-800">
                                    Showing search results for: <strong className="text-slate-950 font-black">"{currentSearch}"</strong>
                                </span>
                            </div>
                            <button
                                onClick={handleClearSearch}
                                className="text-amber-700 hover:text-amber-900 font-bold underline transition"
                            >
                                Clear Search ✕
                            </button>
                        </div>
                    )}

                    {/* Product Cards Grid */}
                    <div className="mt-8">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-600 mx-auto">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">No products found</h3>
                                <p className="text-xs text-slate-500">
                                    No tech gadgets matched your selected filters. Try broadening your search or resetting filters.
                                </p>
                                <button
                                    onClick={handleResetAllFilters}
                                    className="px-6 py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-black transition shadow-sm"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onQuickView={(p) => setQuickViewProduct(p)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ================= BRAND GUARANTEES & TRUST ================= */}
            <section className="py-14 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                        <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">Pan-India Express</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Free shipping on all orders over ₹999</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">7-Day Easy Returns</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Instant replacement or full refund</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">100% Genuine Tech</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Official manufacturer warranty</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">24/7 Dedicated Support</h4>
                                <p className="text-xs text-slate-500 mt-0.5">Live technical assistance anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CUSTOMER REVIEWS & TESTIMONIALS ================= */}
            <section className="py-16 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-widest">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span>VERIFIED CUSTOMER LOVE</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">What Tech Enthusiasts Say</h2>
                        <p className="text-xs sm:text-sm text-slate-500">Over 25,000 satisfied shoppers across Delhi, Mumbai, Bengaluru and all over India</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "The Shopnix Quantum Ultra Smart Watch is mindblowing. Delivery to Haryana took just 2 days. The ECG and AMOLED screen are crystal clear!"
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-bold text-xs">
                                    RK
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-xs">Rohit Kumar</h5>
                                    <p className="text-[10px] text-emerald-600 font-semibold">Verified Buyer • Gurugram</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "The ANC on Pulse Wireless Earbuds rival headphones twice the price. Noise cancellation in metro trains is completely silent. 10/10 recommend Shopnix!"
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-bold text-xs">
                                    SM
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-xs">Sneha Mukherjee</h5>
                                    <p className="text-[10px] text-emerald-600 font-semibold">Verified Buyer • Bengaluru</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "Bought the Vortex Mechanical Keyboard with code SHOPNIX20 and saved ₹1,700! The typing sound and RGB feel extremely premium."
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 font-bold text-xs">
                                    AS
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 text-xs">Ankit Sharma</h5>
                                    <p className="text-[10px] text-emerald-600 font-semibold">Verified Buyer • Delhi NCR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= NEWSLETTER SUBSCRIPTION ================= */}
            <section className="py-16 bg-[#0B1120] text-white border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 mx-auto">
                        <Sparkles className="w-7 h-7" />
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white">Join the Shopnix VIP Circle</h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                            Subscribe for insider drops, 20% discount coupons, secret flash sales, and early access to futuristic hardware releases.
                        </p>
                    </div>

                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your personal email..."
                            className="flex-1 px-4 py-3 bg-slate-800/80 text-white rounded-xl border border-slate-700 outline-none focus:border-amber-400 text-xs sm:text-sm placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md shadow-amber-500/20"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-[11px] text-slate-400">No spam. Only high-voltage gadget updates. Unsubscribe anytime.</p>
                </div>
            </section>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <ProductModal
                    product={quickViewProduct}
                    onClose={() => setQuickViewProduct(null)}
                />
            )}

            {/* Video Showcase Modal */}
            {videoModalOpen && (
                <VideoModal
                    isOpen={videoModalOpen}
                    onClose={() => setVideoModalOpen(false)}
                />
            )}
        </div>
    );
}
