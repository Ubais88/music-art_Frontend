import styles from "./OrderSuccess.module.css";
import confetti from "../../assets/confetti.png";
import Footer from "../../components/footer/Footer";
import musicIcon from "../../assets/musicIcon.svg";
import MobNavbar from "../../components/mobNavbar/MobNavbar";
import MobFooter from '../../components/mobFooter/MobFooter'

const OrderSuccess = () => {
  return (
    <>
      <div className={styles.header}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
      </div>
      <div className={styles.MobNavbar}>
        <MobNavbar />
      </div>
      <main className={styles.main}>
        <div className={styles.successMessage}>
          <img src={confetti} alt="confetti" className={styles.successImage} />
          <span className={styles.successSpan1}>
            Order is placed successfully!
          </span>
          <span className={styles.successSpan2}>
            You will be receiving a confirmation email with order details
          </span>
          <button className={styles.homeButton}>Go back to Home page</button>
        </div>
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
      <section className={styles.mobileFooterSection}>
        <MobFooter/>
      </section>
    </>
  );
};

export default OrderSuccess;
