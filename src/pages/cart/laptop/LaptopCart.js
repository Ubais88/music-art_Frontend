import styles from "./LaptopCart.module.css";
import PreNavbar from "../../../components/preNavbar/PreNavbar";
import Footer from "../../../components/footer/Footer";
import bag from "../../../assets/bag.svg";
import { useState } from "react";
import BackButton from "../../../components/backButton/BackButton";
import Navbar from "../../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { updateCartQuantity } from "../../../apis/cart/Cart";
import { useAuth } from "../../../store/auth";

const Cart = ({ products, setProducts, totalAmount }) => {
  const { BASE_URL, authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [navData, setNavData] = useState({
    brand: "",
    model: "View Cart",
  });

  const handleQuantityChange = (index, productId, event) => {
    const quantity = event.target.value;
    updateCartQuantity(BASE_URL, authorizationToken, quantity, productId);
    const updatedProducts = [...products];
    updatedProducts[index].quantity = quantity;
    setProducts(updatedProducts);
  };
  return (
    <>
      <section className={styles.cartContainer}>
        <PreNavbar />
      </section>
      <main className={styles.main}>
        <section className={styles.section1}>
          <Navbar navData={navData} />
        </section>
        <div className={styles.backButton}>
          <BackButton />
        </div>
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
                      <img src={item.product.images[0]} alt="productImage" />
                      <div className={styles.details}>
                        <span>
                          {item.product.brand} {item.product.model}
                        </span>
                        <span className={styles.color}>
                          Color: {item.product.color}
                        </span>
                        <span>{item.product.available}</span>
                      </div>
                      <div className={styles.price}>
                        <span>Price</span>
                        <span>₹{item.product.price}</span>
                      </div>
                      <div className={styles.quantity}>
                        <span>Quantity</span>
                        <select
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, item.product._id, e)
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((val, index) => (
                            <option key={index} value={val}>
                              {val}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.total}>
                        <span>Total</span>
                        <span>₹{item.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.priceDetails}>
                <div className={styles.details}>
                  <h5>PRICE DETAILS</h5>
                  <div className={styles.priceDetail}>
                    <span>Total MRP</span>
                    <span>₹{totalAmount.totalAmount}</span>
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
                    <span>₹{totalAmount.withConveniencefee}</span>
                  </div>
                  <button
                    className={styles.placeOrderBtn}
                    onClick={() => navigate("/checkout")}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <section className={styles.footer}>
        <Footer />
      </section>
    </>
  );
};

export default Cart;
