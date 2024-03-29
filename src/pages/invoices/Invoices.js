import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { fetchAllInvoices } from "../../apis/product/Product";
import toast from "react-hot-toast";

const Invoices = () => {
  const navigate = useNavigate();
  const { BASE_URL, authorizationToken, setInvoiceForm, setSelectedItem } =
    useAuth();
  const [invoices, setInvoices] = useState([]);
  const [navData, setNavData] = useState("Invoice");

  const fetchInvoice = async () => {
    try {
      const response = await fetchAllInvoices(BASE_URL, authorizationToken);
      if (response.success) {
        setInvoices(response.orders);
      } else {
        toast.error(response.message || "Failed to fetch invoices");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to fetch invoices. Please try again later.");
    }
  };
  

  useEffect(() => {
    fetchInvoice();
    setSelectedItem("invoice");
  }, []);

  const viewInvoiceHandler = (orderId) => {
    setInvoiceForm(true);
    navigate(`/view-invoice/${orderId}`);
  };

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
      <div className={styles.backArrow} onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} />
      </div>
      <div className={styles.invoiceHeader}>
        <img src={InvoiceBlack} alt="" className={styles.imgInvoice} />
        <h1 className={styles.invoiceTitle}>My Invoices</h1>
      </div>
      {invoices.length < 1 ? (
        <h1 className={styles.noOrders}>No Orders</h1>
      ) : (
        <main className={styles.main}>
          {invoices.map((invoice) => (
            <React.Fragment key={invoice._id}>
              <div className={styles.invoiceContainer}>
                <div className={styles.left}>
                  <img
                    className={styles.invoiceImage}
                    src={Invoice}
                    alt="invoice_img"
                  />
                  <div className={styles.invoiceInfo}>
                    <p className={styles.invoiceName}>{invoice.name}</p>
                    <p className={styles.invoiceAddress}>
                      {invoice.address.length > 25
                        ? invoice.address.substring(0, 25) + "..."
                        : invoice.address}
                    </p>
                  </div>
                </div>
                <div className={styles.right}>
                  <button
                    className={styles.viewInvoiceButton}
                    onClick={() => viewInvoiceHandler(invoice._id)}
                  >
                    View Invoice
                  </button>
                </div>
              </div>
              <div className={styles.divider}></div>
            </React.Fragment>
          ))}
        </main>
      )}
      <section className={`${styles.footer}`}>
        <Footer />
      </section>

      <section className={styles.mobileFooterSection}>
        <MobFooter />
      </section>
    </div>
  );
};

export default Invoices;
