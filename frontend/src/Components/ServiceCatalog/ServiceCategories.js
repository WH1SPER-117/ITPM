import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingService, setEditingService] = useState({ categoryId: null, serviceId: null });
  const [newServiceName, setNewServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch categories.");
    }
  };

  const updateCategory = async (categoryId) => {
    if (!newCategoryName.trim()) return alert("Category name cannot be empty.");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: newCategoryName }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchCategories();
      setEditCategoryId(null);
    } catch (err) {
      console.error(err);
      setMessage("Error updating category.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/categories/${categoryId}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete category.");
    }
  };

  const updateService = async (categoryId, serviceId) => {
    if (!newServiceName.trim()) return alert("Service name cannot be empty.");
    try {
      const res = await fetch(`${API_BASE_URL}/api/categories/${categoryId}/services/${serviceId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceName: newServiceName }),
      });
      if (!res.ok) throw new Error("Service update failed");
      fetchCategories();
      setEditingService({ categoryId: null, serviceId: null });
    } catch (err) {
      console.error(err);
      setMessage("Error updating service.");
    }
  };

  const deleteService = async (categoryId, serviceId) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/categories/${categoryId}/services/${serviceId}`, { method: "DELETE" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete service.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Service Categories</h2>

      {categories.map((category) => (
        <div key={category.categoryId} className="bg-softBlue p-4 rounded-lg shadow-lg mb-4">
          {editCategoryId === category.categoryId ? (
            <div className="flex gap-2">
              <input
                className="border p-2 rounded-md"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button
                className="bg-primary text-white px-3 py-1 rounded-md"
                onClick={() => updateCategory(category.categoryId)}
                disabled={loading}
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
                setEditCategoryId(category.categoryId);
                setNewCategoryName(category.categoryName);
              }}
            >
              Edit
            </button>
            <button
              className="text-white bg-red-500 px-2 py-1 rounded-md"
              onClick={() => deleteCategory(category.categoryId)}
            >
              Delete
            </button>
          </div>

          <ul className="list-disc pl-6 text-darkBlue mt-3">
            {category.services.map((service) => (
              <li key={service.serviceId} className="flex justify-between items-center gap-2">
                {editingService.categoryId === category.categoryId &&
                editingService.serviceId === service.serviceId ? (
                  <>
                    <input
                      className="border p-1 rounded-md"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                    />
                    <button
                      className="text-white bg-primary px-2 py-1 rounded-md"
                      onClick={() => updateService(category.categoryId, service.serviceId)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{service.serviceName}</span>
                    <div className="flex gap-2">
                      <button
                        className="text-white bg-secondary px-2 py-1 rounded-md"
                        onClick={() =>
                          setEditingService({ categoryId: category.categoryId, serviceId: service.serviceId }) ||
                          setNewServiceName(service.serviceName)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="text-white bg-red-500 px-2 py-1 rounded-md"
                        onClick={() => deleteService(category.categoryId, service.serviceId)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {message && <p className="text-center mt-4 text-red-600">{message}</p>}
    </div>
  );
}
