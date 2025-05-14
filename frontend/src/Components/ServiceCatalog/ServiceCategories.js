import { useEffect, useState } from "react";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [newServiceName, setNewServiceName] = useState(""); 
  const [newServiceInputs, setNewServiceInputs] = useState({});


  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();

    const filtered = categories
      .map((category) => {
        const matchedServices = category.services.filter((service) =>
          service.serviceName.toLowerCase().includes(lowerTerm)
        );

        const categoryMatch = category.categoryName.toLowerCase().includes(lowerTerm);

        if (categoryMatch || matchedServices.length > 0) {
          return {
            ...category,
            services: matchedServices.length > 0 || categoryMatch ? matchedServices : [],
          };
        }
        return null;
      })
      .filter(Boolean);

    setFilteredCategories(filtered);
  };

  const updateCategory = async (categoryId) => {
    await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: newCategoryName }),
    });
    setEditCategoryId(null);
    fetchCategories();
  };

  const deleteCategory = async (categoryId) => {
    await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
      method: "DELETE",
    });
    fetchCategories();
  }; 

  const addService = async (categoryId) => {
  const serviceName = newServiceInputs[categoryId];
  if (!serviceName) return;

  const category = categories.find((cat) => cat._id === categoryId);
  const isDuplicate = category.services.some(
    (s) => s.serviceName.toLowerCase() === serviceName.toLowerCase()
  );
  if (isDuplicate) {
    alert("Service name already exists in this category.");
    return;
  }

  await fetch(`http://localhost:5000/api/categories/${categoryId}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ serviceName }),
  });

  setNewServiceInputs((prev) => ({ ...prev, [categoryId]: "" }));
  fetchCategories();
  };



  const updateService = async (categoryId, serviceId) => {
    await fetch(`http://localhost:5000/api/categories/${categoryId}/services/${serviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName: newServiceName }),
    });
    setEditingService(null);
    fetchCategories();
  };

  const deleteService = async (categoryId, serviceId) => {
    await fetch(`http://localhost:5000/api/categories/${categoryId}/services/${serviceId}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Service Categories</h2>

      <input
        type="text"
        placeholder="Search categories or services..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {(searchTerm ? filteredCategories : categories).map((category) => (
        <div key={category._id} className="bg-softBlue p-4 rounded-lg shadow-lg mb-3">
          {editCategoryId === category._id ? (
            <div className="flex gap-2">
              <input
                className="border p-2 rounded-md"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button
                className="bg-primary text-white px-3 py-1 rounded-md"
                onClick={() => updateCategory(category._id)}
              >
                Save
              </button>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-primary">{category.categoryName}</h3>
          )}

          <div className="flex gap-2 mt-2">
            <button
              className="text-white bg-secondary px-2 py-1 rounded-md"
              onClick={() => {
                setEditCategoryId(category._id);
                setNewCategoryName(category.categoryName);
              }}
            >
              Edit
            </button>
            <button
              className="text-white bg-red-500 px-2 py-1 rounded-md"
              onClick={() => deleteCategory(category._id)}
            >
              Delete
            </button>
          </div>

          <ul className="list-disc pl-6 text-darkBlue mt-2">
            {category.services.map((service) => (
              <li key={service._id} className="flex justify-between items-center">
                {editingService === service._id ? (
                  <input
                    className="border p-1 rounded-md"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                  />
                ) : (
                  service.serviceName
                )} 

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="New service name"
                    value={newServiceInputs[category._id] || ""}
                    onChange={(e) =>
                      setNewServiceInputs({ ...newServiceInputs, [category._id]: e.target.value })
                    }
                    className="p-1 border border-gray-300 rounded-md"
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                    onClick={() => addService(category._id)}
                  >
                    Add Service
                  </button>
                </div>

                <div className="flex gap-2">
                  {editingService === service._id ? (
                    <button
                      className="text-white bg-primary px-2 py-1 rounded-md"
                      onClick={() => updateService(category._id, service._id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-white bg-secondary px-2 py-1 rounded-md"
                      onClick={() => {
                        setEditingService(service._id);
                        setNewServiceName(service.serviceName);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-white bg-red-500 px-2 py-1 rounded-md"
                    onClick={() => deleteService(category._id, service._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
