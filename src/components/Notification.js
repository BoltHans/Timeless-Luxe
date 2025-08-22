import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Notifications = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!auth.currentUser) return;
            const notesRef = collection(db, "users", auth.currentUser.uid, "notifications");
            const querySnapshot = await getDocs(notesRef);
            setNotes(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        };

        fetchNotes();
    }, []);

    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-bold mb-2">Notifications</h2>
            {notes.length === 0 ? (
                <p>No notifications yet.</p>
            ) : (
                <ul>
                    {notes.map((n) => (
                        <li key={n.id} className="border-b py-2">{n.message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notifications;
