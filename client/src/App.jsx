import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile/ProfilePage";
import DocumentView from "./pages/DocumentView";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import QRDashboard from "./pages/QRDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

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
