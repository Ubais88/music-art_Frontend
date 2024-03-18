import React, { useState } from "react";
import styles from "./PreNavbar.module.css";
import { TbPhoneCall } from "react-icons/tb";

const PreNavbar = () => {
  const [login, setLogin] = useState(false);
  
  return (
    <header className={styles.header}>
      <div className={styles.contactInfo}>
        <TbPhoneCall size={20}/>
        <span>912121131313</span>
      </div>
      <div className={styles.promotion}>
        <span>Get 50% off on selected items | Shop Now</span>
      </div>
      <div className={styles.auth}>
        {login ? (
          <button className={styles.logoutButton}>Logout</button>
        ) : (
          <>
            <a className={styles.authLink}>Login</a> |{" "}
            <a className={styles.authLink}>Signup</a>
          </>
        )}
      </div>
    </header>
  );
};

export default PreNavbar;
