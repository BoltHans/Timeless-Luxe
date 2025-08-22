import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
    const { role, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && role !== "admin") navigate("/login");
    }, [loading, role, navigate]);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <div className="grid gap-3">
                <Link className="underline text-blue-600" to="/admin/manage-users">Manage Users</Link>
                <Link className="underline text-blue-600" to="/admin/manage-products">Manage Products</Link>
            </div>
        </div>
    );
}