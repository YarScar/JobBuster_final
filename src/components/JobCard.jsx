import React from 'react';
import '../styles/JobCard.css';

function JobCard({ title, company, location, description }) {
  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p>{description}</p>
    </div>
  );
}

export default JobCard;

// function JobCard({ job }) {
//   return (
//     <div className="job-card">
//       <h3>{job.title}</h3>
//       <p><strong>Company:</strong> {job.company}</p>
//       <p><strong>Location:</strong> {job.location}</p>
//       <p><strong>Salary:</strong> {job.salary}</p>
//       <p><strong>Description:</strong> {job.description}</p>
//       <ul>
//         <strong>Requirements:</strong>
//         {job.requirements.map((req, index) => (
//           <li key={index}>{req}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default JobCard;