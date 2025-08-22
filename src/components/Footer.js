<<<<<<< HEAD
const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-200 to-gray-400 text-gray-800 text-center py-4 shadow-md mt-auto">
            <p className="text-sm">
                © {new Date().getFullYear()} Timeless Luxe. All rights reserved.
            </p>
            <div className="flex justify-center gap-4 mt-2">
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition">Privacy</a>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 transition">Terms</a>
                <a href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
            </div>
        </footer>
    );
};

export default Footer;
=======
const Footer = () => (
    <footer className="bg-black text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Timeless Luxe. All rights reserved.</p>
    </footer>
);

export default Footer;
>>>>>>> 8433e3520285295031a35fe3dcd6d229dfbac415
