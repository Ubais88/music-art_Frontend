import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/CheckOut";
import OrderSuccess from "./pages/orderSuccess/OrderSucess";
import Invoices from "./pages/invoices/Invoices";
import Auth from "./pages/auth/Auth";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      {/* <ProductDetails/> */}
      {/* <Cart/> */}
      {/* <Checkout/> */}
      {/* <OrderSuccess/> */}
      {/* <Invoices/> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderplaced/success" element={<OrderSuccess />} />
        <Route path="/my-invoices" element={<Invoices />} />
        <Route path="/view-invoice/:orderId" element={<Checkout />} />
        <Route path="/checkout/:productId" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
