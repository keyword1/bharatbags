import React, { useState, useEffect } from "react";

const features = [
  {
    title: "We Are a Whole Bag Company",
    description: "From tiffin to travel bags, all designed and made in-house.",
  },
  {
    title: "Original Designs, Premium Quality",
    description: "Bags built for durability, style, and everyday use.",
  },
  {
    title: "Trusted by Customers Nationwide",
    description: "Serving students, professionals, and travelers across India.",
  },
];
function FeatureCards() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length);
    }, 3000); // 3 seconds per card
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="grid gap-6 md:grid-cols-3 p-6">
      {features.map((item, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center justify-center w-[100%] p-6 rounded-xl shadow-lg  bg-white transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="text-xl font-semibold mb-2 w-[100%]">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default FeatureCards;
