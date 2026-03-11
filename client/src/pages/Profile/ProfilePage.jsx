import { useEffect, useState } from "react"
import { getProfile, updateProfile, changePassword } from "../../services/userService"
import Navbar from "../../components/Navbar/Navbar"
import "./ProfilePage.css"

function ProfilePage() {
  const [profile,     setProfile]     = useState({})
  const [name,        setName]        = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [nameMsg,     setNameMsg]     = useState(null)
  const [passMsg,     setPassMsg]     = useState(null)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const res = await getProfile()
      setProfile(res.data)
      setName(res.data.name || "")
    } catch {
      console.error("Failed to load profile")
    }
  }

  const handleUpdateProfile = async () => {
    if (!name.trim()) return setNameMsg({ ok: false, text: "Name cannot be empty." })
    try {
      await updateProfile({ name })
      setNameMsg({ ok: true, text: "Profile updated successfully." })
      fetchProfile()
    } catch {
      setNameMsg({ ok: false, text: "Update failed. Please try again." })
    }
  }

  const handleChangePassword = async () => {
    if (!oldPassword) return setPassMsg({ ok: false, text: "Enter your current password." })
    if (newPassword.length < 8) return setPassMsg({ ok: false, text: "New password must be at least 8 characters." })
    try {
      await changePassword({ oldPassword, newPassword })
      setPassMsg({ ok: true, text: "Password changed successfully." })
      setOldPassword("")
      setNewPassword("")
    } catch {
      setPassMsg({ ok: false, text: "Incorrect current password." })
    }
  }

  const initials = (profile.name || "?")
    .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()

  return (
      <Navbar>
      <div className="pf-page">
        <div className="pf-container">

          {/* Page title */}
          <div className="pf-page-head">
            <h1 className="pf-page-title">User Profile</h1>
            <p className="pf-page-sub">Manage your account settings, security preferences, and personal information.</p>
          </div>

          <div className="pf-layout">

            {/* ── Left sidebar ── */}
          
                 
            {/* ── Right panel ── */}
            <div className="pf-main">

              {/* Locked fields row */}
              <div className="pf-locked-row">
                <div className="pf-locked-field">
                  <label className="pf-locked-label">EMAIL ADDRESS</label>
                  <div className="pf-locked-input">
                    <span className="pf-locked-input__icon">✉</span>
                    <span className="pf-locked-input__val">{profile.email || "—"}</span>
                    <span className="pf-locked-input__lock">🔒</span>
                  </div>
                </div>
                <div className="pf-locked-field">
                  <label className="pf-locked-label">ACCOUNT ROLE</label>
                  <div className="pf-locked-input">
                    <span className="pf-locked-input__icon">🛡</span>
                    <span className="pf-locked-input__val">{profile.role || "—"}</span>
                    <span className="pf-locked-input__lock">🔒</span>
                  </div>
                </div>
              </div>

              {/* Update name */}
              <div className="pf-section">
                <h2 className="pf-section__title">Update Profile Name</h2>
                <p className="pf-section__sub">This is how your name will appear across the platform.</p>
                <label className="pf-label">FULL NAME</label>
                <div className="pf-inline-row">
                  <input
                    className="pf-input"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={e => { setName(e.target.value); setNameMsg(null) }}
                  />
                  <button className="pf-btn" onClick={handleUpdateProfile}>Update Profile</button>
                </div>
                {nameMsg && <p className={`pf-msg ${nameMsg.ok ? "pf-msg--ok" : "pf-msg--err"}`}>{nameMsg.text}</p>}
              </div>

              <div className="pf-divider" />

              {/* Change password */}
              <div className="pf-section">
                <h2 className="pf-section__title">Change Password</h2>
                <p className="pf-section__sub">Ensure your account is using a long, random password to stay secure.</p>
                <div className="pf-two-col">
                  <div>
                    <label className="pf-label">OLD PASSWORD</label>
                    <input
                      className="pf-input"
                      type="password"
                      placeholder="••••••••"
                      value={oldPassword}
                      onChange={e => { setOldPassword(e.target.value); setPassMsg(null) }}
                    />
                  </div>
                  <div>
                    <label className="pf-label">NEW PASSWORD</label>
                    <input
                      className="pf-input"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={e => { setNewPassword(e.target.value); setPassMsg(null) }}
                    />
                  </div>
                </div>
                {passMsg && <p className={`pf-msg ${passMsg.ok ? "pf-msg--ok" : "pf-msg--err"}`}>{passMsg.text}</p>}
                <button className="pf-btn pf-btn--outline" onClick={handleChangePassword}>Change Password</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Navbar>
  )
}

export default ProfilePage