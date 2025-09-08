import React, { useState, useEffect } from "react";

const MyOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
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

  if (loading) return <div className="container my-5">Loading orders...</div>;
  if (error)
    return (
      <div className="container my-5 text-danger">
        Error: {error}
      </div>
    );

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length > 0
        ? <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>S no:</th>
                  <th>Order Date</th>
                  <th>Total Eggs</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) =>
                  <tr key={order._id || index}>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td>
                      {order.totalEggs}
                    </td>
                    <td>
                      ₹{order.totalPrice}
                    </td>
                    <td>
                      <span
                        className={`badge bg-${order.status === "pending"
                          ? "warning"
                          : order.status === "processing"
                            ? "info"
                            : order.status === "shipped"
                              ? "primary"
                              : order.status === "delivered"
                                ? "success"
                                : "secondary"}`}
                      >
                        {order.status}
                      </span>
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
                )}
              </tbody>
            </table>
          </div>
        : <div className="alert alert-info">
            You haven't placed any orders yet.
          </div>}

      {/* Modal for Order Details */}
      {showModal &&
        selectedOrder &&
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
                    <h6>Order Details</h6>
                    <p>
                      Product ID: {selectedOrder.productID}
                    </p>
                    <p>
                      Total eggs: {selectedOrder.totalEggs}
                    </p>
                    <p>
                      Total: ₹{selectedOrder.totalPrice}
                    </p>
                    <p>
                      Status: {selectedOrder.status}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h6>User Details</h6>
                    <p>
                      Name: {selectedOrder.username}
                    </p>
                    <p>
                      Email: {selectedOrder.email}
                    </p>
                    <p>
                      Phone: {selectedOrder.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Delivery Address</h6>
                  {selectedOrder.deliveryAddress &&
                    <div>
                      {selectedOrder.deliveryAddress.name}, {" "}
                      {selectedOrder.deliveryAddress.houseNo}, {" "}
                      {selectedOrder.deliveryAddress.street},<br />
                      {selectedOrder.deliveryAddress.district}, {" "}
                      {selectedOrder.deliveryAddress.state}, {" "}
                      {selectedOrder.deliveryAddress.pincode}
                    </div>}
                </div>

                <div className="mb-3">
                  <h6>Billing Address</h6>
                  {selectedOrder.billingAddress &&
                    <div>
                      {selectedOrder.billingAddress.name}, {" "}
                      {selectedOrder.billingAddress.houseNo}, {" "}
                      {selectedOrder.billingAddress.street},<br />
                      {selectedOrder.billingAddress.district}, {" "}
                      {selectedOrder.billingAddress.state}, {" "}
                      {selectedOrder.billingAddress.pincode}
                    </div>}
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

export default MyOrders;
