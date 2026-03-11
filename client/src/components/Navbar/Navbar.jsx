import AppSidebar from "../Appsidebar"
import "./Navbar.css"

export default function Navbar({ children }) {
  return (
    <div className="dash-layout">
      <AppSidebar />
      <main className="dash-main">
        {children}
      </main>
    </div>
  )
}