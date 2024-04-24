const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { getAllproducts, getProduct, placeOrder, getAllUserOrders, getOneUserOrder } = require("../controllers/Product");
const { authMiddleware } = require("../middlewares/authMiddleware");

// Route for user createQuiz
router.get("/allproducts", getAllproducts);
router.get("/details/:productId", getProduct);
router.put("/place-order", authMiddleware, placeOrder);
router.get("/get-orders", authMiddleware, getAllUserOrders);
router.get("/get-order/:orderId", authMiddleware, getOneUserOrder);

// Export the router for use in the main application
module.exports = router;
