import styles from "./CheckOut.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import Products from "../../products.json"
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BackButton from '../../components/backButton/BackButton'

const CheckOut = () => {
  const [products, setProducts] = useState(null);
  const [amount, setAmount] = useState(null);
  const [orderfrom , setOrderForm] = useState("cart")
  const [navData, setNavData] = useState({
    brand: "",
    model: "",
  });

  useEffect(() => {
    setProducts([Products.data[0]]);
    setNavData({
        brand: "",
        model: "Checkout",
      });
  }, []);

  return (
    <>
      <PreNavbar />
      <div className={styles.checkoutContainer}>
        <section className={styles.productInfoSection}>
          <Navbar navData={navData}  />
        </section>
        <BackButton/>
        <h2 className={styles.checkoutHeader}>Checkout</h2>
        <main className={styles.main}>
          <div className={styles.checkoutSteps}>
            <div className={styles.deliveryStep}>
              <span>1. Delivery address</span>
              <span>
                Akash Patel <br />
                104 <br />
                kk hh nagar, Lucknow <br />
                Uttar Pradesh 226025
              </span>
            </div>
            <div className={styles.paymentStep}>
              <span>2. Payment method</span>
              <span>Pay on delivery(Cash/Card)</span>
            </div>
            <div className={styles.reviewStep}>
              <span>3. Review items and delivery</span>
              <div>
                {products === null ? (
                  <h1>Loading...</h1>
                ) : orderfrom === "cart" ? (
                  products.map((item, index) =>  (
                      <div key={index} className={styles.product}>
                        <img
                          src={item.images[0]}
                          alt="headphoneIcon"
                          className={styles.productImage}
                        />
                        <span className={styles.productDetails}>
                          {item.brand}{" "}
                          {item.model}
                        </span>
                        <span className={styles.productDetails}>Colour: {item.color}</span>
                        <span className={styles.productDetails}>{item.availale}</span>
                        <span className={styles.productDetails}>Estimated delivery:</span>
                        <span className={styles.productDetails}>Monday-FREE Standard Delivery</span>
                      </div>
                    ))
                ) : (
                  <div className={styles.product}>
                    <img src={products.images[0]} alt="headphoneIcon" className={styles.productImage} />
                    <span className={styles.productDetails}>
                      {products.brand} {products.model}
                    </span>
                    <span className={styles.productDetails}>Colour: {products.color}</span>
                    <span className={styles.productDetails}>{products.availale}</span>
                    <span className={styles.productDetails}>Estimated delivery:</span>
                    <span className={styles.productDetails}>Monday-FREE Standard Delivery</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.orderSummary}>
            <button className={styles.placeOrderButton}>Place your order</button>
            <span>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </span>
            <div className={styles.summary}>
              <h5>Order Summary</h5>
              <div className={styles.summaryItem}>
                <span>Item:</span>
                <span>₹{amount !== null ? amount.toFixed(2) : ""}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Delivery:</span>
                <span>₹45.00</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Order Total:</span>
                <span>₹{amount !== null ? (amount + 45).toFixed(2) : ""}</span>
              </div>
            </div>
          </div>
        </main>
        <div className={styles.orderDetails}>
          <button className={styles.placeOrderButton}>Place your order</button>
          <div className={styles.orderDetailsContent}>
            <span>
              Order Total : ₹{amount !== null ? (amount + 45).toFixed(2) : ""}
            </span>
            <span>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </span>
          </div>
        </div>
      </div>
      <section className={styles.footerSection}>
        <Footer />
      </section>
    </>
  );
};

export default CheckOut;
