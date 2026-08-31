import React from "react";
import { ShoppingBag, Heart, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#06050C] text-slate-400 text-sm mt-auto border-t border-purple-950/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tight leading-none">
                                    Shop<span className="text-purple-400">nix</span>
                                </span>
                                <span className="text-[9px] font-semibold text-purple-400/80 tracking-widest uppercase">
                                    Future Is Shopping
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-xs sm:text-sm">
                            Next-generation store for futuristic technology, smart wearables, immersive audio, and premium cyberpunk gear in India.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-white font-bold text-sm mb-4 tracking-wider uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            Shop Categories
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li><Link to="/?category=Electronics" className="hover:text-purple-400 transition">Electronics</Link></li>
                            <li><Link to="/?category=Smart Devices" className="hover:text-purple-400 transition">Smart Devices</Link></li>
                            <li><Link to="/?category=Accessories" className="hover:text-purple-400 transition">Audio & Accessories</Link></li>
                            <li><Link to="/?category=Gaming" className="hover:text-purple-400 transition">Gaming & VR</Link></li>
                            <li><Link to="/?category=Drones" className="hover:text-purple-400 transition">Drones & Cameras</Link></li>
                            <li><Link to="/?category=AI Devices" className="hover:text-purple-400 transition">AI Devices</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Customer Support</h3>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li><Link to="/profile" className="hover:text-purple-400 transition">My Account</Link></li>
                            <li><Link to="/orders" className="hover:text-purple-400 transition">Track Order</Link></li>
                            <li><Link to="/cart" className="hover:text-purple-400 transition">Shopping Cart</Link></li>
                            <li><span className="hover:text-purple-400 transition cursor-pointer">Shipping & Returns (Pan-India)</span></li>
                            <li><span className="hover:text-purple-400 transition cursor-pointer">Warranty & Authenticity</span></li>
                        </ul>
                    </div>

                    {/* Contact & Help */}
                    <div>
                        <h3 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">Contact Us</h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            <li className="flex items-center gap-2.5">
                                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>support@shopnix.in</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>+91 8607603050</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                                <span>Kaithal, Haryana, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-purple-950/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} Shopnix Inc. All prices in INR (₹). All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Designed with <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 inline" /> for tech lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
}

