import { useState } from "react";

export default function AddCategory() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = { categoryId, categoryName, services: [] };

    await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    });

    setCategoryId("");
    setCategoryName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-lightBlue p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-darkBlue mb-4">Add New Category</h2>
      <input
        className="border border-secondary rounded-md p-2 w-full mb-2"
        type="text"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <input
        className="border border-secondary rounded-md p-2 w-full mb-2"
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
      <button className="bg-primary text-white p-2 w-full rounded-md hover:bg-darkBlue transition">
        Add Category
      </button>
    </form>
  );
}
