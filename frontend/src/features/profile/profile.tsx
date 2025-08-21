// src/features/profile/Profile.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import ExperienceList from "./ExperienceList";
import UploadProfilePicture from "./UploadProfilePicture";
import type { IUser } from "../../types";
import { getUserByIdApi } from "../../shared/components/config/api";
import "./profile.css";

interface IUserResponse {
  user: IUser;
  isSelf: boolean;
}

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isSelf, setIsSelf] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getUserByIdApi(id)
      .then((res) => {
        const data = res.data as IUserResponse;
        setUserData(data.user);
        setIsSelf(data.isSelf);
      })
      .catch((err) => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!userData) return <div className="not-found">User not found</div>;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-pic-circle">
          {userData.profilePicture?.url ? (
            <img src={userData.profilePicture.url} alt="Profile" />
          ) : (
            getInitials(userData.username)
          )}
        </div>

        <h1>{userData.username}'s Profile</h1>

        {/* Show upload option only for self */}
        {isSelf && <UploadProfilePicture setUserData={setUserData} />}
      </div>

      {/* Profile Info */}
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        {userData.bio && (
          <p>
            <strong>Bio:</strong> {userData.bio}
          </p>
        )}
        {userData.skills && (
          <p>
            <strong>Skills:</strong> {userData.skills}
          </p>
        )}
      </div>

      {/* Edit Profile (only if it's your own profile) */}
      {isSelf && <EditProfile userData={userData} setUserData={setUserData} />}

      {/* Experience Section */}
      <ExperienceList userId={userData._id} isSelf={isSelf} />
    </div>
  );
}
