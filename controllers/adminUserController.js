const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');


// GET /api/admin/users
exports.listUsers = async (_req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// GET /api/admin/users/:id
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

// PUT /api/admin/users/:id/role
exports.updateUserRole = async (req, res) => {
  const { isAdmin } = req.body;                  // true / false
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isAdmin },
    { new: true, runValidators: true }
  ).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: '✅ Role updated', user });
};

// DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'User not found' });
  res.json({ message: '🗑️ User deleted' });
};

// GET /api/admin/stats
exports.getDashboardStats = async (_req, res) => {
  const [userCount, orderCount, productCount, orders] = await Promise.all([
    User.countDocuments(),
    Order.countDocuments(),
    Product.countDocuments(),
    Order.find()
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  res.json({
    totalUsers: userCount,
    totalOrders: orderCount,
    totalProducts: productCount,
    totalRevenue
  });
};