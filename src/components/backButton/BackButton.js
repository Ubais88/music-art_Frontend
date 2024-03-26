import React from "react";
import styles from "./BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button className={styles.backToProductBtn} onClick={() => navigate("/")}>
      Back to products
    </button>
  );
};

export default BackButton;
