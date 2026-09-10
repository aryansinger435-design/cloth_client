import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WishlistDrawer from "./components/WishlistDrawer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";

function StoreLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#040406] text-slate-100 selection:bg-[#D4AF37] selection:text-black">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <WishlistDrawer />
        </div>
    );
}

export default function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <CartProvider>
                    <WishlistProvider>
                        <BrowserRouter>
                            <Routes>
                                {/* Public Storefront Routes */}
                                <Route
                                    path="/"
                                    element={
                                        <StoreLayout>
                                            <Home />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/product/:id"
                                    element={
                                        <StoreLayout>
                                            <ProductDetail />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <StoreLayout>
                                            <Register />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/verify-otp"
                                    element={
                                        <StoreLayout>
                                            <VerifyOTP />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <StoreLayout>
                                            <Login />
                                        </StoreLayout>
                                    }
                                />

                                {/* Customer Storefront Routes */}
                                <Route
                                    path="/cart"
                                    element={
                                        <StoreLayout>
                                            <Cart />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <StoreLayout>
                                            <Profile />
                                        </StoreLayout>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <StoreLayout>
                                            <Orders />
                                        </StoreLayout>
                                    }
                                />

                                {/* Admin Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminLayout />
                                    }
                                >
                                    <Route index element={<AdminOverview />} />
                                    <Route path="products" element={<AdminProducts />} />
                                    <Route path="users" element={<AdminUsers />} />
                                    <Route path="orders" element={<AdminOrders />} />
                                </Route>

                                {/* Fallback */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </BrowserRouter>
                    </WishlistProvider>
                </CartProvider>
            </AuthProvider>
        </ToastProvider>
    );
}
