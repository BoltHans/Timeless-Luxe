import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const CartSummary = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (!auth.currentUser) return;
            const cartRef = collection(db, "users", auth.currentUser.uid, "cart");
            const querySnapshot = await getDocs(cartRef);
            setCart(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchCart();
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-6 bg-gray-100 rounded">
            <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
            <p className="font-bold mt-2">Total: ${total}</p>
        </div>
    );
};

export default CartSummary;
