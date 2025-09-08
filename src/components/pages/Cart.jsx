import React, { useState, useEffect } from "react";
import item1 from "../../assets/images/retail.jpg";
import item2 from "../../assets/images/bulk.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [retailCount, setRetailCount] = useState(0);
  const [bulkCount, setBulkCount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);
  const [billingAddress, setBillingAddress] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [eggData, setEggData] = useState({});
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderDateTime, setOrderDateTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const retailIncrement = () => setRetailCount(prev => prev + 30);
  const retailDecrement = () =>
    setRetailCount(prev => (prev > 0 ? prev - 30 : 0));
  const bulkIncrement = () => setBulkCount(prev => prev + 100);
  const bulkDecrement = () => setBulkCount(prev => (prev > 0 ? prev - 100 : 0));

  const totalEggs = retailCount + bulkCount;
  const totalPrice =
    totalEggs > 100
      ? totalEggs * eggData.bulkPrice
      : totalEggs * eggData.retailPrice;

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          setUserDetails({
            username: result.username,
            email: result.email,
            phone: result.phone
          });
          setAddresses(result.addresses || []);
          const defaultAddress = result.addresses.find(addr => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddress(defaultAddress);
            setBillingAddress(defaultAddress);
          }
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchEggData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/egg-info", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          setEggData(result);
        }
      } catch (err) {
        console.error("Error fetching eggData:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEggData();
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    if (billingSameAsDelivery) {
      setBillingAddress(address);
    }
  };

  const handleBillingSelect = (address) => setBillingAddress(address);

  const handleBillingToggle = () => {
    setBillingSameAsDelivery(prev => {
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
    if (!selectedAddress) return alert('Please select a delivery address');
    if (!billingSameAsDelivery && !billingAddress) return alert('Please select a billing address');

    setOrderLoading(true);
    const now = new Date();
    setOrderDateTime(now);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: [
            {
              type: 'retail',
              quantity: retailCount,
              price: eggData.retailPrice
            },
            {
              type: 'bulk',
              quantity: bulkCount,
              price: eggData.bulkPrice
            }
          ],
          totalEggs,
          totalPrice,
          productID: eggData.productID,
          orderDate: now.toISOString(),
          deliveryAddress: selectedAddress,
          billingAddress: billingSameAsDelivery ? selectedAddress : billingAddress
        })
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setShowModal(false);
        navigate('/myOrders', { replace: true });
      } else {
        const error = await response.text();
        alert('Failed to place order: ' + error);
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Error placing order. Try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <>
      {/* Cart Section */}
      <section className="container my-5">
        <div className="row justify-content-center g-4">
          {[
            {
              img: item1,
              title: "Retail",
              count: retailCount,
              inc: retailIncrement,
              dec: retailDecrement,
              price: eggData.retailPrice,
              min: 30
            },
            {
              img: item2,
              title: "Whole Sale",
              count: bulkCount,
              inc: bulkIncrement,
              dec: bulkDecrement,
              price: eggData.bulkPrice,
              min: 100
            }
          ].map(({ img, title, count, inc, dec, price, min }, idx) => (
            <div className="col-md-5" key={idx}>
              <div className="card h-100 shadow">
                <img src={img} className="card-img-top" alt={title} />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">
                    Buy at ₹{price} per egg. Minimum order: {min} eggs.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={dec}
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={inc}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="text-center my-4">
        <div className="text-success mb-2">
          Eggs In Stock: {eggData.stock || 0}
        </div>
        <h2>Your Cart Summary</h2>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <p>Retail: {retailCount} eggs</p>
                <p>Wholesale: {bulkCount} eggs</p>
                <p>Total Price: ₹{totalPrice}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                  disabled={!totalEggs || totalEggs > eggData.stock}
                >
                  {totalEggs > eggData.stock
                    ? "Not enough stock"
                    : "Proceed to checkout"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                {/* User and Order Info */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Order Details</h6>
                    <p>Total eggs: {totalEggs}</p>
                    <p>Total: ₹{totalPrice}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>User Details</h6>
                    <p>Name: {userDetails?.username}</p>
                    <p>Email: {userDetails?.email}</p>
                    <p>Phone: {userDetails?.phone}</p>
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
                          <span className="ms-2">
                            {addr.name},{addr.number}, {addr.houseNo},{" "}
                            {addr.street}, {addr.district}, {addr.state},{" "}
                            {addr.pincode}
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
                            <span className="ms-2">
                              {addr.name}, {addr.number}, {addr.houseNo},{" "}
                              {addr.street}, {addr.district}, {addr.state},{" "}
                              {addr.pincode}
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
                  {orderLoading ? "Processing..." : "Proceed to pay"}
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
    </>
  );
};

export default Cart;
