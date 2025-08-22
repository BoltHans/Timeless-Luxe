import ServiceDetail from "../components/ServiceDetails";

const ServicesPage = () => {
    const services = [
        {
            id: 1,
            name: "Luxury Bag Repair",
            description: "Professional cleaning and restoration for designer bags.",
            price: 120,
        },
        {
            id: 2,
            name: "Watch Personalization",
            description: "Engraving and strap customization for watches.",
            price: 80,
        },
        {
            id: 3,
            name: "Jewelry Polishing",
            description: "Bring your jewelry back to life with expert polishing.",
            price: 50,
        },
    ];

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
                <ServiceDetail key={s.id} service={s} />
            ))}
        </div>
    );
};

export default ServicesPage;
