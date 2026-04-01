import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile/ProfilePage";
import DocumentView from "./pages/DocumentView";
import LandingPage from "./pages/LandingPage/LandingPage";

import ProtectedRoute from "./components/ProtectedRoute";

import QRDashboard from "./pages/QRDashboard";
import QRAnalytics from "./pages/QRAnalytics";

import DocumentsLibrary from "./pages/DocumentsLibrary";
import WhatsHappeningTemplate from "./templates/WhatsHappeningTemplate";
import DocumentPreview from "./pages/DocumentPreview";

import EventCompletionTemplate from "./templates/EventCompletionTemplate";
import EventPreview from "./pages/EventPreview";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />

        {/* ✅ EXISTING */}
        <Route
          path="/document/:id"
          element={<ProtectedRoute><DocumentView /></ProtectedRoute>}
        />

        {/* 🚀 NEW ROUTE (IMPORTANT FOR QR REDIRECT) */}
        <Route
          path="/documents/view/:id"
          element={<ProtectedRoute><DocumentView /></ProtectedRoute>}
        />

        <Route
          path="/qr"
          element={<ProtectedRoute><QRDashboard /></ProtectedRoute>}
        />

        <Route
          path="/analytics"
          element={<ProtectedRoute><QRAnalytics /></ProtectedRoute>}
        />

        <Route
          path="/documents"
          element={<ProtectedRoute><DocumentsLibrary /></ProtectedRoute>}
        />

        <Route
          path="/documents/whats-happening"
          element={<ProtectedRoute><WhatsHappeningTemplate /></ProtectedRoute>}
        />

        <Route
          path="/documents/preview"
          element={<ProtectedRoute><DocumentPreview /></ProtectedRoute>}
        />

        <Route
          path="/documents/event-completion"
          element={<ProtectedRoute><EventCompletionTemplate /></ProtectedRoute>}
        />

        <Route
          path="/documents/event-preview"
          element={<ProtectedRoute><EventPreview /></ProtectedRoute>}
        />

      </Routes>
    </Router>
  );
}

export default App;