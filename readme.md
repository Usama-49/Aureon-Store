# 🛍️ Aureon Store

A full-stack MERN e-commerce platform built with a modern monorepo architecture. Aureon Store delivers a fast, responsive shopping experience with dynamic pricing, real-time stock validation, secure JWT authentication, email verification, and a comprehensive admin dashboard.

---

## ✨ Key Features

### 🛒 Customer Experience

- **Product Discovery:** Browse products with pagination, category filtering, and live search.
- **Dynamic Pricing & Discounts:** Real-time calculation of active prices, crossed-out original prices (`oldPrice`), and automated discount percentage badges.
- **Smart Shopping Cart & Checkout:** Persistent cart state, quantity controls, live stock checks during checkout, and detailed order tracking.
- **Account Security:** Secure registration and login with JWT cookies, email verification flows, and password reset functionality.

### 🛡️ Admin Dashboard

- **Inventory Management:** Full CRUD operations for product listings, image uploads (JPEG, PNG, WEBP), and dynamic sale pricing controls.
- **Order Fulfillment:** Track all customer orders, filter by status, inspect shipping details, and update order progress.
- **User Management:** View registered users, monitor user order history, and manage account access.

---

## 🧰 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Context API, Axios, Lucide Icons, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Express Validator, Multer / Cloudinary
- **Authentication & Security:** JSON Web Tokens (JWT), bcrypt, Role-Based Access Control (RBAC)

---

## 📁 Project Structure

```text
Aureon/
├── backend/          # Express REST API, Mongoose models, controllers, validators
├── frontend/         # React + Vite client application
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone the Repository

```bash
git clone [https://github.com/usama-49/Aureon-Store.git](https://github.com/usama-49/Aureon-Store.git)
cd Aureon-Store
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory based on `.env.example` and configure your environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, email credentials, and image storage keys).

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` directory based on `.env.example` and add your backend API base URL.

Start the Vite development server:

```bash
npm run dev
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

Created by [Usama](https://github.com/usama-49)
