import React, { useEffect, useState } from "react";
import styles from "./MobileProductDetail.module.css";
import MobFooter from "../../../components/mobFooter/MobFooter";
import { FaStar } from "react-icons/fa";
import products from "../../../products.json";
import MobileSearch from "../../../components/mobileSearch/MobileSearch";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MobProductDetail = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(products.data[0]);
  }, []);

  return (
    <>
      <MobileSearch />
      <div className={styles.container}>
        {/* <div className={styles.backArrow}>
          <img src={backIcon} alt="backArrow" />
        </div> */}
        <div className={styles.backArrow}>
          <IoMdArrowRoundBack size={30}/>
        </div>
        <button className={styles.buybtn}>Buy Now</button>

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
                {[0, 1, 2, 3].map((index) => (
                  <FaStar key={index} color="#FFD600" size={25} />
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
                  {product.shortDescription.map((item, index) => (
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
          <button>Add to cart</button>
          <button>Buy Now</button>
        </div>
      </div>
      <div className={styles.footer}>
        <MobFooter />
      </div>
    </>
  );
};

export default MobProductDetail;
