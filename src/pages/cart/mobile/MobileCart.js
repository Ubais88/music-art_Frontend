import styles from "./MobileCart.module.css";
import MobileSearch from "../../../components/mobileSearch/MobileSearch";
import MobileFooter from "../../../components/mobFooter/MobFooter";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const MobileCart = ({ products, totalAmount }) => {
  const navigate = useNavigate();

  return (
    <>
      <MobileSearch />
      <div className={styles.container}>
        <div className={styles.backButton}>
          <IoMdArrowRoundBack size={30} onClick={() => navigate(-1)} />
        </div>
        {products === null || products.length === 0 ? (
          <center
            styles={{ marginTop: "30vh", fontWeight: "500", fontSize: "3vw" }}
          >
            <h1>Cart Empty</h1>
          </center>
        ) : (
          <>
            <div className={styles.allCartProduct}>
              {products.map((item, index) => (
                <div key={index} className={styles.productContainer}>
                  <img src={item.product.images[0]} alt="headphoneimg" />
                  <div className={styles.productDetails}>
                    <span>
                      {item.product.brand} {item.product.model}
                    </span>
                    <span>₹{item.product.price}</span>
                    <span>Clour : {item.product.color}</span>
                    <span>{item.product.available || "In Stock"}</span>
                  </div>
                </div>
              ))}
              <span className={styles.conevienceFee}>
                Convenience Fee <span>₹45</span>
              </span>
              <summary>
                <span>Total:</span>
                <span>₹ {totalAmount.totalAmount}</span>
              </summary>
            </div>
            <div className={styles.totalAmountAndOrderBtn}>
              <div>
                <span>Total Amount</span>
                <span>₹ {totalAmount.withConveniencefee}</span>
              </div>
              <button onClick={() => navigate("/checkout")}>PLACE ORDER</button>
            </div>
          </>
        )}
      </div>
      <div className={styles.footer}>
        <MobileFooter />
      </div>{" "}
    </>
  );
};

export default MobileCart;
