import { useState } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ServiceDetail = ({ service }) => {
    const [note, setNote] = useState("");

    const handleBooking = async () => {
        if (!auth.currentUser) {
            alert("Please log in to book a service");
            return;
        }

        try {
            await addDoc(collection(db, "users", auth.currentUser.uid, "services"), {
                serviceName: service.name,
                description: service.description,
                note,
                status: "requested",
                date: new Date().toISOString(),
            });
            alert("Service booked successfully!");
            setNote("");
        } catch (error) {
            console.error("Error booking service:", error);
        }
    };

    return (
        <div className="border shadow p-6 rounded">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>
            <p className="font-bold mt-2">${service.price}</p>
            <textarea
                placeholder="Add special instructions..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="border p-2 w-full mt-2"
            />
            <button
                onClick={handleBooking}
                className="bg-black text-white px-4 py-2 mt-2"
            >
                Book Service
            </button>
        </div>
    );
};

export default ServiceDetail;
