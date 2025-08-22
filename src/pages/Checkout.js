import { useState, useEffect } from "react";
import CartSummary from "../components/CartSummary";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

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

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!payment.cardNumber || !payment.expiry || !payment.cvv) {
            alert("Please fill all payment fields");
            return;
        }

        try {
            // Save order in Firestore
            await addDoc(collection(db, "users", auth.currentUser.uid, "orders"), {
                items: cart,
                total,
                status: "completed",
                date: new Date().toISOString(),
            });

            alert("Payment successful! Order placed.");
            setPayment({ cardNumber: "", expiry: "", cvv: "" });
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <CartSummary />

            <h2 className="text-xl font-bold mt-6 mb-2">Payment Details</h2>
            <form onSubmit={handlePayment} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Card Number"
                    value={payment.cardNumber}
                    onChange={(e) =>
                        setPayment({ ...payment, cardNumber: e.target.value })
                    }
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    className="border p-2"
                />

                <button
                    type="submit"
                    className="bg-black text-white py-2 mt-4 w-full"
                >
                    Pay ${total}
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
