import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap"; // bootstrap offcanvas
import product1 from "../../assets/images/products/product1.jpg";
import product2 from "../../assets/images/products/product2.jpg";
import product3 from "../../assets/images/products/product3.jpg";
import product4 from "../../assets/images/products/product4.jpg";

const Products = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const selectedProduct = {
    id: 1,
    img: product1,
    name: "Country Chicken Eggs",
    price: 180,
    desc: "Farm-fresh nutritious desi eggs, rich in protein and taste. Suitable for households, hotels, and shops.",
  };

  const otherProducts = [
    { id: 2, img: product2, name: "Broiler Eggs", price: 150 },
    { id: 3, img: product3, name: "Country Chicken", price: 380 },
    { id: 4, img: product4, name: "Quail Eggs", price: 120 },
    { id: 5, img: product1, name: "Quails", price: 300 },
  ];

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setShowCart(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container py-5">
      {/* Selected Product Section */}
      <div className="row mb-5">
        {/* Left: Product Images */}
        <div className="col-md-6">
          <img
            src={selectedProduct.img}
            alt={selectedProduct.name}
            className="img-fluid rounded mb-3"
          />
          <div className="d-flex gap-2">
            <img
              src={product1}
              alt="thumb1"
              className="img-thumbnail"
              width="80"
            />
            <img
              src={product2}
              alt="thumb2"
              className="img-thumbnail"
              width="80"
            />
            <img
              src={product3}
              alt="thumb3"
              className="img-thumbnail"
              width="80"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2>{selectedProduct.name}</h2>
          <p className="text-muted">{selectedProduct.desc}</p>
          <h4 className="text-success">₹{selectedProduct.price} / Tray</h4>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => addToCart(selectedProduct)}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Other Products Section */}
      <h3 className="mb-4">Other Products</h3>
      <div className="row">
        {otherProducts.map((prod) => (
          <div className="col-sm-6 col-lg-3 mb-4" key={prod.id}>
            <div className="card h-100 shadow-sm">
              <img src={prod.img} alt={prod.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{prod.name}</h5>
                <p className="text-success">₹{prod.price}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => addToCart(prod)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Offcanvas (Right Side Slider) */}
      <Offcanvas
        show={showCart}
        onHide={() => setShowCart(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />₹{item.price}
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
              <h5>Total: ₹{total}</h5>
              <Button variant="success" className="w-100 mt-3">
                Checkout
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Products;
