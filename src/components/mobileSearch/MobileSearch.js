import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from './MobileSearch.module.css'

const MobileSearch = () => {
  return (
    <section className={styles.searchSectionMoile}>
      <div className={styles.container}>
      <CiSearch size={30} color="#666666" />
      <input
        type="text"
        name="search"
        className={styles.searchField}
        placeholder="Search Musicart"
      />
      </div>
    </section>
  );
};

export default MobileSearch;
