import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Required for Carousel functionality
import bannerImage1 from "../../assets/images/banner.jpg"; // Add your image to src/assets/banner.jpg
import bannerImage2 from "../../assets/images/banner2.jpg"; // Add your image to src/assets/banner.jpg
import bannerImage3 from "../../assets/images/banner3.jpg"; // Add your image to src/assets/banner.jpg
import product1 from "../../assets/images/products/product1.jpg";
import product2 from "../../assets/images/products/product2.jpg";
import product3 from "../../assets/images/products/product3.jpg";
import product4 from "../../assets/images/products/product4.jpg";
import incubator from "../../assets/images/incubator.png";
import heater from "../../assets/images/heater.png";
import eggBoiler from "../../assets/images/eggboiler.png";
import quality from "../../assets/images/quality.jpg";
import "../../assets/css/custom.css";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    let hasErrors = false;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      hasErrors = true;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
      hasErrors = true;
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      hasErrors = true;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      hasErrors = true;
    }

    if (!message.trim()) {
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      name,
      email,
      phone,
      message
    };

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();
      console.log("Contact us result : ", result);

      if (response.ok) {
        alert("Message sent successfully");
        // Reset form fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setErrors({});
      } else {
        alert("Error: " + result.message);
      }
    } catch (err) {
      console.error("Server error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <main>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={bannerImage1} className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h5>First Slide</h5>
              <p>Some quick example text for Slide 1.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={bannerImage2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second Slide</h5>
              <p>Some quick example text for Slide 2.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={bannerImage3} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third Slide</h5>
              <p>Some quick example text for Slide 3.</p>
            </div>
          </div>
        </div>
        <div className="content-divider" />

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          />
        </div>
      </div>

      <section className="features clearfix" id="features">
        {/* Broiler Eggs */}
        <div className="feature">
          <span className="feature-icon">
            <i className="fas fa-egg"></i>
          </span>
          <h4 className="feature-title">Broiler Eggs</h4>
          <p className="feature-text">
            Fresh, affordable broiler eggs available in bulk and retail packs
            for households, hotels, and shops.
          </p>
        </div>

        {/* Country Chicken Eggs */}
        <div className="feature">
          <span className="feature-icon">
            <i className="fas fa-drumstick-bite"></i>
          </span>
          <h4 className="feature-title">Country Chicken Eggs</h4>
          <p className="feature-text">
            Nutritious desi eggs rich in protein and taste — perfect for a
            healthy lifestyle.
          </p>
        </div>

        {/* Country Chicken */}
        <div className="feature">
          <span className="feature-icon">
            <i className="fas fa-feather"></i>
          </span>
          <h4 className="feature-title">Country Chicken</h4>
          <p className="feature-text">
            Farm-raised native chickens, known for their natural flavor and
            health benefits.
          </p>
        </div>

        {/* Quails */}
        <div className="feature">
          <span className="feature-icon">
            <i className="fas fa-dove"></i>
          </span>
          <h4 className="feature-title">Quails</h4>
          <p className="feature-text">
            Small, nutrient-packed quail birds and eggs — ideal for gourmet
            cooking and nutrition.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <div className="container my-5" id="promo">
        <div className="row text-center g-4">
          <h2>Our Products</h2>
          <div className="col-md-3">
            <a href="#products" className="text-decoration-none">
              <div
                className="border rounded bg-success bg-opacity-25 d-flex flex-column overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={product1}
                  alt="Incubator"
                  className="img-fluid w-100"
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <div className="p-2">
                  <h5 className="mb-0 text-dark">Quails (kaadai)</h5>
                </div>
              </div>
            </a>
          </div>

          <div className="col-md-3">
            <a href="#products" className="text-decoration-none">
              <div
                className="border rounded bg-success bg-opacity-25 d-flex flex-column overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={product2}
                  alt="Incubator"
                  className="img-fluid w-100"
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <div className="p-2">
                  <h5 className="mb-0 text-dark">Broiler Eggs</h5>
                </div>
              </div>
            </a>
          </div>

          <div className="col-md-3">
            <a href="#services" className="text-decoration-none">
              <div
                className="border rounded bg-success bg-opacity-25 d-flex flex-column overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={product3}
                  alt="Heater"
                  className="img-fluid w-100"
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <div className="p-2">
                  <h5 className="mb-0 text-dark">Country chicken Eggs</h5>
                </div>
              </div>
            </a>
          </div>

          <div className="col-md-3">
            <a href="#delivery" className="text-decoration-none">
              <div
                className="border rounded bg-success bg-opacity-25 d-flex flex-column overflow-hidden"
                style={{ height: "300px" }}
              >
                <img
                  src={product4}
                  alt="Egg Boiler"
                  className="img-fluid w-100"
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <div className="p-2">
                  <h5 className="mb-0 text-dark">Country Chicken</h5>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* products */}
      <section
        className="py-5"
        id="products"
        style={{ backgroundColor: "var(--clr-grey-3)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Text Column */}
            <div className="col-md-6">
              <h2 className="mb-3">Explore Our Hatchery Selection</h2>
              <p className="text-muted">
                Discover the authentic taste and superior nutrition of our
                original Naatukozhi eggs, sourced from traditional country
                chickens raised naturally. Known for their rich flavor and
                health benefits, these eggs are perfect for those who value
                quality and farm-fresh goodness in every meal. Enjoy the natural
                goodness of Naatukozhi eggs, delivered fresh from trusted
                hatcheries to your doorstep.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Retail: Fresh original Naatukozhi eggs available at ₹12 per
                  egg.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Wholesale: Bulk orders of Naatukozhi eggs at ₹12 per egg with
                  flexible quantity options.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Quality Guaranteed: Farm-fresh eggs delivered reliably for
                  both retail and wholesale customers.
                </li>
              </ul>
              <a href="#shop" className="btn btn-primary mt-3">
                Explore Our Products
              </a>
            </div>

            {/* Image Column */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={eggBoiler}
                alt="Egg Quality"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us section */}
      <section className="py-5 bg-light" id="quality">
        <div className="container">
          <div className="row align-items-center">
            {/* Image Column */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={quality}
                alt="Egg Quality"
                className="img-fluid rounded shadow-sm"
              />
            </div>

            {/* Text Column */}
            <div className="col-md-6">
              <h2 className="mb-3">Uncompromising Quality You Can Trust</h2>
              <p className="text-muted">
                At Egg Cart, we prioritize freshness and purity in every egg we
                deliver. Our eggs are sourced directly from trusted farms,
                handled with care, and quality-checked to ensure you receive
                nothing but the best.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Farm-fresh and hormone-free eggs
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Rigorous quality control and packaging
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2" />
                  Trusted by thousands of families
                </li>
              </ul>
              <a href="#shop" className="btn btn-primary mt-3">
                Visit Our Farm
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="services py-5" id="services">
        <div className="container">
          <div className="text-center services-title mb-5">
            <h3>Explore</h3>
            <h2>Our Services</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card p-0">
                <div className="service-img-container position-relative">
                  <img
                    src={heater}
                    alt="Custom Recipes"
                    className="service-img w-100"
                  />
                </div>
                <div className="service-info text-center p-4">
                  <h4>Custom Recipes</h4>
                  <p>
                    Experience our bespoke menu, crafted with care and passion
                    for a distinctive culinary journey.
                  </p>
                  <a
                    href="#recipes"
                    className="btn btn-primary service-btn mt-3"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card p-0">
                <div className="service-img-container position-relative">
                  <img
                    src={quality}
                    alt="Home Delivery"
                    className="service-img w-100"
                  />
                </div>
                <div className="service-info text-center p-4">
                  <h4>Home Delivery</h4>
                  <p>
                    Convenient home delivery for our delicious menu, ensuring
                    fresh flavours delivered to your doorstep.
                  </p>
                  <a
                    href="#delivery"
                    className="btn btn-primary service-btn mt-3"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card p-0">
                <div className="service-img-container position-relative">
                  <img
                    src={incubator}
                    alt="Tender Chicken"
                    className="service-img w-100"
                  />
                </div>
                <div className="service-info text-center p-4">
                  <h4>Tender Chicken</h4>
                  <p>
                    Tender chicken, expertly prepared to perfection for a
                    delectable dining experience.
                  </p>
                  <a
                    href="#chicken"
                    className="btn btn-primary service-btn mt-3"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us section */}
      <section
        className="contact py-5"
        id="contact"
        style={{ backgroundColor: "var(--clr-grey-3)" }}
      >
        <div className="container">
          <div className="row">
            {/* Contact Info */}
            <div className="col-lg-6 mb-4">
              <div className="contact-info">
                <div className="contact-item mb-4">
                  <h4 className="contact-title d-flex align-items-center gap-2 fw-medium mb-1">
                    <span className="contact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
                      </svg>
                    </span>
                    Address
                  </h4>
                  <div className="contact-text text-secondary">
                    123, Cherry Road Salem <br /> Pincode - 641669
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <h4 className="contact-title d-flex align-items-center gap-2 fw-medium mb-1">
                    <span className="contact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                      </svg>
                    </span>
                    Email
                  </h4>
                  <div className="contact-text text-secondary">
                    srinataraj1521@gmail.com
                  </div>
                </div>

                <div className="contact-item mb-4">
                  <h4 className="contact-title d-flex align-items-center gap-2 fw-medium mb-1">
                    <span className="contact-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                      </svg>
                    </span>
                    Telephone
                  </h4>
                  <div className="contact-text text-secondary">9952208813</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-6">
              <div
                className="contact-form bg-white p-4 rounded shadow-sm"
                style={{ maxWidth: "100%" }}
              >
                <h3
                  className="text-primary text-center mb-4"
                  style={{
                    fontFamily: "var(--ff-design)",
                    fontSize: "1.75rem",
                  }}
                >
                  Contact Us
                </h3>

                {showAlert && (
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
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group position-relative mb-4">
                    <input
                      type="text"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      required
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="form-group position-relative mb-4">
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      required
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="form-group position-relative mb-4">
                    <input
                      type="tel"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      required
                      id="phone"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="form-group position-relative mb-4">
                    <textarea
                      className={`form-control ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      required
                      id="message"
                      placeholder="Message"
                      style={{ resize: "none", height: "100px" }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mt-3"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
