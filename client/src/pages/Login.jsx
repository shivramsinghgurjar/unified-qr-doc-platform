import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { setCredentials } from "../redux/authSlice"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      })

      dispatch(setCredentials(res.data))
      navigate("/")
    } catch (err) {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="card">
      <h2>Welcome Back 👋</h2>
      <p>Please login to your account</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <span>
        Don’t have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  )
}

export default Login