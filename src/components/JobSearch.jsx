import { useState } from "react";
import { useJobGeneration } from "../hooks/useJobGeneration";
import JobCard from "./JobCard";
import "../styles/SearchBar.css";

export default function JobSearch() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]); // State to store the fetched jobs
  const [error, setError] = useState(""); // State to store error messages

  console.log("Jobs array before rendering:", jobs);

  // Use the useJobGeneration hook
  const { mutate, isLoading } = useJobGeneration();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!keyword || !location) {
      setError("Please enter both a job title and a location.");
      console.warn("Keyword or location is missing.");
      return;
    }

    console.log("Triggering API call with:", { keyword, location });

    // Trigger the API call using the mutate function
    mutate(
      { keyword, location },
      {
        onSuccess: (data) => {
          try {
            const content = data.choices[0]?.message?.content;
            console.log("Raw content from API:", content); // Log the raw content for debugging
            const parsedJobs = JSON.parse(content); // Parse the JSON string into an array
            console.log("Parsed jobs:", parsedJobs); // Log the parsed jobs array
            setJobs(parsedJobs); // Update the jobs state with the parsed data
            setError(""); // Clear any previous errors
          } catch (error) {
            console.error("Failed to parse API response:", error);
            setError("Failed to process job data. Please try again.");
          }
        },
        onError: (err) => {
          console.error("Error fetching jobs:", err.message);
          setError("Failed to fetch jobs. Please try again.");
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

      {error && <p className="error-message">{error}</p>}

      <div className="job-results">
        {isLoading && <p>Loading jobs...</p>}
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