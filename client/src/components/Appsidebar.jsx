import { Link, useNavigate, useLocation } from "react-router-dom"
import "./Appsidebar.css"

const NAV = [
  { to: "/qr",      icon: "⬡", label: "Create QR Code"  },
  { to: "/analytics", icon: "📊", label: "Analytics"    },
  { to: "/documents",     icon: "📄", label: "Documents"       },
  { to: "/profile", icon: "👤", label: "My Account"      },

]

const BOTTOM_NAV = [
  { to: "/contact", icon: "💬", label: "Contact us" },
  { to: "/faq",     icon: "❓", label: "FAQs"        },
]

export default function AppSidebar() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const isActive = (to) => location.pathname.startsWith(to)

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">Q</span>
        <span className="sidebar__logo-name">QGen Events</span>
      </div>

      {/* Main nav */}
      <nav className="sidebar__nav">
        {NAV.map(item => (
          <Link
            key={item.label}
            to={item.to}
            className={`sidebar__link ${isActive(item.to) ? "sidebar__link--active" : ""}`}
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="sidebar__bottom">
        {BOTTOM_NAV.map(item => (
          <Link
            key={item.label}
            to={item.to}
            className="sidebar__link sidebar__link--muted"
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </Link>
        ))}
        <button className="sidebar__logout" onClick={handleLogout}>
          Sign out
        </button>
      </div>
    </aside>
  )
}