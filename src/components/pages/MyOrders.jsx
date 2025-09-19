import React, { useState, useEffect } from "react";
import API_URL from "../../Config";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/orders/mine`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data.reverse());
          setLoading(false);
        } else {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const canCancel = (status) => {
    return status === "pending" || status === "processing";
  };

  const handleCancelOrder = async (orderId) => {
    try {
      if (!window.confirm("Are you sure you want to cancel this order?"))
        return;
      setCancelling(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      const response = await fetch(
        `${API_URL}/api/orders/mine/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const updated = await response.json();
        setOrders(orders.map((o) => (o._id === orderId ? updated : o)));
        if (selectedOrder && selectedOrder._id === orderId)
          setSelectedOrder(updated);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to cancel order");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelling(false);
    }
  };

  // 🔹 Loader with spinner + text
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (error)
    return <div className="container my-5 text-danger">Error: {error}</div>;

  // 🔹 Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>S no:</th>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total Price</th>
                  <th>Order Date</th>
                  <th>Delivery Address</th>
                  <th>Status</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{indexOfFirstOrder + index + 1}</td>
                    <td>{order._id}</td>
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
                        <div>
                          {order.deliveryAddress.line1}
                          {order.deliveryAddress.line2
                            ? `, ${order.deliveryAddress.line2}`
                            : ""}
                          <br />
                          {order.deliveryAddress.city},{" "}
                          {order.deliveryAddress.state},{" "}
                          {order.deliveryAddress.postalCode}
                        </div>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill bg-${
                          order.status === "pending"
                            ? "warning"
                            : order.status === "processing"
                            ? "info"
                            : order.status === "shipped"
                            ? "primary"
                            : order.status === "delivered"
                            ? "success"
                            : order.status === "cancelled"
                            ? "danger"
                            : "secondary"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </button>
                        {canCancel(order.status) && (
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={cancelling}
                          >
                            {cancelling ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔹 Pagination Controls */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="alert alert-info">
          You haven't placed any orders yet.
        </div>
      )}

      {/* Modal remains unchanged */}
      {showModal && selectedOrder && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Order Summary</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* ... order details (unchanged) ... */}
              </div>
              <div className="modal-footer bg-light">
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

export default MyOrders;
