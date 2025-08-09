import { useNavigate } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate("/")}
        aria-label="Go back to homepage"
      >
        ← Back
      </button>

      <div className="profile-header">
        <div className="initials">MS</div>
        <h1>Mahan Shrestha</h1>
        <h2>Frontend Designer</h2>
        <p className="location">Lazimpat, Kathmandu</p>
        <p className="summary">
          Passionate frontend developer with a love for clean UI and intuitive
          UX. Skilled in React, HTML, CSS, and JavaScript.
        </p>
      </div>

      {/* Experience Section */}
      <div className="section experience-section">
        <h3>Experience</h3>
        <div className="experience-card">
          <h4>Frontend Developer Intern</h4>
          <p className="company">Axis Software</p>
          <p className="date">May 2025 – Aug 2025</p>
          <p>Worked on modern UI designs using React, CSS, and REST APIs.</p>
        </div>
        <div className="experience-card">
          <h4>Freelance Web Designer</h4>
          <p className="company">Self-employed</p>
          <p className="date">2024 – 2025</p>
          <p>
            Created responsive websites for small businesses and personal
            projects.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className="section education-section">
        <h3>Education</h3>
        <div className="education-card">
          <h4>Islington College</h4>
          <p className="location">Jawalakhel, Lalitpur</p>
          <p className="course">BSc (Hons) in Computing</p>
          <p className="date">2021 - 2026</p>
        </div>
        <div className="education-card">
          <h4>St. Xavier's School</h4>
          <p className="location">Jawalakhel, Lalitpur</p>
          <p className="course">SLC</p>
          <p className="date">2020 - 2021</p>
        </div>
        <div className="education-card">
          <h4>St. Xavier's School</h4>
          <p className="location">Jawalakhel, Lalitpur</p>
          <p className="course">SEE</p>
          <p className="date">2019</p>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="section skills-section">
        <h3>Soft Skills</h3>
        <div className="skills-tags">
          <span>Communication</span>
          <span>Problem Solving</span>
          <span>Leadership</span>
          <span>Creativity</span>
          <span>Time Management</span>
        </div>
      </div>

      {/* Technical Skills */}
      <div className="section skills-section">
        <h3>Technical Skills</h3>
        <div className="skills-tags">
          <span>HTML</span>
          <span>CSS</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Git</span>
          <span>REST APIs</span>
        </div>
      </div>

      {/* Certificates & Achievements */}
      <div className="section certificates-section">
        <h3>Certificates & Achievements</h3>
        <div className="certificate-card">
          <h4>React Frontend Developer</h4>
          <p className="issuer">Coursera – Meta</p>
          <p className="date">Issued: July 2025</p>
        </div>
        <div className="certificate-card">
          <h4>JavaScript Algorithms and Data Structures</h4>
          <p className="issuer">freeCodeCamp</p>
          <p className="date">Issued: April 2025</p>
        </div>
        <div className="certificate-card">
          <h4>Best UI Design – Hackathon 2024</h4>
          <p className="issuer">TechWiz Hackathon</p>
          <p className="date">Awarded: December 2024</p>
        </div>
      </div>
    </div>
  );
}
