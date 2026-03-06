import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile/ProfilePage";
import DocumentView from "./pages/DocumentView";

import ProtectedRoute from "./components/ProtectedRoute";

import QRDashboard from "./pages/QRDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Document View */}
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              <DocumentView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr"
          element={
            <ProtectedRoute>
              <QRDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
