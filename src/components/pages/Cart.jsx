import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { items: cart, removeItemByIndex, updateItemQuantity, total } = useCart();

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item, index) => {
              const unitPrice = item.quantity >= item.bulkQuantity ? item.bulkPrice : item.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <li key={index} className="list-group-item d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.name}</strong>
                      <p className="mb-1 text-muted">
                        {item.quantity} × ₹{unitPrice} = ₹{itemTotal}
                      </p>
                      {item.quantity < item.bulkQuantity ? (
                        <small className="text-muted">
                          Order {item.bulkQuantity - item.quantity} more {item.type} to get offer price ₹{item.bulkPrice} per {item.type}.
                        </small>
                      ) : (
                        <small className="text-success">🎉 Bulk offer applied: ₹{item.bulkPrice} per {item.type}.</small>
                      )}
                    </div>

                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateItemQuantity(index, Math.max(1, item.quantity - 1))}
                      >
                        –
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateItemQuantity(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-end mt-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItemByIndex(index)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Total: ₹{total}</h5>
            <button className="btn btn-success" disabled={cart.length === 0}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
