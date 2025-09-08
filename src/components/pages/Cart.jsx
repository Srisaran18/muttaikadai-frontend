import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  // adjust names to match your context
  const { items: cart, updateItemQuantity, removeItemByIndex } = useCart();

  const getItemUnitPrice = (item) =>
    item.quantity >= item.bulkQuantity ? item.bulkPrice : item.price;

  const getItemTotal = (item) => getItemUnitPrice(item) * item.quantity;

  const subtotal =
    cart?.reduce((sum, item) => sum + getItemTotal(item), 0) || 0;

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left: Cart Items */}
        <div className="col-md-8">
          <h4 className="mb-4">Shopping Cart</h4>

          {!cart || cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="list-group">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center py-3"
                >
                  <input type="checkbox" className="form-check-input me-3" />

                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    width="80"
                    height="80"
                    className="me-3 rounded"
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateItemQuantity(
                            index,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        –
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          updateItemQuantity(index, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-end">
                    <p className="fw-bold mb-1">₹{getItemTotal(item)}</p>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeItemByIndex(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart && cart.length > 0 && (
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-primary">
                Continue Shopping
              </button>
              <button className="btn btn-outline-secondary">Update Cart</button>
            </div>
          )}
        </div>

        {/* Right: Cart Summary */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Cart Summary</h5>

            <div className="mb-2 d-flex justify-content-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <span>
                Coupon Discount{" "}
                <a href="/" className="text-primary">
                  Apply Coupon
                </a>
              </span>
              <span>₹0</span>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <span>Delivery Charges</span>
              <span>₹0</span>
            </div>

            <div className="mb-2 d-flex justify-content-between">
              <span>Tax</span>
              <span>₹0</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Grand Total</span>
              <span>₹{subtotal}</span>
            </div>

            <button className="btn btn-dark w-100 mt-3">
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
