// import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import API_URL from "../../Config";

const AdminPage = () => {
  
  return (
    <div className="container-fluid">
      <div className="container my-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        <div id="sales-graph-section"></div>
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
                <Link to="/admin/manage-products" className="btn btn-primary">
                  Manage Products
                </Link>
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

          {/* <div className="col-md-6">
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
          </div> */}

          {/* <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Graph</h5>
                <p className="card-text">Configure application settings.</p>
                <Link to="/admin/salesGraph" className="btn btn-primary">
                  View Graph
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
