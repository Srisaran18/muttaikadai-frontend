import React, { useState , useEffect } from "react";
import API_URL from "../../Config";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Required for Carousel functionality
import bannerImage1 from "../../assets/images/banner.jpg"; // Add your image to src/assets/banner.jpg
import bannerImage2 from "../../assets/images/banner2.jpg"; // Add your image to src/assets/banner.jpg
import bannerImage3 from "../../assets/images/banner3.jpg"; // Add your image to src/assets/banner.jpg
import quality from "../../assets/images/quality.jpg";
import "../../assets/css/custom.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      }
    };
    load();
  }, []);


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
              <h5>Farm Fresh Eggs, Every Day</h5>
              <p>
                Nutritious chicken and quail eggs, sourced directly from healthy
                farms. Packed with protein, freshness, and delivered with care.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={bannerImage2} className="d-block w-100" alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Strong Chicks, Healthy Farms</h5>
              <p>
                We provide high-quality chicks to boost your poultry business.
                Carefully raised for strength, growth, and long-term
                productivity.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img src={bannerImage3} className="d-block w-100" alt="Slide 3" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Quails – Small Birds, Big Benefits</h5>
              <p>
                Supplying live quails and quail eggs rich in nutrients and
                flavor. Trusted by farms, hotels, and households alike.
              </p>
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

          {products.length === 0 ? (
            <p className="text-muted">No products available.</p>
          ) : (
            products.map((product) => (
              <div className="col-md-3" key={product._id}>
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="border rounded  bg-opacity-25 d-flex flex-column overflow-hidden"
                    style={{
                      height: "300px",
                      backgroundColor: "rgb(255 197 166)",
                      color: "white",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid w-100"
                      style={{ height: "80%", objectFit: "cover" }}
                    />
                    <div className="p-2">
                      <h5 className="mb-0 text-dark">{product.name}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

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
                At Muttaikadai, we prioritize freshness and purity in every egg
                we deliver. Our eggs are sourced directly from trusted farms,
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
              <Link to="/shop" className="btn btn-primary mt-3">
                Visit Our Farm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* services */}
      <section className="services py-5" id="services">
        <div className="container">
          <div className="text-center services-title mb-5">
            <h2>Explore Our Services</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card shadow-sm rounded p-4 h-100 text-center">
                <h4>Doorstep Delivery</h4>
                <p>
                  Fresh farm products delivered right to your home with care and
                  efficiency.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card shadow-sm rounded p-4 h-100 text-center">
                <h4>Negotiated Price for Bulk Orders</h4>
                <p>
                  Get the best value for bulk purchases with flexible,
                  competitive pricing.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card shadow-sm rounded p-4 h-100 text-center">
                <h4>Farm-Fresh Quality</h4>
                <p>
                  We ensure every egg and chicken is naturally raised and fresh
                  from the farm.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card shadow-sm rounded p-4 h-100 text-center">
                <h4>Flexible Payment Options</h4>
                <p>
                  Convenient payment modes for hassle-free transactions and
                  repeat orders.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-4">
              <div className="service-card shadow-sm rounded p-4 h-100 text-center">
                <h4>Trusted Customer Support</h4>
                <p>
                  Quick and reliable support to answer all your queries and
                  special requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
