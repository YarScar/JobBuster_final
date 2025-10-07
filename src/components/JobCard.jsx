
function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-info">
        <div className="job-icon"></div>
        <div>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
      </div>
      <div className="job-actions">
        <span className={`status ${job.status}`}>
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
        <button className="apply-btn">Apply</button>
      </div>
    </div>
  );
}

export default JobCard;