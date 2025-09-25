import React from "react";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Verified Jobs You Can Trust</h1>
        <p>All Job postings on my site are verified and safe</p>
        <div className="search-box">
          <input type="text" placeholder="Job title or Keyword" />
          <input type="text" placeholder="Location" />
          <button className="search-btn">Search</button>
        </div>
      </section>

      {/* Job Listings */}
      <section className="job-listings">
        <h2>Job Listings</h2>

        <div className="job-card">
          <div className="job-info">
            <div className="job-icon"></div>
            <div>
              <h3>Job Title</h3>
              <p>Company</p>
            </div>
          </div>
          <div className="job-actions">
            <span className="status verified">Verified</span>
            <button className="apply-btn">Apply</button>
          </div>
        </div>

        <div className="job-card">
          <div className="job-info">
            <div className="job-icon"></div>
            <div>
              <h3>Job Title</h3>
              <p>Company</p>
            </div>
          </div>
          <div className="job-actions">
            <span className="status warning">Warning</span>
            <button className="apply-btn">Apply</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
