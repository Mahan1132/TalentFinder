// AddExperience.tsx
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IExperience } from "../../types";
import { addExperienceApi } from "../../shared/components/config/api";

interface IProps {
  setExperiences: Dispatch<SetStateAction<IExperience[]>>;
}

export default function AddExperience({ setExperiences }: IProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await addExperienceApi(formData as unknown as IExperience);
      setExperiences((prev) => [res.data.experience, ...prev]);
      setMessage("✅ Experience added successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setIsOpen(false);
    } catch (err) {
      console.error("Add experience failed:", err);
      setMessage("❌ Failed to add experience.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Plain button - no box */}
      <button className="toggle-edit-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cancel" : "Add Experience"}
      </button>

      {/* Form inside card/box */}
      {isOpen && (
        <div className="experience-box">
          <form
            className="edit-profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form-group">
              <label>Job Title</label>
              <input
                name="title"
                placeholder="e.g. Software Engineer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                name="company"
                placeholder="e.g. Google"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Describe your role and achievements"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Experience"}
            </button>
          </form>

          {message && <p className="status-message">{message}</p>}
        </div>
      )}
    </div>
  );
}
