import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/shop/products/ProductList";
import NavBar from "./Components/Navbar";
import Cart from "./Pages/shop/Cart";
import CheckOut from "./Pages/shop/CheckOut";
import ProductDetail from "./Pages/shop/products/ProductDetail";
import Footer from "./Components/Footer";
import Landing from "./Pages/auth/Landing";
import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/SignUp";
import AdminDashboard from "./Pages/admin/AdminDashBoard";
import { ToastContainer } from "react-toastify";
import AddListing from "./Pages/admin/AddListing";
import { useContext } from "react";
import { authContext } from "./Context/AuthContext";
import Orders from "./Pages/shop/orders/Orders";
import OrderDetails from "./Pages/shop/orders/OrderDetails";
import Loading from "./Components/Loading";
import AdminOrders from "./Pages/admin/AdminOrders";
import AdminOrderDetails from "./Pages/admin/AdminOrderDetails";
import DashboardUsers from "./Pages/admin/admin-dashboard/DashboardUsers";
import AdminUserDetails from "./Pages/admin/admin-dashboard/AdminUserDetails";
import BannedUser from "./Components/BannedUser";
import NotVerified from "./Components/NotVerified";
import VerifyEmail from "./Components/VerifyEmail";
import ForgotPassword from "./Components/auth/ForgotPassword";
import ResetPassword from "./Components/auth/ResetPassword";

// Protected Route wrapper for logged-in regular users
const ProtectedRoute = ({ children }) => {
  const { loggedIn, isBanned, isVerified } = useContext(authContext);

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (isBanned) return <BannedUser />;
  if (!isVerified) return <NotVerified />;

  return children;
};

// Admin Route wrapper for admin-only pages
const AdminRoute = ({ children }) => {
  const { loggedIn, role, isBanned, isVerified } = useContext(authContext);

  if (!loggedIn) return <Navigate to="/login" replace />;
  if (isBanned) return <BannedUser />;
  if (!isVerified) return <NotVerified />;
  if (role !== "admin") return <Navigate to="/home" replace />;

  return children;
};

export default function App() {
  const { loggedIn, role, authLoading, isBanned } = useContext(authContext);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <div className="min-h-screen w-full overflow-x-hidden bg-zinc-800 font-sans">
          <NavBar />
          <Routes>
            {/* Root Route: Guests go to store, admins go to dashboard */}
            <Route
              path="/"
              element={
                !loggedIn ? (
                  <ProductList />
                ) : role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />

            {/* Public Store & Auth Routes */}
            <Route path="/home" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/landing" element={<Landing />} />

            {/* Protected User Routes (Cart, Checkout, Orders) */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOut />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/addlisting"
              element={
                <AdminRoute>
                  <AddListing />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <AdminRoute>
                  <AddListing />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminRoute>
                  <AdminOrderDetails />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <DashboardUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <AdminRoute>
                  <AdminUserDetails />
                </AdminRoute>
              }
            />
          </Routes>

          {!isBanned && <Footer />}
          <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover />
        </div>
      </Router>
    </>
  );
}
