import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
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
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const getJobIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    for (const [key, icon] of Object.entries(jobIcons)) {
      if (lowerTitle.includes(key)) {
        return icon;
      }
    }
    return jobIcons.default; // Default icon if no match is found
  };

  const jobIcon = getJobIcon(job.title);

  const isFavorite = favorites.some((fav) => fav.id === job.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(job.id);
    } else {
      addFavorite(job);
    }
  };

  const handleClick = () => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  return (
    <div className="job-card">
      <div className="job-info" onClick={handleClick}>
        <div className="job-icon">
          <span className="job-icon-placeholder">{jobIcon}</span>
        </div>
        <div>
          <h3>{job.title}</h3>
          <p>{job.company} - {job.location}</p>
        </div>
      </div>
      <div className="job-actions">
        <button className="apply-btn" onClick={handleClick}>
          Apply
        </button>
        <button
          className={`favorite-btn ${isFavorite ? "filled" : ""}`}
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "💜" : "🤍"}
        </button>
        {job.isVerified && <span className="status verified">Verified</span>}
      </div>
    </div>
  );
}