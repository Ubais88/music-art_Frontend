import React from "react";
import styles from "./Auth.module.css"
import musicIcon from "../../assets/musicIcon.svg";
import Footer from "../../components/footer/Footer";
import Register from "../../components/register/Register";


const Auth = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <img src={musicIcon} alt="musicIcon" />
          <span>Musicart</span>
        </div>
        <Register/>

        <aside className={styles.authCheck}>
          <span>Already have an account?</span>
          <a href="/">{" "}Sign In</a>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
