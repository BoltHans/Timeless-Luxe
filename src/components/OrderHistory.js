import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!auth.currentUser) return;
            const ordersRef = collection(db, "users", auth.currentUser.uid, "orders");
            const querySnapshot = await getDocs(ordersRef);
            setOrders(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchOrders();
    }, []);

    return (
        <div className="p-6 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">Order History</h2>
            {orders.length === 0 ? (
                <p>No past orders.</p>
            ) : (
                <ul>
                    {orders.map((o) => (
                        <li key={o.id}>
                            Order #{o.id} - ${o.total} - {o.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
