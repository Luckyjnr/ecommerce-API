// routes/admin.js
const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const adminUser = require('../controllers/adminUserController');
const orderCtrl = require('../controllers/orderController');

// 🧑‍💼 USER MANAGEMENT
router.get('/users', auth, admin, adminUser.listUsers);
router.get('/users/:id', auth, admin, adminUser.getUser);
router.put('/users/:id/role', auth, admin, adminUser.updateUserRole);
router.delete('/users/:id', auth, admin, adminUser.deleteUser);

// 📦 ORDER MANAGEMENT
router.get('/orders', auth, admin, orderCtrl.getAllOrders);
router.put('/orders/:id/status', auth, admin, orderCtrl.updateOrderStatus);

// DASHBOARD STATS
router.get('/stats', auth, admin, adminUser.getDashboardStats);


module.exports = router;
