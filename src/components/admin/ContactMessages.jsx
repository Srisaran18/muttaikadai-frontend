import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../../Config";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/admin/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch messages");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = message => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/contacts/${messageId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (response.ok) {
        // Update the message in the local state
        setMessages(
          messages.map(
            msg => (msg._id === messageId ? { ...msg, status: newStatus } : msg)
          )
        );
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update status");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMessage = async messageId => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/contacts/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        // Remove the message from the local state
        setMessages(messages.filter(msg => msg._id !== messageId));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete message");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="container my-5">Loading messages...</div>;
  if (error)
    return (
      <div className="container my-5 text-danger">
        Error: {error}
      </div>
    );

  return (
    <div className="container my-5">
      <h2 className="mb-4">Contact Messages</h2>
      {messages.length > 0
        ? <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(message =>
                  <tr key={message._id}>
                    <td>
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {message.name}
                    </td>
                    <td>
                      {message.email}
                    </td>
                    <td>
                      {message.phone}
                    </td>
                    <td>
                      {message.message}
                    </td>
                    <td>
                      <span
                        className={`badge bg-${message.status === "new"
                          ? "warning"
                          : message.status === "read" ? "info" : "success"}`}
                      >
                        {message.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleViewMessage(message)}
                        >
                          View
                        </button>
                        <select
                          className="form-select form-select-sm"
                          value={message.status}
                          onChange={e =>
                            handleStatusChange(message._id, e.target.value)}
                          style={{ width: "auto" }}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteMessage(message._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        : <div className="alert alert-info">No messages found.</div>}

      {/* Modal for Message Details */}
      {showModal &&
        selectedMessage &&
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Message Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6>Contact Information</h6>
                    <p>
                      <strong>Name:</strong> {selectedMessage.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedMessage.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedMessage.phone}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>Message Details</h6>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedMessage.status}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <h6>Message</h6>
                  <p className="border p-3 rounded">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>
  );
};

export default ContactMessages;
