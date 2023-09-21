import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import UserDashboard from "./pages/user/Dashboard";
import Error from "./pages/Error";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/products" element={<AdminProducts />} />
        <Route path="admin/categories" element={<AdminCategories />} />
        <Route path="admin/orders" element={<AdminOrders />} />

        <Route path="user" element={<UserDashboard />} />
        <Route path="*" element={<Error />} />

        {/* <HomePage /> */}
        {/* <AdminProducts /> */}
        {/* <AdminDashboard /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
