import React, { useEffect } from "react";
import musicIcon from "../../assets/musicIcon.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from "./Navbar.module.css";
import { useAuth } from "../../store/auth";
import { cartLength } from "../../apis/cart/Cart";

const Navbar = ({ navData }) => {
  const {  BASE_URL, authorizationToken ,isLoggedIn, cartItemCount , setCartItemCount } = useAuth();

  const cartQuantity = async () => {
    const response = await cartLength( BASE_URL, authorizationToken);
    if (response.status === 200) {
      setCartItemCount(response.data.cartLength);
    }
  };

  useEffect(() => {
    cartQuantity();
  }, []);
  return (
    <>
      <div className={styles.logoWrapper}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
        <a className={styles.navLink}>Home</a>
        {!navData ? (
          <a className={styles.navLink}>Invoice</a>
        ) : (
          <a className={styles.navLink} style={{ marginLeft: "0" }}>
            /{navData.brand} {navData.model}
          </a>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.cartContainer}>
          <div className={styles.cartWrapper}>
            <MdOutlineShoppingCart size={35} />
            <span>View Cart {cartItemCount}</span>
          </div>
          {!navData && <div className={styles.userName}>UB</div>}
        </div>
      )}
    </>
  );
};

export default Navbar;
