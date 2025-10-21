import "../styles/JobCard.css";

export default function JobCard({ job }) {
  console.log("Rendering JobCard with job:", job);
  const { title, company, location, salary, description, requirements } = job;

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Salary:</strong> {salary}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Requirements:</strong></p>
      <ul>
        {requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

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