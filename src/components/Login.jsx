import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
import API_URL from "../Config";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async e => {
    e.preventDefault();

    let isValid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    try {
      setSubmitting(true);
      const response = await fetch(`${API_URL}/api/users/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const contentType = response.headers.get("content-type") || "";
      let result;
      try {
        result = contentType.includes("application/json")
          ? await response.json()
          : await response.text();
      } catch (e) {
        result = await response.text().catch(() => "");
      }

      if (response.ok && typeof result === "object" && result.token) {
        const userData = {
          username: result.username,
          email: result.email,
          role: result.role
        };
        login(userData, result.token);

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        toast.success("Login successful!");
        navigate("/home");
      } else {
        const message = typeof result === "object" ? result.message : result;
        toast.error(message || `Login failed (status ${response.status})`);
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="border rounded p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {emailError &&
              <div className="invalid-feedback">
                {emailError}
              </div>}
          </div>

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              id="passwordInput"
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {passwordError &&
              <div className="invalid-feedback">
                {passwordError}
              </div>}
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/forgot" className="small">
            Forgot password?
          </Link>
          <br />
          <span className="small">
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
