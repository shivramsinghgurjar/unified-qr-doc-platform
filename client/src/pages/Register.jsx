import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      })

      alert("Registered successfully 🎉")
      navigate("/login")
    } catch (err) {
      alert("Registration failed")
    }
  }

  return (
    <div className="card">
      <h2>Create Account 🚀</h2>
      <p>Start your journey with us</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">Register</button>
      </form>

      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  )
}

export default Register