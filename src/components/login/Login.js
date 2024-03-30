import React, { useState } from "react";
import styles from "./Login.module.css";
import { login } from "../../apis/auth/Auth";
import { useAuth } from "../../store/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { BASE_URL, storeTokenInLS } = useAuth();
  const [formData, setFormData] = useState({
    emailOrNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const isFormValid = () => {
    const newErrors = {};

    if (!formData.emailOrNumber) {
      newErrors.emailOrNumber = "Email or mobile number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const response = await login(formData, BASE_URL);
      // console.log(response.data)
      if (response.status === 200) {
        setFormData({
          emailOrNumber: "",
          password: "",
        });
        storeTokenInLS(response.data.token , response.data.name , response.data.mobile);
        toast.success("Login successful");
        navigate('/')
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.loginContainer}>
        <h1 className={styles.heading}>
          Sign in<span>.</span>
          <i className={styles.alreadyText}>Already a customer?</i>
        </h1>
        <div className={styles.inputGroup}>
          <span className={styles.label}>
            Enter your email or mobile number
          </span>
          <input
            type="text"
            name="emailOrNumber"
            className={`${styles.input} ${
              errors.emailOrNumber && styles.errorInput
            }`}
            value={formData.emailOrNumber}
            onChange={handleInputChange}
          />
          <div className={styles.errorContainer}>
            {errors.emailOrNumber && (
              <span className={styles.error}>{errors.emailOrNumber}</span>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.label}>Password</span>
          <input
            type="password"
            name="password"
            className={`${styles.input} ${
              errors.password && styles.errorInput
            }`}
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className={styles.errorContainer}>
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
        </div>
        <button type="submit" className={styles.continueButton}>
          Continue
        </button>
        <span className={styles.privacyNotice}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </span>
      </form>
    </>
  );
};

export default Login;
