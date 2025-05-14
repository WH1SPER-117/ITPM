import { useEffect, useState } from "react";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [newServiceName, setNewServiceName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
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
      {categories.map((category) => (
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
