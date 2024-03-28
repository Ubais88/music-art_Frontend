import React from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./MobileSearch.module.css";
import { useAuth } from "../../store/auth";

const MobileSearch = () => {
  const { search, setSearch } = useAuth();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <section className={styles.searchSectionMoile}>
      <div className={styles.container}>
        <CiSearch size={30} color="#666666" />
        <input
          type="text"
          name="search"
          className={styles.searchField}
          placeholder="Search Musicart"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </section>
  );
};

export default MobileSearch;
