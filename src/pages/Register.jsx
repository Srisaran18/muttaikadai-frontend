import React from "react";

const Register = () => {
  return (
    <>
      {/* :: Breadcrumb Header */}
      <section
        className="breadcrumb-header"
        id="page"
        style={{
          backgroundImage:
            "url(assets/images/breadcrumb-header/02_breadcrumb-header.jpg)",
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="breadcrumb-box text-center">
                <h1>Register</h1>
                <p>
                  Create your Al-Anwar account and access healthcare services
                  anytime, anywhere.
                </p>
                <ul className="list-breadcrumb">
                  <li>
                    <a href="01_home.html">Home</a>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* :: Register Section */}
      <section className="register-section py-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-box text-center p-4 shadow rounded">
                <h3 className="mb-4">Create Account</h3>
                <form>
                  {/* Name */}
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  {/* Mobile */}
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="btn-3 w-100 mb-3">
                    Register
                  </button>

                  {/* Link to Login */}
                  <div>
                    <span>Already have an account? </span>
                    <a href="/login" className="btn-1">
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
