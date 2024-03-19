import React from "react";
import styles from "./MobNavbar.module.css";
import musicIcon from "../../assets/musicIcon.svg";

const MobNavbar = () => {
  return (
    <div>
      <section className={styles.productInfoSection}>
        <div className={styles.icon}>
          <img src={musicIcon} alt="musicIcon" />
          <span>Musicart</span>
        </div>
      </section>
    </div>
  );
};

export default MobNavbar;
