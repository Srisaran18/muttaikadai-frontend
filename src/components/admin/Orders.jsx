import React, { useState, useEffect } from "react";
import API_URL from "../../Config";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/api/orders/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch orders");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(
    () => {
      if (showModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    },
    [showModal]
  );

  const handleViewOrder = order => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_URL}/api/orders/admin/${orderId}/status`,
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
        // Update the order status in the local state
        setOrders(
          orders.map(
            order =>
              order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        // If the selected order is being updated, update it in the modal as well
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to update order status");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) return <div className="container my-5">Loading orders...</div>;
  if (error)
    return (
      <div className="container my-5 text-danger">
        Error: {error}
      </div>
    );

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">All Orders</h2>
        <Link to="/adminPage" className="btn btn-outline-secondary">
          ← Back
        </Link>
      </div>
      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>S no:</th>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Delivery Address</th>
                <th>Status</th>
                <th>More details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>
                    {order.user?.name || "-"} ({order.user?.email || "-"})
                  </td>
                  <td>
                    {order.items?.map((it, i) => (
                      <div key={i}>
                        {it.name} × {it.quantity} @ ₹{it.unitPrice}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    {new Date(
                      order.orderDate || order.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {order.deliveryAddress && (
                      <div
                        className="text-wrap"
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {order.deliveryAddress.line1}
                        {order.deliveryAddress.line2
                          ? `, ${order.deliveryAddress.line2}`
                          : ""}
                        {`, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.postalCode}`}
                      </div>
                    )}
                  </td>
                  <td>
                    <select
                      className={`form-select form-select-sm bg-${getStatusColor(
                        order.status
                      )} text-white`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={updatingStatus}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info">No orders found.</div>
      )}

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Summary</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="text-uppercase text-muted small">
                      Order Details
                    </h6>
                    <div className="mb-2">
                      {selectedOrder.items?.map((it, i) => (
                        <div key={i}>
                          {it.name} × {it.quantity} @ ₹{it.unitPrice}
                        </div>
                      ))}
                    </div>
                    <p className="mb-2">
                      <strong>Total:</strong> ₹{selectedOrder.totalPrice}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <strong>Status:</strong>
                      <select
                        className={`form-select form-select-sm bg-${getStatusColor(
                          selectedOrder.status
                        )} text-white d-inline-block w-auto`}
                        value={selectedOrder.status}
                        onChange={(e) =>
                          handleStatusChange(selectedOrder._id, e.target.value)
                        }
                        disabled={updatingStatus}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-uppercase text-muted small">
                      User Details
                    </h6>
                    <p className="mb-1">
                      <strong>Name:</strong> {selectedOrder.user?.name || ""}
                    </p>
                    <p className="mb-1">
                      <strong>Email:</strong> {selectedOrder.user?.email || ""}
                    </p>
                    <p className="mb-0">
                      <strong>Phone:</strong>{" "}
                      {selectedOrder.contactPhone ||
                        selectedOrder.user?.mobile ||
                        ""}
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <h6 className="text-uppercase text-muted small">
                    Delivery Address
                  </h6>
                  {selectedOrder.deliveryAddress && (
                    <div
                      className="text-wrap"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {selectedOrder.deliveryAddress.line1}
                      {selectedOrder.deliveryAddress.line2
                        ? `, ${selectedOrder.deliveryAddress.line2}`
                        : ""}
                      {`, ${selectedOrder.deliveryAddress.city}, ${selectedOrder.deliveryAddress.state}, ${selectedOrder.deliveryAddress.postalCode}`}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <h6 className="text-uppercase text-muted small">
                    Billing Address
                  </h6>
                  {selectedOrder.billingAddress && (
                    <div
                      className="text-wrap"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {selectedOrder.billingAddress.line1}
                      {selectedOrder.billingAddress.line2
                        ? `, ${selectedOrder.billingAddress.line2}`
                        : ""}
                      {`, ${selectedOrder.billingAddress.city}, ${selectedOrder.billingAddress.state}, ${selectedOrder.billingAddress.postalCode}`}
                    </div>
                  )}
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
        </div>
      )}
    </div>
  );
};

export default Orders;
