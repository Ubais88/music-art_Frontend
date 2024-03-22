import React from "react";
import LaptopCart from "./laptop/LaptopCart";
import MobileCart from "./mobile/MobileCart";
import styles from "./Cart.module.css";
const Cart = () => {
  return (
    <>
      <div className={styles.laptop}>
        <LaptopCart />
      </div>
      <div className={styles.mobile}>
        <MobileCart />
      </div>
    </>
  );
};

export default Cart;
