import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800 text-center py-4 shadow-md mt-auto">
            <p>© {new Date().getFullYear()} Timeless Luxe. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
                <a href="/privacy" className="text-gray-600">Privacy</a>
                <a href="/terms" className="text-gray-600">Terms</a>
                <a href="/contact" className="text-gray-600">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;