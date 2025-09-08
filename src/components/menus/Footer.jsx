import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4 pe-4">
            <h5 className="text-primary">About Muttaidadai</h5>
            <p className="text-white">
              Muttaidadai brings fresh, healthy, and natural farm products
              directly to your doorstep. We specialize in country chicken eggs,
              quails, chicks, and broiler eggs with utmost care and quality.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary">Quick Links</h5>
            <ul className="list">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/products" className="text-white text-decoration-none">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="text-primary">Contact Us</h5>
            <ul className="list-unstyled text-white">
              <li>
                <i className="bi bi-geo-alt-fill me-2 text-danger"></i> 123 Farm
                Lane, Muttaidadai
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2 text-danger"></i>{" "}
                info@muttaidadai.com
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2 text-danger"></i> +91
                98765 43210
              </li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook "></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center text-white">
          © {new Date().getFullYear()}{" "}
          <span className="text-warning">Muttaidadai</span>. All rights
          reserved. Developed by{" "}
          <span className="text-warning">YoungZen Technologies</span>
        </div>
        <div className="text-center foot-count mt-2">
          <p>
            Trusted by households for fresh country chicken eggs, quails,
            chicks, and broiler eggs.
            <a href="/join" className="btn btn-primary btn-sm ms-2">
              Join us today!
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
