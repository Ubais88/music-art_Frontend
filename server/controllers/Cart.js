const Product = require("../models/Product");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      if (user.cart[productIndex].quantity < 8) {
        user.cart[productIndex].quantity += 1;
      } else {
        return res.status(400).json({
          success: false,
          message: "maximum allowed quantity reached",
        });
      }
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.status(200).json({
      success: true,
      cart: user.cart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "something went wrong during fetching product",
    });
  }
};

exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0 || quantity > 8) {
      return res.status(404).json({
        success: false,
        message:
          "Invalid productId or quantity. Quantity should be between 1 and 8.",
      });
    }

    const userId = req.user.id;
    const user = await User.findById(userId).populate("cart.product");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the product in the user's cart
    const productIndex = user.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (productIndex !== -1) {
      user.cart[productIndex].quantity = quantity;
      await user.save();

      const updatedItem = user.cart[productIndex];
      const updatedPrice = updatedItem.quantity * updatedItem.product.price;

      let cartLength = 0;
      let totalAmount = 0;
      user.cart.forEach((item) => {
        const productTotal = item.product.price * item.quantity;
        totalAmount += productTotal;
        item.totalAmount = productTotal;
        cartLength += item.quantity;
      });
      const withConveniencefee = totalAmount + 45;

      return res.status(200).json({
        success: true,
        user,
        cartLength,
        totalAmount,
        updatedPrice,
        withConveniencefee,
        message: "Quantity updated successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong during fetching product",
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("cart.product");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartLength = 0;
    let totalAmount = 0;
    user.cart.forEach((item) => {
      const productTotal = item.product.price * item.quantity;
      totalAmount += productTotal;
      item.totalAmount = productTotal;
      cartLength += item.quantity;
    });

    // Calculate total with convenience fee
    const withConveniencefee = totalAmount + 45;

    res.status(200).json({
      success: true,
      cart: user.cart,
      cartLength,
      totalAmount,
      withConveniencefee,
      message: "Cart product fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.directInCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }
    // Calculate total amount for each product and overall total
    const totalAmount = product.price;

    // Calculate total with convenience fee
    const withConveniencefee = totalAmount + 45;

    res.status(200).json({
      success: true,
      product,
      totalAmount,
      withConveniencefee,
      message: "Cart product fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCartLength = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let cartLength = 0;
    user.cart.forEach((item) => {
      cartLength += item.quantity;
    });

    res.status(200).json({
      success: true,
      cartLength,
      message: "Cart length fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
