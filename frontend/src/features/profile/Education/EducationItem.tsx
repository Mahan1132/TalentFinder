//EducationItem
import { deleteEducationApi } from "../../../shared/components/config/api";
import type { IEducation } from "../../../types";
import type { Dispatch, SetStateAction } from "react";

interface IProps {
  edu: IEducation;
  isSelf: boolean;
  setEducations: Dispatch<SetStateAction<IEducation[]>>;
}

export default function EducationItem({ edu, isSelf, setEducations }: IProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this education?")) return;
    try {
      await deleteEducationApi(edu._id);
      setEducations((prev) => prev.filter((e) => e._id !== edu._id));
    } catch (err) {
      console.error("Failed to delete education", err);
      alert("Could not delete education.");
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toISOString().split("T")[0];

  return (
    <div className="education-box">
      <div className="education-header">
        <h3>{edu.degree}</h3>
        {isSelf && (
          <div className="education-actions">
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="education-meta">
        <strong>School/College:</strong> {edu.school}
      </p>
      {edu.board && (
        <p>
          <strong>Board:</strong> {edu.board}
        </p>
      )}
      {edu.address && (
        <p>
          <strong>Address:</strong> {edu.address}
        </p>
      )}

      <p className="education-dates">
        <strong>Duration:</strong> {formatDate(edu.startDate)} →{" "}
        {edu.endDate ? formatDate(edu.endDate) : "Present"}
      </p>
    </div>
  );
}
