"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, RefreshCcw } from "lucide-react";

const SOKO_RED = "#E31E24";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "tiles",
    unit: "piece",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      setNewProduct({
        name: "",
        category: "tiles",
        unit: "piece",
        price: "",
        description: "",
      });
      setShowAddForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error("Failed to update");

      setEditingId(null);
      setEditForm({});
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      category: product.category,
      unit: product.unit,
      price: product.price,
      description: product.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categories = [
    "tiles",
    "cement",
    "blocks",
    "roofing",
    "adhesive",
    "sand",
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Product Price Management
              </h1>
              <p className="text-slate-500 mt-1">
                Manage construction material prices for Sokogate calculators
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-[#E31E24] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              {showAddForm ? <X size={20} /> : <Plus size={20} />}
              {showAddForm ? "Cancel" : "Add Product"}
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Add New Product
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="e.g., Standard Floor Tile"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
                  value={newProduct.unit}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, unit: e.target.value })
                  }
                  placeholder="e.g., piece, bag, box, m3"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description (optional)
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-slate-200 text-sm focus:ring-[#E31E24] focus:border-[#E31E24]"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g., Standard ceramic floor tile 30x30cm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Save size={16} />
                Add Product
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCcw
              className="animate-spin mx-auto mb-4 text-[#E31E24]"
              size={32}
            />
            <p className="text-slate-500">Loading products...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryProducts = groupedProducts[category] || [];
              if (categoryProducts.length === 0) return null;

              return (
                <div
                  key={category}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                    <h3 className="font-bold text-slate-900 uppercase text-sm tracking-wide">
                      {category}
                    </h3>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {categoryProducts.map((product) => {
                      const isEditing = editingId === product.id;

                      return (
                        <div
                          key={product.id}
                          className="p-6 hover:bg-slate-50 transition-colors"
                        >
                          {isEditing ? (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 text-sm"
                                    value={editForm.name}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Unit
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full rounded-lg border-slate-200 text-sm"
                                    value={editForm.unit}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        unit: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Price (₦)
                                  </label>
                                  <input
                                    type="number"
                                    step="0.01"
                                    className="w-full rounded-lg border-slate-200 text-sm"
                                    value={editForm.price}
                                    onChange={(e) =>
                                      setEditForm({
                                        ...editForm,
                                        price: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={cancelEdit}
                                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 text-sm font-semibold"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleUpdate(product.id)}
                                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 text-sm font-semibold"
                                >
                                  <Save size={14} />
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-bold text-slate-900">
                                  {product.name}
                                </h4>
                                {product.description && (
                                  <p className="text-sm text-slate-500 mt-1">
                                    {product.description}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 mt-2">
                                  <span className="text-xs font-semibold text-slate-500 uppercase">
                                    {product.unit}
                                  </span>
                                  <span className="text-xl font-bold text-[#E31E24]">
                                    ₦
                                    {Number(product.price).toLocaleString(
                                      "en-NG",
                                      { minimumFractionDigits: 2 },
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEdit(product)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {products.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500">
              No products yet. Add your first product above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
