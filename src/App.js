import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import WishlistPage from "./pages/WishlistPage";
import Register from "./pages/Register";
import LogIn from "./pages/Log-in";
import WomenSection from "./pages/Women'sSection";
import MenSection from "./pages/Men'sSection";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageProducts from "./pages/admin/ManageProduct";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="contact" element={<ContactUs />} />
                        <Route path="wishlist" element={<WishlistPage />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<LogIn />} />
                        <Route path="women" element={<WomenSection />} />
                        <Route path="men" element={<MenSection />} />
                    </Route>

                    <Route path="/admin" element={<Layout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="manage-users" element={<ManageUsers />} />
                        <Route path="manage-products" element={<ManageProducts />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;