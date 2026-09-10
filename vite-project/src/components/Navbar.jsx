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
        <header className="sticky top-0 z-50 bg-[#08070E]">
            {/* Top Announcement Bar - Cyber Dark with Neon Violet accents */}
            <div className="bg-[#05040A] text-slate-300 text-[11px] py-2 px-4 sm:px-6 border-b border-purple-950/60">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 mx-auto sm:mx-0">
                        <span className="flex items-center gap-1 font-extrabold text-purple-400 tracking-wide">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            CYBER PROMO:
                        </span>
                        <span className="text-slate-400">Get Flat 20% OFF with code</span>
                        <button
                            onClick={handleCopyCoupon}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-mono font-black tracking-wider transition shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                            title="Click to copy coupon code"
                        >
                            {copiedCoupon ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                            <span>SHOPNIX20</span>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-5 text-slate-400 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <Truck className="w-3.5 h-3.5 text-purple-400" />
                            <span>Free Express Delivery &gt; ₹999</span>
                        </div>
                        <span className="text-purple-900/60">|</span>
                        <div className="flex items-center gap-1.5 text-slate-300">
                            <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
                            <span>24/7 Priority Support: +91 8607603050</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation Header - Cyber Glassmorphism with Neon Accents */}
            <div className="bg-[#0B0914]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Brand Logo */}
                        <div className="flex items-center gap-8 lg:gap-10">
                            <Link to="/" className="flex items-center gap-2.5 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-105 transition duration-300">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black tracking-tight text-white flex items-center leading-none">
                                        Shop<span className="text-purple-400">nix</span>
                                    </span>
                                    <span className="text-[9px] font-bold text-purple-400/80 tracking-widest uppercase mt-0.5">
                                        FUTURE IS NOW
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Nav Links */}
                            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
                                <Link
                                    to="/"
                                    className={`transition-all hover:text-purple-400 ${
                                        isHome ? "text-purple-400 font-bold" : "text-slate-300"
                                    }`}
                                >
                                    Home
                                </Link>
                                <a
                                    href="#products-section"
                                    className="hover:text-purple-400 transition"
                                >
                                    All Products
                                </a>
                                <Link
                                    to="/?category=Smart Devices#products-section"
                                    className="hover:text-purple-400 transition"
                                >
                                    Smart Devices
                                </Link>
                                <Link
                                    to="/?category=Audio#products-section"
                                    className="hover:text-purple-400 transition"
                                >
                                    Audio
                                </Link>
                                <Link
                                    to="/?category=Gaming#products-section"
                                    className="hover:text-purple-400 transition"
                                >
                                    Gaming
                                </Link>
                                <a
                                    href="#flash-deals-section"
                                    className="text-purple-400 hover:text-purple-300 font-bold transition flex items-center gap-1.5"
                                >
                                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                                    Deals of the Day
                                </a>
                            </nav>
                        </div>

                        {/* Search Bar - Cyber Dark with Autocomplete */}
                        <div ref={searchRef} className="hidden md:block flex-1 max-w-sm mx-6 relative">
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <input
                                    type="text"
                                    placeholder="Search futuristic tech, audio, VR..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => {
                                        if (searchResults.length > 0) setShowSuggestions(true);
                                    }}
                                    className="w-full pl-4 pr-10 py-2.5 text-xs sm:text-sm bg-[#131024] text-slate-100 placeholder-slate-500 rounded-full border border-purple-900/40 focus:border-purple-500 focus:bg-[#16132A] focus:ring-2 focus:ring-purple-500/20 outline-none transition duration-200"
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
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300 transition"
                                    >
                                        <Search className="w-4 h-4" />
                                    </button>
                                )}
                            </form>

                            {/* Autocomplete Suggestions Dropdown */}
                            {showSuggestions && searchResults.length > 0 && (
                                <div className="absolute left-0 right-0 mt-2 bg-[#120F24]/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-[0_15px_35px_rgba(0,0,0,0.8)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                                    <div className="p-2 divide-y divide-purple-950/60">
                                        {searchResults.map((item) => (
                                            <div
                                                key={item._id}
                                                onClick={() => {
                                                    navigate(`/product/${item._id}`);
                                                    setShowSuggestions(false);
                                                    setSearchQuery("");
                                                }}
                                                className="p-2.5 hover:bg-purple-950/40 rounded-xl cursor-pointer flex items-center gap-3 transition"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#0B0916] p-1 shrink-0 border border-purple-900/30 flex items-center justify-center">
                                                    <img
                                                        src={item.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100"}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] text-purple-400 font-bold">{item.category}</span>
                                                        <span className="text-xs font-black text-purple-200">₹{(item.discount_price || item.price)?.toLocaleString("en-IN")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        onClick={handleSearchSubmit}
                                        className="p-2.5 text-center text-xs font-bold text-purple-300 bg-purple-950/60 hover:bg-purple-900/60 cursor-pointer border-t border-purple-900/40 transition"
                                    >
                                        View all results for "{searchQuery}" →
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Action Icons */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Demo Switcher Quick Buttons */}
                            <div className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-[#131024] border border-purple-900/40 text-[11px]">
                                <button
                                    onClick={() => loginAsDemo("customer")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        !isAdmin ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Customer
                                </button>
                                <button
                                    onClick={() => loginAsDemo("admin")}
                                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                                        isAdmin ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    Admin
                                </button>
                            </div>

                            {/* Admin Link Badge if Admin */}
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold rounded-full hover:bg-purple-900/50 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition"
                                >
                                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                                    <span>Admin Panel</span>
                                </Link>
                            )}

                            {/* Wishlist Button */}
                            <button
                                onClick={() => setIsDrawerOpen(true)}
                                className="relative p-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/40 rounded-full transition"
                                title="Open Wishlist"
                            >
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>

                            {/* Cart Button */}
                            <Link
                                to="/cart"
                                className="relative p-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/40 rounded-full transition"
                                title="Shopping Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                                        {totalItems > 99 ? "99+" : totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* User Profile / Auth Dropdown */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-[#131024] hover:bg-[#1A1633] transition border border-purple-900/40"
                                    >
                                        {user?.profile_img ? (
                                            <img
                                                src={user.profile_img}
                                                alt={user.first_name}
                                                className="w-7 h-7 rounded-full object-cover border border-purple-500/40"
                                            />
                                        ) : (
                                            <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                                                {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[90px] truncate">
                                            {user?.first_name || "User"}
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
                                            <div className="absolute right-0 mt-3 w-60 bg-[#120F24]/95 backdrop-blur-xl rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] border border-purple-500/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-200">
                                                <div className="px-4 py-2.5 border-b border-purple-950/60">
                                                    <p className="text-sm font-bold text-white">
                                                        {user?.first_name} {user?.last_name}
                                                    </p>
                                                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                                    <div className="mt-1.5 flex items-center gap-1.5">
                                                        <span className="inline-block px-2 py-0.5 bg-purple-950/60 text-purple-300 text-[10px] font-bold rounded border border-purple-800/40 uppercase">
                                                            {user?.role || "Customer"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Demo Account Switcher inside dropdown */}
                                                <div className="px-4 py-2 border-b border-purple-950/60 text-xs">
                                                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Quick Switch Mode</span>
                                                    <div className="grid grid-cols-2 gap-1.5">
                                                        <button
                                                            onClick={() => {
                                                                loginAsDemo("customer");
                                                                setIsProfileOpen(false);
                                                            }}
                                                            className={`py-1 rounded text-[11px] font-bold border transition ${
                                                                !isAdmin ? "bg-purple-600 text-white border-purple-500" : "bg-[#1A1633] text-slate-400 border-purple-950"
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
                                                                isAdmin ? "bg-purple-600 text-white border-purple-500" : "bg-[#1A1633] text-slate-400 border-purple-950"
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
                                                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-purple-300 hover:bg-purple-950/50 font-bold transition"
                                                    >
                                                        <Shield className="w-4 h-4 text-purple-400" />
                                                        <span>Admin Dashboard</span>
                                                    </Link>
                                                )}

                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white transition"
                                                >
                                                    <User className="w-4 h-4 text-purple-400" />
                                                    <span>My Profile</span>
                                                </Link>

                                                <Link
                                                    to="/orders"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white transition"
                                                >
                                                    <Package className="w-4 h-4 text-purple-400" />
                                                    <span>My Orders</span>
                                                </Link>

                                                <div className="border-t border-purple-950/60 my-1"></div>

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
                                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition px-4 py-2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Sign In</span>
                                </Link>
                            )}

                            {/* Mobile Hamburger Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-slate-300 hover:bg-purple-950/40 rounded-xl transition"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden bg-[#0B0914] border-b border-purple-900/40 px-4 pt-4 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search futuristic products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#131024] text-slate-100 placeholder-slate-500 rounded-xl border border-purple-900/40 focus:border-purple-500 outline-none"
                        />
                        <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-300">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition"
                        >
                            Home
                        </Link>
                        <a
                            href="#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition"
                        >
                            All Products
                        </a>
                        <Link
                            to="/?category=Smart Devices#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition"
                        >
                            Smart Devices
                        </Link>
                        <Link
                            to="/?category=Audio#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition"
                        >
                            Audio &amp; Headphones
                        </Link>
                        <Link
                            to="/?category=Gaming#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition"
                        >
                            Gaming &amp; VR
                        </Link>
                        <Link
                            to="/cart"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/40 hover:text-purple-300 transition flex items-center justify-between"
                        >
                            <span>Cart</span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-black shadow-[0_0_8px_rgba(168,85,247,0.6)]">{totalItems}</span>
                        </Link>
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setIsDrawerOpen(true);
                            }}
                            className="px-3 py-2 text-left rounded-xl hover:bg-rose-950/40 hover:text-rose-400 transition flex items-center justify-between"
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
