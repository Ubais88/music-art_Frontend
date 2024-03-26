import styles from "./CheckOut.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import Products from "../../products.json";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BackButton from "../../components/backButton/BackButton";
import MobNavbar from "../../components/mobNavbar/MobNavbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import MobFooter from "../../components/mobFooter/MobFooter";
import { cartProducts } from "../../apis/cart/Cart";

const CheckOut = () => {
  const navigate = useNavigate();
  const { BASE_URL, authorizationToken, isLoggedIn, setCartItemCount } =
    useAuth();
  const [products, setProducts] = useState(null);
  const [amount, setAmount] = useState(null);
  const [invoicefrom, setInvoiceForm] = useState(true);
  const [navData, setNavData] = useState({
    brand: "",
    model: "",
  });

  const userCart = async () => {
    const response = await cartProducts(BASE_URL, authorizationToken);

    setProducts(response.cart);
    setTotalAmount({
      totalAmount: response.totalAmount,
      withConveniencefee: response.withConveniencefee,
    });
    setNavData({
      brand: "view Cart",
      model: "",
    });
  };

  useEffect(() => {
    userCart();
  }, []);

  useEffect(() => {
    setProducts([Products.data[0]]);
    setNavData({
      brand: "",
      model: "Checkout",
    });
  }, []);
  console.log("products", products);

  return (
    <>
      <div className={styles.preNavbar}>
        <PreNavbar />
      </div>
      <div className={styles.MobNavbar}>
        <MobNavbar />
      </div>
      <div className={styles.backArrow}>
        <IoMdArrowRoundBack size={30} />
      </div>

      <div className={styles.checkoutContainer}>
        <section className={styles.productInfoSection}>
          <Navbar navData={navData} />
        </section>
        <div className={styles.backbutton}>
          <BackButton />
        </div>

        <h2 className={styles.checkoutHeader}>
          {invoicefrom ? "Invoice" : "Checkout"}
        </h2>

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
              <div className={styles.dropDownWrapper}>
                {invoicefrom ? (
                  <h3>Payemnt</h3>
                ) : (
                  <select className={styles.dropDown}>
                    <option value="">Mode of payment</option>
                    <option value="">Pay On Delivery</option>
                    <option value="">UPI</option>
                    <option value="">Card</option>
                  </select>
                )}
              </div>
            </div>
            <div className={styles.reviewStep}>
              <span>3. Review items and delivery</span>
              <div>
                {products === null ? (
                  <h1>Loading...</h1>
                ) : (
                  products.map((item, index) => (
                    <div key={index} className={styles.product}>
                      <img
                        src={item.images[0]}
                        alt="headphoneIcon"
                        className={styles.productImage}
                      />
                      <span className={styles.productDetails}>
                        {item.brand} {item.model}
                      </span>
                      <span className={styles.productDetails}>
                        Colour: {item.color}
                      </span>
                      <span className={styles.productDetails}>
                        {item.availale}
                      </span>
                      <span className={styles.productDetails}>
                        Estimated delivery:
                      </span>
                      <span className={styles.productDetails}>
                        Monday-FREE Standard Delivery
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className={styles.orderSummary}>
            {!invoicefrom && (
              <>
                <button className={styles.placeOrderButton}>
                  Place your order
                </button>
                <span>
                  By placing your order, you agree to Musicart privacy notice
                  and conditions of use.
                </span>
              </>
            )}
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

        {!invoicefrom && (
          <div className={styles.orderDetails}>
            <button className={styles.placeOrderButton}>
              Place your order
            </button>
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
        )}
      </div>
      <section className={styles.footerSection}>
        <Footer />
      </section>
      <section className={styles.mobileFooterSection}>
        <MobFooter />
      </section>
    </>
  );
};

export default CheckOut;
