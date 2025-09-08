import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../Config";

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    mail: "",
    number: "",
    username: "",
    email: "",
    phone: "",
    houseNo: "",
    street: "",
    pincode: "",
    state: "",
    district: "",
  });

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    houseNo: "",
    street: "",
    pincode: "",
    state: "",
    district: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();

        setProfile({
          username: data.name || data.username || "",
          email: data.email || "",
          phone: data.mobile || data.phone || "",
          name: "",
          mail: "",
          number: "",
          houseNo: "",
          street: "",
          pincode: "",
          state: "",
          district: "",
        });
        setAddresses(data.addresses || []);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
        if (err.message.includes("401") || err.message.includes("403")) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetAddressForm = () => {
    setAddressForm({
      label: "Home",
      houseNo: "",
      street: "",
      pincode: "",
      state: "",
      district: "",
      country: "India",
      isDefault: false,
    });
    setEditingAddressId(null);
  };

  const buildAddressPayload = () => ({
    label: addressForm.label || "Home",
    line1: `${addressForm.houseNo || ""} ${addressForm.street || ""}`.trim(),
    line2: "",
    city: addressForm.district || "",
    state: addressForm.state || "",
    postalCode: addressForm.pincode || "",
    country: addressForm.country || "India",
    isDefault: !!addressForm.isDefault,
  });

  const onSubmitAddress = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      const payload = buildAddressPayload();

      let res;
      if (editingAddressId) {
        res = await fetch(`${API_URL}/api/users/me/addresses/${editingAddressId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/api/users/me/addresses`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to save address");
      }

      const saved = await res.json();
      if (editingAddressId) {
        setAddresses((prev) => prev.map((a) => (a._id === saved._id ? saved : a)));
      } else {
        setAddresses((prev) => [...prev, saved]);
      }
      resetAddressForm();
    } catch (err) {
      alert(err.message);
    }
  };

  const onEditAddress = (addr) => {
    setEditingAddressId(addr._id);
    const [houseNo, ...rest] = (addr.line1 || "").split(" ");
    setAddressForm({
      label: addr.label || "Home",
      houseNo: houseNo || "",
      street: rest.join(" ") || "",
      pincode: addr.postalCode || "",
      state: addr.state || "",
      district: addr.city || "",
      country: addr.country || "India",
      isDefault: !!addr.isDefault,
    });
  };

  const onDeleteAddress = async (addrId) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/users/me/addresses/${addrId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete address");
      setAddresses((prev) => prev.filter((a) => a._id !== addrId));
      if (editingAddressId === addrId) resetAddressForm();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="container my-5">Loading profile...</div>;
  if (error)
    return <div className="container my-5 text-danger">Error: {error}</div>;

  return (
    <div className="container my-5">
      {/* 🔹 Profile Form */}
      <div className="card shadow-sm border-0 rounded-3 mb-5">
        <div className="card-body p-4">
          <h2 className="mb-4 text-primary">User Profile</h2>
          <form onSubmit={(e) => e.preventDefault()} className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Username</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control shadow-sm"
                name="email"
                value={profile.email}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                className="form-control shadow-sm"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Section */}
            <div className="col-12 mt-4 d-flex align-items-center justify-content-between">
              <h4 className="text-secondary">{editingAddressId ? "Edit Address" : "Add New Address"}</h4>
              <button className="btn btn-outline-secondary btn-sm" type="button" onClick={resetAddressForm}>Reset</button>
            </div>

            <div className="col-md-6">
              <label className="form-label">Label</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="label"
                value={addressForm.label}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">House No.</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="houseNo"
                value={addressForm.houseNo}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-9">
              <label className="form-label">Street</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="street"
                value={addressForm.street}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="pincode"
                value={addressForm.pincode}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="state"
                value={addressForm.state}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">District</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="district"
                value={addressForm.district}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control shadow-sm"
                name="country"
                value={addressForm.country}
                onChange={handleAddressChange}
              />
            </div>

            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={addressForm.isDefault}
                  onChange={handleAddressChange}
                />
                <label className="form-check-label" htmlFor="isDefault">
                  Set as default
                </label>
              </div>
            </div>

            <div className="col-12 text-end">
              <button onClick={onSubmitAddress} className="btn btn-primary px-4" disabled={addresses.length >= 3 && !editingAddressId}>
                {editingAddressId ? "Update Address" : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 🔹 Address List */}
      <h2 className="mb-4">Your Addresses</h2>
      {addresses.length > 0 ? (
        <div className="row">
          {addresses.map((address, index) => (
            <div key={address._id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-0 h-100 hover-shadow">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {address.label || `Address ${index + 1}`}
                    {address.isDefault && (
                      <span className="badge bg-primary ms-2">Default</span>
                    )}
                  </h5>
                  <p className="card-text small">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                    <br />
                    {address.city}, {address.state} - {address.postalCode}
                    <br />
                    {address.country}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => onEditAddress(address)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDeleteAddress(address._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No addresses saved yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
