import React, { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import API_URL from "../../Config";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const { items: cart, addItem, removeItemByIndex, updateItemQuantity, total } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const { id } = useParams();

  // Load all products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);

        if (id) {
          const found = data.find((p) => p._id === id);
          if (found) {
            setSelected(found);
            setQuantity(1);
          }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      }
    };
    loadProducts();
  }, [id]);

  // Add to Cart (only once)
  const addToCart = (product) => {
    addItem(product, quantity || 1);
    setShowCart(true);
    setQuantity(1);
  };

  // Remove product
  const removeFromCart = (index) => removeItemByIndex(index);

  // Calculate product price (bulk or normal)
  const productPrice =
    selected && quantity > 0
      ? quantity >= selected.bulkQuantity
        ? selected.bulkPrice * quantity
        : selected.price * quantity
      : 0;

  // Final total
  // total is from shared cart context

  return (
    <div className="container py-5">
      {/* 🔹 Selected Product Section */}
      {selected && (
        <div className="row mb-5">
          <div className="col-md-6">
            <img
              src={selected.image}
              alt={selected.name}
              className="img-fluid rounded mb-3"
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2>{selected.name}</h2>
            <p className="text-muted">{selected.description}</p>
            <h4 className="text-success">
              ₹{selected.price} per {selected.type}
            </h4>

            {/* Quantity Counter */}
            <div className="d-flex align-items-center my-3">
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                –
              </Button>
              <span className="mx-3 fs-5">{quantity}</span>
              <Button
                variant="outline-secondary"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>

            <p className="text-muted">Total : ₹{productPrice}</p>
            {quantity < selected.bulkQuantity ? (
              <p className="text-muted">
                Order above {selected.bulkQuantity} to avail the offer price
              </p>
            ) : (
              <p className="text-success">
                🎉 Hurray!! You are eligible for offer price of ₹
                {selected.bulkPrice} per {selected.type}.
              </p>
            )}

            <Button
              variant="primary"
              className="mt-3"
              onClick={() => addToCart(selected)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      {/* 🔹 Other Products Section */}
      <h3 className="mb-4">Our Products</h3>
      <div className="row">
        {products.map((prod) => (
          <div
            className="col-sm-6 col-lg-3 mb-4"
            key={prod._id}
            onClick={() => {
              setSelected(prod);
              setQuantity(1);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="card h-100 shadow-sm">
              <img src={prod.image} alt={prod.name} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{prod.name}</h5>
                <p className="text-success">₹{prod.price}</p>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(prod);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Cart Offcanvas */}
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
                {cart.map((item, index) => {
                  const unitPrice =
                    item.quantity >= item.bulkQuantity
                      ? item.bulkPrice
                      : item.price;
                  const itemTotal = unitPrice * item.quantity;

                  return (
                    <li
                      key={index}
                      className="list-group-item d-flex flex-column"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.name}</strong>
                          <p className="mb-1 text-muted">
                            {item.quantity} × ₹{unitPrice} = ₹{itemTotal}
                          </p>
                          {item.quantity < item.bulkQuantity ? (
                            <small className="text-muted">
                              Order {item.bulkQuantity - item.quantity} more{" "}
                              {item.type} to get offer price ₹{item.bulkPrice}{" "}
                              per {item.type}.
                            </small>
                          ) : (
                            <small className="text-success">
                              🎉 Bulk offer applied: ₹{item.bulkPrice} per{" "}
                              {item.type}.
                            </small>
                          )}
                        </div>

                        {/* Counter in Cart */}
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(index, Math.max(1, cart[index].quantity - 1))
                            }
                          >
                            –
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateItemQuantity(index, cart[index].quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Remove button */}
                      <div className="text-end mt-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <h5>Total: ₹{total}</h5>
              <Button variant="success" className="w-100 mt-3">
                <Link to="/cart" className="text-white text-decoration-none">
                  Proceed to Checkout
                </Link>
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Products;
