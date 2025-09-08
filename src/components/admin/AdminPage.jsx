import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../Config";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    productID: "101",
    retailPrice: "",
    bulkPrice: "",
    stock: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/egg-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Data saved:", result);
        alert("Data saved successfully!");
      } else {
        console.error("Data saving failed:", result);
        alert("Data save failed!");
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("Server error, please try again later");
    }
  };

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        <div id="sales-graph-section">
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">View and manage registered users.</p>
                <Link to="/admin/manageUsers" className="btn btn-primary">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Manage Products</h5>
                <p className="card-text">Add, edit, or remove products.</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">View Orders</h5>
                <p className="card-text">Check all orders placed by users.</p>
                <Link to="/admin/orders" className="btn btn-primary">
                  View Orders
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Contact Messages</h5>
                <p className="card-text">
                  View and manage contact form submissions.
                </p>
                <Link to="/admin/contacts" className="btn btn-primary">
                  View Messages
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Graph</h5>
                <p className="card-text">Configure application settings.</p>
                <Link to="/admin/salesGraph" className="btn btn-primary">
                  View Graph
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Enter Product Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <label>Product ID:</label>
              <input
                type="text"
                className="form-control mb-2"
                name="productID"
                value={formData.productID}
                onChange={handleChange}
                required
              />
              <label>Retail Price:</label>
              <input
                type="number"
                className="form-control mb-2"
                name="retailPrice"
                value={formData.retailPrice}
                onChange={handleChange}
                required
              />
              <label>Wholesale Price:</label>
              <input
                type="number"
                className="form-control mb-2"
                name="bulkPrice"
                value={formData.bulkPrice}
                onChange={handleChange}
                required
              />
              <label>Egg Stock Available:</label>
              <input
                type="number"
                className="form-control mb-2"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
