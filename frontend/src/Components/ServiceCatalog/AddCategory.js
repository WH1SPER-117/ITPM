import { useState } from "react";
import { API_BASE_URL } from "../../config";

export default function AddCategory() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId.trim() || !categoryName.trim()) {
      setMessage("Both Category ID and Name are required.");
      return;
    }

    const newCategory = { categoryId, categoryName, services: [] };

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) throw new Error("Failed to add category");

      setCategoryId("");
      setCategoryName("");
      setMessage("Category added successfully!");
    } catch (error) {
      setMessage("Error adding category.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-lightBlue p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-darkBlue mb-4">Add New Category</h2>

      <input
        className="border border-secondary rounded-md p-2 w-full mb-3"
        type="text"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <input
        className="border border-secondary rounded-md p-2 w-full mb-3"
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />

      <button
        type="submit"
        className="bg-primary text-white p-2 w-full rounded-md hover:bg-darkBlue transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Category"}
      </button>

      {message && <p className="text-center mt-4 text-red-600">{message}</p>}
    </form>
  );
}
