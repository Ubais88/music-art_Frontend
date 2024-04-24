import React from "react";
import ProtectedRoute from "./ProtectedRoute.js";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/CheckOut";
import OrderSuccess from "./pages/orderSuccess/OrderSucess";
import Invoices from "./pages/invoices/Invoices";
import Auth from "./pages/auth/Auth";
import { Route, Routes } from "react-router-dom";
import Component from "./Component.js"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderplaced/success" element={<OrderSuccess />} />
          <Route path="/my-invoices" element={<Invoices />} />
          <Route path="/view-invoice/:orderId" element={<Checkout />} />
          <Route path="/checkout/:productId" element={<Checkout />} />
          <Route path="/new" element={<Component />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
