import Login from "./pages/Login";
import UsersHome from "./pages/users/UsersHome";
import PackageDetail from "./pages/users/PackageDetail";
import ScheduleDetail from "./pages/users/ScheduleDetail";
import AdminHome from "./pages/admin/AdminHome";
import EnquiryList from "./pages/admin/EnquiryList";
import "./bootstrap.min.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UsersHome />} />
        <Route path="/packages/:id" element={<PackageDetail />} />
        <Route path="/schedules/:id" element={<ScheduleDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute>
              <EnquiryList />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
