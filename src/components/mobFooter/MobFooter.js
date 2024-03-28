import React, { useState } from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import loginUser from "../../assets/loginuser.png";
import loginVector from "../../assets/loginVector.png";
import styles from "./MobFooter.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import invoice from "../../assets/mobInvoice.png";

const MobFooter = () => {
  const navigate = useNavigate();
  const { isLoggedIn, LogoutUser, cartItemCount , selectedItem, setSelectedItem } = useAuth();

  const logoutHandler = () => {
    LogoutUser();
  };

  const loginHandler = () => {
    navigate("/auth");
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.footerItem} ${
          selectedItem === "home" && styles.selected
        }`}
        onClick={() => {
          navigate("/");
          setSelectedItem("home");
        }}
      >
        <div
          className={`${selectedItem === "home" ? styles.border : ""}`}
        ></div>
        <div className={styles.iconHeader}>
          <GoHome color="#2E0052" size={30} />
          <span>Home</span>
        </div>
      </div>
      <div
        className={`${styles.footerItem}`}
        onClick={() => {
          navigate("/cart");
          setSelectedItem("cart");
        }}
      >
        <div
          className={`${selectedItem === "cart" ? styles.border : ""}`}
        ></div>
        <div className={styles.iconHeader}>
          <div className={styles.cartContainer}>
            <MdOutlineAddShoppingCart color="#2E0052" size={30} />
            <span className={styles.cartQuantity}>{cartItemCount}</span>
          </div>
          <span>Cart</span>
        </div>
      </div>
      <div
        className={`${styles.footerItem}`}
        onClick={() => {
          navigate("/my-invoices");
          setSelectedItem("invoice");
        }}
      >
        <div
          className={`${selectedItem === "invoice" ? styles.border : ""}`}
        ></div>
        <div className={styles.iconHeader}>
          <div className={styles.authMain}>
            <img
              src={invoice}
              alt="mobileinvoice"
              className={styles.userIcon}
            />
            <span>Invoice</span>
          </div>
        </div>
      </div>
      <div
        className={`${styles.footerItem}`}
        onClick={() => {
          isLoggedIn ? logoutHandler() : loginHandler();
          setSelectedItem("login");
        }}
      >
        <div
          className={`${selectedItem === "login" ? styles.border : ""}`}
        ></div>
        <div className={styles.iconHeader}>
          {isLoggedIn ? (
            <div className={styles.authMain}>
              <img
                src={loginVector}
                alt="mobilefooter"
                className={styles.userIcon}
              />
              <span>Logout</span>
            </div>
          ) : (
            <div className={styles.authMain}>
              <img
                src={loginUser}
                alt="mobilefooter"
                className={styles.userIcon}
              />
              <span>Login</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobFooter;
