// src/features/profile/UploadProfilePicture.tsx

import { useState } from "react";
import { uploadProfilePictureApi } from "../../shared/components/config/api";
import type { IUser } from "../../types";

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export default function UploadProfilePicture({ setUserData }: IProps) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    setLoading(true);
    try {
      const res = await uploadProfilePictureApi(formData);
      // ✅ update only the profilePicture in userData
      setUserData((prev) =>
        prev ? { ...prev, profilePicture: res.data.image } : prev
      );
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-profile-pic">
      <label>
        {loading ? "Uploading..." : "Change Profile Picture"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
