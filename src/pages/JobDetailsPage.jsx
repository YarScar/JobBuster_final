import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/JobDetailsPage.css';

function JobDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <div className="job-details-container">
        <p>Job details not found. Please go back and select a job.</p>
        <button onClick={() => navigate('/')} className="back-btn">Go Back</button>
      </div>
    );
  }

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p className="company">{job.company}</p>
      <p className="location">{job.location}</p>
      <p className="description">{job.description}</p>
      <h3>Requirements:</h3>
      <ul>
        {job.requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/')} className="back-btn">Go Back</button>
    </div>
  );
}

export default JobDetailsPage;
