import React from "react";
import styles from "./Product.module.css";
import imgCart from "../../assets/imgCart.svg";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../apis/cart/Cart";
import toast from "react-hot-toast";

const Product = ({ item, view }) => {
  const navigate = useNavigate();
  const { BASE_URL, authorizationToken, isLoggedIn, setCartItemCount } =
    useAuth();

  const addToCartHandler = async (productId) => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }

    try {
      const response = await addToCart(BASE_URL, authorizationToken, productId);

      if (response && response.success) {
        toast.success(response.message);
        setCartItemCount((prev) => prev + 1);
      } else {
        toast.error(response.message || "Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again later.");
    }
  };

  const handleProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  return (
    <>
      {view === "grid" ? (
        <div className={styles.productItem}>
          <div className={styles.imageWrapper}>
            <img
              src={imgCart}
              alt="cartImg"
              onClick={() => addToCartHandler(item._id)}
            />
            <img
              src={item.images[0]}
              alt="headphoneIcon"
              onClick={() => handleProductDetails(item._id)}
            />
          </div>
          <div className={styles.productInfo}>
            <span className={styles.productName}>
              {item.productName}
            </span>
            <span className={styles.productPrice}>Price-₹ {item.price}</span>
            <span className={styles.productDetails}>
              {item.color} | {item.headphoneType}
            </span>
          </div>
        </div>
      ) : (
        <div className={styles.listProduct}>
          <div className={styles.listProductImage}>
            <img src={item.images[0]} alt="headphoneIcon" />
            <img
              src={imgCart}
              alt="cart icon"
              className={styles.cartProductImg}
              onClick={() => addToCartHandler(item._id)}
            />
          </div>

          <div className={styles.productListInfo}>
            <span className={styles.productListName}>
              {item.productName}
            </span>
            <span className={styles.productListPrice}>
              Price - ₹ {item.price}
            </span>
            <span className={styles.productListDetails}>
              {item.color} | {item.headphoneType}
            </span>
            <span className={styles.productListDescription}>
              {item.shortDescription}
            </span>
            <button
              className={styles.detailsButton}
              onClick={() => handleProductDetails(item._id)}
            >
              Details
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
