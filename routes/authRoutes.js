const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// Test protected route
router.get('/profile', auth, (req, res) => {
  res.json({ message: '🔒 Access granted', user: req.user });
});

module.exports = router;
