import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Root from "./layouts/Root";

// Pages
const Home = () => <h1>Home Page</h1>;
const Admin = () => <h1>Admin Page</h1>;
const Profile = () => <h1>Profile Page</h1>;
const AdminLogin = () => <h1>Admin Login Page</h1>;
const Login = () => <h1>Login Page</h1>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Root Layout */}
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
