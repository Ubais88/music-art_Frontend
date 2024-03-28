import React, { useEffect, useState } from "react";
import musicIcon from "../../assets/musicIcon.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import styles from "./Navbar.module.css";
import { useAuth } from "../../store/auth";
import { cartLength } from "../../apis/cart/Cart";
import { useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";
import toast from "react-hot-toast";

const Navbar = ({ navData }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [nameLetter, setNameLetter] = useState();
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
    else{
      toast.error(response.message)
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      cartQuantity();
      const name = localStorage.getItem("name");
      if (!name) return "";
      const parts = name.split(" ");
      let initials = parts[0].charAt(0);
      if (parts.length > 1) {
        initials += parts[parts.length - 1].charAt(0);
      } else {
        initials += parts[0].charAt(1) || "";
      }
      setNameLetter(initials.toUpperCase());
    }
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
            style={{cursor: 'pointer'}}
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
              {(navData && navData.model) !== "View Cart" && cartItemCount}
            </span>
          </div>
          {!navData && (
            <div className={styles.profileMain}>
              <div
                className={styles.userName}
                onClick={() => setShowProfile((prev) => !prev)}
              >
                {nameLetter}
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
