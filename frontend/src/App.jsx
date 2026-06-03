import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chatbot from "./pages/Chatbot";
import Subscription from "./pages/Subscription";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";

// Protected route: only accessible if logged in
function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" replace />;
}

// Public route: redirects to chatbot if user is already logged in
function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/chatbot" replace /> : children;
}

function AppRoutes() {
  return (
    <>
      <Header />

      <Routes>
        {/* Home is always accessible */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Public routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Protected routes */}
        <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}