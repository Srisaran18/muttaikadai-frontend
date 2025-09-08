import React, { useEffect, useState } from "react";
import API_URL from "../../Config";
import { useAuth } from "../../context/AuthContext";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    type: "kg",
    price: "",
    bulkQuantity: "",
    bulkPrice: "",
    image: "",
    stock: "",
  });

  // Load products on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      }
    };
    load();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload (upload to backend and store URL)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const body = new FormData();
      body.append("image", file);
      const res = await fetch(`${API_URL}/api/products/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body,
      });
      if (!res.ok) throw new Error("Image upload failed");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      console.error(err);
      alert(err.message || "Image upload failed");
    }
  };

  // Add / Update product
  const handleAddOrUpdate = async () => {
    try {
      if (!formData.name || formData.price === "") {
        alert("Please enter required fields");
        return;
      }

      // normalize numbers
      const payload = {
        name: formData.name,
        type: formData.type,
        price: Number(formData.price),
        bulkQuantity: formData.bulkQuantity === "" ? 0 : Number(formData.bulkQuantity),
        bulkPrice: formData.bulkPrice === "" ? 0 : Number(formData.bulkPrice),
        image: formData.image || "",
        stock: formData.stock === "" ? 0 : Number(formData.stock),
      };

      if (formData._id) {
        // Update existing by _id
        const res = await fetch(`${API_URL}/api/products/${formData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        // Create new
        const res = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      }

      // Reset form
      setFormData({
        _id: null,
        name: "",
        type: "kg",
        price: "",
        bulkQuantity: "",
        bulkPrice: "",
        image: "",
        stock: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Action failed");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      _id: product._id,
      name: product.name || "",
      type: product.type || "kg",
      price: product.price ?? "",
      bulkQuantity: product.bulkQuantity ?? "",
      bulkPrice: product.bulkPrice ?? "",
      image: product.image || "",
      stock: product.stock ?? "",
    });
  };

  const handleDelete = async (_id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts((prev) => prev.filter((p) => p._id !== _id));
      if (formData._id === _id) {
        setFormData({
          _id: null,
          name: "",
          type: "kg",
          price: "",
          bulkQuantity: "",
          bulkPrice: "",
          image: "",
          stock: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Products</h2>

      {/* Product Form */}
      <div className="card p-4 mb-5">
        <h4>{formData._id ? "Edit Product" : "Add Product"}</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <select
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="kg">Kg</option>
              <option value="nos">Nos</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="bulkQuantity"
              placeholder="Bulk Quantity"
              className="form-control"
              value={formData.bulkQuantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="bulkPrice"
              placeholder="Bulk Price"
              className="form-control"
              value={formData.bulkPrice}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="stock"
              placeholder="Stock Available"
              className="form-control"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="mt-2"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            )}
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button className="btn btn-primary" onClick={handleAddOrUpdate}>
            {formData._id ? "Update Product" : "Add Product"}
          </button>
          {formData._id && (
            <button className="btn btn-danger" onClick={() => handleDelete(formData._id)}>
              Delete Product
            </button>
          )}
        </div>
      </div>

      {/* Product List */}
      <h3>Product List</h3>
      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-3 mb-4 text-center"
            key={product._id}
            style={{ cursor: "pointer" }}
            onClick={() => handleEdit(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid mb-2"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <h6>{product.name}</h6>
            <small>Stock: {product.stock}</small>
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
