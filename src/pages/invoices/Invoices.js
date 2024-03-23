import React, { useState } from "react";
import PreNavbar from "../../components/preNavbar/PreNavbar";
import Navbar from "../../components/navbar/Navbar";
import styles from "./Invoices.module.css";
import BackButton from "../../components/backButton/BackButton";
import Invoice from "../../assets/Invoice.png";
import InvoiceBlack from "../../assets/invoiceBlack.png";
import Footer from "../../components/footer/Footer";
import MobNavbar from "../../components/mobNavbar/MobNavbar";
import MobFooter from "../../components/mobFooter/MobFooter";
import { IoMdArrowRoundBack } from "react-icons/io";

const Invoices = () => {
  const [navData, setNavData] = useState({
    brand: "",
    model: "Invoice",
  });

  const data = [
    {
      name: "Ubais",
      address: "vill Amhera post chaudhaarpur",
    },
    {
      name: "Rohaan",
      address: "104 kk hh nagar, Lucknow Uttar Pradesh 226025",
    },
    {
      name: "Azhar",
      address:
        "104 kk hh nagar, Lucknow Uttar Pradesh 226025 post chaudhaarpur",
    },
    {
      name: "Azhar",
      address:
        "104 kk hh nagar, Lucknow Uttar Pradesh 226025 post chaudhaarpur",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.preNavbar}>
        <PreNavbar />
      </div>
      <div className={styles.MobNavbar}>
        <MobNavbar />
      </div>
      <div className={styles.navbar}>
        <Navbar navData={navData} />
      </div>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.backArrow}>
        <IoMdArrowRoundBack size={30} />
      </div>
      <div className={styles.invoiceHeader}>
        <img src={InvoiceBlack} alt="" className={styles.imgInvoice} />
        <h1 className={styles.invoiceTitle}>My Invoices</h1>
      </div>
      <main className={styles.main}>
        {data.map((invoice) => (
          <>
            <div className={styles.invoiceContainer}>
              <div className={styles.left}>
                <img className={styles.invoiceImage} src={Invoice} alt="" />
                <div className={styles.invoiceInfo}>
                  <p className={styles.invoiceName}>{invoice.name}</p>
                  <p className={styles.invoiceAddress}>{invoice.address}</p>
                </div>
              </div>
              <div className={styles.right}>
                <button className={styles.viewInvoiceButton}>
                  View Invoice
                </button>
              </div>
            </div>
            <div className={styles.divider}></div>
          </>
        ))}
      </main>
      <section className={styles.footer}>
        <Footer />
      </section>

      <section className={styles.mobileFooterSection}>
        <MobFooter />
      </section>
    </div>
  );
};

export default Invoices;
