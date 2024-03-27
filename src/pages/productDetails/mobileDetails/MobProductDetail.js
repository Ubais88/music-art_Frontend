import React from "react";
import styles from "./MobileProductDetail.module.css";
import MobFooter from "../../../components/mobFooter/MobFooter";
import { FaStar } from "react-icons/fa";
import MobileSearch from "../../../components/mobileSearch/MobileSearch";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MobProductDetail = ({ product, buyNowHandler, addToCartHandler }) => {
  const navigate = useNavigate();

  return (
    <>
      <MobileSearch />
      <div className={styles.container}>
        <div className={styles.backArrow} onClick={() => navigate("/")}>
          <IoMdArrowRoundBack size={30} />
        </div>
        <button
          className={styles.buybtn}
          onClick={() => buyNowHandler(product._id)}
        >
          Buy Now
        </button>

        {product === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={styles.carousel}>
              <Carousel showThumbs={false}>
                {product.images.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`slide-${index}`} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className={styles.detailContainer}>
              <h1 className={styles.title}>
                {product.brand} {product.model}
              </h1>
              <div className={styles.ratingBox}>
                {[...Array(parseInt(product.rating))].map((_, index) => (
                  <FaStar color="#FFD600" key={index} size={25} />
                ))}
                <span>({product.reviewCount} Customer reviews)</span>
              </div>
              <div className={styles.productDesc}>
                {product.shortDescription}
              </div>
              <span className={styles.price}>Price-₹{product.price}</span>
              <span className={styles.colorType}>
                {product.color} | {product.headphoneType}
              </span>
              <div className={styles.productAbout}>
                <span>About this item</span>
                <ul>
                  {product.about.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.availableAndBrand}>
                <div>
                  <span>Available -</span>
                  <span> {product.available}</span>
                </div>
                <div>
                  <span>Brand -</span>
                  <span> {product.brand}</span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={styles.buttons}>
          <button onClick={addToCartHandler}>Add to cart</button>
          <button onClick={() => buyNowHandler(product._id)}>Buy Now</button>
        </div>
      </div>
      <div className={styles.footer}>
        <MobFooter />
      </div>
    </>
  );
};

export default MobProductDetail;
