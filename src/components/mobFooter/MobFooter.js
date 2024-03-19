import React from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import loginUser from "../../assets/loginuser.png";
import styles from "./MobFooter.module.css";

const MobFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerItem}>
        <GoHome color="#2E0052" size={30}/>
        <span>Home</span>
      </div>
      <div className={styles.footerItem}>
        <div>
          <MdOutlineAddShoppingCart color="#2E0052" size={30} />
        </div>
        <span>Cart</span>
      </div>
      <div className={styles.footerItem}>
        <img src={loginUser} alt="mobilefooter" className={styles.userIcon} />
        <span>Login</span>
      </div>
    </div>
  );
};

export default MobFooter;
