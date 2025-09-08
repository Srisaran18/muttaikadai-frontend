
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../Config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Username is required.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Phone number must be 10 digits.");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (isValid) {
      const userData = {
        name: username,
        email: email,
        password: password,
        mobile: phoneNumber
      };
      try {
        const response = await fetch(`${API_URL}/api/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        });
        const result = await response.json();
        if (response.ok) {
          setRegisterSuccess("Registered successfully! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setRegisterError(result.message || "Registration failed");
        }
      } catch (err) {
        setRegisterError("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="border rounded p-4 shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">Register</h2>

          {registerError && (
            <div className="alert alert-danger">{registerError}</div>
          )}
          {registerSuccess && (
            <div className="alert alert-success">{registerSuccess}</div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${usernameError ? "is-invalid" : ""}`}
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              {usernameError && (
                <div className="invalid-feedback">{usernameError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${emailError ? "is-invalid" : ""}`}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {emailError && (
                <div className="invalid-feedback">{emailError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${passwordError ? "is-invalid" : ""}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <div className="invalid-feedback">{passwordError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordError ? "is-invalid" : ""}`}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && (
                <div className="invalid-feedback">{confirmPasswordError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className={`form-control ${phoneError ? "is-invalid" : ""}`}
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="Enter 10 digit phone number"
                required
              />
              {phoneError && (
                <div className="invalid-feedback">{phoneError}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <div className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
