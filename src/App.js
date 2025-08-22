import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
=======
>>>>>>> 8433e3520285295031a35fe3dcd6d229dfbac415

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
<<<<<<< HEAD
        <AuthProvider>
            <Router>
                <div className="app-container flex flex-col min-h-screen">
                    <Navbar />

                    <main className="flex-grow">
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

                            {/* Admin Routes (use same layout or a custom AdminLayout if you prefer) */}
                            <Route path="/admin" element={<Layout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="manage-users" element={<ManageUsers />} />
                                <Route path="manage-products" element={<ManageProducts />} />
                            </Route>
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </Router>
        </AuthProvider>
=======
        <Router>
            <Navbar />
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
            <Footer />
        </Router>
>>>>>>> 8433e3520285295031a35fe3dcd6d229dfbac415
    );
}

export default App;