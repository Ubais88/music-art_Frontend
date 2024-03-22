import React from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import loginUser from "../../assets/loginuser.png";
import loginVector from "../../assets/loginVector.png";
import styles from "./MobFooter.module.css";
import { CiUser } from "react-icons/ci";

const MobFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerItem}>
        <GoHome color="#2E0052" size={30} />
        <span>Home</span>
      </div>
      <div className={styles.footerItem}>
        <div className={styles.cartContainer}>
          <MdOutlineAddShoppingCart color="#2E0052" size={30} />
          <span className={styles.cartQuantity}>12</span>
        </div>
        <span>Cart</span>
      </div>
      <div className={styles.footerItem}>
        {true ? (
          <img
            src={loginVector}
            alt="mobilefooter"
            className={styles.userIcon}
          />
        ) : (
          <img src={loginUser} alt="mobilefooter" className={styles.userIcon} />
        )}
        <span>Login</span>
      </div>
    </div>
  );
};

export default MobFooter;
