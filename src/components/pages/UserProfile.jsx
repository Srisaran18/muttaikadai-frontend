import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    mail: '',
    number: '',
    username: '',
    email: '',
    phone: '',
    houseNo: '',
    street: '',
    pincode: '',
    state: '',
    district: ''
  });

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    mail: '',
    number: '',
    houseNo: '',
    street: '',
    pincode: '',
    state: '',
    district: '',
    isDefault: false
    // contactName: '',
    // contactPhone: '',
    // contactEmail: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching profile with token:', token);
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Profile data:', data);
        
        setProfile({
          username: data.username || '',
          email: data.email || '',
          phone: data.phone || '',
          name: '',
          mail: '',
          number: '',
          houseNo: '',
          street: '',
          pincode: '',
          state: '',
          district: ''
        });
        setAddresses(data.addresses || []);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        if (err.message.includes('401') || err.message.includes('403')) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to save your profile');
      return;
    }

    try {
      // First, update the profile
      const profileResponse = await fetch('http://localhost:5000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: profile.username,
          phone: profile.phone
        }),
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Then, if there's a new address, add it
      if (profile.name && profile.mail && profile.number && profile.houseNo && profile.street && profile.pincode && profile.state && profile.district) {
        const addressResponse = await fetch('http://localhost:5000/profile/address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            address: {
              name: profile.name,
              mail: profile.mail,
              number: profile.number,
              houseNo: profile.houseNo,
              street: profile.street,
              pincode: profile.pincode,
              state: profile.state,
              district: profile.district,
              isDefault: addresses.length === 0 // Make default if it's the first address
            }
          }),
        });

        if (!addressResponse.ok) {
          throw new Error('Failed to add address');
        }

        const updatedProfile = await addressResponse.json();
        setAddresses(updatedProfile.addresses);
        
        // Clear the address form fields
        setProfile(prev => ({
          ...prev,
          name: '',
          mail: '',
          number: '',
          houseNo: '',
          street: '',
          pincode: '',
          state: '',
          district: ''
        }));
      }

      alert('Profile saved successfully!');
    } catch (err) {
      console.error('Server error:', err);
      alert('Error saving profile: ' + err.message);
    }
  };

  const handleDeleteAddress = async (index) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/profile/address/${index}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete address');
      }

      const updatedProfile = await response.json();
      setAddresses(updatedProfile.addresses);
      alert('Address deleted successfully!');
    } catch (err) {
      console.error('Error deleting address:', err);
      alert('Error deleting address: ' + err.message);
    }
  };

  const handleAddAddress = () => {
    setAddressForm({
      name: '',
      mail: '',
      number: '',
      houseNo: '',
      street: '',
      pincode: '',
      state: '',
      district: '',
      isDefault: false
      // contactName: '',
      // contactPhone: '',
      // contactEmail: ''
    });
    setEditingAddress(null);
    setShowEditModal(true);
  };

  const handleEditAddress = (address, index) => {
    setAddressForm({
      name: address.name,
      mail: address.mail,
      number: address.number,
      houseNo: address.houseNo,
      street: address.street,
      pincode: address.pincode,
      state: address.state,
      district: address.district,
      isDefault: address.isDefault
      // contactName: address.contactName,
      // contactPhone: address.contactPhone,
      // contactEmail: address.contactEmail
    });
    setEditingAddress(index);
    setShowEditModal(true);
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingAddress !== null
        ? `http://localhost:5000/profile/address/${editingAddress}`
        : 'http://localhost:5000/profile/address';
      
      const response = await fetch(url, {
        method: editingAddress !== null ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          address: {
            name: addressForm.name,
            mail: addressForm.mail,
            number: addressForm.number,
            houseNo: addressForm.houseNo,
            street: addressForm.street,
            pincode: addressForm.pincode,
            state: addressForm.state,
            district: addressForm.district,
            isDefault: addressForm.isDefault
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      const updatedProfile = await response.json();
      setAddresses(updatedProfile.addresses);
      setShowEditModal(false);
      setAddressForm({
        name: '',
        mail: '',
        number: '',
        houseNo: '',
        street: '',
        pincode: '',
        state: '',
        district: '',
        isDefault: false
      });
      setEditingAddress(null);
      alert('Address saved successfully!');
    } catch (err) {
      console.error('Error saving address:', err);
      alert('Error saving address: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container my-5">Loading profile...</div>;
  if (error) return <div className="container my-5 text-danger">Error: {error}</div>;

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-4">User Profile</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              name="username" 
              value={profile.username} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={profile.email} 
              disabled 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              name="phone" 
              value={profile.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-12">
            <h3 className="mt-4 mb-3">Add New Address</h3>
          </div>

          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={profile.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="mail" 
              value={profile.mail}
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              name="number" 
              value={profile.number} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">House No.</label>
            <input 
              type="text" 
              className="form-control" 
              name="houseNo" 
              value={profile.houseNo} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-9">
            <label className="form-label">Street</label>
            <input 
              type="text" 
              className="form-control" 
              name="street" 
              value={profile.street} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Pincode</label>
            <input 
              type="text" 
              className="form-control" 
              name="pincode" 
              value={profile.pincode} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <input 
              type="text" 
              className="form-control" 
              name="state" 
              value={profile.state} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">District</label>
            <input 
              type="text" 
              className="form-control" 
              name="district" 
              value={profile.district} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </div>
        </form>
      </div>

      <div className="container my-5">
        <h2>Your Addresses</h2>
        {addresses.length > 0 ? (
          <div className="row">
            {addresses.map((address, index) => (
              <div key={index} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      Address {index + 1}
                      {address.isDefault && <span className="badge bg-primary ms-2">Default</span>}
                    </h5>
                    <p className="card-text">
                      <strong>Name.:</strong> {address.name || '-'}<br />
                      <strong>Mail.:</strong> {address.mail || '-'}<br />
                      <strong>Contact.:</strong> {address.number || '-'}<br />
                      <strong>House No.:</strong> {address.houseNo || '-'}<br />
                      <strong>Street:</strong> {address.street || '-'}<br />
                      <strong>Pincode:</strong> {address.pincode || '-'}<br />
                      <strong>State:</strong> {address.state || '-'}<br />
                      <strong>District:</strong> {address.district || '-'}
                    </p>
                    <div className="btn-group">
                      <button 
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEditAddress(address, index)}
                      >
                        Edit Address
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAddress(index)}
                      >
                        Delete Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No addresses saved yet.</p>
        )}
      </div>

      {/* Edit Address Modal */}
      {showEditModal && editingAddress && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Address</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingAddress(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Contact Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="contactName" 
                    value={addressForm.contactName} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Phone</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    name="contactPhone" 
                    value={addressForm.contactPhone} 
                    onChange={handleAddressChange} 
                    pattern="[0-9]{10}"
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    name="contactEmail" 
                    value={addressForm.contactEmail} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">House No.</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="houseNo" 
                    value={addressForm.houseNo} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Street</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="street" 
                    value={addressForm.street} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pincode</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="pincode" 
                    value={addressForm.pincode} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="state" 
                    value={addressForm.state} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">District</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="district" 
                    value={addressForm.district} 
                    onChange={handleAddressChange} 
                    required 
                  />
                </div>
                <div className="mb-3 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="isDefault" 
                    name="isDefault" 
                    checked={addressForm.isDefault} 
                    onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))} 
                  />
                  <label className="form-check-label" htmlFor="isDefault">Set as default address</label>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingAddress(null);
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleSubmitAddress}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default UserProfile;
