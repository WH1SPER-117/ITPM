import { useEffect, useState } from "react";

export default function ServiceCategories() {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newServiceName, setNewServiceName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const updateCategory = async (id) => {
    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: newCategoryName }),
    });
    setEditCategoryId(null);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const updateService = async (catId, srvId) => {
    await fetch(`http://localhost:5000/api/categories/${catId}/services/${srvId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serviceName: newServiceName }),
    });
    setEditingServiceId(null);
    fetchCategories();
  };

  const deleteService = async (catId, srvId) => {
    await fetch(`http://localhost:5000/api/categories/${catId}/services/${srvId}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-darkBlue mb-4">Service Categories</h2>
      {categories.map((cat) => (
        <div key={cat.categoryId} className="bg-softBlue p-4 rounded-lg shadow-lg mb-4">
          {editCategoryId === cat.categoryId ? (
            <div className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded-md flex-1"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button className="bg-primary text-white px-3 py-1 rounded-md" onClick={() => updateCategory(cat.categoryId)}>
                Save
              </button>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-primary">{cat.categoryName}</h3>
          )}

          <div className="flex gap-2 mt-2">
            <button
              className="text-white bg-secondary px-2 py-1 rounded-md"
              onClick={() => {
                setEditCategoryId(cat.categoryId);
                setNewCategoryName(cat.categoryName);
              }}
            >
              Edit
            </button>
            <button className="text-white bg-red-500 px-2 py-1 rounded-md" onClick={() => deleteCategory(cat.categoryId)}>
              Delete
            </button>
          </div>

          <ul className="list-disc pl-6 mt-4">
            {cat.services.map((srv) => (
              <li key={srv.serviceId} className="flex justify-between items-center gap-2 mb-1">
                {editingServiceId === srv.serviceId ? (
                  <input
                    className="border p-1 rounded-md flex-1"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                  />
                ) : (
                  <span>{srv.serviceName}</span>
                )}

                <div className="flex gap-2">
                  {editingServiceId === srv.serviceId ? (
                    <button
                      className="text-white bg-primary px-2 py-1 rounded-md"
                      onClick={() => updateService(cat.categoryId, srv.serviceId)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-white bg-secondary px-2 py-1 rounded-md"
                      onClick={() => {
                        setEditingServiceId(srv.serviceId);
                        setNewServiceName(srv.serviceName);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-white bg-red-500 px-2 py-1 rounded-md"
                    onClick={() => deleteService(cat.categoryId, srv.serviceId)}
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
