import React, { useEffect, useState } from "react";
import LaptopCart from "./laptop/LaptopCart";
import MobileCart from "./mobile/MobileCart";
import styles from "./Cart.module.css";
import { useAuth } from "../../store/auth";
import { cartProducts } from "../../apis/cart/Cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { BASE_URL, authorizationToken, setSelectedItem } = useAuth();
  const [ loading , setLoading] = useState(false)
  const [products, setProducts] = useState(null);
  const [totalAmount, setTotalAmount] = useState({});

  const userCart = async () => {
    try {
      const response = await cartProducts(BASE_URL, authorizationToken);
      setLoading(false);
      if (response.success) {
        setProducts(response.cart);
        setTotalAmount({
          totalAmount: response.totalAmount,
          withConveniencefee: response.withConveniencefee,
        });
      } else {
        toast.error(response.message);
        // navigate("/");
      }
    } catch (error) {
      toast.error("Error fetching user cart. Please try again later.");
      navigate("/");
    }
  };

  useEffect(() => {
    setLoading(true)
    userCart();
    setSelectedItem("cart");
  }, []);

  return (
    <>
      <div className={styles.laptop}>
        <LaptopCart
        loading={loading}
          userCart={userCart}
          products={products}
          setProducts={setProducts}
          totalAmount={totalAmount}
          setTotalAmount={setTotalAmount}
        />
      </div>
      <div className={styles.mobile}>
        <MobileCart
          userCart={userCart}
          loading={loading}
          products={products}
          setProducts={setProducts}
          totalAmount={totalAmount}
        />
      </div>
    </>
  );
};

export default Cart;
