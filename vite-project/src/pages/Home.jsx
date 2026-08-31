import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
    Sparkles,
    ArrowRight,
    ShoppingBag,
    Filter,
    X,
    ChevronLeft,
    ChevronRight,
    Play,
    Truck,
    ShieldCheck,
    RefreshCw,
    Headphones,
    Monitor,
    Watch,
    Gamepad2,
    Camera,
    Radio,
    Volume2,
    Cpu,
    Activity,
    Heart
} from "lucide-react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const POPULAR_CATEGORIES = [
    { name: "Electronics", icon: Monitor, query: "Electronics" },
    { name: "Smart Devices", icon: Watch, query: "Smart Devices" },
    { name: "Accessories", icon: Headphones, query: "Accessories" },
    { name: "Gaming", icon: Gamepad2, query: "Gaming" },
    { name: "Cameras", icon: Camera, query: "Cameras" },
    { name: "Drones", icon: Radio, query: "Drones" },
    { name: "Audio", icon: Volume2, query: "Audio" },
    { name: "AI Devices", icon: Cpu, query: "AI Devices" }
];

const FEATURED_TECH_PRODUCTS = [
    {
        _id: "shopnix-prod-1",
        name: "Smart Watch Series 9",
        description: "Advanced health sensor, always-on OLED retina display, and GPS tracking.",
        price: 18999,
        discount_price: 14999,
        category: "Smart Devices",
        stock: 25,
        sizes: ["41mm", "45mm"],
        colors: ["Midnight", "Starlight"],
        images: [{ url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 5.0, count: 128 },
        is_featured: true
    },
    {
        _id: "shopnix-prod-2",
        name: "Wireless Earbuds Pro",
        description: "Active noise cancellation, spatial audio, and 36-hour charging case.",
        price: 8999,
        discount_price: 6999,
        category: "Audio",
        stock: 40,
        sizes: ["Standard"],
        colors: ["Glossy White", "Cyber Black"],
        images: [{ url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 5.0, count: 96 },
        is_featured: true
    },
    {
        _id: "shopnix-prod-3",
        name: "Gaming Headset X1",
        description: "Surround 7.1 audio, neon RGB lighting, and memory foam earcups.",
        price: 14999,
        discount_price: 11999,
        category: "Gaming",
        stock: 18,
        sizes: ["Standard"],
        colors: ["Neon Purple", "Matte Black"],
        images: [{ url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 4.9, count: 78 },
        is_featured: true
    },
    {
        _id: "shopnix-prod-4",
        name: "VR Headset Ultimate",
        description: "Next-gen ultra-high resolution virtual reality with haptic spatial controllers.",
        price: 29999,
        discount_price: 24999,
        category: "Gaming",
        stock: 12,
        sizes: ["Standard"],
        colors: ["Obsidian Black"],
        images: [{ url: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 5.0, count: 53 },
        is_featured: true
    },
    {
        _id: "shopnix-prod-5",
        name: "Drone Camera 4K",
        description: "3-axis gimbal 4K HDR camera drone with 35-minute flight time and obstacle sensing.",
        price: 49999,
        discount_price: 39999,
        category: "Drones",
        stock: 15,
        sizes: ["Standard"],
        colors: ["Space Grey"],
        images: [{ url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 5.0, count: 112 },
        is_featured: true
    },
    {
        _id: "shopnix-prod-6",
        name: "AI Smart Speaker",
        description: "360-degree high-fidelity audio with built-in ambient glowing holographic LED ring.",
        price: 7999,
        discount_price: 5999,
        category: "AI Devices",
        stock: 30,
        sizes: ["Standard"],
        colors: ["Charcoal Black", "Pure White"],
        images: [{ url: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600&auto=format&fit=crop&q=80" }],
        ratings: { average: 4.8, count: 67 },
        is_featured: true
    }
];

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentCategory = searchParams.get("category") || "All";
    const currentSearch = searchParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState("newest");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const sliderRef = useRef(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (currentCategory !== "All") params.append("category", currentCategory);
            if (currentSearch) params.append("search", currentSearch);
            if (minPrice) params.append("minPrice", minPrice);
            if (maxPrice) params.append("maxPrice", maxPrice);
            if (selectedSort) params.append("sort", selectedSort);
            params.append("page", currentPage);
            params.append("limit", "12");

            const res = await api.get(`/products?${params.toString()}`);
            if (res.data?.success && res.data?.data) {
                const apiProducts = res.data.data.products || [];
                if (apiProducts.length > 0) {
                    setProducts(apiProducts);
                    setTotalPages(res.data.data.totalPages || 1);
                } else if (!currentSearch && currentCategory === "All") {
                    // Fallback to showcased products if database is unseeded
                    setProducts(FEATURED_TECH_PRODUCTS);
                    setTotalPages(1);
                } else {
                    setProducts([]);
                    setTotalPages(1);
                }
            }
        } catch (error) {
            console.error("Fetch products error:", error);
            // Graceful fallback for offline / mock testing
            setProducts(FEATURED_TECH_PRODUCTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentCategory, currentSearch, selectedSort, currentPage]);

    const handleCategoryChange = (cat) => {
        setCurrentPage(1);
        const newParams = new URLSearchParams(searchParams);
        if (cat === "All") {
            newParams.delete("category");
        } else {
            newParams.set("category", cat);
        }
        setSearchParams(newParams);
    };

    const handleApplyPriceFilter = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchProducts();
        setMobileFilterOpen(false);
    };

    const handleClearFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedSort("newest");
        setSearchParams({});
        setCurrentPage(1);
    };

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -350 : 350;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white">
            {/* ================= HERO SECTION ================= */}
            <section className="relative bg-gradient-to-b from-[#0B0914] via-[#0E0C1C] to-[#08070E] pt-12 pb-20 overflow-hidden border-b border-purple-950/40">
                {/* Background Neon Ambient Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>
                <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Hero Content */}
                        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-[11px] font-extrabold tracking-widest text-purple-400 uppercase">
                                <span>FUTURE IS NOW</span>
                            </div>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
                                Future Is <br className="hidden sm:inline" />
                                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent glow-purple-text">
                                    Shopping
                                </span>
                            </h1>

                            <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                                Explore the latest tech gadgets, smart devices and futuristic products all in one place.
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                                <a
                                    href="#products-section"
                                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] flex items-center gap-2 group"
                                >
                                    <span>Shop Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                </a>

                                <button
                                    onClick={() => alert("Watch Shopnix video showcase")}
                                    className="px-6 py-3.5 rounded-full bg-[#16132A] hover:bg-[#1E1A38] text-slate-200 hover:text-white font-medium text-sm transition border border-purple-900/50 flex items-center gap-2.5 shadow-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400">
                                        <Play className="w-3 h-3 fill-purple-400 ml-0.5" />
                                    </div>
                                    <span>Watch Video</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Hero Cyber Visual with 3D Headphones & 4 Floating HUDs */}
                        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px]">
                            {/* Central Glowing Stage Platform */}
                            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
                                {/* Neon pedestal circles */}
                                <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-pulse-glow"></div>
                                <div className="absolute inset-6 rounded-full border border-purple-500/30"></div>
                                <div className="absolute inset-16 rounded-full bg-gradient-to-b from-purple-900/30 via-[#1A1438] to-[#0D0B18] shadow-[0_0_80px_rgba(168,85,247,0.35)] flex items-center justify-center border-4 border-purple-500/40">
                                    {/* Concentric neon rings under headphones */}
                                    <div className="w-48 h-48 rounded-full border-2 border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.8)]"></div>
                                </div>

                                {/* Futuristic Neon Headphones Centerpiece */}
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                                    alt="Futuristic Neon Headphone"
                                    className="relative z-20 w-72 h-72 object-contain drop-shadow-[0_20px_35px_rgba(168,85,247,0.5)] animate-float"
                                />

                                {/* 1. Top-Left Floating HUD Card: AI Assistant */}
                                <div className="absolute -top-2 left-2 z-30 bg-[#15122B]/90 backdrop-blur-md p-3 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-float">
                                    <p className="text-[10px] text-slate-400 font-semibold mb-1">AI Assistant</p>
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-purple-950 to-[#2A1E4A] border border-purple-500/40 flex items-center justify-center relative overflow-hidden">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                                        <div className="absolute inset-0 bg-radial from-transparent to-black/60"></div>
                                    </div>
                                </div>

                                {/* 2. Bottom-Left Floating HUD Card: Smart Watch Health Tracking */}
                                <div className="absolute -bottom-4 left-0 z-30 bg-[#15122B]/90 backdrop-blur-md p-3 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)] flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-[#1A1633] p-1 border border-purple-800/40 flex items-center justify-center">
                                        <img
                                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120"
                                            alt="Watch"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-medium leading-tight">Smart Watch</p>
                                        <p className="text-xs font-bold text-white leading-tight">Health Tracking</p>
                                        <div className="flex items-center gap-1 mt-1 text-[10px] text-purple-400 font-bold">
                                            <Heart className="w-3 h-3 fill-purple-400 text-purple-400" />
                                            <span>120 Bpm</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Top-Right Floating HUD Card: VR Experience */}
                                <div className="absolute -top-2 right-2 z-30 bg-[#15122B]/90 backdrop-blur-md p-2.5 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-float" style={{ animationDelay: "1s" }}>
                                    <p className="text-[10px] text-slate-400 font-semibold mb-1">VR Experience</p>
                                    <div className="w-20 h-14 rounded-xl overflow-hidden border border-purple-500/40 relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=200"
                                            alt="VR"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-purple-900/20"></div>
                                    </div>
                                </div>

                                {/* 4. Bottom-Right Floating HUD Card: Drone Camera 4K Ultra HD */}
                                <div className="absolute -bottom-4 right-0 z-30 bg-[#15122B]/90 backdrop-blur-md p-3 rounded-2xl border border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                                    <p className="text-[10px] text-slate-400 font-medium">Drone Camera</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-sm font-extrabold text-white">4K</span>
                                        <span className="text-[10px] text-purple-400 font-semibold bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-900">
                                            Ultra HD
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= VALUE PROPOSITIONS BAR ================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="bg-[#120F24] p-5 rounded-2xl border border-[#261E43] hover:border-purple-500/50 transition duration-300 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
                        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">Fast Delivery</h4>
                            <p className="text-xs text-slate-400">Next day delivery</p>
                        </div>
                    </div>

                    <div className="bg-[#120F24] p-5 rounded-2xl border border-[#261E43] hover:border-purple-500/50 transition duration-300 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
                        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">Secure Payment</h4>
                            <p className="text-xs text-slate-400">100% secure</p>
                        </div>
                    </div>

                    <div className="bg-[#120F24] p-5 rounded-2xl border border-[#261E43] hover:border-purple-500/50 transition duration-300 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
                        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">Easy Returns</h4>
                            <p className="text-xs text-slate-400">30 days return</p>
                        </div>
                    </div>

                    <div className="bg-[#120F24] p-5 rounded-2xl border border-[#261E43] hover:border-purple-500/50 transition duration-300 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group">
                        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Headphones className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">24/7 Support</h4>
                            <p className="text-xs text-slate-400">We are here</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= POPULAR CATEGORIES SECTION ================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Popular Categories
                    </h2>
                    <a
                        href="#products-section"
                        className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition flex items-center gap-1.5 group"
                    >
                        <span>View All Categories</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    {POPULAR_CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = currentCategory === cat.name;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => handleCategoryChange(cat.name)}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition duration-300 group ${
                                    isActive
                                        ? "bg-purple-950/80 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                                        : "bg-[#120F24] border-[#241D3F] hover:border-purple-500/60 hover:bg-[#181432]"
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition ${
                                    isActive
                                        ? "text-purple-300 bg-purple-900/50"
                                        : "text-purple-400 group-hover:scale-110"
                                }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 text-center">
                                    {cat.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ================= POPULAR PRODUCTS SECTION ================= */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Popular Products
                    </h2>

                    <div className="flex items-center gap-4">
                        <a
                            href="#products-section"
                            className="hidden sm:flex text-sm font-semibold text-purple-400 hover:text-purple-300 transition items-center gap-1.5 group"
                        >
                            <span>View All Products</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                        </a>

                        {/* Slider Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => scrollSlider("left")}
                                className="w-9 h-9 rounded-full bg-[#15122B] border border-purple-900/50 text-slate-300 hover:text-white hover:border-purple-500 flex items-center justify-center transition"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scrollSlider("right")}
                                className="w-9 h-9 rounded-full bg-[#15122B] border border-purple-900/50 text-slate-300 hover:text-white hover:border-purple-500 flex items-center justify-center transition"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Popular Products Horizontal Carousel */}
                <div
                    ref={sliderRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x"
                >
                    {FEATURED_TECH_PRODUCTS.map((prod) => (
                        <div key={prod._id} className="min-w-[260px] sm:min-w-[280px] max-w-[280px] snap-start">
                            <ProductCard
                                product={prod}
                                onQuickView={(p) => setQuickViewProduct(p)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= FULL CATALOG & FILTERS SECTION ================= */}
            <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-purple-950/40">
                {/* Header with Title & Sort controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {currentCategory === "All" ? "Explore Storefront" : `${currentCategory} Collection`}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Browse futuristic devices, premium gadgets, and tech accessories with prices in ₹ INR
                        </p>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 bg-[#141126] px-3.5 py-2 rounded-xl border border-purple-900/40 text-sm shadow-sm">
                            <span className="text-xs text-slate-400 font-medium">Sort by:</span>
                            <select
                                value={selectedSort}
                                onChange={(e) => setSelectedSort(e.target.value)}
                                className="bg-transparent font-medium text-purple-300 outline-none cursor-pointer text-sm"
                            >
                                <option value="newest" className="bg-[#141126]">Newest Arrivals</option>
                                <option value="price_asc" className="bg-[#141126]">Price: Low to High</option>
                                <option value="price_desc" className="bg-[#141126]">Price: High to Low</option>
                                <option value="rating" className="bg-[#141126]">Top Rated</option>
                            </select>
                        </div>

                        {/* Filter Trigger on Mobile */}
                        <button
                            onClick={() => setMobileFilterOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#141126] rounded-xl border border-purple-900/40 text-sm font-medium text-slate-200"
                        >
                            <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Categories Navigation Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
                    <button
                        onClick={() => handleCategoryChange("All")}
                        className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                            currentCategory === "All"
                                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                : "bg-[#141126] text-slate-300 hover:bg-[#1E1938] border border-purple-900/40"
                        }`}
                    >
                        All
                    </button>
                    {POPULAR_CATEGORIES.map((cat) => {
                        const isActive = currentCategory === cat.name;
                        return (
                            <button
                                key={cat.name}
                                onClick={() => handleCategoryChange(cat.name)}
                                className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                    isActive
                                        ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                                        : "bg-[#141126] text-slate-300 hover:bg-[#1E1938] border border-purple-900/40"
                                }`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>

                {/* Active Search & Filters Indicator */}
                {(currentSearch || minPrice || maxPrice || currentCategory !== "All") && (
                    <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-[#141126] rounded-2xl border border-purple-900/40 text-xs">
                        <span className="font-semibold text-slate-400">Active filters:</span>
                        {currentSearch && (
                            <span className="px-2.5 py-1 bg-purple-950/80 text-purple-300 font-medium rounded-lg border border-purple-900">
                                Search: "{currentSearch}"
                            </span>
                        )}
                        {currentCategory !== "All" && (
                            <span className="px-2.5 py-1 bg-purple-950/80 text-purple-300 font-medium rounded-lg border border-purple-900">
                                Category: {currentCategory}
                            </span>
                        )}
                        {(minPrice || maxPrice) && (
                            <span className="px-2.5 py-1 bg-purple-950/80 text-purple-300 font-medium rounded-lg border border-purple-900">
                                Price: ₹{minPrice || "0"} - ₹{maxPrice || "Max"}
                            </span>
                        )}
                        <button
                            onClick={handleClearFilters}
                            className="ml-auto text-purple-400 hover:text-purple-300 hover:underline font-semibold"
                        >
                            Clear All
                        </button>
                    </div>
                )}

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Desktop Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        <div className="bg-[#120F24] p-6 rounded-3xl border border-[#241D3F] shadow-sm space-y-6 sticky top-28">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-purple-400" />
                                    Filter Products
                                </h3>
                                <button
                                    onClick={handleClearFilters}
                                    className="text-xs text-purple-400 hover:text-purple-300 hover:underline font-medium"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Price Range Filter */}
                            <form onSubmit={handleApplyPriceFilter} className="space-y-4">
                                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Price Range (₹)
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min ₹"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full px-3 py-2 text-xs bg-[#1A162F] text-slate-200 border border-purple-900/40 rounded-xl outline-none focus:border-purple-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max ₹"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full px-3 py-2 text-xs bg-[#1A162F] text-slate-200 border border-purple-900/40 rounded-xl outline-none focus:border-purple-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                                >
                                    Apply Price Filter
                                </button>
                            </form>

                            {/* Quick Categories List */}
                            <div className="pt-4 border-t border-purple-900/30">
                                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                                    Categories
                                </h4>
                                <div className="space-y-1.5">
                                    <button
                                        onClick={() => handleCategoryChange("All")}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition ${
                                            currentCategory === "All"
                                                ? "bg-purple-950/80 text-purple-300 font-bold border border-purple-800/40"
                                                : "text-slate-400 hover:bg-[#1A162F] hover:text-white"
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    {POPULAR_CATEGORIES.map((cat) => (
                                        <button
                                            key={cat.name}
                                            onClick={() => handleCategoryChange(cat.name)}
                                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition ${
                                                currentCategory === cat.name
                                                    ? "bg-purple-950/80 text-purple-300 font-bold border border-purple-800/40"
                                                    : "text-slate-400 hover:bg-[#1A162F] hover:text-white"
                                            }`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, idx) => (
                                    <div key={idx} className="bg-[#120F24] rounded-3xl border border-[#241D3F] p-4 space-y-4 animate-pulse">
                                        <div className="aspect-square bg-purple-950/30 rounded-2xl"></div>
                                        <div className="h-4 bg-purple-950/40 rounded w-3/4"></div>
                                        <div className="h-3 bg-purple-950/30 rounded w-1/2"></div>
                                        <div className="h-6 bg-purple-950/50 rounded w-1/3"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-[#120F24] rounded-3xl border border-[#241D3F] p-12 text-center max-w-md mx-auto space-y-4">
                                <div className="w-16 h-16 bg-purple-950/60 border border-purple-500/40 text-purple-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-white">No products found</h3>
                                <p className="text-xs text-slate-400">
                                    We couldn't find any items matching your selected criteria. Try adjusting filters or search keywords.
                                </p>
                                <button
                                    onClick={handleClearFilters}
                                    className="px-6 py-2.5 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-500 transition shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            onQuickView={(p) => setQuickViewProduct(p)}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2.5 rounded-xl border border-purple-900/40 bg-[#120F24] text-slate-300 hover:bg-[#1A162F] disabled:opacity-40 transition"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <span className="px-4 py-2 text-sm font-semibold text-purple-300 bg-[#120F24] border border-purple-900/40 rounded-xl">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2.5 rounded-xl border border-purple-900/40 bg-[#120F24] text-slate-300 hover:bg-[#1A162F] disabled:opacity-40 transition"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <ProductModal
                    product={quickViewProduct}
                    onClose={() => setQuickViewProduct(null)}
                />
            )}

            {/* Mobile Filter Drawer */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="bg-[#120F24] rounded-3xl p-6 max-w-sm w-full space-y-6 border border-purple-900/50">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">Filter Products</h3>
                            <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleApplyPriceFilter} className="space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Min Price (₹)"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="px-3 py-2 text-xs bg-[#1A162F] border border-purple-900/40 rounded-xl text-white outline-none"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price (₹)"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="px-3 py-2 text-xs bg-[#1A162F] border border-purple-900/40 rounded-xl text-white outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            >
                                Apply Filters
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

