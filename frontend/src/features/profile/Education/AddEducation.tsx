// AddEducation.tsx
import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { IEducation } from "../../../types";
import { addEducationApi } from "../../../shared/components/config/api";

interface IProps {
  setEducations: Dispatch<SetStateAction<IEducation[]>>;
}

export default function AddEducation({ setEducations }: IProps) {
  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    board: "",
    address: "",
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await addEducationApi(formData as unknown as IEducation);
      // Add the new education to the top of the list
      setEducations((prev) => [res.data.education, ...prev]);
      setMessage("Education added successfully!");
      setFormData({
        degree: "",
        school: "",
        board: "",
        address: "",
        startDate: "",
        endDate: "",
      });
      setIsOpen(false);
    } catch (err) {
      console.error("Add education failed:", err);
      setMessage("Failed to add education.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Toggle button */}
      <button className="toggle-edit-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cancel" : "Add Education"}
      </button>

      {/* Form inside collapsible box */}
      {isOpen && (
        <div className="education-box">
          <form className="edit-profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Degree</label>
              <input
                name="degree"
                placeholder="e.g. BSc Computer Science"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>School/College</label>
              <input
                name="school"
                placeholder="e.g. Islington College"
                value={formData.school}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Board</label>
              <input
                name="board"
                placeholder="e.g. Cambridge"
                value={formData.board}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                placeholder="e.g. Kathmandu, Nepal"
                value={formData.address}
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

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Education"}
            </button>
          </form>

          {message && <p className="status-message">{message}</p>}
        </div>
      )}
    </div>
  );
}
