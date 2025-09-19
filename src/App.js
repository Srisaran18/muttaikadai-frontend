import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/pages/Home";
// import Test from "./components/pages/Test";
import Cart from "./components/pages/Cart";
import UserProfile from "./components/pages/UserProfile";
import AdminPage from "./components/admin/AdminPage";
import Orders from "./components/admin/Orders";
// import ContactMessages from "./components/admin/ContactMessages";
import MyOrders from "./components/pages/MyOrders";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Header from "./components/menus/Header";
import Footer from "./components/menus/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ManageUsers from "./components/admin/ManageUsers";
// import SalesGraph from "./components/admin/SalesGraph";
import Products from "./components/pages/Products";
import ManageProducts from "./components/admin/ManageProducts";
import PageNotFound from "./components/pages/PageNotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <div className="App">
              <Header />
              <div className="app-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/products/:id" element={<Products />} />
                  <Route path="/products/" element={<Products />} />
                  <Route path="*" element={<PageNotFound />} />
                  {/* <Route path="/home" element={<Test />} /> */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/userProfile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/myOrders"
                    element={
                      <ProtectedRoute>
                        <MyOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/adminPage"
                    element={
                      <AdminRoute>
                        <AdminPage />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <AdminRoute>
                        <Orders />
                      </AdminRoute>
                    }
                  />
                  {/* <Route
                    path="/admin/contacts"
                    element={
                      <AdminRoute>
                        <ContactMessages />
                      </AdminRoute>
                    }
                  /> */}
                  <Route
                    path="/admin/manageUsers"
                    element={
                      <AdminRoute>
                        <ManageUsers />
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/admin/manage-products"
                    element={
                      <AdminRoute>
                        <ManageProducts />
                      </AdminRoute>
                    }
                  />
                  {/* <Route
                    path="/admin/salesGraph"
                    element={
                      <AdminRoute>
                        <SalesGraph />
                      </AdminRoute>
                    }
                  /> */}
                  <Route path="/" element={<Navigate to="/home" />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
