import { useState, type ChangeEvent } from "react";
import type { IUser } from "../../types";
import { updateUserApi } from "../../shared/components/config/api";

interface IEditProfileParams {
  userData: IUser;
  setUserData: (user: IUser) => void;
}

export default function EditProfile({
  userData,
  setUserData,
}: IEditProfileParams) {
  const [formData, setFormData] = useState<IUser>(userData);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await updateUserApi(userData._id, formData);
      setUserData(res.data.user);
      setMessage("Profile updated successfully!");
      setIsOpen(false);
    } catch (err) {
      console.error("Update failed", err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <button className="toggle-edit-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cancel" : "Edit Profile"}
      </button>

      {isOpen && (
        <form
          className="edit-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              placeholder="Bio"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              name="skills"
              value={formData.skills || ""}
              onChange={handleChange}
              placeholder="Skills (comma separated)"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      )}

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
