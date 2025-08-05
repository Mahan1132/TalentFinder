import "./profile.css";

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mahan Shrestha</h1>
        <h2>Designer</h2>
        <p className="location">Lazimpat,Kathmandu</p>
        <p className="summary">
          Passionate frontend developer with a love for clean UI and intuitive UX. Skilled in React, HTML, CSS, and JavaScript.
        </p>
      </div>

      <div className="experience-section">
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
          <p>Created responsive websites for small businesses and personal projects.</p>
        </div>
      </div>
    </div>
  );
}
