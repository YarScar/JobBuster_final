import { useState } from 'react';
import { useJobGeneration } from '../hooks/useJobGeneration';
import { JobAssistant } from '../components/JobAssistantChatBot';
import JobCard from '../components/JobCard';
import JobSearch from '../components/JobSearch';

function Home() {

  // State for the job search keyword
  const [keyword, setKeyword] = useState('');

  // State for the job search location
  const [location, setLocation] = useState('');

  // State for displaying error messages
  const [error, setError] = useState('');

  // State for toggling the Job Assistant
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Hook for job generation
  const jobGeneration = useJobGeneration();

  // Function to toggle the Job Assistant
  const toggleAssistant = () => {
    setIsAssistantOpen((prev) => !prev);
  };

  // Function to handle the job search
  const handleSearch = async () => {
    setError(''); // Clear previous errors


    if (!keyword || !location) {
      setError('Please enter both a keyword and a location.');
      return;
    }

    try {
      console.log('Triggering job search with:', { keyword, location });
      await jobGeneration.mutateAsync({ keyword, location });
    } catch (error) {
      setError('Failed to fetch jobs. Please try again.');
      console.error('Error generating jobs:', error); // Log the full error object for debugging
    }
  };

  return (
    <>
      {/* Search Bar Section */}
      <section className="search-bar">
        <input
          type="text"
          placeholder="Keyword (e.g., Developer)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch} disabled={jobGeneration.isLoading}>
          {jobGeneration.isLoading ? 'Searching...' : 'Search'}
        </button>
      </section>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Listings Section */}
      <section className="job-listings">
        {jobGeneration.isLoading && <p>Loading jobs...</p>}
        {jobGeneration.data?.jobs?.length > 0 ? (
          jobGeneration.data.jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          !jobGeneration.isLoading && <p>No jobs found. Try a different search.</p>
        )}
      </section>

      {/* Job Assistant Section */}
      <section>
        <JobAssistant
          jobContext={null}
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
        />

        <button
          className="assistant-toggle"
          onClick={toggleAssistant}
          aria-label="Toggle job assistant"
        >
          🌷
        </button>
      </section>
    </>
  );
}

export default Home;