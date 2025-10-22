import { useState } from 'react';
import { useJobGeneration } from '../hooks/useJobGeneration';
import { JobAssistant } from '../components/JobAssistantChatBot';
import JobCard from '../components/JobCard';
import '../styles/HomePage.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const jobGeneration = useJobGeneration();

  // Toggle the Job Assistant
  const toggleAssistant = () => {
    setIsAssistantOpen((prev) => !prev);
  };

  // Handle the job search
  const handleSearch = async () => {
    setError('');
    setIsLoading(true); // Set loading to true when search starts

    if (!keyword || !location) {
      setError('Please enter both a keyword and a location.');
      setIsLoading(false); // Reset loading if validation fails
      return;
    }

    try {
      console.log('Triggering job search with:', { keyword, location });
      const fetchedJobs = await jobGeneration.mutateAsync({ keyword, location });
      setJobs(fetchedJobs);
    } catch (error) {
      setError('Failed to fetch jobs. Please try again.');
      console.error('Error generating jobs:', error);
    } finally {
      setIsLoading(false); // Reset loading when search completes
    }
  };

  // Clear the search inputs and results
  const clearSearch = () => {
    try {
      setKeyword('');
      setLocation('');
      setJobs([]);
      setError('');
    } catch (error) {
      console.error('Error clearing search:', error);
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
        <button onClick={handleSearch} disabled={isLoading} className="search-btn">
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        <button onClick={clearSearch} className="clear-btn">
          Clear
        </button>
      </section>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Job Listings Section */}
      <section className="job-listings">
        {isLoading ? (
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>Search a job!</p>
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