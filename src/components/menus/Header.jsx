import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import API_URL from "../../Config";

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.username || "Login";

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    closeMobileMenu();

    if (location.pathname === "/home") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/home#${sectionId}`)
    }
  };

  // Handle mobile menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking on any link
  const handleLinkClick = () => {
    closeMobileMenu();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 d-flex align-items-center"
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
      ref={navbarRef}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand */}
        <Link
          className="navbar-brand text-danger fw-bold"
          to="/"
          onClick={handleLinkClick}
        >
          Muttaikadai
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleMenuToggle}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links + right-side actions */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={handleLinkClick}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/products"
                onClick={handleLinkClick}
              >
                Products
              </Link>
            </li>

            <li className="nav-item">
              <span
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("quality");
                }}
              >
                About us
              </span>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                Our Services
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Contact Us
              </a>
            </li> */}
          </ul>

          {/* Right side (Cart + User dropdown) */}
          <div className="d-flex align-items-center gap-3">
            {user && (
              <Link
                className="text-dark text-decoration-none"
                to="/cart"
                onClick={handleLinkClick}
              >
                🛒 Cart
              </Link>
            )}

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="primary"
                id="dropdown-basic"
                className="d-flex align-items-center"
              >
                <FaUserCircle className="me-2" size={20} />
                {displayName}
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-2">
                {!user ? (
                  <>
                    <Dropdown.Item
                      as={Link}
                      to="/login"
                      onClick={handleLinkClick}
                    >
                      👤 Login
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <p className="m-2">New User ?</p>
                    <Dropdown.Item
                      as={Link}
                      to="/register"
                      onClick={handleLinkClick}
                    >
                      👤 Register
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item
                      as={Link}
                      to="/userProfile"
                      onClick={handleLinkClick}
                    >
                      👤 My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      as={Link}
                      to="/myOrders"
                      onClick={handleLinkClick}
                    >
                      📦 Orders
                    </Dropdown.Item>
                    {user.role === "admin" && (
                      <Dropdown.Item
                        as={Link}
                        to="/adminPage"
                        onClick={handleLinkClick}
                      >
                        👨‍💼 Admin Page
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handleLogout();
                        handleLinkClick();
                      }}
                    >
                      🚪 Logout
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
