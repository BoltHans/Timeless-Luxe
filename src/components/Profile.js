import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!auth.currentUser) return;

            const userRef = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) setUserData(userSnap.data());

            const ordersRef = collection(db, "users", auth.currentUser.uid, "orders");
            const ordersSnap = await getDocs(ordersRef);
            setOrders(ordersSnap.docs.map((d) => d.data()));

            const servicesRef = collection(db, "users", auth.currentUser.uid, "services");
            const servicesSnap = await getDocs(servicesRef);
            setServices(servicesSnap.docs.map((d) => d.data()));
        };
        fetchProfile();
    }, []);

    if (!userData) return <p>Loading profile...</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>

            <h3 className="text-xl font-bold mt-6">My Orders</h3>
            <ul className="list-disc pl-5">
                {orders.map((o, idx) => (
                    <li key={idx}>${o.total} - {o.status}</li>
                ))}
            </ul>

            <h3 className="text-xl font-bold mt-6">My Services</h3>
            <ul className="list-disc pl-5">
                {services.map((s, idx) => (
                    <li key={idx}>{s.serviceName} - {s.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;
