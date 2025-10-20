import React, { useState } from 'react';
import { useJobGeneration } from '../hooks/useJobGeneration';
import useSearch from '../hooks/useSearch';
import JobCard from './JobCard';

export default function JobSearch() {
  const [jobs, setJobs] = useState([]); // Store fetched jobs
  const { keyword, setKeyword, location, setLocation, results, reset } = useSearch(jobs, {
    keys: ['title', 'company', 'location'],
  });

  const { mutate, isLoading, error } = useJobGeneration();

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log('Keyword:', keyword);
    console.log('Location:', location);

    mutate(
      { keyword, location },
      {
        onSuccess: (data) => {
          setJobs(data); // Update the jobs state with the fetched data
        },
        onError: (err) => {
          console.error('Error fetching jobs:', err.message);
        },
      
      }
    );
  };

  return (
    <div className="job-search-container">
      <form onSubmit={handleSearch} className="job-search-form">
        <input
          type="text"
          placeholder="Enter job keyword"
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
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>

      {error && <p className="error-message">Failed to fetch jobs. Please try again.</p>}

      <div className="job-results">
        {isLoading && <p>Loading jobs...</p>}
        {results.length > 0 ? (
          results.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
            />
          ))
        ) : (
          !isLoading && <p>No jobs found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}