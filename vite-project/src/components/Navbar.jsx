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
    Check
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
                    p.description.toLowerCase().includes(q)
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
        navigator.clipboard.writeText("SHOPNIX20");
        setCopiedCoupon(true);
        showToast("Coupon 'SHOPNIX20' copied! Enjoy 20% OFF at checkout.", "success");
        setTimeout(() => setCopiedCoupon(false), 3000);
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
    };

    const isHome = location.pathname === "/" && !location.search;

    return (
        <header className="sticky top-0 z-50 bg-white">
            {/* Top Announcement Bar - Professional Midnight Navy & Radiant Gold */}
            <div className="bg-[#0B1120] text-slate-200 text-[11px] py-2 px-4 sm:px-6 border-b border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 mx-auto sm:mx-0">
                        <span className="flex items-center gap-1 font-extrabold text-amber-400 tracking-wide">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            EXCLUSIVE SALE:
                        </span>
                        <span className="text-slate-300">Get Flat 20% OFF with code</span>
                        <button
                            onClick={handleCopyCoupon}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-black tracking-wider transition shadow-sm"
                            title="Click to copy coupon code"
                        >
                            {copiedCoupon ? <Check className="w-3 h-3 text-slate-950" /> : <Copy className="w-3 h-3" />}
                            <span>SHOPNIX20</span>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-5 text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <Truck className="w-3.5 h-3.5 text-amber-400" />
                            <span>Free Express Delivery &gt; ₹999</span>
                        </div>
                        <span className="text-slate-700">|</span>
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                            <span>24/7 Priority Support: +91 8607603050</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Header - Crisp Luxury White with Gold Accents */}
            <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-8 lg:gap-10">
                            <Link to="/" className="flex items-center gap-2.5 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition duration-300">
                                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black tracking-tight text-slate-900 flex items-center leading-none">
                                        Shop<span className="text-amber-500">nix</span>
                                    </span>
                                    <span className="text-[9px] font-bold text-amber-600 tracking-widest uppercase mt-0.5">
                                        Electronics &amp; Lifestyle
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Links */}
                            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
                                <Link
                                    to="/"
                                    className={`transition-all hover:text-amber-600 ${
                                        isHome ? "text-amber-600 font-bold" : "text-slate-700"
                                    }`}
                                >
                                    Home
                                </Link>
                                <a
                                    href="#products-section"
                                    className="hover:text-amber-600 transition"
                                >
                                    All Products
                                </a>
                                <Link
                                    to="/?category=Smart Devices#products-section"
                                    className="hover:text-amber-600 transition"
                                >
                                    Smart Devices
                                </Link>
                                <Link
                                    to="/?category=Audio#products-section"
                                    className="hover:text-amber-600 transition"
                                >
                                    Audio
                                </Link>
                                <Link
                                    to="/?category=Gaming#products-section"
                                    className="hover:text-amber-600 transition"
                                >
                                    Gaming
                                </Link>
                                <a
                                    href="#flash-deals-section"
                                    className="text-amber-600 hover:text-amber-700 font-bold transition flex items-center gap-1.5"
                                >
                                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                                    Deals of the Day
                                </a>
                            </nav>
                        </div>

                        {/* Search Bar - Clean Light Grey with Autocomplete */}
                        <div ref={searchRef} className="hidden md:block flex-1 max-w-sm mx-6 relative">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search electronics, headphones, watches..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => {
                                        if (searchResults.length > 0) setShowSuggestions(true);
                                    }}
                                    className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-slate-100 text-slate-900 placeholder-slate-400 rounded-full border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 outline-none transition duration-200"
                                />
                                {searchQuery ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setShowSuggestions(false);
                                        }}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-600 transition"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                )}
                            </form>

                            {/* Autocomplete Suggestions Dropdown */}
                            {showSuggestions && searchResults.length > 0 && (
                                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="p-2 divide-y divide-slate-100">
                                        {searchResults.map((item) => (
                                            <div
                                                key={item._id}
                                                onClick={() => {
                                                    navigate(`/product/${item._id}`);
                                                    setShowSuggestions(false);
                                                    setSearchQuery("");
                                                }}
                                                className="p-2.5 hover:bg-amber-50/50 rounded-xl cursor-pointer flex items-center gap-3 transition"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-slate-100 p-1 shrink-0 border border-slate-200 flex items-center justify-center">
                                                    <img
                                                        src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-amber-600 font-bold">{item.category}</span>
                                                        <span className="text-xs font-black text-slate-900">₹{(item.discount_price || item.price)?.toLocaleString("en-IN")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        onClick={handleSearchSubmit}
                                        className="p-2.5 text-center text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 cursor-pointer border-t border-amber-100 transition"
                                    >
                                        View all results for "{searchQuery}" →
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Action Icons */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Demo Switcher Quick Buttons */}
                            <div className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px]">
                                <button
                                    onClick={() => loginAsDemo("customer")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        !isAdmin ? "bg-slate-900 text-amber-400 shadow-xs" : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    Customer
                                </button>
                                <button
                                    onClick={() => loginAsDemo("admin")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        isAdmin ? "bg-slate-900 text-amber-400 shadow-xs" : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>

                            {/* Admin Link Badge if Admin */}
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-bold rounded-full hover:bg-amber-100 transition"
                                >
                                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Admin Panel</span>
                                </Link>
                            )}

                            {/* Wishlist Button */}
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="relative p-2.5 text-slate-700 hover:text-amber-600 hover:bg-slate-100 rounded-full transition"
                                title="Open Wishlist"
                            >
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Button */}
                            <Link
                                to="/cart"
                                className="relative p-2.5 text-slate-700 hover:text-amber-600 hover:bg-slate-100 rounded-full transition"
                                title="Shopping Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Profile / Auth Dropdown */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition border border-slate-200"
                                    >
                                        {user?.profile_img ? (
                                            <img
                                                src={user.profile_img}
                                                alt={user.first_name}
                                                className="w-7 h-7 rounded-full object-cover border border-slate-300"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-black flex items-center justify-center">
                                                {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-slate-800 hidden sm:inline max-w-[90px] truncate">
                                            {user?.first_name || "User"}
                                        </span>
                                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isProfileOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileOpen(false)}
                                            ></div>
                                            <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                                <div className="px-4 py-2.5 border-b border-slate-100">
                                                    <p className="text-sm font-bold text-slate-900">
                                                        {user?.first_name} {user?.last_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                                    <div className="mt-1.5 flex items-center gap-1.5">
                                                        <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded border border-amber-200 uppercase">
                                                            {user?.role || "Customer"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Demo Account Switcher inside dropdown */}
                                                <div className="px-4 py-2 border-b border-slate-100 text-xs">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Quick Switch Mode</span>
                                                    <div className="grid grid-cols-2 gap-1.5">
                                                        <button
                                                            onClick={() => {
                                                                loginAsDemo("customer");
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className={`py-1 rounded text-[11px] font-bold border transition ${
                                                                !isAdmin ? "bg-slate-900 text-amber-400 border-slate-900" : "bg-slate-100 text-slate-700 border-slate-200"
                                                            }`}
                                                        >
                                                            Customer
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                loginAsDemo("admin");
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className={`py-1 rounded text-[11px] font-bold border transition ${
                                                                isAdmin ? "bg-slate-900 text-amber-400 border-slate-900" : "bg-slate-100 text-slate-700 border-slate-200"
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
                                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50 font-bold transition"
                                                    >
                                                        <Shield className="w-4 h-4 text-amber-600" />
                                                        <span>Admin Dashboard</span>
                                                    </Link>
                                                )}

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                                >
                                                    <User className="w-4 h-4 text-slate-500" />
                                                    <span>My Profile</span>
                                                </Link>

                                                <Link
                                                    to="/orders"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                                                >
                                                    <Package className="w-4 h-4 text-slate-500" />
                                                    <span>My Orders</span>
                                                </Link>

                                                <div className="border-t border-slate-100 my-1"></div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition text-left font-semibold"
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
                                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-amber-500 hover:text-slate-950 transition px-4 py-2 rounded-full shadow-sm"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )}

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-100 text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none"
                        />
                        <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                            Home
                        </Link>
                        <a
                            href="#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                            All Products
                        </a>
                        <Link
                            to="/?category=Smart Devices#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                            Smart Devices
                        </Link>
                        <Link
                            to="/?category=Audio#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                            Audio &amp; Headphones
                        </Link>
                        <Link
                            to="/?category=Gaming#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                            Gaming &amp; VR
                        </Link>
                        <Link
                            to="/cart"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-amber-50 hover:text-amber-700 transition flex items-center justify-between"
                        >
                            <span>Cart</span>
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black">{totalItems}</span>
                        </Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsDrawerOpen(true);
                            }}
                            className="px-3 py-2 text-left rounded-xl hover:bg-rose-50 hover:text-rose-600 transition flex items-center justify-between"
                        >
                            <span>Wishlist</span>
                            <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-xs font-bold">{wishlistCount}</span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
