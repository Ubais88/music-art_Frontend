const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { addToCart, getUserCart, updateCartItemQuantity, getCartLength, directInCart } = require("../controllers/Cart");
const { authMiddleware } = require('../middlewares/authMiddleware')


router.post('/addtocart' ,authMiddleware , addToCart);
router.post('/updatecartitemquantity',authMiddleware , updateCartItemQuantity);
router.get('/cart-items',authMiddleware , getUserCart);
router.get('/cart-length',authMiddleware , getCartLength);
router.get('/direct-in-cart/:productId', authMiddleware , directInCart);


module.exports = router;