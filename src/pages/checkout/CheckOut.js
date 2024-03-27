import styles from "./CheckOut.module.css";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import BackButton from "../../components/backButton/BackButton";
import MobNavbar from "../../components/mobNavbar/MobNavbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import MobFooter from "../../components/mobFooter/MobFooter";
import { cartProducts, directInCart, orderplaced } from "../../apis/cart/Cart";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import toast from "react-hot-toast";
import { fetchOneInvoice } from "../../apis/product/Product";

const CheckOut = () => {
  const navigate = useNavigate();
  const { orderId, productId } = useParams();
  const { BASE_URL, authorizationToken, orderFromCart, setCartItemCount,setOrderFromCart } =
    useAuth();
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState({
    totalAmount: "",
    withConveniencefee: "",
  });
  const [showData, setShowData] = useState({});
  const [navData, setNavData] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const userCart = async (productId) => {
    let response;
    if (!productId) {
      response = await cartProducts(BASE_URL, authorizationToken);
      if (response.cart.length) {
        setProducts(response.cart);
        setTotalAmount({
          totalAmount: response.totalAmount,
          withConveniencefee: response.withConveniencefee,
        });
        showDataHandler(response.cart[0].product);
      }
    } else {
      response = await directInCart(BASE_URL, authorizationToken, productId);
      setProducts([response.product]);
      setTotalAmount({
        totalAmount: response.totalAmount,
        withConveniencefee: response.withConveniencefee,
      });
      showDataHandler(response.product);
    }
  };

  const fetchInvoice = async () => {
    const response = await fetchOneInvoice(
      BASE_URL,
      authorizationToken,
      orderId
    );
    setName(response.order.name);
    setAddress(response.order.address);
    setPaymentMethod(response.order.paymentMethod);
    setTotalAmount({
      totalAmount: response.order.totalAmount,
      withConveniencefee: parseInt(response.order.totalAmount) + 45,
    });
    setProducts(response.order.products);
    showDataHandler(response.order.products[0]);
  };

  useEffect(() => {
    if (orderId) {
      fetchInvoice();
      setNavData({
        brand: "Invoices",
        model: "",
      });
    } else {
      userCart(productId);
      setNavData({
        brand: "Checkout",
        model: "",
      });
    }
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
      console.log("orderFromCart", orderFromCart);
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
        setCartItemCount(0)
        toast.success(response.message);
        setOrderFromCart(true);
        navigate("/orderplaced/success");
      }
    }
  };

  return (
    <>
      <div className={styles.preNavbar}>
        <PreNavbar />
      </div>
      <div className={styles.MobNavbar}>
        <MobNavbar />
      </div>
      <div className={styles.backArrow} onClick={() => navigate("/")}>
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
          {orderId ? "Invoice" : "Checkout"}
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
                      readOnly={!!orderId}
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
                      readOnly={!!orderId}
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
                    {orderId ? (
                      <h3 className={styles.paymentInvoice}>{paymentMethod}</h3>
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
                      {products === null || products.length < 1 ? (
                        <h1>Loading...</h1>
                      ) : (
                        <div className={styles.imgGrid}>
                          {products.map((item, index) => (
                            <img
                              src={
                                (item.product &&
                                  item.product.images &&
                                  item.product.images[0]) ||
                                (item.images && item.images[0])
                              }
                              alt="headphoneIcon"
                              className={styles.productImage}
                              key={index}
                              onClick={() =>
                                showDataHandler(item.product || item)
                              }
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
                {!orderId && (
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

            {!orderId && (
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
