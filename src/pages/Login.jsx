import React from "react";

const Login = () => {
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
                <h1>Login</h1>
                <p>
                  Access your Al-Anwar account and manage your health services
                  with ease.
                </p>
                <ul className="list-breadcrumb">
                  <li>
                    <a href="01_home.html">Home</a>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li>Login</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* :: Login Section */}
      <section className="login-section py-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login-box text-center p-4 shadow rounded">
                <h3 className="mb-4">Welcome Back</h3>
                <form>
                  {/* Phone Number */}
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
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

                  {/* Submit */}
                  <button type="submit" className="btn-3 w-100 mb-3">
                    Login
                  </button>

                  {/* Links */}
                  <div className="d-flex justify-content-between">
                    <a href="#" className="btn-1">
                      Forgot Password?
                    </a>
                    <a href="#" className="btn-1">
                      Register
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

export default Login;
