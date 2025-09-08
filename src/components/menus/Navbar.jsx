import React from "react";
import logo from "../../assets/images/logo/logo-nobg.png";
import { FaPhoneAlt } from "react-icons/fa"; // solid phone icon
import { FiPhoneCall } from "react-icons/fi"; // outline phone icon
import { MdCall } from "react-icons/md";

const Navbar = () => {
  return (
    <>
      <div className="top-nav">
        <div className="logo">
          <a href="01_home.html">
            <img className="img-fluid" src={logo} alt="01 Logo" />
          </a>
          <a href="#open-nav-bar-menu" className="open-nav-bar">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>

        <div className="nav-info">
          <div className="box">
            <div className="info">
              {/* <i className="flaticon-emergency-call"></i> */}

              <ul className="text-info">
                <li>
                  <a href="#">
                    {/* <FaPhoneAlt className="text-success me-2" size={15} /> */}
                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                    <span>Phone : </span>+(91) 9663460555
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Email : </span>sales@muttaikadai.com
                  </a>
                </li>
              </ul>
            </div>
            <a href="01_appointment.html" className="btn-1">
              Login
            </a>
          </div>
        </div>
      </div>

      <nav className="nav-box ">
        <div className="container">
          <div className="nav-bar" id="open-nav-bar-menu">
            <div className="box">
              {/* Main Navigation */}
              <ul className="level-1">
                <li className="">
                  <a href="#" className="color-active">
                    Home
                  </a>
                </li>

                <li className="">
                  <a href="#">About Us</a>
                </li>

                <li className="">
                  <a href="#">Services</a>
                </li>

                <li className="has-menu">
                  <a href="#">Our Products</a>
                  <ul className="level-2">
                    <li>
                      <a href="01_departments.html">Retail Eggs</a>
                    </li>
                    <li>
                      <a href="02_departments.html">Wholesale Eggs</a>
                    </li>
                    <li>
                      <a href="03_departments.html">Chicks</a>
                    </li>
                  </ul>
                </li>

                <li className="">
                  <a href="#">Contact Us</a>
                </li>

                <li className="">
                  <a href="#">Blog</a>
                </li>

                <li className="has-menu">
                  <a href="#">Shop</a>
                  <ul className="level-2">
                    <li>
                      <a href="01_shop.html">Products</a>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Social Icons + Cart */}
              <ul className="level-1">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li className="cart">
                  <a href="#">
                    <i className="fas fa-shopping-cart"></i>
                  </a>
                  <div className="cart-popup">
                    <div className="item">
                      <img
                        className="img-fluid"
                        src="assets/images/shop/01_shop.jpg"
                        alt="01 Shop"
                      />
                      <div className="item-content">
                        <div>Mismo Briefcase</div>
                        <span>2 x $ 38.00</span>
                      </div>
                      <span className="delete-item">x</span>
                    </div>
                    <div className="item">
                      <img
                        className="img-fluid"
                        src="assets/images/shop/02_shop.jpg"
                        alt="02 Shop"
                      />
                      <div className="item-content">
                        <div>Brown Leather</div>
                        <span>1 x $ 28.00</span>
                      </div>
                      <span className="delete-item">x</span>
                    </div>
                    <div className="subtotal">
                      <span>Subtotal:</span>
                      <span>$ 88.00</span>
                    </div>
                    <div className="button-cart">
                      <button className="btn-1">View Cart</button>
                      <button className="btn-3">Checkout</button>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#" className="open-search">
                    <i className="fas fa-search"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
