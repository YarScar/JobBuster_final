import { useState } from "react";
import { useJobGeneration } from "../hooks/useJobGeneration";
import JobCard from "./JobCard";
import "../styles/SearchBar.css";

export default function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);  // State to store the fetched jobs
  console.log("Jobs array before rendering:", jobs);
  // Use the useJobGeneration hook
  const { mutate, isLoading, error } = useJobGeneration();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword || !location) {
      console.warn("Keyword or location is missing.");
      return;
    }

    console.log("Triggering API call with:", { keyword, location });

    // Trigger the API call using the mutate function
    mutate(
      { keyword, location },
      {
        onSuccess: (data) => {
          console.log("API call successful. Data received:", data);
          setJobs(data); // Update the jobs state with the fetched data
        },
        onSuccess: (data) => {

          console.log("Jobs state updated with:", data); //logging if the jobs are being updated
          setJobs(data); // Update the jobs state with the fetched data
        },
        onError: (err) => {
          console.error("Error fetching jobs:", err.message);
        },
      }
    );
  };

  return (
    <div className="job-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter job title"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {isLoading && <p>Loading jobs...</p>}
      {error && <p className="error-message">Error: {error.message}</p>}

      <div className="job-results">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job} // Pass the entire job object to the JobCard component
            />
          ))
        ) : (
          !isLoading && <p>No jobs found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}