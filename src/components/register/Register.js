import React, { useState } from "react";
import styles from "./Register.module.css";
import { register } from "../../apis/auth/Auth";
import { useAuth } from "../../store/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { BASE_URL, storeTokenInLS } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Reset error message when input changes
    });
  };

  const isFormValid = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPasswordValid = formData.password.length >= 5;

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!isEmailValid) {
      newErrors.email = "Invalid Email";
    }
    if (!isPasswordValid) {
      newErrors.password = "Password length must be at least 5";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile is required";
    }
    if (formData.mobile.length !== 10) {
      newErrors.mobile = "Mobile must 10 Digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const response = await register(formData, BASE_URL);
      // console.log("response.status", response);
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });
        storeTokenInLS(
          response.data.token,
          response.data.user.name,
          response.data.user.mobile
        );
        toast.success("Signup successful");
        navigate("/");
      } else {
        toast.error(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.heading}>
        Create Account<span>.</span>
        <i className={styles.alreadyText}>Don’t have an account?</i>
      </h1>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Your name</span>
        <input
          type="text"
          name="name"
          className={`${styles.input} ${errors.name && styles.errorInput}`}
          value={formData.name}
          onChange={handleInputChange}
        />
        <div className={styles.errorContainer}>
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Mobile number</span>
        <input
          type="text"
          name="mobile"
          className={`${styles.input} ${errors.mobile && styles.errorInput}`}
          value={formData.mobile}
          onChange={handleInputChange}
        />
        <div className={styles.errorContainer}>
          {errors.mobile && (
            <span className={styles.error}>{errors.mobile}</span>
          )}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Email id</span>
        <input
          type="text"
          name="email"
          className={`${styles.input} ${errors.email && styles.errorInput}`}
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className={styles.errorContainer}>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>
      <div className={styles.inputGroup}>
        <span className={styles.label}>Password</span>
        <input
          type="password"
          name="password"
          className={`${styles.input} ${errors.password && styles.errorInput}`}
          value={formData.password}
          onChange={handleInputChange}
        />
        <div className={styles.errorContainer}>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
      </div>
      <span className={styles.notification}>
        By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.
      </span>
      <button type="submit" className={styles.continueButton}>
        Continue
      </button>
      <span className={styles.privacyNotice}>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </span>
    </form>
  );
};

export default Register;
