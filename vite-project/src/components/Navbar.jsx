import React, { useState } from "react";
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
    Heart
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsMenuOpen(false);
        }
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate("/");
    };

    const isHome = location.pathname === "/" && !location.search;

    return (
        <header className="sticky top-0 z-50 bg-[#0B0914]/90 backdrop-blur-xl border-b border-purple-900/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-105 transition duration-300">
                                <ShoppingBag className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-white flex items-center">
                                Shopnix
                            </span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
                            <Link
                                to="/"
                                className={`transition-all hover:text-purple-400 ${
                                    isHome ? "text-purple-400 font-semibold drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "text-slate-300"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/#products-section"
                                className="text-slate-300 hover:text-purple-400 transition"
                            >
                                Shop
                            </Link>
                            <Link
                                to="/?category=Smart+Devices"
                                className="text-slate-300 hover:text-purple-400 transition"
                            >
                                Categories
                            </Link>
                            <Link
                                to="/#products-section"
                                className="text-slate-300 hover:text-purple-400 transition"
                            >
                                Deals
                            </Link>
                            <Link
                                to="/#footer-section"
                                className="text-slate-300 hover:text-purple-400 transition"
                            >
                                About Us
                            </Link>
                            <Link
                                to="/#footer-section"
                                className="text-slate-300 hover:text-purple-400 transition"
                            >
                                Contact
                            </Link>
                        </nav>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden lg:block flex-1 max-w-sm mx-6">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#151226]/80 text-slate-200 placeholder-slate-400 rounded-full border border-purple-900/40 focus:border-purple-500 focus:bg-[#1A162F] focus:ring-2 focus:ring-purple-500/20 outline-none transition duration-200"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 transition"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Right Action Icons */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Admin Link Badge if Admin */}
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold rounded-full hover:bg-purple-900/80 hover:text-white transition shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                            >
                                <Shield className="w-3.5 h-3.5 text-purple-400" />
                                Admin
                            </Link>
                        )}

                        {/* User Profile / Auth State */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full bg-[#16132A] hover:bg-[#1E1938] transition border border-purple-900/40"
                                >
                                    {user?.profile_img ? (
                                        <img
                                            src={user.profile_img}
                                            alt={user.first_name}
                                            className="w-7 h-7 rounded-full object-cover border border-purple-500/50"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                                            {user?.first_name?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-slate-200 hidden sm:inline max-w-[100px] truncate">
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
                                        <div className="absolute right-0 mt-3 w-56 bg-[#141126] rounded-2xl shadow-2xl border border-purple-900/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                            <div className="px-4 py-2.5 border-b border-purple-900/30">
                                                <p className="text-sm font-semibold text-white">
                                                    {user?.first_name} {user?.last_name}
                                                </p>
                                                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                                                {isAdmin && (
                                                    <span className="mt-1.5 inline-block px-2 py-0.5 bg-purple-950 text-purple-300 text-[10px] font-bold rounded border border-purple-800 uppercase">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>

                                            {isAdmin && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-purple-300 hover:bg-purple-950/60 hover:text-white transition"
                                                >
                                                    <Shield className="w-4 h-4 text-purple-400" />
                                                    Admin Dashboard
                                                </Link>
                                            )}

                                            <Link
                                                to="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white transition"
                                            >
                                                <User className="w-4 h-4 text-slate-400" />
                                                My Profile
                                            </Link>

                                            <Link
                                                to="/orders"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:bg-purple-950/40 hover:text-white transition"
                                            >
                                                <Package className="w-4 h-4 text-slate-400" />
                                                My Orders
                                            </Link>

                                            <div className="border-t border-purple-900/30 my-1"></div>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-purple-400 transition px-3 py-1.5 rounded-full hover:bg-purple-950/40"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Sign In</span>
                            </Link>
                        )}

                        {/* Wishlist Icon */}
                        <Link
                            to="/#products-section"
                            className="relative p-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/40 rounded-full transition"
                            title="Wishlist"
                        >
                            <Heart className="w-5 h-5" />
                            <span className="absolute 0 top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.6)]">
                                3
                            </span>
                        </Link>

                        {/* Cart Button */}
                        <Link
                            to="/cart"
                            className="relative p-2.5 text-slate-300 hover:text-purple-400 hover:bg-purple-950/40 rounded-full transition"
                            title="Shopping Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {totalItems > 0 && (
                                <span className="absolute 0 top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.7)] animate-scale-in">
                                    {totalItems > 99 ? "99+" : totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-300 hover:bg-purple-950/60 rounded-xl transition"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#0D0B1B] border-b border-purple-900/40 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 text-sm bg-[#16132A] text-slate-200 placeholder-slate-400 rounded-xl border border-purple-900/40 focus:border-purple-500 outline-none"
                        />
                        <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            Shop
                        </Link>
                        <Link
                            to="/?category=Smart+Devices"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            Categories
                        </Link>
                        <Link
                            to="/#products-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            Deals
                        </Link>
                        <Link
                            to="/#footer-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/#footer-section"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-3 py-2 rounded-xl hover:bg-purple-950/50 hover:text-purple-300 transition"
                        >
                            Contact
                        </Link>

                        {isAdmin && (
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-300 font-semibold flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                Admin Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

