import styles from "./CheckOut.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BackButton from "../../components/backButton/BackButton";
import MobNavbar from "../../components/mobNavbar/MobNavbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import MobFooter from "../../components/mobFooter/MobFooter";
import { cartProducts, orderplaced } from "../../apis/cart/Cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import toast from "react-hot-toast";

const CheckOut = () => {
  const navigate = useNavigate();
  const { BASE_URL, authorizationToken, isLoggedIn, orderFromCart } = useAuth();
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState({
    totalAmount: "",
    withConveniencefee: "",
  });
  const [showData, setShowData] = useState({});
  const [invoicefrom, setInvoiceForm] = useState(false);
  const [navData, setNavData] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const userCart = async () => {
    const response = await cartProducts(
      BASE_URL,
      authorizationToken,
      orderFromCart
    );
    console.log("response.cart:", response.cart);
    if (response.cart.length) {
      setProducts(response.cart);
      setTotalAmount({
        totalAmount: response.totalAmount,
        withConveniencefee: response.withConveniencefee,
      });
      showDataHandler(response.cart[0].product);
    }
    setNavData({
      brand: "Checkout",
      model: "",
    });
  };

  useEffect(() => {
    userCart();
  }, []);

  const showDataHandler = (product) => {
    setShowData({
      brand: product.brand,
      color: product.color,
      available: product.available,
    });
  };

  const isValid = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }
    if (!address) {
      newErrors.address = "Address is required";
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (isValid()) {
      const response = await orderplaced(
        BASE_URL,
        authorizationToken,
        name,
        address,
        paymentMethod,
        orderFromCart,
        !orderFromCart && productId
      );
      if (response.status) {
        toast.success(response.message);
        navigate("/orderplaced/success");
      }
    }
  };
  console.log("products:", products.length);
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

        {products.length < 1 ? (
          <h1>Loading</h1>
        ) : (
          <>
            <main className={styles.main}>
              <div className={styles.checkoutSteps}>
                <div className={styles.deliveryStep}>
                  <span>1. Delivery address</span>
                  <span>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      className={`${styles.nameField} ${
                        errors.name && styles.errorInput
                      }`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({
                          ...errors,
                          name: "",
                        });
                      }}
                    />
                    <div className={styles.errorHeader}>
                      {errors.name && (
                        <div className={styles.error}>{errors.name}</div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Enter Delivery Address"
                      className={`${styles.addressField} ${
                        errors.address && styles.errorInput
                      }`}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors({
                          ...errors,
                          address: "",
                        });
                      }}
                    />
                    <div className={styles.errorHeader}>
                      {errors.address && (
                        <div className={styles.error}>{errors.address}</div>
                      )}
                    </div>
                  </span>
                </div>
                <div className={styles.paymentStep}>
                  <span>2. Payment method</span>
                  <div className={styles.dropDownWrapper}>
                    {invoicefrom ? (
                      <h3>Payemnt</h3>
                    ) : (
                      <>
                        <select
                          className={`${styles.dropDown} ${
                            errors.paymentMethod && styles.errorInput
                          }`}
                          value={paymentMethod}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setErrors({
                              ...errors,
                              paymentMethod: "",
                            });
                          }}
                        >
                          <option value="">Mode of payment</option>
                          <option value="Pay on Delivery">
                            Pay On Delivery
                          </option>
                          <option value="UPI">UPI</option>
                          <option value="CARD">Card</option>
                        </select>
                        <div className={styles.errorHeader}>
                          {errors.paymentMethod && (
                            <div className={styles.error}>
                              {errors.paymentMethod}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.reviewStep}>
                  <span>3. Review items and delivery</span>
                  <div className={styles.imgHeader}>
                    <div className={styles.productWrapper}>
                      {(products === null || !products.length) ? (
                        <h1>Loading...</h1>
                      ) : (
                        <div className={styles.imgGrid}>
                          {products.map((item, index) => (
                            <img
                              src={item.product.images[0]}
                              alt="headphoneIcon"
                              className={styles.productImage}
                              key={index}
                              onClick={() => showDataHandler(item.product)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className={styles.productDetails}>
                        {showData.brand} {showData.model}
                      </span>
                      <span className={styles.productDetails}>
                        Colour: {showData.color}
                      </span>

                      <span className={styles.productDetails}>
                        Estimated delivery:
                      </span>
                      <span className={styles.productDetails}>
                        Monday-FREE Standard Delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.orderSummary}>
                {!invoicefrom && (
                  <>
                    <button
                      className={styles.placeOrderButton}
                      onClick={handlePlaceOrder}
                    >
                      Place your order
                    </button>
                    <span>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use.
                    </span>
                  </>
                )}
                <div className={styles.summary}>
                  <h5>Order Summary</h5>
                  <div className={styles.summaryItem}>
                    <span>Item:</span>
                    <span>₹{totalAmount.totalAmount}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Delivery:</span>
                    <span>₹45.00</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span>Order Total:</span>
                    <span>₹{totalAmount.withConveniencefee}</span>
                  </div>
                </div>
              </div>
            </main>

            {!invoicefrom && (
              <div className={styles.orderDetails}>
                <button
                  className={styles.placeOrderButton}
                  onClick={handlePlaceOrder}
                >
                  Place your order
                </button>
                <div className={styles.orderDetailsContent}>
                  <span>Order Total : ₹{totalAmount.withConveniencefee}</span>
                  <span>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </span>
                </div>
              </div>
            )}
          </>
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
