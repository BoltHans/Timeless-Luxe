import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Import theme styles
import "./styles/theme.css";

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
        <Router>
            <Layout>
                <Routes>
                    {/* Public Pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/women" element={<WomenSection />} />
                    <Route path="/men" element={<MenSection />} />

                    {/* Admin Pages */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/manage-users" element={<ManageUsers />} />
                    <Route path="/admin/manage-products" element={<ManageProducts />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
