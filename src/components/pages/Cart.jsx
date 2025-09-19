import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API_URL from "../../Config";
import { useToast } from "../../context/ToastContext";

const Cart = () => {
  const { items: cart, updateItemQuantity, removeItemByIndex } = useCart();

  const [userDetails, setUserDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);
  const [billingAddress, setBillingAddress] = useState(null);
  const [contactPhone, setContactPhone] = useState("");

  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Calculate cart totals
  const getItemUnitPrice = (item) =>
    item.quantity >= (item.bulkQuantity || 100) ? item.bulkPrice : item.price;

  const getItemTotal = (item) => getItemUnitPrice(item) * item.quantity;

  const subtotal =
    cart?.reduce((sum, item) => sum + getItemTotal(item), 0) || 0;

  const totalEggs =
    cart?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  // Fetch user profile + addresses
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const result = await response.json();
          setUserDetails({
            username: result.name || result.username,
            email: result.email,
            phone: result.mobile || result.phone,
          });
          setContactPhone(result.mobile || "");
          setAddresses(result.addresses || []);
          const defaultAddress = (result.addresses || []).find((addr) => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
            setBillingAddress(defaultAddress);
          }
        } else {
          toast.error("Failed to load user details");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        toast.error("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    if (billingSameAsDelivery) {
      setBillingAddress(address);
    }
  };

  const handleBillingSelect = (address) => setBillingAddress(address);

  const handleBillingToggle = () => {
    setBillingSameAsDelivery((prev) => {
      const newVal = !prev;
      if (newVal && selectedAddress) {
        setBillingAddress(selectedAddress);
      } else if (!newVal && addresses.length > 0) {
        setBillingAddress(null);
      }
      return newVal;
    });
  };

  const handleProceedToPay = async () => {
    if (!selectedAddress) return toast.warning("Please select a delivery address");
    if (!billingSameAsDelivery && !billingAddress)
      return toast.warning("Please select a billing address");

    setOrderLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            type: item.type,
            unitPrice: getItemUnitPrice(item),
            quantity: item.quantity,
            image: item.image,
          })),
          deliveryAddress: {
            label: selectedAddress.label,
            line1: selectedAddress.line1,
            line2: selectedAddress.line2 || "",
            city: selectedAddress.city,
            state: selectedAddress.state,
            postalCode: selectedAddress.postalCode,
            country: selectedAddress.country,
          },
          billingAddress: billingSameAsDelivery
            ? {
                label: selectedAddress.label,
                line1: selectedAddress.line1,
                line2: selectedAddress.line2 || "",
                city: selectedAddress.city,
                state: selectedAddress.state,
                postalCode: selectedAddress.postalCode,
                country: selectedAddress.country,
              }
            : {
                label: billingAddress.label,
                line1: billingAddress.line1,
                line2: billingAddress.line2 || "",
                city: billingAddress.city,
                state: billingAddress.state,
                postalCode: billingAddress.postalCode,
                country: billingAddress.country,
              },
          contactPhone,
        }),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        setShowModal(false);
        navigate("/myOrders", { replace: true });
      } else {
        const error = await response.text();
        toast.error("Failed to place order: " + (error || "Unknown error"));
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Error placing order. Try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left: Cart Items */}
        <div className="col-md-8">
          <h4 className="mb-4">Shopping Cart</h4>

          {!cart || cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="list-group">
              {cart.map((item, index) => (
                <div
                  key={item._id || index}
                  className="list-group-item d-flex justify-content-between align-items-center py-3"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    width="80"
                    height="80"
                    className="me-3 rounded"
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateItemQuantity(
                            index,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        –
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateItemQuantity(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-end">
                    <p className="fw-bold mb-1">₹{getItemTotal(item)}</p>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeItemByIndex(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Cart Summary */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Cart Summary</h5>

            <div className="mb-2 d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Grand Total</span>
              <span>₹{subtotal}</span>
            </div>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={() => setShowModal(true)}
              disabled={!cart || cart.length === 0}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showModal && (
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
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* Order + User Info */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Order Details</h6>
                    <p>Total eggs: {totalEggs}</p>
                    <p>Total: ₹{subtotal}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>User Details</h6>
                    <p>Name: {userDetails?.username}</p>
                    <p>Email: {userDetails?.email}</p>
                    <div className="mb-2">
                      <label className="form-label mb-0">Phone</label>
                      <input
                        className="form-control"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="Enter contact phone"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Selection */}
                <div className="mb-3">
                  <h6>Select Delivery Address</h6>
                  {addresses.length ? (
                    addresses.map((addr, idx) => (
                      <div
                        className={`card mb-2 ${
                          selectedAddress === addr ? "border-primary" : ""
                        }`}
                        key={idx}
                      >
                        <div className="card-body">
                          <input
                            type="radio"
                            name="delivery"
                            checked={selectedAddress === addr}
                            onChange={() => handleAddressSelect(addr)}
                          />
                          <span className="ms-2 text-wrap" style={{wordBreak: "break-word", whiteSpace: "pre-wrap"}}>
                            {addr.label ? `${addr.label}: ` : ""}{addr.line1}
                            {addr.line2 ? `, ${addr.line2}` : ""}
                            {`, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>
                      No addresses found. <Link to="/userProfile">Add address</Link>
                    </p>
                  )}
                </div>

                {/* Billing Address */}
                <div className="mb-3">
                  <h6>Billing Address</h6>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={billingSameAsDelivery}
                      onChange={handleBillingToggle}
                    />
                    <label className="form-check-label">
                      Billing same as delivery
                    </label>
                  </div>
                  {!billingSameAsDelivery && (
                    <>
                      <p>Select a different billing address:</p>
                      {addresses.map((addr, idx) => (
                        <div
                          className={`card mb-2 ${
                            billingAddress === addr ? "border-success" : ""
                          }`}
                          key={`bill-${idx}`}
                        >
                          <div className="card-body">
                            <input
                              type="radio"
                              name="billing"
                              checked={billingAddress === addr}
                              onChange={() => handleBillingSelect(addr)}
                            />
                            <span className="ms-2 text-wrap" style={{wordBreak: "break-word", whiteSpace: "pre-wrap"}}>
                              {addr.label ? `${addr.label}: ` : ""}{addr.line1}
                              {addr.line2 ? `, ${addr.line2}` : ""}
                              {`, ${addr.city}, ${addr.state}, ${addr.postalCode}, ${addr.country}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={handleProceedToPay}
                  disabled={orderLoading}
                >
                  {orderLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    "Proceed to pay"
                  )}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
