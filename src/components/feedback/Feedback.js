import React, { useState } from "react";
import styles from "./Feedback.module.css";
import { useAuth } from "../../store/auth";
import { sendFeedback } from "../../apis/auth/Feedback";
import toast from "react-hot-toast";

const Feedback = ({ setShowFeedBack }) => {
  const { BASE_URL, authorizationToken } = useAuth();
  const [feedbackType, setFeedbackType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleTypeChange = (e) => {
    setFeedbackType(e.target.value);
    setErrors({
      ...errors,
      feedbackType: "",
    });
  };

  const handleMessageChange = (e) => {
    setFeedbackMessage(e.target.value);
    setErrors({
      ...errors,
      feedbackMessage: "",
    });
  };

  const isFormValid = () => {
    const newErrors = {};

    if (!feedbackType) {
      newErrors.feedbackType = "Type of feedback required";
    }
    if (!feedbackMessage) {
      newErrors.feedbackMessage = "Please enter your feedback";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const response = await sendFeedback(
        BASE_URL,
        authorizationToken,
        feedbackType,
        feedbackMessage
      );
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      setShowFeedBack(false);
      setFeedbackType("");
      setFeedbackMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <span className={styles.label}>Type of feedback</span>
        <section>
          <select
            className={`${styles.select} ${
              errors.feedbackType && styles.errorInput
            }`}
            value={feedbackType}
            onChange={handleTypeChange}
          >
            <option value="">Choose the type</option>
            <option value="Bugs">Bugs</option>
            <option value="Feedback">Feedback</option>
            <option value="Query">Query</option>
          </select>
          <div className={styles.errorContainer}>
            {errors.feedbackType && (
              <span className={styles.error}>{errors.feedbackType}</span>
            )}
          </div>
        </section>
      </div>
      <div className={styles.inputContainer}>
        <span className={styles.label}>Feedback</span>
        <textarea
          className={`${styles.textarea} ${
            errors.feedbackMessage && styles.errorInput
          }`}
          placeholder="Type your feedback"
          value={feedbackMessage}
          onChange={handleMessageChange}
          cols="30"
          rows="5"
        ></textarea>
        <div className={styles.errorContainer}>
          {errors.feedbackMessage && (
            <span className={styles.error}>{errors.feedbackMessage}</span>
          )}
        </div>
      </div>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Feedback;
