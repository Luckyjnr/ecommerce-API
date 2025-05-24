const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc Add to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({ user: req.user.userId, products: [] });
    }

    const existingProduct = cart.products.find((item) => item.product.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Clear cart
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.userId });
    res.json({ message: '🧹 Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
