import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="card">
      <h2>Dashboard 🎯</h2>
      <p>You are successfully logged in</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard