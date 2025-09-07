import React from "react";
import shopImage from "../assets/images/shop/01_shop.jpg"; // adjust path if needed
import breadcrumbImg from "../assets/images/breadcrumb-header/01_breadcrumb-header.jpg";

const SingleProduct = () => {
  return (
    <>
      {/* :: Breadcrumb Header */}
      <section
        className="breadcrumb-header"
        id="page"
        style={{ backgroundImage: `url(${breadcrumbImg})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="breadcrumb-box text-center">
                <h1>Single Product</h1>
                <p>
                  Egg Cart Hatcheries — Quality eggs, chicks, and poultry
                  products you can trust.
                </p>
                <ul className="list-breadcrumb">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li>Single Product</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* :: Shop */}
      <section className="shop area py-100">
        <div className="container">
          <div className="row">
            {/* Product Image */}
            <div className="col-lg-6">
              <div className="img-box">
                <img className="img-fluid" src={shopImage} alt="Farm Product" />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-lg-6 d-flex align-items-center">
              <div className="text-box-details">
                <h3 className="title-product">Farm Fresh Eggs</h3>
                <div className="item-review">
                  <span>
                    <i className="fas fa-star active"></i>
                  </span>
                  <span>
                    <i className="fas fa-star active"></i>
                  </span>
                  <span>
                    <i className="fas fa-star active"></i>
                  </span>
                  <span>
                    <i className="fas fa-star active"></i>
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="reviews">4 Review(s)</span>
                  <span className="spance-span">/</span>
                  <span>
                    <a href="#">Add Review</a>
                  </span>
                </div>
                <div className="item-price">₹180.00 / Tray</div>
                <p>
                  Our farm-fresh eggs are sourced directly from healthy hens.
                  Packed with nutrition, freshness, and quality you can trust
                  for retail and wholesale customers.
                </p>
                <a href="#" className="btn-3">
                  Add To Cart
                </a>
                <ul className="list-details">
                  <li>
                    <span>SKU:</span> EGG-003
                  </li>
                  <li>
                    <span>Category:</span> Eggs
                  </li>
                  <li>
                    <span>Tags:</span> Farm Fresh, Organic, Poultry
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="description text-center">
                <ul>
                  <li>
                    <a href="#" className="btn-1">
                      Additional Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-1">
                      Description
                    </a>
                  </li>
                  <li>
                    <a href="#" className="btn-1">
                      Reviews (4)
                    </a>
                  </li>
                </ul>
                <p>
                  Our poultry farm ensures hygienic handling and storage for all
                  eggs. With strict quality control and sustainable practices,
                  we provide the best products for both households and
                  businesses. Perfect for wholesale distributors, bakeries, and
                  retail customers alike.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
