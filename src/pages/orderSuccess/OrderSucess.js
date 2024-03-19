import style from "./OrderSuccess.module.css";
import confetti from "../../assets/confetti.png";
import Footer from "../../components/footer/Footer";
import musicIcon from "../../assets/musicIcon.svg";

const OrderSuccess = () => {
  return (
    <>
      <div className={style.header}>
        <img src={musicIcon} alt="musicIcon" />
        <span>Musicart</span>
      </div>
      <main className={style.main}>
        <div className={style.successMessage}>
          <img src={confetti} alt="confetti" className={style.successImage} />
          <span className={style.successSpan1}>
            Order is placed successfully!
          </span>
          <span className={style.successSpan2}>
            You will be receiving a confirmation email with order details
          </span>
          <button className={style.homeButton}>Go back to Home page</button>
        </div>
      </main>
      <div className={style.footer}>
        <Footer />
      </div>
    </>
  );
};

export default OrderSuccess;
