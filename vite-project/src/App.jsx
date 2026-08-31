import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
        <div className="flex flex-col min-h-screen bg-[#08070E] text-slate-100 selection:bg-purple-600 selection:text-white">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
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

                        {/* Protected Customer Routes */}
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <StoreLayout>
                                        <Cart />
                                    </StoreLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <StoreLayout>
                                        <Profile />
                                    </StoreLayout>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <ProtectedRoute>
                                    <StoreLayout>
                                        <Orders />
                                    </StoreLayout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Protected Admin Routes */}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <AdminLayout />
                                </AdminRoute>
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
            </CartProvider>
        </AuthProvider>
    );
}
