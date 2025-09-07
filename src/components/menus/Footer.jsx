import React from "react";
import logo from "../../assets/images/logo/mainlogo.png";
import footer1 from "../../assets/images/footer/footer1.jpg"
import footer2 from "../../assets/images/footer/footer2.jpg"
import footer3 from "../../assets/images/footer/footer3.jpg"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Logo + About + Socials */}
          <div className="col-md-4 col-lg-3">
            <div className="logo">
              <img
                className="img-fluid"
                src={logo}
                alt="Muttaikadai Logo"
              />
              <p>
                Muttaikadai – Your trusted source for fresh eggs, healthy chicks,
                and poultry farm maintenance solutions. We hatch quality, you
                grow prosperity.
              </p>
              <ul>
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 col-lg-3">
            <div className="footer-title">
              <h4>Quick Links</h4>
            </div>
            <ul className="links">
              <li>
                <a href="/"><i className="fas fa-egg"></i> Home</a>
              </li>
              <li>
                <a href="/about"><i className="fas fa-egg"></i> About Us</a>
              </li>
              <li>
                <a href="/products"><i className="fas fa-egg"></i> Products</a>
              </li>
              <li>
                <a href="/services"><i className="fas fa-egg"></i> Services</a>
              </li>
              <li>
                <a href="/gallery"><i className="fas fa-egg"></i> Gallery</a>
              </li>
              <li>
                <a href="/blog"><i className="fas fa-egg"></i> Blog</a>
              </li>
              <li>
                <a href="/contact"><i className="fas fa-egg"></i> Contact</a>
              </li>
            </ul>
          </div>

          {/* Latest News */}
          <div className="col-md-4 col-lg-3">
            <div className="footer-title">
              <h4>Latest Updates</h4>
            </div>
            <div className="news-item">
              <img
                className="img-fluid"
                src={footer3}
                alt="Fresh Eggs"
              />
              <div className="item-content">
                <span>
                  <a href="#">Aug 20, 2025</a>
                </span>
                <a href="#" className="title-blog">
                  <h5>Fresh Country Eggs Available Daily</h5>
                </a>
              </div>
            </div>
            <div className="news-item">
              <img
                className="img-fluid"
                src={footer2}
                alt="Chicks Batch"
              />
              <div className="item-content">
                <span>
                  <a href="#">Aug 25, 2025</a>
                </span>
                <a href="#" className="title-blog">
                  <h5>New Batch of Healthy Chicks Hatched</h5>
                </a>
              </div>
            </div>
            <div className="news-item">
              <img
                className="img-fluid"
                src={footer1}
                alt="Farm Tips"
              />
              <div className="item-content">
                <span>
                  <a href="#">Sep 1, 2025</a>
                </span>
                <a href="#" className="title-blog">
                  <h5>Tips for Poultry Farm Maintenance</h5>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-md-6 col-lg-3">
            <div className="footer-title">
              <h4>Contact Info</h4>
            </div>
            <div className="contact-us">
              <span>Call Us</span>
              <div>+(91) 9663460555</div>
            </div>
            <div className="contact-us">
              <span>Email Us</span>
              <div>info@muttaikadai.com</div>
            </div>
            <div className="contact-us">
              <span>Visit Us</span>
              <div>Muttaikadai Farms, coimbatore , Tamil nadu</div>
            </div>
          </div>
        </div>

        {/* Bottom Reserved Section */}
        <div className="reserved">
          <p>&#64; Muttaikadai 2025. All Rights Reserved. Developed by <span className="highlight">YoungZen Technologies</span></p>
          <ul>
            <li>
              <a href="#">Terms &amp; Conditions </a>
            </li>
            <li>/</li>
            <li>
              <a href="#">Sitemap</a>
            </li>
            <li>/</li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
