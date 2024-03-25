import React from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/CheckOut";
import OrderSuccess from "./pages/orderSuccess/OrderSucess";
import Invoices from "./pages/invoices/Invoices";
import Auth from "./pages/auth/Auth";

const App = () => {
  return (
    <div>
    <Auth/>
      {/* <Dashboard /> */}
      {/* <ProductDetails/> */}
      {/* <Cart/> */}
      {/* <Checkout/> */}
      {/* <OrderSuccess/> */}
      {/* <Invoices/> */}
    </div>
  );
};

export default App;
