import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { setCredentials } from "../../redux/authSlice"
import { loginUser } from "../../services/authService"
import AuthLeft from "../../components/AuthLeft"
import "./auth.css"

function Login() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await loginUser(email, password)
      dispatch(setCredentials(data))
      navigate("/app")
    } catch {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-root">

      <AuthLeft />

      <div className="auth-right">
        <div className="auth-card">

          <div className="auth-card__head">
            <h2 className="auth-card__title">Welcome back</h2>
            <p className="auth-card__sub">Sign in to your QGen account</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email address</label>
              <input
                id="email"
                className="auth-input"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label className="auth-label" htmlFor="password">Password</label>
                <a href="/forgot-password" className="auth-forgot">Forgot password?</a>
              </div>
              
                <input
                  id="password"
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                
            </div>

            <button
              type="submit"
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              disabled={loading}
            >
              {loading ? <span className="auth-spinner" /> : "Sign in "}
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-switch__link">Create one free</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login