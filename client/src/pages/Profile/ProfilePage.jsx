import { useEffect, useState } from "react";
import { getProfile, updateProfile, changePassword } from "../../services/userService";
import Navbar from "../../components/Navbar";

function ProfilePage() {

  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
      setName(res.data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ name });
      alert("Profile updated");
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangePassword = async () => {
    try {
      await changePassword({ oldPassword, newPassword });

      alert("Password changed successfully");

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="profile-container">
        <div className="profile-card">

          <h2>User Profile</h2>

          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>

          <hr />

          <h3>Update Name</h3>

          <div className="profile-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button onClick={handleUpdateProfile}>
              Update Profile
            </button>
          </div>

          <hr />

          <h3>Change Password</h3>

          <div className="profile-form">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={handleChangePassword}>
              Change Password
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;