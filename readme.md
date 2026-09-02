# 🛍️ Aureon Store 

Aureon Store is a modern, full-stack MERN (MongoDB, Express, React, Node.js) e-commerce platform. It features a decoupled monorepo architecture, secure HTTP-only JWT authentication, role-based access controls, and seamless cloud media integration.

## ✨ Key Features

### 🛡️ Security & Scalable Architecture
* **Decoupled Monorepo:** Clean separation of concerns between `frontend` and `backend` codebases for independent development and deployment.
* **Hardened Authentication:** JWT-based user sessions utilizing secure, `HttpOnly` cookies to prevent XSS attacks.
* **Strict Input Validation:** Dedicated middleware layer (Express Validator) intercepting and validating all registration, login, and product data before hitting controllers.
* **Double-Entry Ledger & Idempotency:** Financial and transactional actions utilize atomic MongoDB sessions, double-entry bookkeeping, and unique idempotency keys to prevent duplicate operations.

### 📱 Performance & User Experience
* **Fully Responsive Design:** Tailored UI built with Tailwind CSS, ensuring smooth, mobile-first browsing across desktop, tablet, and mobile displays.
* **Cursor & Offset Pagination:** High-performance data pagination for product catalogs and order histories to reduce payload sizes and optimize database queries.
* **Interactive UI Feedback:** Real-time user notifications and feedback powered by `react-toastify` and crisp icons from `lucide-react`.

### 👥 User & Admin Roles
* **User Dashboard:** Browse catalogs, manage shopping carts, track order histories, and execute secure checkouts.
* **Admin Controls:** Dedicated admin routes and controllers for managing inventory, viewing platform-wide orders, and updating product catalogs.
* **Cloud Media Pipeline:** Integrated with **Multer** and **ImageKit** for fast, multipart form handling and optimized cloud-based image storage.

## 💻 Tech Stack

**Frontend:**
* React.js (Context API, React Router DOM)
* Tailwind CSS / Styled Components
* Lucide-React (Icons)
* React-Toastify

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (ODM)
* Express Validator (Validation)
* JSON Web Tokens (JWT) for Auth
* Bcrypt.js (Password Hashing)
* ImageKit (Cloud Image Service)
* Multer (Multipart/Form-Data Handling)

## 🗂️ Project Structure

```
aureon-store/
├── backend/                  # Express.js REST API
│   ├── src/
│   │   ├── controllers/      # Admin, Auth, and Order logic
│   │   ├── database/         # MongoDB connection setup
│   │   ├── middlewares/      # Data validation & Token verification
│   │   ├── models/           # Mongoose schemas (Users, Orders, Items)
│   │   ├── routes/           # API endpoints routing
│   │   └── services/         # Third-party integrations (ImageKit)
│   └── package.json
├── frontend/                 # React UI Application
│   ├── src/
│   └── package.json
├── .gitignore                # Global git ignore rules
└── README.md                 # Project documentation
```