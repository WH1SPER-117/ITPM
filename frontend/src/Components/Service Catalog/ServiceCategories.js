import { useEffect, useState } from "react";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Service Categories</h2>
      {categories.map((category) => (
        <div key={category.categoryId} className="bg-softBlue p-4 rounded-lg shadow-lg mb-3">
          <h3 className="text-xl font-semibold text-primary">{category.categoryName}</h3>
          <ul className="list-disc pl-6 text-darkBlue">
            {category.services.map((service) => (
              <li key={service.serviceId}>{service.serviceName}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
