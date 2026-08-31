import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Star,
    ShoppingBag,
    Check,
    Truck,
    RefreshCw,
    ShieldCheck,
    ArrowLeft,
    Share2,
    Heart,
    Cpu,
    Sparkles
} from "lucide-react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("Standard");
    const [selectedColor, setSelectedColor] = useState("Standard");
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/products/${id}`);
                if (res.data?.success && res.data?.data) {
                    const prod = res.data.data;
                    setProduct(prod);
                    setSelectedSize(prod.sizes?.[0] || "Standard");
                    setSelectedColor(prod.colors?.[0] || "Standard");

                    // Fetch related category products
                    const relRes = await api.get(`/products?category=${encodeURIComponent(prod.category)}&limit=4`);
                    if (relRes.data?.success && relRes.data?.data) {
                        setRelatedProducts(relRes.data.data.products?.filter((p) => p._id !== prod._id) || []);
                    }
                }
            } catch (err) {
                console.error("Error fetching product detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            setAdding(true);
            await addToCart(product._id, quantity, selectedSize, selectedColor);
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            alert(err.message || "Failed to add item to cart");
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] bg-[#08070E] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[70vh] bg-[#08070E] flex flex-col items-center justify-center p-6 text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
                <p className="text-sm text-slate-400">The gadget or device you are looking for does not exist or has been removed.</p>
                <Link to="/" className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-semibold hover:bg-purple-500 transition shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    Return to Store
                </Link>
            </div>
        );
    }

    const imgUrl = product.images?.[0]?.url || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800";
    const hasDiscount = product.discount_price > 0 && product.discount_price < product.price;
    const finalPrice = hasDiscount ? product.discount_price : product.price;
    const discountPercent = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

    return (
        <div className="min-h-screen bg-[#08070E] text-slate-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button & Breadcrumbs */}
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-8">
                    <Link to="/" className="inline-flex items-center gap-1 hover:text-purple-400 transition font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Store
                    </Link>
                    <span>/</span>
                    <span className="text-purple-400 font-semibold">{product.category}</span>
                    <span>/</span>
                    <span className="text-slate-200 font-bold truncate max-w-xs">{product.name}</span>
                </div>

                {/* Product Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#120F24] p-6 sm:p-10 rounded-3xl border border-[#241D3F] shadow-[0_4px_30px_rgba(0,0,0,0.5)] mb-16">
                    {/* Left: Product Image */}
                    <div className="lg:col-span-6">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#0A0815] border border-purple-900/40 flex items-center justify-center p-8">
                            <img
                                src={imgUrl}
                                alt={product.name}
                                className="w-full h-full object-contain max-h-[420px] drop-shadow-[0_15px_30px_rgba(168,85,247,0.3)] hover:scale-105 transition duration-500"
                            />
                            {hasDiscount && (
                                <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold rounded-xl shadow-md">
                                    {discountPercent}% OFF
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info & Actions */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div>
                            {/* Category & Rating */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="px-3 py-1 bg-purple-950/80 text-purple-300 border border-purple-800/40 text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {product.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-purple-400">
                                    <Star className="w-4 h-4 fill-purple-400 text-purple-400" />
                                    <span className="font-bold text-white text-sm">
                                        {product.ratings?.average ? product.ratings.average.toFixed(1) : "5.0"}
                                    </span>
                                    <span className="text-slate-500 text-xs">
                                        ({product.ratings?.count || 128} customer ratings)
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-baseline gap-4 mt-4 mb-6">
                                <span className="text-3xl sm:text-4xl font-black text-white">
                                    ₹{finalPrice.toLocaleString("en-IN")}
                                </span>
                                {hasDiscount && (
                                    <span className="text-lg text-slate-500 line-through">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="border-t border-b border-purple-950/40 py-4 mb-6">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specifications / Sizes */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                                        Specification / Size
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.sizes.map((sz) => (
                                            <button
                                                key={sz}
                                                type="button"
                                                onClick={() => setSelectedSize(sz)}
                                                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition ${
                                                    selectedSize === sz
                                                        ? "border-purple-500 bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                                        : "border-purple-900/40 bg-[#16132A] text-slate-400 hover:border-purple-500/60 hover:text-white"
                                                }`}
                                            >
                                                {sz}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Colors / Editions */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                                        Edition / Color
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.colors.map((clr) => (
                                            <button
                                                key={clr}
                                                type="button"
                                                onClick={() => setSelectedColor(clr)}
                                                className={`px-4 py-2 text-xs font-medium rounded-xl border transition ${
                                                    selectedColor === clr
                                                        ? "border-purple-500 bg-purple-950/80 text-purple-300 font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                                                        : "border-purple-900/40 bg-[#16132A] text-slate-400 hover:border-purple-500/60 hover:text-white"
                                                }`}
                                            >
                                                {clr}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quantity & CTA */}
                        <div>
                            <div className="flex items-center gap-4 pt-4 border-t border-purple-950/40">
                                <div className="flex items-center border border-purple-900/50 rounded-xl overflow-hidden bg-[#16132A]">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-purple-950 font-bold text-sm"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-3 text-sm font-semibold text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-slate-400 hover:text-white hover:bg-purple-950 font-bold text-sm"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding || product.stock <= 0}
                                    className={`flex-1 py-3.5 px-8 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_25px_rgba(168,85,247,0.35)] ${
                                        added
                                            ? "bg-emerald-600 text-white"
                                            : product.stock <= 0
                                            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                            : "bg-purple-600 hover:bg-purple-500 text-white hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]"
                                    }`}
                                >
                                    {added ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Added to Cart!
                                        </>
                                    ) : adding ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-purple-950/40 text-center text-xs text-slate-400">
                                <div className="flex flex-col items-center gap-1.5">
                                    <Truck className="w-5 h-5 text-purple-400" />
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <RefreshCw className="w-5 h-5 text-purple-400" />
                                    <span>30-Day Easy Returns</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                                    <span>100% Genuine Tech</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-extrabold text-white tracking-tight">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((rel) => (
                                <ProductCard key={rel._id} product={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

