import React from "react";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.form}>
      <h1 className={styles.heading}>Create Account<span>.</span>
          <i className={styles.alreadyText}>Don’t have an account?</i></h1>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Your name</span>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Mobile number</span>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Email id</span>
        <input type="text" className={styles.input} />
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Password</span>
        <input type="text" className={styles.input} />
      </div>
      <span className={styles.notification}>
        By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.
      </span>
      <button className={styles.continueButton}>Continue</button>
      <span className={styles.privacyNotice}>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </span>
    </div>
  );
};

export default Register;
