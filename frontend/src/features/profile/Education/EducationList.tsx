import { useEffect, useState } from "react";
import type { IEducation } from "../../../types";
import EducationItem from "./EducationItem";
import { getUserEducationApi } from "../../../shared/components/config/api";

interface IProps {
  userId: string;
  isSelf: boolean;
}

export default function EducationList({ userId, isSelf }: IProps) {
  const [educations, setEducations] = useState<IEducation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserEducationApi(userId)
      .then((res: { data: { education: IEducation[] } }) => {
        setEducations(res.data.education);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  if (!educations || educations.length === 0) {
    return <p>No education added yet.</p>;
  }

  return (
    <div>
      {educations.map((edu) => (
        <EducationItem
          key={edu._id}
          edu={edu}
          isSelf={isSelf}
          setEducations={setEducations}
        />
      ))}
    </div>
  );
}
