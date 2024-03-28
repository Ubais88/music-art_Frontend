import React from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../store/auth";

const Profile = () => {
  const { LogoutUser } = useAuth();
  return (
    <div className={styles.profileHeader}>
      <p>{localStorage.getItem('name')}</p>
      <div className={styles.divider}></div>
      <p onClick={LogoutUser}>Logout</p>
    </div>
  );
};

export default Profile;
