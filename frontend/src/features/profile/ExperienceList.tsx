import { useEffect, useState } from "react";
import ExperienceItem from "./ExperienceItem";
import AddExperience from "./AddExperience";
import type { IExperience } from "../../types";
import { getUserExperiencesApi } from "../../shared/components/config/api";

interface IExperienceListProps {
  userId: string;
  isSelf: boolean;
}

export default function ExperienceList({
  userId,
  isSelf,
}: IExperienceListProps) {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserExperiencesApi(userId)
      .then((res: { data: { experiences: IExperience[] } }) => {
        setExperiences(res.data.experiences);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="loading">Loading experiences...</div>;

  return (
    <div className="experience-section">
      <h2 className="experience-title">Experience</h2>

      {/* Add Experience (if self) */}
      {isSelf && (
        <div className="experience-form">
          <AddExperience setExperiences={setExperiences} />
        </div>
      )}

      {/* Experience Cards */}
      <div className="experience-list">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <ExperienceItem
              key={exp._id}
              exp={exp}
              setExperiences={setExperiences}
              isSelf={isSelf}
            />
          ))
        ) : (
          <p className="no-experience">No experiences yet.</p>
        )}
      </div>
    </div>
  );
}
