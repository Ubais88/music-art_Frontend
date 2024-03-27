import React, { useEffect, useState } from "react";
import musicIcon from "../../assets/musicIcon.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from "./Navbar.module.css";
import { useAuth } from "../../store/auth";
import { cartLength } from "../../apis/cart/Cart";
import { useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";

const Navbar = ({ navData }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const {
    BASE_URL,
    authorizationToken,
    isLoggedIn,
    cartItemCount,
    setCartItemCount,
  } = useAuth();

  const cartQuantity = async () => {
    const response = await cartLength(BASE_URL, authorizationToken);
    if (response.status === 200) {
      setCartItemCount(response.data.cartLength);
    }
  };

  useEffect(() => {
    cartQuantity();
  }, []);

  const cartHandler = () => {
    navigate("/cart");
  };

  return (
    <>
      <div className={styles.logoWrapper}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
        <a className={styles.navLink}>Home</a>
        {!navData ? (
          <a
            className={styles.navLink}
            onClick={() => navigate("/my-invoices")}
          >
            Invoice
          </a>
        ) : (
          <a className={styles.navLink} style={{ marginLeft: "0" }}>
            /{navData.brand} {navData.model}
          </a>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.cartContainer}>
          <div className={styles.cartWrapper} onClick={cartHandler}>
            <MdOutlineShoppingCart size={35} />
            <span>
              View Cart{" "}
              {(navData && navData.brand) !== "view Cart" && cartItemCount}
            </span>
          </div>
          {!navData && (
            <div className={styles.profileMain}>
              <div
                className={styles.userName}
                onClick={() => setShowProfile((prev) => !prev)}
              >
                UB
              </div>
              {showProfile && (
                <div className={styles.profileModal}>
                  <Profile />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
