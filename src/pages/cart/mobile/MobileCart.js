import styles from "./MobileCart.module.css";
import MobileSearch from "../../../components/mobileSearch/MobileSearch";
import MobileFooter from "../../../components/mobFooter/MobFooter";
import backIcon from "../../../assets/backIcon.svg";
import { useEffect, useState } from "react";
import Products from "../../../products.json";
import { IoMdArrowRoundBack } from "react-icons/io";

const MobileCart = () => {
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
  }, []);
  console.log(products);

  return (
    <>
      <MobileSearch />
      <div className={styles.container}>
        <div className={styles.backButton}>
          <IoMdArrowRoundBack size={30} />
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
                <div className={styles.productContainer}>
                  <img src={item.images[0]} alt="headphoneimg" />

                  <div className={styles.productDetails}>
                    <span>
                      {item.brand} {item.model}
                    </span>
                    <span>₹{item.price}</span>
                    <span>Clour : {item.color}</span>
                    <span>{item.available || "In Stock"}</span>
                  </div>
                </div>
              ))}
              <span className={styles.conevienceFee}>
                Convenience Fee <span>₹45</span>
              </span>
              <summary>
                <span>Total:</span>
                <span>₹ 34566</span>
              </summary>
            </div>
            <div className={styles.totalAmountAndOrderBtn}>
              <div>
                <span>Total Amount</span>
                <span>₹ 43534</span>
              </div>
              <button>PLACE ORDER</button>
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
