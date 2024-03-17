import styles from "./Dashboard.module.css";
import musicIcon from "../../assets/musicIcon.svg";
import saleIcon from "../../assets/saleIcon.png";
import { CiSearch } from "react-icons/ci";
import { BsFillGridFill, BsGrid } from "react-icons/bs";
import ListIcon from "../../assets/list.svg";
import FilledList from "../../assets/filledList.svg";
import imgCart from "../../assets/imgCart.svg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect, useState } from "react";
import products from "../../products.json";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  const [view, setView] = useState("grid");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    console.log("Product :", products.data);
    setProduct(products.data);
    console.log("Product :", product);
  });

  return (
    <>
    <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.dashboardContainer}>
        <section className={styles.headerSection}>
          <div className={styles.logoWrapper}>
            <img src={musicIcon} alt="musicIcon" />
            <span>Musicart</span>
            <a href="#" className={styles.navLink}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              Invoice
            </a>
          </div>
          <div className={styles.cartWrapper}>
            <MdOutlineShoppingCart size={35} />
            <span>View Cart</span>
          </div>
        </section>
        <section className={styles.promotionSection}>
          <div className={styles.promotionContent}>
            <h1>
              Grab upto 50% off on<br></br> Selected headphones
            </h1>
            <button>Buy Now</button>
          </div>
          <img src={saleIcon} alt="sale Icon" />
        </section>
        <section className={styles.searchSection}>
          <CiSearch size={35} />
          <input type="text" name="search" placeholder="Search Product" />
        </section>

        <section className={styles.filterSection}>
          <div className={styles.viewOptions}>
            {view === "grid" ? (
              <BsFillGridFill size={35} />
            ) : (
              <BsGrid size={35} onClick={() => setView("grid")} />
            )}
            <img
              src={view === "list" ? FilledList : ListIcon}
              alt="ListViewIcon"
              onClick={() => {
                setView("list");
              }}
            />
          </div>

          <div className={styles.filters}>
            {[
              {
                name: "headphoneType",
                label: "Headphone type",
                options: ["", "In ear", "On ear", "Over ear"],
              },
              {
                name: "company",
                label: "Company",
                options: [
                  "",
                  "JBL",
                  "Sony",
                  "Boat",
                  "Zebronics",
                  "Marshall",
                  "Ptron",
                ],
              },
              {
                name: "colour",
                label: "Colour",
                options: ["", "Blue", "Black", "White", "Brown"],
              },
              {
                name: "price",
                label: "Price",
                options: ["", "₹0-₹1000", "₹1,000-₹10,000", "₹10000-₹20000"],
              },
            ].map((filter, index) => (
              <select
                key={index}
                name={filter.name}
                className={styles.selectFilter}
              >
                <option value="" disabled hidden>
                  {filter.label}
                </option>
                {filter.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option || "Featured"}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div className={styles.sortOptions}>
            <span>Sort by:</span>
            <select name="sort" className={styles.sortSelect}>
              <option value="featured" selected>
                Featured
              </option>
              <option value="PriceLowest">Price:Lowest</option>
              <option value="PriceHighest">Price:Highest</option>
              <option value="a-z">Name:(A-Z)</option>
              <option value="z-a">Name:(Z-A)</option>
            </select>
          </div>
        </section>

        {product.length ? (
          view === "grid" ? (
            <section className={styles.productGrid}>
              {product.map((item, index) => (
                <div key={index} className={styles.productItem}>
                  <div className={styles.imageWrapper}>
                    <img src={imgCart} alt="cartImg" />
                    <img src={item.images[0]} alt="headphoneIcon" />
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>
                      {item.brand} {item.model}
                    </span>
                    <span className={styles.productPrice}>
                      Price-₹ {item.price}
                    </span>
                    <span className={styles.productDetails}>
                      {item.color} | {item.headphoneType}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <section className={styles.productList}>
              {product.map((item, index) => (
                <div key={index} className={styles.productItem}>
                  <div className={styles.imageWrapper}>
                    <img src={item.images[0]} alt="headphoneIcon" />
                    <img src={imgCart} alt="cart icon" />
                  </div>

                  <div className={styles.productInfo}>
                    <span className={styles.productName}>
                      {item.brand} {item.model}
                    </span>
                    <span className={styles.productPrice}>
                      Price - ₹ {item.price}
                    </span>
                    <span className={styles.productDetails}>
                      {item.color} | {item.headphoneType}
                    </span>
                    <span className={styles.productDescription}>
                      {item.shortDescription}
                    </span>
                    <button className={styles.detailsButton}>Details</button>
                  </div>
                </div>
              ))}
            </section>
          )
        ) : (
          <h1>Loading</h1>
        )}
      </div>

      <section className={styles.siteFooter}>
        <Footer />
      </section>
    </>
  );
};

export default Dashboard;
