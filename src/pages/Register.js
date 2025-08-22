import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAILS = ["admin@timelessluxe.com"]; // Add your admin email(s) here

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());

            await setDoc(doc(db, "users", cred.user.uid), {
                email,
                role: isAdmin ? "admin" : "user",
                createdAt: serverTimestamp(),
            });

            navigate(isAdmin ? "/admin" : "/");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-black text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}
