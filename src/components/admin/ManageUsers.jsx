import React, { useState, useEffect } from "react";
import API_URL from "../../Config";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/users/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const normalized = (data || []).map((u) => ({
          ...u,
          username: u.name,
          phoneNumber: u.mobile,
          isAdmin: u.role === "admin",
        }));
        setUsers(normalized);
      } else {
        throw new Error("Failed to fetch users");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/users/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleBlock = async (userId, isBlocked) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/users/admin/users/${userId}/block`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isBlocked: !isBlocked }),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isBlocked: !isBlocked } : user
          )
        );
      } else {
        throw new Error("Failed to update user status");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleAdmin = async (userId, isAdmin) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/users/admin/users/${userId}/admin`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAdmin: !isAdmin }),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, isAdmin: !isAdmin } : user
          )
        );
      } else {
        throw new Error("Failed to update admin status");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Loader with spinner
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="container my-5 text-danger">Error: {error}</div>;

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">Manage Users</h2>
        <Link to="/adminPage" className="btn btn-outline-secondary">
          ← Back
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <span
                    className={`badge ${
                      user.isBlocked ? "bg-danger" : "bg-success"
                    }`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.isAdmin ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className={`btn btn-sm ${
                        user.isBlocked ? "btn-success" : "btn-warning"
                      }`}
                      onClick={() =>
                        handleToggleBlock(user._id, user.isBlocked)
                      }
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      className={`btn btn-sm ${
                        user.isAdmin ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
