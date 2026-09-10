import React from "react";
import { ShoppingBag, Heart, Mail, Phone, MapPin, Sparkles, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer id="footer-section" className="bg-[#090D1A] text-slate-400 text-xs sm:text-sm mt-auto border-t border-slate-800/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
                                <ShoppingBag className="w-5 h-5 text-slate-950" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tight leading-none">
                                    Shop<span className="text-amber-500">nix</span>
                                </span>
                                <span className="text-[9px] font-bold text-amber-400 tracking-widest uppercase mt-0.5">
                                    Future Is Shopping
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-xs">
                            India's premier trusted destination for authentic electronics, smart wearables, spatial audio hardware, VR gear, and computer peripherals with express delivery across India.
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>100% Certified Authentic Hardware</span>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>Shop Categories</span>
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li><Link to="/?category=Smart Devices#products-section" className="hover:text-amber-400 transition text-slate-400">Smart Watches &amp; Rings</Link></li>
                            <li><Link to="/?category=Audio#products-section" className="hover:text-amber-400 transition text-slate-400">ANC Earbuds &amp; Headphones</Link></li>
                            <li><Link to="/?category=Gaming#products-section" className="hover:text-amber-400 transition text-slate-400">VR Headsets &amp; Keyboards</Link></li>
                            <li><Link to="/?category=Cameras#products-section" className="hover:text-amber-400 transition text-slate-400">4K Drones &amp; Action Cams</Link></li>
                            <li><Link to="/?category=Electronics#products-section" className="hover:text-amber-400 transition text-slate-400">Curved Monitors &amp; PC Gear</Link></li>
                            <li><Link to="/?category=AI Devices#products-section" className="hover:text-amber-400 transition text-slate-400">AI Displays &amp; Smart Devices</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Customer Care</h3>
                        <ul className="space-y-2 text-xs">
                            <li><Link to="/orders" className="hover:text-amber-400 transition text-slate-400">Track Package Live</Link></li>
                            <li><Link to="/cart" className="hover:text-amber-400 transition text-slate-400">Shopping Bag &amp; Checkout</Link></li>
                            <li><Link to="/profile" className="hover:text-amber-400 transition text-slate-400">Manage Addresses &amp; Account</Link></li>
                            <li><span className="text-slate-500 cursor-default">Pan-India Delivery (2-4 Days)</span></li>
                            <li><span className="text-slate-500 cursor-default">7-Day Hassle-Free Replacement</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Corporate Office</h3>
                        <ul className="space-y-2.5 text-xs">
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>support@shopnix.in</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>+91 8607603050 (Mon-Sat 9AM-8PM)</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                                <span>Shopnix Tech Hub, Kaithal, Haryana 136027, India</span>
                            </li>
                        </ul>

                        {/* Supported Payment Logos */}
                        <div className="mt-4 pt-3 border-t border-slate-800">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Accepted Payment Modes</span>
                            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-200">
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">UPI</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">GPay</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">PhonePe</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">Paytm</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">Visa</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">Mastercard</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">RuPay</span>
                                <span className="px-2 py-0.5 rounded bg-slate-800/90 border border-slate-700">COD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} Shopnix Inc. All prices in Indian Rupee (₹). All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for electronics &amp; gadget lovers across India.
                    </p>
                </div>
            </div>
        </footer>
    );
}
