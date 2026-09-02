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

export default function App() {
  const { loggedIn, role, authLoading, isBanned } = useContext(authContext);
  console.log(isBanned);
  if (authLoading) {
    return <Loading />;
  }
  return (
    <>
      <Router>
        <div className="min-h-screen bg-zinc-800 font-sans">
          <NavBar />
          <Routes>
            //! Parent Route
            <Route
              path="/"
              element={
                !loggedIn ? (
                  <Landing />
                ) : isBanned ? (
                  <BannedUser />
                ) : role === "admin" ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/addlisting" element={<AddListing />} />
            <Route path="/admin/edit/:id" element={<AddListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
            <Route path="/admin/users" element={<DashboardUsers />} />
            <Route path="/admin/users/:id" element={<AdminUserDetails />} />
          </Routes>
          {!isBanned && <Footer />}
          <ToastContainer position="top-right" autoClose={3000} closeOnClick pauseOnHover />
        </div>
      </Router>
    </>
  );
}
