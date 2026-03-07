import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { setCredentials } from "../../redux/authSlice"
import { registerUser } from "../../services/authService"
import AuthLeft from "../../components/AuthLeft"
import "./auth.css"

function Register() {
  const [name,     setName]     = useState("")
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /* password strength */
  const strength = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8)          s++
    if (/[A-Z]/.test(password))        s++
    if (/[0-9]/.test(password))        s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength]
  const strengthClass = ["", "weak", "fair", "good", "strong"][strength]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setLoading(true)
    try {
      const data = await registerUser(name, email, password)
      dispatch(setCredentials(data))
      navigate("/app")
    } catch {
      setError("Registration failed. This email may already be in use.")
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
            <h2 className="auth-card__title">Create your account</h2>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="auth-field">
              <label className="auth-label" htmlFor="name">Full name</label>
              <input
                id="name"
                className="auth-input"
                type="text"
                placeholder="Admin"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-email">Email address</label>
              <input
                id="reg-email"
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
              <label className="auth-label" htmlFor="reg-password">Password</label>
             
                <input
                  id="reg-password"
                  className="auth-input"
              
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                
              {password && (
                <div className="auth-strength">
                  <div className="auth-strength__bars">
                    {[1,2,3,4].map(n => (
                      <div
                        key={n}
                        className={`auth-strength__bar ${strength >= n ? `auth-strength__bar--${strengthClass}` : ""}`}
                      />
                    ))}
                  </div>
                  <span className={`auth-strength__label auth-strength__label--${strengthClass}`}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`auth-submit ${loading ? "auth-submit--loading" : ""}`}
              disabled={loading}
            >
              {loading ? <span className="auth-spinner" /> : "Create account "}
            </button>

          </form>

          <p className="auth-terms">
            By registering you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </p>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-switch__link">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register