
```markdown
# 🛍️ E-commerce API

This is a full-featured E-commerce RESTful API built with **Node.js**, **Express.js**, and **MongoDB**. It supports authentication, product and cart management, orders, and admin operations.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 👤 **User Profile Management**
- 🛒 **Shopping Cart** (Add/Remove/Update Items)
- 📦 **Order Processing**
- 👑 **Admin Dashboard**
  - Manage users and roles
  - View and update all orders
  - View site statistics

---

## 🛠️ Technologies

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Multer** for image uploads
- **dotenv** for environment configuration

---

## 📂 Folder Structure

```

ecommerce-api/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── .env
├── app.js
└── package.json

````

---

## 🔧 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. **Start the server**

```bash
npm run dev
```

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | /api/users/register | Register new user |
| POST   | /api/users/login    | Login user        |

### Products

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/products      | Get all products       |
| POST   | /api/products      | Create product (Admin) |
| PUT    | /api/products/\:id | Update product (Admin) |
| DELETE | /api/products/\:id | Delete product (Admin) |

### Cart

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | /api/cart      | Add item to cart      |
| GET    | /api/cart      | View cart             |
| DELETE | /api/cart/\:id | Remove item from cart |

### Orders

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/orders/checkout | Place order       |
| GET    | /api/orders          | View my orders    |
| GET    | /api/orders/\:id     | View single order |

### Admin

| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| GET    | /api/admin/users              | List all users (Admin)  |
| GET    | /api/admin/users/\:id         | Get user info (Admin)   |
| PUT    | /api/admin/users/\:id/role    | Change user role        |
| DELETE | /api/admin/users/\:id         | Delete a user           |
| GET    | /api/admin/orders             | View all orders (Admin) |
| PUT    | /api/admin/orders/\:id/status | Update order status     |
| GET    | /api/admin/stats              | Dashboard stats (Admin) |

---

## ✍️ Author

* **\Lucky Noah**
* 🔗 GitHub: [@your-username](https://github.com/luckyjnr)

