import styles from "./LaptopCart.module.css";
import PreNavbar from "../../../components/preNavbar/PreNavbar";
import Footer from "../../../components/footer/Footer";
import bag from "../../../assets/bag.svg";
import { useState, useEffect } from "react";
import Products from "../../../products.json";
import BackButton from "../../../components/backButton/BackButton";
import Navbar from "../../../components/navbar/Navbar";

const Cart = () => {
  const [products, setProducts] = useState(null);
  const [navData, setNavData] = useState({
    brand: "",
    model: "",
  });
  useEffect(() => {
    setProducts([Products.data[0]]);
    setNavData({
        brand: "",
        model: "View Cart",
      });
  },[]);
  console.log(products);

  return (
    <>
      <section className={styles.cartContainer}>
        <PreNavbar />
      </section>
      <main className={styles.main}>
        <section className={styles.section1}>
        <Navbar navData={navData} />
        </section>
        <BackButton className={styles.backButton} />
        <section className={styles.section2}>
          <title className={styles.title}>
            <img src={bag} alt="cartbagicon" />
            <span>My Cart</span>
          </title>
          {products === null || products.length === 0 ? (
            <center
              style={{ marginTop: "10vh", fontWeight: "500", fontSize: "3vw" }}
            >
              <h1>Cart Empty</h1>
            </center>
          ) : (
            <div className={styles.cartItems}>
              <div className={styles.productList}>
                {products.map((item, index) => (
                  <div className={styles.product} key={index}>
                    <div className={styles.productInfo}>
                      <img src={item.images[0]} alt="productImage" />
                      <div className={styles.details}>
                        <span>
                          {item.brand} {item.model}
                        </span>
                        <span className={styles.color}>Color: {item.color}</span>
                        <span>{item.available}</span>
                      </div>
                      <div className={styles.price}>
                        <span>Price</span>
                        <span>₹{item.price}</span>
                      </div>
                      <div className={styles.quantity}>
                        <span>Quantity</span>
                        <select name="quantity">
                          <option value={item.quantity} selected hidden>
                            {item.quantity}
                          </option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((val) => (
                            <option key={val} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.total}>
                        <span>Total</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.priceDetails}>
                <div>
                  <h5>PRICE DETAILS</h5>
                  <div className={styles.priceDetail}>
                    <span>Total MRP</span>
                    <span>
                      ₹
                      {products.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <div className={styles.priceDetail}>
                    <span>Discounts on MRP</span>
                    <span>₹0</span>
                  </div>
                  <div className={styles.priceDetail}>
                    <span>Convenience Fee</span>
                    <span>₹45</span>
                  </div>
                </div>
                <div className={styles.totalAmount}>
                  <div className={styles.amountFormat}>
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {products.reduce(
                        (acc, item) => (acc += item.price * item.quantity),
                        0
                      ) + 45}
                    </span>
                  </div>
                  <button className={styles.placeOrderBtn}>PLACE ORDER</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Cart;
