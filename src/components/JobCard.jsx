import React from "react";
import "../styles/JobCard.css";

// Mapping of job categories to relevant icons
const jobIcons = {
  developer: "💻", // Developer
  designer: "🎨", // Designer
  manager: "📊", // Manager
  teacher: "📚", // Teacher
  engineer: "🔧", // Engineer
  doctor: "⚕️", // Doctor
  writer: "✍️", // Writer
  chef: "🍳", // Chef
  mechanic: "🛠️", // Mechanic
  scientist: "🧑‍🔬", // Scientist
  default: "🏢", // Default icon for unspecified jobs
};

export default function JobCard({ job }) {
  const { title, company, location, isVerified } = job;

  // Determine the icon based on the job title or category
  const getJobIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    for (const [key, icon] of Object.entries(jobIcons)) {
      if (lowerTitle.includes(key)) {
        return icon;
      }
    }
    return jobIcons.default; // Default icon if no match is found
  };

  const jobIcon = getJobIcon(title);

  return (
    <div className="job-card" onClick={() => console.log(`Clicked on ${title}`)}>
      <div className="job-info">
        <div className="job-icon">
          <span className="job-icon-placeholder">{jobIcon}</span>
        </div>
        <div>
          <h3>{title}</h3>
          <p>{company} - {location}</p>
        </div>
      </div>
      <div className="job-actions">
        {isVerified && <span className="status verified">Verified</span>}
        <button className="apply-btn">Apply Now</button>
      </div>
    </div>
  );
}