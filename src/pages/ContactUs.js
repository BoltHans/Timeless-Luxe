import { useState } from "react";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Message sent:", form); // Later -> Save to Firestore
        alert("Your message has been sent!");
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2"
                />
                <textarea
                    placeholder="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="border p-2"
                />
                <button className="bg-black text-white py-2">Send</button>
            </form>
        </div>
    );
};

export default ContactUs;
