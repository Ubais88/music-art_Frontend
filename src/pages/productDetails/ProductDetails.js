import styles from "./ProductDetails.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MobProductDetail from "./mobileDetails/MobProductDetail";
import { useAuth } from "../../store/auth";
import { productDetails } from "../../apis/product/Product";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../apis/cart/Cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    BASE_URL,
    authorizationToken,
    isLoggedIn,
    setCartItemCount,
    setOrderFromCart,
  } = useAuth();
  const [product, setProduct] = useState(null);
  const [navData, setNavData] = useState("");

  const productDetailsFetch = async () => {
    const response = await productDetails(BASE_URL, productId);
    if (response.success) {
      setProduct(response.productdetails);
      setNavData(response.productdetails.productName);
      setSelectedImage(response.productdetails.images[0]);
    } else {
      console.log("add toast in details", response);
    }
  };

  useEffect(() => {
    productDetailsFetch();
  }, []);

  const addToCartHandler = async () => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      const response = await addToCart(BASE_URL, authorizationToken, productId);
      if (response.status === 200) {
        toast.success(response.data.message);
        setCartItemCount((prev) => prev + 1);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const buyNowHandler = (productId) => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      setOrderFromCart(false);
      navigate(`/checkout/${productId}`);
    }
  };

  return (
    <>
      <div className={styles.mobileDetailsFile}>
        <MobProductDetail
          product={product}
          addToCartHandler={addToCartHandler}
          buyNowHandler={buyNowHandler}
        />
      </div>
      <div className={styles.mainContainer}>
        <section className={styles.preNavbar}>
          <PreNavbar />
        </section>
        <div className={styles.productDetailsContainer}>
          <section className={styles.productInfoSection}>
            <Navbar navData={navData} />
          </section>
          <button
            className={styles.backToProductsBtn}
            onClick={() => navigate("/")}
          >
            Back to products
          </button>
          {product === null ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <div className={styles.productDescription}>
                {product.shortDescription}
              </div>
              <section className={styles.productSection}>
                <div className={styles.imageBox}>
                  <img src={selectedImage} alt="headphoneIcon" />
                  <div className={styles.smallImages}>
                    {product.images.map(
                      (image, index) =>
                        selectedImage !== image && (
                          <img
                            key={index}
                            src={image}
                            alt="headphoneIcon"
                            onClick={() => setSelectedImage(image)}
                          />
                        )
                    )}
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h1 className={styles.productTitle}>
                    {product.productName}
                  </h1>
                  <div className={styles.ratingBox}>
                    {[...Array(parseInt(product.rating))].map((_, index) => (
                      <FaStar color="#FFD600" key={index} size={25} />
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
                      {product.about.map((item, index) => (
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
                    <button onClick={addToCartHandler}>Add to cart</button>
                    <button onClick={() => buyNowHandler(product._id)}>
                      Buy Now
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
        <section className={styles.footer}>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default ProductDetails;
