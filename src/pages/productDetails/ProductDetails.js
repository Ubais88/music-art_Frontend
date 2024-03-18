import styles from "./ProductDetails.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import musicIcon from "../../assets/musicIcon.svg";
import cart from "../../assets/cart.svg";
import starImage from "../../assets/star.svg";
import { useEffect, useState } from "react";
import products from "../../products.json";
import Navbar from "../../components/navbar/Navbar";

const ProductDetails = () => {
  const [login, setLogin] = useState(true);
  const [product, setProduct] = useState(null);
  const [navData, setNavData] = useState({
    brand: "",
    model: "",
  });

  useEffect(() => {
    setProduct(products.data[0]);
    setNavData({
      brand: products.data[0].brand,
      model: products.data[0].model,
    });
  }, []);

  return (
    <>
      <section className={styles.preNavbar}>
        <PreNavbar />
      </section>
      <div className={styles.productDetailsContainer}>
        <section className={styles.productInfoSection}>
          <Navbar navData={navData} />
        </section>
        <button className={styles.backToProductsBtn}>Back to products</button>
        {product === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={styles.productDescription}>
              {product.shortDescription}
            </div>
            <section className={styles.productSection}>
              <div className={styles.imageBox}>
                <img src={product.images[0]} alt="headphoneIcon" />
                <div className={styles.smallImages}>
                  <img src={product.images[1]} alt="headphoneIcon" />
                  <img src={product.images[2]} alt="headphoneIcon" />
                  <img src={product.images[3]} alt="headphoneIcon" />
                </div>
              </div>
              <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>
                  {product.brand} {product.model}
                </h1>
                <div className={styles.ratingBox}>
                  {[0, 1, 2, 3].map((item) => (
                    <img key={item} src={starImage} alt="starIcon" />
                  ))}
                  <span>({product.reviewCount} Customer reviews)</span>
                </div>
                <span className={styles.price}>Price-₹{product.price}</span>
                <span className={styles.details}>
                  {product.color} | {product.headphoneType}
                </span>
                <div className={styles.aboutProduct}>
                  <span>About this item</span>
                  <ul>
                    {product.shortDescription.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.productAttributes}>
                  <div className={styles.stockBrand}>
                    <span>Available -</span>
                    <span> {product.available}</span>
                  </div>
                  <div className={styles.stockBrand}>
                    <span>Brand -</span>
                    <span> {product.brand}</span>
                  </div>
                </div>
                  <div className={styles.buttons}>
                    <button>Add to cart</button>
                    <button>Buy Now</button>
                  </div>
                
              </div>
            </section>
          </>
        )}
      </div>
      <section className={styles.footer}>
        <Footer />
      </section>
    </>
  );
};

export default ProductDetails;
