import React from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import loginUser from "../../assets/loginuser.png";
import loginVector from "../../assets/loginVector.png";
import styles from "./MobFooter.module.css";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const MobFooter = () => {
  const navigate = useNavigate();
  const { isLoggedIn, LogoutUser, cartItemCount } = useAuth();

  const logoutHandler = () => {
    LogoutUser();
  };
  const loginHandler = () => {
    navigate("/auth");
  };

  return (
    <div className={styles.container}>
      <div className={styles.footerItem} onClick={() => navigate("/")}>
        <GoHome color="#2E0052" size={30} />
        <span>Home</span>
      </div>
      <div className={styles.footerItem}>
        <div className={styles.cartContainer} onClick={() => navigate("/cart")}>
          <MdOutlineAddShoppingCart color="#2E0052" size={30} />
          <span className={styles.cartQuantity}>{cartItemCount}</span>
        </div>
        <span>Cart</span>
      </div>
      <div className={styles.footerItem}>
        {isLoggedIn ? (
          <div className={styles.authMain} onClick={logoutHandler}>
            <img
              src={loginVector}
              alt="mobilefooter"
              className={styles.userIcon}
            />
            <span>Logout</span>
          </div>
        ) : (
          <div className={styles.authMain} onClick={loginHandler}>
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
  );
};

export default MobFooter;
