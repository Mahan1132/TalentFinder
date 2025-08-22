import { useState } from "react";
import { updateProfilePicApi } from "../../shared/components/config/api";
import type { IUser } from "../../types";

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  onUploadSuccess?: (newPic: { url: string; public_id: string }) => void; // ✅ Added this
}

export default function UploadProfilePicture({
  setUserData,
  onUploadSuccess,
}: IProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await updateProfilePicApi(file);
      const newPic = res.data.image; // ✅ Backend sends { success, image: {url, public_id} }

      // Update userData state
      setUserData((prev) =>
        prev ? { ...prev, profilePicture: newPic } : prev
      );

      // Call the callback if provided
      if (onUploadSuccess) onUploadSuccess(newPic); // ✅ Trigger callback after success
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-profile-picture">
      <label className="upload-label">
        {uploading ? "Uploading..." : "Change Profile Picture"}
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
