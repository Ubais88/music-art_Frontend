import React, { useState } from "react";
import styles from "./Auth.module.css";
import musicIcon from "../../assets/musicIcon.svg";
import Footer from "../../components/footer/Footer";
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";
import MobNavbar from "../../components/mobNavbar/MobNavbar";

const Auth = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className={styles.topContainer}>

      <div className={styles.mobileNav}>
        <MobNavbar />
      </div>
      <p className={styles.welcome}>Welcome</p>
      <div className={styles.container}>
        <div className={styles.title}>
          <img src={musicIcon} alt="musicIcon" />
          <span>Musicart</span>
        </div>
        {login ? <Login /> : <Register />}
        {login ? (
          <>
            <div className={styles.newAccount}>
              <div className={styles.breakLine}></div>
              <span className={styles.newToMusic}>New to Musicart?</span>
              <div className={styles.breakLine}></div>
            </div>
            <button
              className={styles.registerButton}
              onClick={() => setLogin(false)}
            >
              Create your Musicart account
            </button>
          </>
        ) : (
          <aside className={styles.authCheck}>
            <span>Already have an account?</span>
            <a onClick={() => setLogin(true)}> Sign In</a>
          </aside>
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Auth;
