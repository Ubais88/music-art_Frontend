import React from "react";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <>
      <p className={styles.welcome}>Welcome</p>
      <div className={styles.loginContainer}>
        <h1 className={styles.heading}>
          Sign in<span>.</span>
          <i className={styles.alreadyText}>Already a customer?</i>
        </h1>
        <div className={styles.inputGroup}>
          <span className={styles.label}>
            Enter your email or mobile number
          </span>
          <input type="text" className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>Password</span>
          <input type="password" className={styles.input} />
        </div>
        <button className={styles.continueButton}>Continue</button>
        <span className={styles.privacyNotice}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </span>
      </div>
    </>
  );
};

export default Login;
