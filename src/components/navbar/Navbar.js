import React from "react";
import musicIcon from "../../assets/musicIcon.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from "./Navbar.module.css";

const Navbar = ({ navData }) => {
  return (
    <>
      <div className={styles.logoWrapper}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
        <a className={styles.navLink}>
          Home
        </a>
        {!navData ? (
          <a className={styles.navLink}>
            Invoice
          </a>
        ) : (
          <a className={styles.navLink} style={{marginLeft:'0'}}>
            /{navData.brand}{" "}
            {navData.model}
          </a>
        )}
      </div>
      <div className={styles.cartContainer}>
        <div className={styles.cartWrapper}>
          <MdOutlineShoppingCart size={35} />
          <span>View Cart</span> 8
        </div>
        {!navData && <div className={styles.userName}>UB</div>}
      </div>
    </>
  );
};

export default Navbar;
