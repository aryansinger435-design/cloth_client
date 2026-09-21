import React from "react";
import { Watch, Heart, Mail, Phone, MapPin, Crown, ShieldCheck, Truck, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer id="footer-section" className="bg-[#020204] text-slate-400 text-xs sm:text-sm mt-auto border-t border-[#12141D]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C5A059] via-[#E5C158] to-[#AA771C] flex items-center justify-center text-slate-950 font-black shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                <Watch className="w-5 h-5 text-slate-950" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tight leading-none font-serif">
                                    CHRONO<span className="text-[#E5C158]">NIX</span>
                                </span>
                                <span className="text-[9px] font-bold text-[#C5A059] tracking-[0.2em] uppercase mt-0.5 font-sans">
                                    HAUTE HORLOGERIE
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-xs">
                            India's premier luxury horology atelier for certified mechanical calibres, flying tourbillons, Swiss chronographs, and heritage divers delivered with white-glove armored courier.
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-[#E5C158] font-medium">
                            <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                            <span>100% Certified Authentic Swiss &amp; Global Calibres</span>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5 font-serif">
                            <Crown className="w-3.5 h-3.5 text-[#E5C158]" />
                            <span>Horology Collections</span>
                        </h3>
                        <ul className="space-y-2 text-xs">
                            <li><Link to="/?category=Luxury Automatics#products-section" className="hover:text-[#E5C158] transition text-slate-400">Luxury Automatics</Link></li>
                            <li><Link to="/?category=Chronographs#products-section" className="hover:text-[#E5C158] transition text-slate-400">Chronographs &amp; Tachymeters</Link></li>
                            <li><Link to="/?category=Tourbillon & Complications#products-section" className="hover:text-[#E5C158] transition text-slate-400">Tourbillon &amp; Complications</Link></li>
                            <li><Link to="/?category=Skeleton & Mechanical#products-section" className="hover:text-[#E5C158] transition text-slate-400">Skeleton &amp; Openwork</Link></li>
                            <li><Link to="/?category=Dive & Sports Heritage#products-section" className="hover:text-[#E5C158] transition text-slate-400">Dive &amp; Sports Heritage 300M</Link></li>
                            <li><Link to="/?category=Minimalist Dress Watches#products-section" className="hover:text-[#E5C158] transition text-slate-400">Minimalist Dress Watches</Link></li>
                            <li><Link to="/?category=Smart Luxury#products-section" className="hover:text-[#E5C158] transition text-slate-400">Smart Luxury Connected</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-serif">Collector Care</h3>
                        <ul className="space-y-2 text-xs">
                            <li><Link to="/orders" className="hover:text-[#E5C158] transition text-slate-400">Track Armored Shipment</Link></li>
                            <li><Link to="/cart" className="hover:text-[#E5C158] transition text-slate-400">Acquisition Cart &amp; Checkout</Link></li>
                            <li><Link to="/profile" className="hover:text-[#E5C158] transition text-slate-400">Collector Vault &amp; Credentials</Link></li>
                            <li><span className="text-slate-500 cursor-default">5-Year Global Horology Warranty</span></li>
                            <li><span className="text-slate-500 cursor-default">COSC Chronometer Precision Standards</span></li>
                            <li><span className="text-slate-500 cursor-default">7-Day Inspection &amp; Vault Return</span></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 font-serif">Horology Atelier</h3>
                        <ul className="space-y-2.5 text-xs">
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Mail className="w-4 h-4 text-[#E5C158] shrink-0" />
                                <span>concierge@chrononix.in</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <Phone className="w-4 h-4 text-[#E5C158] shrink-0" />
                                <span>+91 8607603050 (Private Desk 24/7)</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-slate-300">
                                <MapPin className="w-4 h-4 text-[#E5C158] shrink-0" />
                                <span>Chrononix Horology Lounge, Kaithal, Haryana 136027, India</span>
                            </li>
                        </ul>

                        {/* Supported Payment Logos */}
                        <div className="mt-4 pt-3 border-t border-[#12141D]">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Secure Settlement Options</span>
                            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-[#E5C158]">
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">UPI Fast</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">GPay</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">PhonePe</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">Visa Infinite</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">Mastercard World</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">Amex</span>
                                <span className="px-2 py-0.5 rounded bg-[#07080D] border border-[#151722]">Armored COD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#12141D] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                    <p>© {new Date().getFullYear()} Chrononix Horology Group. All prices in Indian Rupee (₹). All rights reserved.</p>
                    <p className="flex items-center gap-1.5">
                        Handcrafted with <Heart className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158] inline" /> for fine watch connoisseurs across India.
                    </p>
                </div>
            </div>
        </footer>
    );
}
