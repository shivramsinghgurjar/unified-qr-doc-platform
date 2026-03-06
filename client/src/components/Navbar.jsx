import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="nav-left">
        <h2>QRDoc Platform</h2>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Dashboard</Link>

        {/* NEW QR PAGE */}
        <Link to="/qr" className="nav-link">QR</Link>

        <Link to="/profile" className="nav-link">Profile</Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;