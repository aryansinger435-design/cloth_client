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
    Watch,
    Clock,
    CheckCircle2,
    Flame,
    Crown,
    Award
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import VideoModal from "../components/VideoModal";
import { getStoredProducts } from "../api/shopnixStore";
import { useToast } from "../context/ToastContext";

const CATEGORIES = [
    { name: "All", icon: Sparkles },
    { name: "Luxury Automatics", icon: Crown },
    { name: "Chronographs", icon: Clock },
    { name: "Tourbillon & Complications", icon: Award },
    { name: "Skeleton & Mechanical", icon: Watch },
    { name: "Dive & Sports Heritage", icon: ShieldCheck },
    { name: "Minimalist Dress Watches", icon: Sparkles },
    { name: "Smart Luxury", icon: Watch }
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

    // Live Vault Allocation Timer (Hours:Minutes:Seconds)
    const [countdown, setCountdown] = useState({ hours: 18, minutes: 42, seconds: 19 });

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
                    p.description.toLowerCase().includes(q) ||
                    (p.brand && p.brand.toLowerCase().includes(q))
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
        showToast("Welcome to the Chrononix Private Salon. Your VIP welcome invitation is dispatched.", "success");
        setNewsletterEmail("");
    };

    // Flash sale top 4 items
    const flashSaleProducts = allProducts.filter((p) => p.discount_price > 0).slice(0, 4);

    return (
        <div className="min-h-screen bg-[#040406] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            {/* ================= HERO SECTION ================= */}
            <section className="relative bg-gradient-to-b from-[#07080E] via-[#040406] to-[#040406] text-white pt-10 pb-20 overflow-hidden border-b border-[#151722]">
                {/* Background Ambient Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute top-10 right-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[130px] pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E5C158]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Hero Content */}
                        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0C13] border border-[#D4AF37]/40 text-[11px] font-bold tracking-[0.2em] text-[#E5C158] uppercase shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>HAUTE HORLOGERIE • 2026 MANUFACTURE COLLECTION</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.12] text-white font-serif">
                                Mastering Time, <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-[#F9E7B9] via-[#D4AF37] to-[#AA7C1E] bg-clip-text text-transparent">
                                    Defining Legacy
                                </span>
                            </h1>

                            <p className="text-slate-300 text-sm sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                                Explore India's most prestigious horological vault. Featuring 100 masterfully engineered Swiss automatics, celestial tourbillons, skeleton calibres, and limited edition sports chronographs.
                            </p>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                                <a
                                    href="#products-section"
                                    className="px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-105 flex items-center justify-center gap-2 group text-center"
                                >
                                    <span>Explore The Vault (100)</span>
                                    <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition" />
                                </a>

                                <button
                                    onClick={() => setVideoModalOpen(true)}
                                    className="px-5 sm:px-6 py-3.5 rounded-xl bg-[#07080D] hover:bg-[#0A0C13] text-[#E5C158] hover:text-white font-bold text-xs sm:text-sm tracking-wide transition border border-[#D4AF37]/30 flex items-center justify-center gap-2.5 shadow-lg shadow-black/50 hover:border-[#D4AF37]/60"
                                >
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                                        <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D4AF37] ml-0.5" />
                                    </div>
                                    <span>Watch Calibre Film</span>
                                </button>
                            </div>

                            {/* Trust metrics bar */}
                            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#151722] max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                                <div>
                                    <p className="text-lg sm:text-xl font-bold text-white font-serif">100</p>
                                    <p className="text-[10px] sm:text-xs text-slate-400">Exclusive Timepieces</p>
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl font-bold text-[#E5C158] font-serif">COSC</p>
                                    <p className="text-[10px] sm:text-xs text-slate-400">Certified Chronometer</p>
                                </div>
                                <div>
                                    <p className="text-lg sm:text-xl font-bold text-white font-serif">5-Year</p>
                                    <p className="text-[10px] sm:text-xs text-slate-400">Global Warranty</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Hero Stage */}
                        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[320px] sm:min-h-[440px] overflow-hidden sm:overflow-visible py-4 sm:py-0">
                            <div className="relative w-full max-w-[320px] sm:max-w-[460px] aspect-square flex items-center justify-center">
                                {/* Subtle pedestal glow */}
                                <div className="absolute inset-4 sm:inset-6 rounded-full bg-[#D4AF37]/15 blur-2xl sm:blur-3xl pointer-events-none"></div>
                                <div className="absolute inset-6 sm:inset-10 rounded-full bg-[#07080D] border border-[#D4AF37]/30 flex items-center justify-center animate-pulse">
                                    <div className="w-44 h-44 sm:w-64 sm:h-64 rounded-full border border-[#D4AF37]/20"></div>
                                </div>

                                {/* Centerpiece Product */}
                                <img
                                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
                                    alt="Chrononix Royal Tourbillon"
                                    className="relative z-20 w-52 h-52 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 border-[#D4AF37]/50"
                                />

                                {/* Floating Card 1: Tourbillon Calibre */}
                                <div
                                    onClick={() => setQuickViewProduct(allProducts[0] || null)}
                                    className="absolute -top-1 sm:-top-2 left-0 sm:left-2 z-30 bg-[#07080D]/95 backdrop-blur-md p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 shadow-2xl shadow-black/80 cursor-pointer hover:scale-105 transition hover:border-[#D4AF37] max-w-[170px] sm:max-w-none"
                                >
                                    <p className="text-[8px] sm:text-[10px] text-[#D4AF37] font-bold tracking-wider uppercase mb-0.5 sm:mb-1">Flying Tourbillon</p>
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#0E1018] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                                            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] sm:text-xs font-bold text-white leading-tight">Calibre CH-901</p>
                                            <p className="text-[9px] sm:text-[10px] text-[#E5C158] font-medium">28,800 vph</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Card 2: Titanium & Sapphire */}
                                <div
                                    onClick={() => setQuickViewProduct(allProducts[1] || allProducts[0])}
                                    className="absolute -bottom-2 sm:-bottom-3 left-0 sm:left-4 z-30 bg-[#07080D]/95 backdrop-blur-md p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/40 shadow-2xl shadow-black/80 flex items-center gap-2 sm:gap-3 cursor-pointer hover:scale-105 transition hover:border-[#D4AF37] max-w-[190px] sm:max-w-none"
                                >
                                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#0E1018] border border-[#D4AF37]/40 p-1 flex items-center justify-center text-[#D4AF37] shrink-0">
                                        <Watch className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] sm:text-xs font-bold text-white leading-tight">Grade 5 Titanium</p>
                                        <p className="text-[9px] sm:text-[10px] text-slate-300">Curved Sapphire • 300m</p>
                                    </div>
                                </div>

                                {/* Floating Card 3: Vault Allocation */}
                                <div className="absolute top-1/4 sm:top-1/3 -right-1 sm:-right-2 z-30 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] text-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-black shadow-[0_0_20px_rgba(212,175,55,0.4)] tracking-wider uppercase">
                                    VAULT DROP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FLASH DEALS / VAULT RESERVES ================= */}
            <section id="flash-deals-section" className="py-12 bg-[#05060A] border-b border-[#151722]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-widest mb-1">
                                <Flame className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37] animate-pulse" />
                                <span>COLLECTOR'S VAULT RESERVES • LIMITED ALLOCATIONS</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                                Timepiece Allocations of the Day
                            </h2>
                        </div>

                        {/* Countdown Timer Box */}
                        <div className="flex items-center gap-2.5 bg-[#07080D] px-4 py-2.5 rounded-xl border border-[#D4AF37]/30 shadow-lg shadow-black/60">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-semibold text-slate-300">Allocation Closes:</span>
                            <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-white">
                                <span className="bg-[#0A0C13] border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[#E5C158]">
                                    {String(countdown.hours).padStart(2, "0")}h
                                </span>
                                <span className="text-[#D4AF37] font-bold">:</span>
                                <span className="bg-[#0A0C13] border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[#E5C158]">
                                    {String(countdown.minutes).padStart(2, "0")}m
                                </span>
                                <span className="text-[#D4AF37] font-bold">:</span>
                                <span className="bg-gradient-to-r from-[#C5A059] to-[#D4AF37] px-2 py-0.5 rounded text-black font-extrabold shadow-[0_0_10px_rgba(212,175,55,0.4)]">
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
            <section className="py-3 sm:py-4 bg-[#040406]/95 border-b border-[#151722] sticky top-16 sm:top-20 z-30 backdrop-blur-md shadow-lg shadow-black/60">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-scroll">
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
                                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                                        isActive
                                            ? "bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] text-black border-[#E5C158] shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                                            : "bg-[#07080D] text-slate-300 border-[#151722] hover:border-[#D4AF37]/50 hover:text-white hover:bg-[#0A0C13]"
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-[#D4AF37]"}`} />
                                    <span>{cat.name}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? "bg-black/20 text-black" : "bg-[#0E1018] text-[#E5C158]"}`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= MAIN CATALOG SECTION ================= */}
            <section id="products-section" className="py-10 sm:py-12 lg:py-16 bg-[#040406]">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    {/* Catalog Header & Filters Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#151722]">
                        <div>
                            <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight font-serif">
                                {currentCategory === "All" ? "Complete Horological Catalog (100)" : `${currentCategory} Collection`}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                Showing {filteredProducts.length} certified timepieces ready for insured armored courier delivery
                            </p>
                        </div>

                        {/* Sorting & Filter Controls */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            {/* In Stock toggle */}
                            <button
                                onClick={() => setInStockOnly(!inStockOnly)}
                                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                                    inStockOnly
                                        ? "bg-[#0E1018] text-[#E5C158] border-[#D4AF37]/70 shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                                        : "bg-[#07080D] text-slate-300 border-[#151722] hover:bg-[#0A0C13] hover:border-[#D4AF37]/40"
                                }`}
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>In Vault Only</span>
                            </button>

                            {/* Sort Selector */}
                            <div className="flex items-center gap-2 bg-[#07080D] px-3 py-1.5 sm:py-2 rounded-xl border border-[#151722] text-xs text-slate-300 shadow-sm">
                                <span className="text-slate-400 font-medium">Sort:</span>
                                <select
                                    value={selectedSort}
                                    onChange={(e) => setSelectedSort(e.target.value)}
                                    className="bg-transparent text-[#E5C158] font-bold outline-none cursor-pointer"
                                >
                                    <option value="featured" className="bg-[#07080D] text-white">Curated Selection</option>
                                    <option value="price_asc" className="bg-[#07080D] text-white">Price: Low to High</option>
                                    <option value="price_desc" className="bg-[#07080D] text-white">Price: High to Low</option>
                                    <option value="rating" className="bg-[#07080D] text-white">Highest Connoisseur Rating</option>
                                </select>
                            </div>

                            {/* Price Filter Inputs - Visible on mobile too */}
                            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#07080D] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#151722] text-xs shadow-sm">
                                <span className="text-slate-400 font-medium text-[11px] sm:text-xs">₹ Price:</span>
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="w-16 sm:w-20 bg-[#030406] text-white px-1.5 sm:px-2 py-1 rounded text-center outline-none border border-[#151722] focus:border-[#D4AF37] text-xs"
                                />
                                <span className="text-slate-500">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="w-16 sm:w-20 bg-[#030406] text-white px-1.5 sm:px-2 py-1 rounded text-center outline-none border border-[#151722] focus:border-[#D4AF37] text-xs"
                                />
                                {(minPrice || maxPrice) && (
                                    <button
                                        onClick={() => {
                                            setMinPrice("");
                                            setMaxPrice("");
                                        }}
                                        className="text-slate-400 hover:text-[#D4AF37] transition p-0.5"
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
                        <div className="mt-4 p-3 bg-[#0A0C13] rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <Search className="w-4 h-4 text-[#D4AF37]" />
                                <span className="text-slate-300">
                                    Showing timepieces matching: <strong className="text-[#E5C158] font-bold">"{currentSearch}"</strong>
                                </span>
                            </div>
                            <button
                                onClick={handleClearSearch}
                                className="text-[#D4AF37] hover:text-[#F9E7B9] font-bold underline transition"
                            >
                                Clear Search ✕
                            </button>
                        </div>
                    )}

                    {/* Product Cards Grid */}
                    <div className="mt-8">
                        {filteredProducts.length === 0 ? (
                            <div className="bg-[#07080D] rounded-3xl border border-[#151722] p-12 text-center max-w-md mx-auto space-y-4 shadow-xl">
                                <div className="w-16 h-16 rounded-2xl bg-[#0A0C13] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mx-auto shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                    <Search className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white font-serif">No Timepieces Found</h3>
                                <p className="text-xs text-slate-400">
                                    No watches matched your criteria in this collection. Broaden your search or reset filters to view our full vault.
                                </p>
                                <button
                                    onClick={handleResetAllFilters}
                                    className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(212,175,55,0.3)]"
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
            <section className="py-14 bg-[#05060A] border-y border-[#151722]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
                        <div className="flex items-center gap-4 bg-[#07080D] p-5 rounded-2xl border border-[#151722] hover:border-[#D4AF37]/40 transition">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm font-serif">Armored White-Glove Courier</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Fully insured high-security pan-India transit</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-[#07080D] p-5 rounded-2xl border border-[#151722] hover:border-[#D4AF37]/40 transition">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm font-serif">7-Day Vault Inspection</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Complimentary return or horological exchange</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-[#07080D] p-5 rounded-2xl border border-[#151722] hover:border-[#D4AF37]/40 transition">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm font-serif">100% Certified Authentic</h4>
                                <p className="text-xs text-slate-400 mt-0.5">COSC Certificate & 5-Year Global Warranty</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-[#07080D] p-5 rounded-2xl border border-[#151722] hover:border-[#D4AF37]/40 transition">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0C13] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm font-serif">Private Horologist Concierge</h4>
                                <p className="text-xs text-slate-400 mt-0.5">Direct consultation with master watchmakers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CUSTOMER REVIEWS & TESTIMONIALS ================= */}
            <section className="py-16 bg-[#040406]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C158] uppercase tracking-widest">
                            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>CONNOISSEUR TESTIMONIALS</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white font-serif">Voices of Discerning Collectors</h2>
                        <p className="text-xs sm:text-sm text-slate-400">Trusted by over 15,000 passionate horology enthusiasts across India and the Emirates</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#07080D] p-6 rounded-2xl border border-[#151722] space-y-4 shadow-lg hover:border-[#D4AF37]/40 transition">
                            <div className="flex items-center text-[#D4AF37]">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-sm">★</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                                "The Chrononix Celestial Flying Tourbillon is an absolute masterwork. Delivered via secured courier with COSC paperwork and wooden presentation chest. Impeccable finish!"
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-[#151722]">
                                <div className="w-9 h-9 rounded-full bg-[#0A0C13] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs">
                                    VS
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-xs">Vikramaditya Singhania</h5>
                                    <p className="text-[10px] text-[#E5C158] font-semibold">Horology Collector • Mumbai</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#07080D] p-6 rounded-2xl border border-[#151722] space-y-4 shadow-lg hover:border-[#D4AF37]/40 transition">
                            <div className="flex items-center text-[#D4AF37]">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-sm">★</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                                "Acquired the Apex Diver 300m with code CHRONO10. The ceramic bezel and high-beat Swiss automatic movement are breathtaking. Chrononix is the gold standard."
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-[#151722]">
                                <div className="w-9 h-9 rounded-full bg-[#0A0C13] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs">
                                    RM
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-xs">Dr. Rajesh Menon</h5>
                                    <p className="text-[10px] text-[#E5C158] font-semibold">Verified Collector • Bengaluru</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#07080D] p-6 rounded-2xl border border-[#151722] space-y-4 shadow-lg hover:border-[#D4AF37]/40 transition">
                            <div className="flex items-center text-[#D4AF37]">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-sm">★</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed italic">
                                "The open-worked skeleton calibre allows you to admire every gear and balance spring. Customer concierge answered all my technical queries promptly. 10/10."
                            </p>
                            <div className="flex items-center gap-3 pt-3 border-t border-[#151722]">
                                <div className="w-9 h-9 rounded-full bg-[#0A0C13] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-xs">
                                    AK
                                </div>
                                <div>
                                    <h5 className="font-bold text-white text-xs">Aman Kapoor</h5>
                                    <p className="text-[10px] text-[#E5C158] font-semibold">Private Collector • New Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= NEWSLETTER SUBSCRIPTION / PRIVATE SALON ================= */}
            <section className="py-16 bg-gradient-to-b from-[#05060A] to-[#020203] text-white border-t border-[#151722]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#AA7C1E] flex items-center justify-center text-black shadow-[0_0_25px_rgba(212,175,55,0.3)] mx-auto">
                        <Crown className="w-7 h-7 text-black" />
                    </div>

                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">Enter The Chrononix Private Salon</h2>
                        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                            Receive private allocation invites, numbered limited edition premieres, and VIP invitations to private horological exhibitions.
                        </p>
                    </div>

                    <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
                        <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder="Enter your personal email..."
                            className="flex-1 px-4 py-3 bg-[#07080D] text-white rounded-xl border border-[#151722] outline-none focus:border-[#D4AF37] text-xs sm:text-sm placeholder-slate-500 shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#AA7C1E] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(212,175,55,0.35)] shrink-0"
                        >
                            Request Access
                        </button>
                    </form>
                    <p className="text-[11px] text-slate-500">Exclusively for fine horology patrons. Unsubscribe at any time.</p>
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
