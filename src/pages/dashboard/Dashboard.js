import styles from "./Dashboard.module.css";
import saleIcon from "../../assets/saleIcon.png";
import { CiSearch } from "react-icons/ci";
import { BsFillGridFill, BsGrid } from "react-icons/bs";
import ListIcon from "../../assets/list.svg";
import FilledList from "../../assets/filledList.svg";
import { useEffect, useState } from "react";
import products from "../../products.json";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Footer from "../../components/footer/Footer";
import Product from "../../components/product/Product";
import Navbar from "../../components/navbar/Navbar";
import MobFooter from "../../components/mobFooter/MobFooter";
import MobileSearch from "../../components/mobileSearch/MobileSearch";

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
      <div className={styles.mobileSearch}>
        <MobileSearch />
      </div>
      <div className={styles.navbar}>
        <PreNavbar />
      </div>
      <div className={styles.dashboardContainer}>
        <section className={styles.headerSection}>
          <Navbar />
        </section>
        <section className={styles.promotionSection}>
          <div className={styles.promotionContent}>
            <h1 className={styles.promotionText}>
              Grab upto 50% off on<br></br> Selected headphones
            </h1>
            <button className={styles.promotionbtn}>Buy Now</button>
          </div>
          <img
            src={saleIcon}
            alt="Promotion Icon"
            className={styles.promotionIcon}
          />
        </section>
        <section className={styles.searchSection}>
          <CiSearch size={35} />
          <input
            type="text"
            name="search"
            className={styles.searchField}
            placeholder="Search by Product Name"
          />
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
              className={styles.listViewImg}
              onClick={() => {
                setView("list");
              }}
            />
          </div>

          <div className={styles.filters}>
            <select name="headphoneType" className={styles.dropDown}>
              <option value="" disabled selected hidden>
                Headphone type
              </option>
              <option value="featured">Featured</option>
              <option value="In ear">In-ear headphone</option>
              <option value="On ear">On-ear headphobe</option>

              <option value="Over ear">Over-ear headphone</option>
            </select>

            <select name="company" className={styles.dropDown}>
              <option value="" disabled selected hidden>
                Company
              </option>
              <option value="featured">Featured</option>
              <option value="jbl">JBL</option>
              <option value="sony">Sony</option>
              <option value="boat">Boat</option>
              <option value="zebronics">zebronics</option>
              <option value="marshall">Marshall</option>
              <option value="ptron">Ptron</option>
            </select>
            <select name="colour" className={styles.dropDown}>
              <option value="" disabled selected hidden>
                Colour
              </option>
              <option value="featured">Featured</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>
            <select name="price" className={styles.dropDown}>
              <option value="" disabled selected hidden>
                Price
              </option>
              <option value="featured">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-2000">₹1,000-₹10,000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
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

        {product.length > 0 ? (
          <section
            className={`${
              view === "grid" ? styles.productGrid : styles.productList
            }`}
          >
            {product.map((item, index) => (
              <Product item={item} view={view} key={index} />
            ))}
          </section>
        ) : (
          <h1>Loading</h1>
        )}
      </div>

      <section className={styles.siteFooter}>
        <Footer />
      </section>
      <section className={styles.mobileFooter}>
        <MobFooter />
      </section>
    </>
  );
};

export default Dashboard;
