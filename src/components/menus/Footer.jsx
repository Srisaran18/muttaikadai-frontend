
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-4 pe-4">
            <h5>About Us</h5>
            <p className="text-white ">
              We provide quality services and products to our customers with dedication and care.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 mb-4 ">
            <h5>Useful Links</h5>
            <ul className="list">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About</a></li>
              <li><a href="/services" className="text-white text-decoration-none">Services</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled text-primary">
              <li><i className="bi bi-geo-alt-fill me-2"></i> 123 Main Street, City</li>
              <li><i className="bi bi-envelope-fill me-2"></i> email@example.com</li>
              <li><i className="bi bi-telephone-fill me-2"></i> +1 234 567 890</li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center text-white">
          © {new Date().getFullYear()} <span className='text-danger'>Egg Cart</span>. All rights reserved.
        </div>
        <div className="text-center foot-count">
           <p>Egg Cart – Trusted by households worldwide for fresh and farm-to-door egg delivery. <a
             href="#" className="btn btn-primary btn-sm">Join us today !</a></p>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
