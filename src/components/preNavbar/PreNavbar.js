import React, { useState } from "react";
import styles from "./PreNavbar.module.css";
import { TbPhoneCall } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const PreNavbar = () => {
  const { isLoggedIn, setLogin, LogoutUser } = useAuth();

  const navigate = useNavigate();

  const loginHandler = () => {
    setLogin(true);
    navigate("/auth");
  };

  const logoutHandler = () => {
    setLogin(false);
    navigate("/auth");
  };

  const logoutClickHandler = () => {
    LogoutUser();
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.contactInfo}>
        <TbPhoneCall size={20} />
        <span>{localStorage.getItem("mobile") || "912121131313"}</span>
      </div>
      <div className={styles.promotion}>
        <span>Get 50% off on selected items | Shop Now</span>
      </div>
      <div className={styles.auth}>
        {isLoggedIn ? (
          <button className={styles.logoutButton} onClick={logoutClickHandler}>
            Logout
          </button>
        ) : (
          <>
            <a className={styles.authLink} onClick={loginHandler}>
              Login
            </a>{" "}
            |{" "}
            <a className={styles.authLink} onClick={logoutHandler}>
              Signup
            </a>
          </>
        )}
      </div>
    </header>
  );
};

export default PreNavbar;
