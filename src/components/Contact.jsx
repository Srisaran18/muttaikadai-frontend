import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import API_URL from "../Config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    let hasErrors = false;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      hasErrors = true;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      hasErrors = true;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      hasErrors = true;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }

    return !hasErrors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        setSubmitStatus("error");
        if (data.errors) {
          setErrors(
            data.errors.reduce(
              (acc, err) => ({
                ...acc,
                [err.field]: err.message
              }),
              {}
            )
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Contact Us</h2>

              {showAlert &&
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Please fill in all required fields!</strong>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAlert(false)}
                    aria-label="Close"
                  />
                </div>}

              {submitStatus === "success" &&
                <div className="alert alert-success" role="alert">
                  Thank you for your message! We'll get back to you soon.
                </div>}

              {submitStatus === "error" &&
                <div className="alert alert-danger" role="alert">
                  Failed to send message. Please try again.
                </div>}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name
                      ? "is-invalid"
                      : ""}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {errors.name &&
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email
                      ? "is-invalid"
                      : ""}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {errors.email &&
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone
                      ? "is-invalid"
                      : ""}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone &&
                    <div className="invalid-feedback">
                      {errors.phone}
                    </div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.message
                      ? "is-invalid"
                      : ""}`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter your message"
                  />
                  {errors.message &&
                    <div className="invalid-feedback">
                      {errors.message}
                    </div>}
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
