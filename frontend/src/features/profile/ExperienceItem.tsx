import { deleteExperienceApi } from "../../shared/components/config/api";
import type { IExperience } from "../../types";
import type { Dispatch, SetStateAction } from "react";

interface IProps {
  exp: IExperience;
  isSelf: boolean;
  setExperiences: Dispatch<SetStateAction<IExperience[]>>;
}

export default function ExperienceItem({
  exp,
  isSelf,
  setExperiences,
}: IProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      await deleteExperienceApi(exp._id);
      setExperiences((prev) => prev.filter((e) => e._id !== exp._id));
    } catch (err) {
      console.error("Failed to delete experience", err);
      alert("Could not delete experience.");
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div className="experience-box">
      <div className="experience-header">
        <h3>{exp.title}</h3>
        {isSelf && (
          <div className="experience-actions">
            {/* Later you can add an Edit button here */}
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>

      <p className="experience-meta">
        <strong>{exp.company}</strong>
        {exp.location ? ` | ${exp.location}` : ""}
      </p>

      <p className="experience-dates">
        {formatDate(exp.startDate)} to {formatDate(exp.endDate)}
      </p>

      {exp.description && (
        <p className="experience-description">{exp.description}</p>
      )}
    </div>
  );
}
