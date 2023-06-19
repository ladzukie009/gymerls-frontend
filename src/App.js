import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
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
  // const [currentUserRole, setCurrentUserRole] = useState("");

  // useEffect(() => {
  //   const userRole = localStorage.getItem("role");
  //   setCurrentUserRole(userRole);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list-of-user" element={<ListOfUser />} />
        <Route path="/list-of-product" element={<ListOfProduct />} />

        {/* admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/list-of-user" element={<AdminListOfUser />} />
        <Route path="/admin/list-of-product" element={<AdminListOfProduct />} />

        {/* user routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/meal-plan" element={<MealLanding />} />
        <Route path="/user/settings" element={<SeetingsLanding />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
