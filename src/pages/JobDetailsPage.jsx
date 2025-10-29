import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/JobDetailsPage.css";

function JobDetailsPage() {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <p>Job details not available.</p>;
  }

  return (
    <div className="job-details-container">
      <div className="job-details-header">
        <h1>{job.title}</h1>
        <p>{job.company} - {job.location}</p>
      </div>
      <div className="job-details-content">
        <h2>Job Description</h2>
        <p>{job.description}</p>
        <h2>Salary</h2>
        <p>{job.salary || "Not specified"}</p>
        <h2>Benefits</h2>
        <p>{job.benefits || "Not specified"}</p>
        <h2>Requirements</h2>
        <ul>
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
}

export default JobDetailsPage;
