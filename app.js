// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('🛒 E-commerce API is running...');
});

//auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//product routes
const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

//order routes
const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// cart routes
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

//admin routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);



// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('❌ MongoDB connection failed:', err));
