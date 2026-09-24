import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    ShoppingBag,
    User,
    LogOut,
    Shield,
    Menu,
    X,
    Search,
    Package,
    ChevronDown,
    Heart,
    Copy,
    Sparkles,
    Truck,
    PhoneCall,
    Check,
    Watch,
    Crown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { getStoredProducts } from "../api/shopnixStore";

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout, loginAsDemo } = useAuth();
    const { totalItems } = useCart();
    const { wishlistCount, setIsDrawerOpen } = useWishlist();
    const { showToast } = useToast();

    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [copiedCoupon, setCopiedCoupon] = useState(false);

    const searchRef = useRef(null);

    // Live search suggestions
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const allProducts = getStoredProducts();
            const q = searchQuery.toLowerCase();
            const matches = allProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    (p.tagline && p.tagline.toLowerCase().includes(q))
            ).slice(0, 5);
            setSearchResults(matches);
            setShowSuggestions(true);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    // Close suggestions on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}#products-section`);
            setShowSuggestions(false);
            setIsMenuOpen(false);
        }
    };

    const handleCopyCoupon = () => {
        navigator.clipboard.writeText("CHRONO10");
        setCopiedCoupon(true);
        showToast("Privilege code 'CHRONO10' copied! Enjoy 10% VIP discount on all timepieces.", "success");
        setTimeout(() => setCopiedCoupon(false), 3000);
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
    };

    const isHome = location.pathname === "/" && !location.search;

    return (
        <header className="sticky top-0 z-50 bg-[#040406]">
            {/* Top Announcement Bar - Obsidian with Brushed Gold accents */}
            <div className="bg-[#020204] text-slate-300 text-[10px] sm:text-[11px] py-1.5 sm:py-2 px-3 sm:px-6 border-b border-[#12141D]">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mx-auto sm:mx-0 text-center sm:text-left">
                        <span className="inline-flex items-center gap-1 font-extrabold text-[#E5C158] tracking-wider uppercase text-[9px] sm:text-[10px]">
                            <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5C158]" />
                            PRIVILEGE:
                        </span>
                        <span className="text-slate-400">10% VIP concession with code</span>
                        <button
                            onClick={handleCopyCoupon}
                            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E5C158] hover:from-[#E5C158] hover:to-[#D4AF37] text-slate-950 font-mono font-black tracking-wider transition shadow-[0_0_12px_rgba(212,175,55,0.35)] text-[10px]"
                            title="Click to copy privilege code"
                        >
                            {copiedCoupon ? <Check className="w-3 h-3 text-slate-950" /> : <Copy className="w-3 h-3" />}
                            <span>CHRONO10</span>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-5 text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <Truck className="w-3.5 h-3.5 text-[#E5C158]" />
                            <span>Insured Armored Courier &amp; 5-Year Global Warranty</span>
                        </div>
                        <span className="text-slate-700">|</span>
                        <a href="tel:+918607603050" className="flex items-center gap-1.5 text-slate-300 hover:text-[#E5C158] transition">
                            <PhoneCall className="w-3.5 h-3.5 text-[#E5C158]" />
                            <span>Collector Concierge: +91 8607603050</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation Header - Luxury Glassmorphism with Brushed Gold Accents */}
            <div className="bg-[#06070B]/95 backdrop-blur-xl border-b border-[#151722] shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Brand Logo - CHRONONIX */}
                        <div className="flex items-center gap-4 sm:gap-8 lg:gap-10">
                            <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[#C5A059] via-[#E5C158] to-[#AA771C] flex items-center justify-center text-slate-950 shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-105 transition duration-300 shrink-0">
                                    <Watch className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center leading-none font-serif">
                                        CHRONO<span className="text-[#E5C158]">NIX</span>
                                    </span>
                                    <span className="text-[8px] sm:text-[9px] font-bold text-[#C5A059] tracking-[0.2em] uppercase mt-0.5 font-sans">
                                        HAUTE HORLOGERIE
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Links */}
                            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
                                <Link
                                    to="/"
                                    className={`transition-all hover:text-[#E5C158] ${
                                        isHome ? "text-[#E5C158] font-bold" : "text-slate-300"
                                    }`}
                                >
                                    Home
                                </Link>
                                <a
                                    href="#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    All Timepieces
                                </a>
                                <Link
                                    to="/?category=Luxury Automatics#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    Automatics
                                </Link>
                                <Link
                                    to="/?category=Chronographs#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    Chronographs
                                </Link>
                                <Link
                                    to="/?category=Tourbillon & Complications#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    Tourbillons
                                </Link>
                                <Link
                                    to="/?category=Dive & Sports Heritage#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    Dive Heritage
                                </Link>
                                <Link
                                    to="/?category=Skeleton & Mechanical#products-section"
                                    className="hover:text-[#E5C158] transition"
                                >
                                    Skeleton
                                </Link>
                                <a
                                    href="#flash-deals-section"
                                    className="text-[#E5C158] hover:text-[#F3E5AB] font-bold transition flex items-center gap-1.5"
                                >
                                    <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
                                    Vault Reserves
                                </a>
                            </nav>
                        </div>

                        {/* Search Bar - Obsidian Dark with Autocomplete */}
                        <div ref={searchRef} className="hidden md:block flex-1 max-w-sm mx-6 relative">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search watches, calibres, tourbillons..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => {
                                        if (searchResults.length > 0) setShowSuggestions(true);
                                    }}
                                    className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-[#07080D] text-slate-100 placeholder-slate-500 rounded-full border border-[#151722] focus:border-[#C5A059] focus:bg-[#161A2B] focus:ring-2 focus:ring-[#C5A059]/20 outline-none transition duration-200"
                                />
                                {searchQuery ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setShowSuggestions(false);
                                        }}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E5C158] hover:text-[#F3E5AB] transition"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                )}
                            </form>

                            {/* Autocomplete Suggestions Dropdown */}
                            {showSuggestions && searchResults.length > 0 && (
                                <div className="absolute left-0 right-0 mt-2 bg-[#07080D]/95 backdrop-blur-xl rounded-2xl border border-[#C5A059]/30 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="p-2 divide-y divide-[#22283A]">
                                        {searchResults.map((item) => (
                                            <div
                                                key={item._id}
                                                onClick={() => {
                                                    navigate(`/product/${item._id}`);
                                                    setShowSuggestions(false);
                                                    setSearchQuery("");
                                                }}
                                                className="p-2.5 hover:bg-[#1A1F30] rounded-xl cursor-pointer flex items-center gap-3 transition"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#090B12] p-1 shrink-0 border border-[#151722] flex items-center justify-center">
                                                    <img
                                                        src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=100"}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-[#E5C158] font-semibold">{item.category}</span>
                                                        <span className="text-xs font-black text-[#F3E5AB]">₹{(item.discount_price || item.price)?.toLocaleString("en-IN")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        onClick={handleSearchSubmit}
                                        className="p-2.5 text-center text-xs font-bold text-[#E5C158] bg-[#171B2B] hover:bg-[#1E2338] cursor-pointer border-t border-[#151722] transition"
                                    >
                                        View all timepieces matching "{searchQuery}" →
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Action Icons */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Demo Switcher Quick Buttons */}
                            <div className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-[#07080D] border border-[#151722] text-[11px]">
                                <button
                                    onClick={() => loginAsDemo("customer")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        !isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 shadow-[0_0_12px_rgba(212,175,55,0.4)]" : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Collector
                                </button>
                                <button
                                    onClick={() => loginAsDemo("admin")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 shadow-[0_0_12px_rgba(212,175,55,0.4)]" : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>

                            {/* Admin Link Badge if Admin */}
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C2133] border border-[#C5A059]/40 text-[#E5C158] text-xs font-bold rounded-full hover:bg-[#232A40] shadow-[0_0_12px_rgba(212,175,55,0.2)] transition"
                                >
                                    <Shield className="w-3.5 h-3.5 text-[#E5C158]" />
                                    <span>Horology Admin</span>
                                </Link>
                            )}

                            {/* Wishlist Button (Collector's Vault) */}
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="relative p-2.5 text-slate-300 hover:text-[#E5C158] hover:bg-[#1A1F30] rounded-full transition"
                                title="Collector's Vault"
                            >
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-[#C5A059] text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Button */}
                            <Link
                                to="/cart"
                                className="relative p-2.5 text-slate-300 hover:text-[#E5C158] hover:bg-[#1A1F30] rounded-full transition"
                                title="Acquisition Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Profile / Auth Dropdown */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-[#07080D] hover:bg-[#1A1F30] transition border border-[#151722]"
                                    >
                                        {user?.profile_img ? (
                                            <img
                                                src={user.profile_img}
                                                alt={user.first_name}
                                                className="w-7 h-7 rounded-full object-cover border border-[#C5A059]/40"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-[#C5A059] text-slate-950 text-xs font-black flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                                                {user?.first_name?.charAt(0)?.toUpperCase() || "C"}
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[90px] truncate">
                                            {user?.first_name || "Collector"}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileOpen(false)}
                                            ></div>
                                            <div className="absolute right-0 mt-3 w-60 bg-[#07080D]/95 backdrop-blur-xl rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-[#C5A059]/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-200">
                                                <div className="px-4 py-2.5 border-b border-[#22283A]">
                                                    <p className="text-sm font-bold text-white">
                                                        {user?.first_name} {user?.last_name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                                    <div className="mt-1.5 flex items-center gap-1.5">
                                                        <span className="inline-block px-2 py-0.5 bg-[#1C2133] text-[#E5C158] text-[10px] font-bold rounded border border-[#C5A059]/40 uppercase">
                                                            {user?.role === "admin" ? "Master Horologist" : "VIP Collector"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Demo Account Switcher inside dropdown */}
                                                <div className="px-4 py-2 border-b border-[#22283A] text-xs">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Quick Persona Mode</span>
                                                    <div className="grid grid-cols-2 gap-1.5">
                                                        <button
                                                            onClick={() => {
                                                                loginAsDemo("customer");
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className={`py-1 rounded text-[11px] font-bold border transition ${
                                                                !isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 border-[#E5C158]" : "bg-[#181D2D] text-slate-400 border-[#151722]"
                                                            }`}
                                                        >
                                                            Collector
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                loginAsDemo("admin");
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className={`py-1 rounded text-[11px] font-bold border transition ${
                                                                isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 border-[#E5C158]" : "bg-[#181D2D] text-slate-400 border-[#151722]"
                                                            }`}
                                                        >
                                                            Admin
                                                        </button>
                                                    </div>
                                                </div>

                                                {isAdmin && (
                                                    <Link
                                                        to="/admin"
                                                        onClick={() => setIsProfileOpen(false)}
                                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#E5C158] hover:bg-[#1A1F30] font-bold transition"
                                                    >
                                                        <Shield className="w-4 h-4 text-[#E5C158]" />
                                                        <span>Horology Dashboard</span>
                                                    </Link>
                                                )}

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                                                >
                                                    <User className="w-4 h-4 text-[#E5C158]" />
                                                    <span>Collector Profile</span>
                                                </Link>

                                                <Link
                                                    to="/orders"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                                                >
                                                    <Package className="w-4 h-4 text-[#E5C158]" />
                                                    <span>My Acquisitions</span>
                                                </Link>

                                                <div className="border-t border-[#22283A] my-1"></div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 transition text-left font-semibold"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-[#C5A059] via-[#E5C158] to-[#AA771C] hover:from-[#E5C158] hover:to-[#D4AF37] transition px-4 py-2 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                                >
                                    <User className="w-4 h-4 text-slate-950" />
                                    <span>Collector Sign In</span>
                                </Link>
                            )}

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-slate-300 hover:bg-[#1A1F30] rounded-xl transition"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer with Backdrop */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 top-[88px] sm:top-[112px] bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    <div className="lg:hidden relative z-50 bg-[#0A0C13] border-b border-[#151722] px-4 pt-4 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
                        {/* Search Input */}
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Search timepieces, calibres, tourbillons..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-[#07080D] text-slate-100 placeholder-slate-500 rounded-xl border border-[#151722] focus:border-[#C5A059] outline-none"
                            />
                            <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#E5C158]">
                                <Search className="w-4 h-4" />
                            </button>
                        </form>

                        {/* Mobile Persona Switcher */}
                        <div className="p-2.5 bg-[#07080D] rounded-xl border border-[#151722] flex items-center justify-between gap-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
                                Persona:
                            </span>
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => {
                                        loginAsDemo("customer");
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                        !isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "text-slate-400 bg-[#121522]"
                                    }`}
                                >
                                    Collector
                                </button>
                                <button
                                    onClick={() => {
                                        loginAsDemo("admin");
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                                        isAdmin ? "bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "text-slate-400 bg-[#121522]"
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>

                        {/* Quick User Links */}
                        {isAuthenticated && (
                            <div className="p-3 bg-[#07080D] rounded-xl border border-[#C5A059]/30 flex items-center justify-between">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-full bg-[#C5A059] text-slate-950 text-xs font-black flex items-center justify-center shrink-0">
                                        {user?.first_name?.charAt(0)?.toUpperCase() || "C"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-white truncate">{user?.first_name} {user?.last_name}</p>
                                        <span className="text-[10px] text-[#E5C158] uppercase font-bold">{user?.role === "admin" ? "Master Horologist" : "VIP Collector"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-[#161B2B] text-slate-300 hover:text-[#E5C158]"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-950/40 text-rose-400 hover:bg-rose-900/50"
                                    >
                                        Exit
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-1.5 text-xs font-semibold text-slate-300">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition flex items-center justify-between"
                            >
                                <span>Home</span>
                                <span className="text-[10px] text-slate-500">Salons</span>
                            </Link>

                            <a
                                href="#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition flex items-center justify-between"
                            >
                                <span>All Timepieces (100)</span>
                                <span className="text-[10px] text-[#E5C158] font-mono">100 Calibres</span>
                            </a>

                            <Link
                                to="/?category=Luxury Automatics#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                            >
                                Luxury Automatics
                            </Link>
                            <Link
                                to="/?category=Chronographs#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                            >
                                Chronographs &amp; Tachymeters
                            </Link>
                            <Link
                                to="/?category=Tourbillon & Complications#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                            >
                                Tourbillon &amp; Complications
                            </Link>
                            <Link
                                to="/?category=Dive & Sports Heritage#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                            >
                                Dive &amp; Sports Heritage 300M
                            </Link>
                            <Link
                                to="/?category=Skeleton & Mechanical#products-section"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition"
                            >
                                Skeleton &amp; Openwork
                            </Link>

                            <div className="border-t border-[#151722] my-1"></div>

                            <Link
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition flex items-center justify-between bg-[#07080D]"
                            >
                                <span className="flex items-center gap-2">
                                    <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
                                    <span>Acquisition Cart</span>
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E5C158] text-slate-950 text-xs font-black shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                                    {totalItems}
                                </span>
                            </Link>

                            <button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setIsDrawerOpen(true);
                                }}
                                className="px-3 py-2.5 text-left rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition flex items-center justify-between bg-[#07080D]"
                            >
                                <span className="flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-[#E5C158]" />
                                    <span>Collector's Vault (Wishlist)</span>
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-slate-950 text-xs font-bold">
                                    {wishlistCount}
                                </span>
                            </button>

                            {isAuthenticated && (
                                <Link
                                    to="/orders"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-3 py-2.5 rounded-xl hover:bg-[#1A1F30] hover:text-[#E5C158] transition flex items-center gap-2 bg-[#07080D]"
                                >
                                    <Package className="w-4 h-4 text-[#E5C158]" />
                                    <span>Track Armored Acquisitions</span>
                                </Link>
                            )}

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-3 py-2.5 rounded-xl text-[#E5C158] hover:bg-[#1A1F30] transition flex items-center gap-2 bg-[#121624] border border-[#C5A059]/40 font-bold"
                                >
                                    <Shield className="w-4 h-4 text-[#E5C158]" />
                                    <span>Horology Admin Dashboard</span>
                                </Link>
                            )}
                        </div>

                        {/* Direct Concierge Call */}
                        <div className="pt-2 border-t border-[#151722] text-center">
                            <a
                                href="tel:+918607603050"
                                className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C158] hover:text-white transition py-1"
                            >
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>Concierge Desk: +91 8607603050</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
