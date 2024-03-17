import React from "react";
import styles from "./Product.module.css";
import imgCart from "../../assets/imgCart.svg";

const Product = ({ item, view }) => {
  return (
    <>
      {view === "grid" ? (
        <div className={styles.productItem}>
          <div className={styles.imageWrapper}>
            <img src={imgCart} alt="cartImg"/>
            <img src={item.images[0]} alt="headphoneIcon" />
          </div>
          <div className={styles.productInfo}>
            <span className={styles.productName}>
              {item.brand} {item.model}
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
            <img src={imgCart} alt="cart icon" className={styles.cartProductImg} />
          </div>

          <div className={styles.productListInfo}>
            <span className={styles.productListName}>
              {item.brand} {item.model}
            </span>
            <span className={styles.productListPrice}>Price - ₹ {item.price}</span>
            <span className={styles.productListDetails}>
              {item.color} | {item.headphoneType}
            </span>
            <span className={styles.productListDescription}>
              {item.shortDescription}
            </span>
            <button className={styles.detailsButton}>Details</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
