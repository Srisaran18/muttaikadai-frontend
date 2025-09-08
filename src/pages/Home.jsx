// src/pages/Home.jsx
import React from "react";
import bg1 from "../assets/images/header/bg1.jpg";
import product1 from "../assets/images/products/product1.jpg";
import product2 from "../assets/images/products/product2.jpg";
import product3 from "../assets/images/products/product3.jpg";
import product4 from "../assets/images/products/product4.jpg";




const Home = () => {
    

  return (
    <>
      {/* // header */}

      <section className="header header-1" id="page">
        <div className="hero-slider">
          <div className="box-slider">
            <div
              className="bg-slider"
              style={{ backgroundImage: `url(${bg1})` }}
            ></div>
            <div className="display-table">
              <div className="table-cell">
                <div className="overlay"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="banner">
                        <div className="top-handline">Fresh from the Farm</div>
                        <h1 className="handline">Muttaikadai Hatcheries</h1>
                        <p className="about-website">
                          Supplying farm-fresh eggs and quality hatchery
                          services with care and dedication. From hatching to
                          delivery, we ensure the best for farmers, retailers,
                          and families.
                        </p>
                        {/* <a href="#about" className="btn-2">Learn More</a> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* products */}

      <section className="doctors py-100-70">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="sec-title text-center">
                <h2>Our Products</h2>
                <h3>
                  Fresh & Quality <span>Eggs & Chickens</span>
                </h3>
                <div className="icon">
                  <i className="flaticon-heart sec-icon"></i>
                </div>
                <p>
                  We supply farm-fresh eggs and healthy chickens directly from
                  our hatchery. Available in wholesale and retail to meet all
                  your needs.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Product 1 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="doctor-item">
                <div className="img-box">
                  <img
                    className="img-fluid"
                    src={product1}
                    alt="Wholesale Eggs"
                  />
                </div>
                <div className="text-box text-center">
                  <h5>Country Chicken Eggs</h5>
                  <span>Click to view more</span>
                  <p>
                    Large quantities of farm-fresh eggs delivered to retailers,
                    distributors, and hotels at competitive prices.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="doctor-item">
                <div className="img-box">
                  <img className="img-fluid" src={product2} alt="Retail Eggs" />
                </div>
                <div className="text-box text-center">
                  <h5>Broiler Eggs</h5>
                  <span>Click to view more</span>
                  <p>
                    Fresh, hygienically packed eggs for families, available in
                    different pack sizes to suit your needs.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="doctor-item">
                <div className="img-box">
                  <img className="img-fluid" src={product3} alt="Chickens" />
                </div>
                <div className="text-box text-center">
                  <h5>Country Chicken (Naatu Kozhi)</h5>
                  <span>Click to view more</span>
                  <p>
                    Nutritious, farm-raised chickens ensuring the best quality
                    and freshness for your table.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="doctor-item">
                <div className="img-box">
                  <img className="img-fluid" src={product4} alt="Chickens" />
                </div>
                <div className="text-box text-center">
                  <h5>Quail (Kaadai)</h5>
                  <span>Click to view more</span>
                  <p>
                    Nutritious, farm-raised chickens ensuring the best quality
                    and freshness for your table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
