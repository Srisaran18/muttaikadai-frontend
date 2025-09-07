import React from "react";
import shopImage from "../assets/images/shop/01_shop.jpg"; // adjust path if needed

const Products = () => {
  const products = [
    {
      img: shopImage,
      name: "Syringe",
      price: "$18.00",
      link: "01_single-product.html",
    },
    {
      img: shopImage,
      name: "Box AID",
      price: "$21.00",
      link: "01_single-product.html",
    },
    {
      img: shopImage,
      name: "Doctor Tablet",
      price: "$15.00",
      link: "01_single-product.html",
    }
  ];

  return (
    <>
      {/* :: Breadcrumb Header */}
      <section
        className="breadcrumb-header"
        id="page"
        style={{
          backgroundImage:
            "url(assets/images/breadcrumb-header/03_breadcrumb-header.jpg)",
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="breadcrumb-box text-center">
                <h1>Our Products</h1>
                <p>
                  Al-Anwar are a professional medical &amp; health care services
                  provider institutions.
                </p>
                <ul className="list-breadcrumb">
                  <li>
                    <a href="01_home.html">Home</a>
                  </li>
                  <li>
                    <i className="fas fa-angle-right"></i>
                  </li>
                  <li>Our products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* :: Shop Section */}
      <section className="shop py-100">
        <div className="container">
          <div className="row">
            {products.map((product, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="shop-item">
                  <div className="item-img">
                    <img
                      className="img-fluid"
                      src={product.img}
                      alt={product.name}
                    />
                    <div className="add-to-card">
                      <a href={product.link} className="btn-4">
                        Add To Cart
                      </a>
                    </div>
                  </div>
                  <div className="item-text text-center">
                    <a href={product.link} className="open-item-shop">
                      <h4>{product.name}</h4>
                    </a>
                    <span>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="col-md-12">
              <div className="pagination-blog-area">
                <ul className="pagination one">
                  <li>Prev</li>
                  <li className="active">1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>Next</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
