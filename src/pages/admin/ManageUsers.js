import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(collection(db, "users"));
            setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };
        fetchUsers();
    }, []);

    const toggleRole = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        await updateDoc(doc(db, "users", user.id), { role: newRole });
        setUsers(
            users.map((u) =>
                u.id === user.id ? { ...u, role: newRole } : u
            )
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="grid gap-4">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="border p-4 rounded flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">{user.name || "Unnamed User"}</h3>
                                <p>Email: {user.email}</p>
                                <p className="text-sm text-gray-500">Role: {user.role}</p>
                            </div>
                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={() => toggleRole(user)}
                            >
                                {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
