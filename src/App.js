import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ErrorPage from "./pages/ErrorPage";
import ListOfUser from "./pages/ListOfUser";
import ListOfProduct from "./pages/ListOfProduct";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminListOfUser from "./pages/admin/ListOfUser";
import AdminListOfProduct from "./pages/admin/ListOfProduct";

import MealLanding from "./pages/user/MealLanding";
import SeetingsLanding from "./pages/user/SettingsLanding";

function App() {
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setCurrentUserRole(userRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />

        {/* super admin routes */}
        {currentUserRole === "super_admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {currentUserRole === "super_admin" && (
          <Route path="/list-of-user" element={<ListOfUser />} />
        )}
        {currentUserRole === "super_admin" && (
          <Route path="/list-of-product" element={<ListOfProduct />} />
        )}

        {/* admin routes */}
        {currentUserRole === "admin" && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}
        {currentUserRole === "admin" && (
          <Route path="/admin/list-of-user" element={<AdminListOfUser />} />
        )}
        {currentUserRole === "admin" && (
          <Route
            path="/admin/list-of-product"
            element={<AdminListOfProduct />}
          />
        )}

        {/* user routes */}
        {currentUserRole === "user" && (
          <Route path="/user/dashboard" element={<UserDashboard />} />
        )}
        {currentUserRole === "user" && (
          <Route path="/user/meal-plan" element={<MealLanding />} />
        )}
        {currentUserRole === "user" && (
          <Route path="/user/settings" element={<SeetingsLanding />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
