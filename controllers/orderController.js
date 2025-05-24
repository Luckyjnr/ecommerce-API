const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc Create new order
exports.createOrder = async (req, res) => {
  const { products } = req.body;
  try {
    let totalAmount = 0;

    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.userId,
      products,
      totalAmount,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get all orders of the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get single order by ID (user only)
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.userId }).populate('products.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Checkout and place order
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: '🛒 Your cart is empty' });
    }

    let totalAmount = 0;
    for (const item of cart.products) {
      if (!item.product) {
        return res.status(404).json({ message: 'One or more products not found' });
      }
      totalAmount += item.product.price * item.quantity;
    }

    const order = new Order({
      user: req.user._id,
      products: cart.products.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    await order.save();

    // Clear cart after successful order
    cart.products = [];
    await cart.save();

    res.status(201).json({ message: '✅ Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: '✅ Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};