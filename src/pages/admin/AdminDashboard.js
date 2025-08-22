import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import auth for current user state

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = auth.currentUser ; // Get the current user

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirect if not logged in
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersSnap = await getDocs(collection(db, "users"));
                const productsSnap = await getDocs(collection(db, "products"));

                setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <h3 className="text-xl">Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.email} - {user.role}</li>
                ))}
            </ul>
            <h3 className="text-xl">Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
