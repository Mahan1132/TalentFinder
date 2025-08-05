import { useNavigate } from "react-router-dom";
import "./notFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={() => navigate(-1)} className="btn-back">Go Back</button>
    </div>
  );
}
