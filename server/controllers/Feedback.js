const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { feedbackType, feedbackMessage } = req.body;
    const userId = req.user.id;

    const newFeedback = new Feedback({
      feedbackType,
      feedbackMessage,
      userId,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: savedFeedback,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { submitFeedback };
