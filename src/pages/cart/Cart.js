import React, { useEffect, useState } from "react";
import LaptopCart from "./laptop/LaptopCart";
import MobileCart from "./mobile/MobileCart";
import styles from "./Cart.module.css";
import { useAuth } from "../../store/auth";
import { cartProducts } from "../../apis/cart/Cart";

const Cart = () => {
  const { BASE_URL, authorizationToken } = useAuth();
  const [products, setProducts] = useState(null);
  const [totalAmount, setTotalAmount] = useState({
    totalAmount: "",
    withConveniencefee: "",
  });

  const userCart = async () => {
    const response = await cartProducts(BASE_URL, authorizationToken);
    setProducts(response.cart);
    setTotalAmount({
      totalAmount: response.totalAmount,
      withConveniencefee: response.withConveniencefee,
    });
  };
  useEffect(() => {
    userCart();
  }, []);

  return (
    <>
      <div className={styles.laptop}>
        <LaptopCart
          userCart={userCart}
          products={products}
          setProducts={setProducts}
          totalAmount={totalAmount}
        />
      </div>
      <div className={styles.mobile}>
        <MobileCart
          userCart={userCart}
          products={products}
          setProducts={setProducts}
          totalAmount={totalAmount}
        />
      </div>
    </>
  );
};

export default Cart;
