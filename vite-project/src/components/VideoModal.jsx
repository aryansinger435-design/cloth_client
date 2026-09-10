import React, { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function VideoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:px-6 border-b border-slate-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-extrabold text-slate-900 tracking-wide uppercase">Shopnix 2026 Showcase</h3>
                            <p className="text-[11px] text-slate-500">Next-Gen Wearables &amp; Spatial Audio Gear</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video / Interactive Visual Showcase Container */}
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden flex items-center justify-center group">
                    <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80"
                        alt="Shopnix Flagship Product Preview"
                        className={`w-full h-full object-cover transition-transform duration-1000 ${
                            isPlaying ? "scale-105" : "scale-100 filter grayscale-[20%]"
                        }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Center Action Play / Pause */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="relative z-10 w-20 h-20 rounded-full bg-amber-500/90 hover:bg-amber-400 backdrop-blur-md border-2 border-slate-950/30 flex items-center justify-center text-slate-950 shadow-2xl transition transform hover:scale-110 active:scale-95"
                    >
                        {isPlaying ? <Pause className="w-8 h-8 text-slate-950" /> : <Play className="w-8 h-8 fill-slate-950 text-slate-950 ml-1" />}
                    </button>

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-[11px] text-white font-bold flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        <span>4K ULTRA HD DEMO</span>
                    </div>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-4 right-4 z-20 p-2.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white shadow-md transition"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                </div>

                {/* Bottom Bar Info & Action */}
                <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                        <h4 className="font-extrabold text-slate-900 text-base">Explore Quantum Acoustic Drivers</h4>
                        <p className="text-xs text-slate-600">
                            Experience lossless 24-bit 96kHz wireless streaming, titanium drivers, and custom noise tailoring.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => {
                                onClose();
                                const el = document.getElementById("products-section");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-xs flex items-center gap-2 shadow-md transition"
                        >
                            <span>Shop Featured Gear</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
