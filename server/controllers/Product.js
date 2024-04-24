const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getAllproducts = async (req, res) => {
  try {
    const { headphoneType, company, color, price, searchTerm, sortBy } =
      req.query;
    // Fields to include in documents
    const fieldsToInclude = {
      productName: 1,
      brand: 1,
      shortDescription: 1,
      price: 1,
      color: 1,
      headphoneType: 1,
      images: 1,
    };

    // Build filter object based on query parameters
    const filter = {};
    if (headphoneType) {
      filter.headphoneType = headphoneType;
    }
    if (company) {
      filter.brand = { $regex: new RegExp(company, "i") };
    }
    if (color) {
      filter.color = { $regex: new RegExp(color, "i") };

    }
    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (searchTerm) {
      const searchTermRegex = new RegExp(searchTerm, "i");
      filter.productName = { $regex: searchTermRegex };
    }

    let products = await Product.find(filter).select(fieldsToInclude);

    // Apply sorting if sortBy is provided
    if (sortBy) {
      if (sortBy === "PriceLowest") {
        products = products.sort((a, b) => a.price - b.price);
      } else if (sortBy === "PriceHighest") {
        products = products.sort((a, b) => b.price - a.price);
      } else if (sortBy === "a-z") {
        products = products.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
      } else if (sortBy === "z-a") {
        products = products.sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
      }
    }

    return res.status(200).json({
      success: true,
      products,
      message: `All Products are Fetched successfully`,
    });
  } catch (error) {
    console.error("Error fetching Products:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error fetching Products",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const productdetails = await Product.findById(productId);

    if (!productdetails) {
      return res.status(400).json({
        success: false,
        message: "product is missing or productId is wrong",
      });
    }

    res.status(200).json({
      success: true,
      productdetails,
      message: "product fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "something went wrong during fetching product",
    });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { name, address, paymentMethod, orderFromCart, productId } = req.body;
    const userId = req.user.id;
    if (
      !name ||
      !address ||
      !["Pay on Delivery", "UPI", "CARD"].includes(paymentMethod)
    ) {
      return res.status(400).json({
        status: false,
        message: "Empty Field",
      });
    }

    const user = await User.findById(userId).populate("cart.product");

    if (orderFromCart && (!user.cart || user.cart.length === 0)) {
      return res.status(400).json({
        status: false,
        message: "Cart is empty. Add products to cart before placing an order.",
      });
    }

    let products;
    let totalAmount = 0;

    if (!orderFromCart) {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      products = [{ productId: product._id, quantity: 1 }];
      totalAmount += product.price;
    } else {
      products = user.cart.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      user.cart.forEach((item) => {
        totalAmount += item.product.price * item.quantity;
      });
    }

    const order = new Order({
      userId,
      name,
      address,
      paymentMethod,
      products,
      totalAmount: totalAmount.toFixed(2),
      grandTotal: totalAmount.toFixed(2) + 45,
    });
    await order.save();

    if (orderFromCart) {
      await User.findByIdAndUpdate(userId, { cart: [] });
    }

    res.status(200).json({
      status: true,
      order,
      message: "Order Successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json({
      success: true,
      orders,
      message: "User's orders fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getOneUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order || order.userId.toString() !== userId) {
      return res.status(404).json({
        success: false,
        message: "Order not found or does not belong to the user",
      });
    }

    const products = await Product.find({
      _id: { $in: order.products.map((product) => product.productId) },
    });

    res.status(200).json({
      success: true,
      order: {
        ...order.toJSON(),
        products: products.map((product) => product.toJSON()),
      },
      message: "User's order fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
