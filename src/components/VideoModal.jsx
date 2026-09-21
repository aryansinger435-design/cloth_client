import React, { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Crown, ArrowRight, ShieldCheck } from "lucide-react";

export default function VideoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
            <div
                className="relative bg-[#07080D] rounded-2xl max-w-3xl w-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-[#D4AF37]/40 flex flex-col animate-in zoom-in-95 duration-200 text-slate-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:px-6 border-b border-[#151722] flex items-center justify-between bg-[#030406]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0A0C13] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                            <Crown className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-serif">Chrononix Haute Horlogerie Ateliers</h3>
                            <p className="text-[11px] text-[#E5C158]">Calibre CH-901 Flying Tourbillon Manufacture Film</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#0A0C13] transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video / Interactive Visual Showcase Container */}
                <div className="relative aspect-video w-full bg-[#020204] overflow-hidden flex items-center justify-center group">
                    <img
                        src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80"
                        alt="Chrononix Flagship Timepiece Film"
                        className={`w-full h-full object-cover transition-transform duration-1000 ${
                            isPlaying ? "scale-105" : "scale-100 filter grayscale-[20%]"
                        }`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent"></div>

                    {/* Center Action Play / Pause */}
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="relative z-10 w-20 h-20 rounded-full bg-[#D4AF37]/90 hover:bg-[#E5C158] backdrop-blur-md border-2 border-[#F9E7B9] flex items-center justify-center text-black shadow-[0_0_35px_rgba(212,175,55,0.7)] transition transform hover:scale-110 active:scale-95"
                    >
                        {isPlaying ? <Pause className="w-8 h-8 text-black" /> : <Play className="w-8 h-8 fill-black text-black ml-1" />}
                    </button>

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-[#07080D]/90 backdrop-blur-md border border-[#D4AF37]/50 text-[11px] text-white font-bold flex items-center gap-1.5 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>4K ATELIER DOCUMENTARY • 28,800 VPH</span>
                    </div>

                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="absolute bottom-4 right-4 z-20 p-2.5 rounded-lg bg-[#07080D]/80 backdrop-blur-md border border-[#D4AF37]/40 text-slate-300 hover:text-white shadow-md transition"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                </div>

                {/* Bottom Bar Info & Action */}
                <div className="p-5 sm:p-6 bg-[#030406] border-t border-[#151722] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                        <h4 className="font-bold text-white text-base font-serif">Handcrafted in Genevan &amp; Saxon Tradition</h4>
                        <p className="text-xs text-slate-400">
                            Witness the meticulous assembly of our 312-component tourbillon carriage, Côte de Genève striping, and perlage finishing.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E5C158] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                        >
                            Explore Timepieces
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
