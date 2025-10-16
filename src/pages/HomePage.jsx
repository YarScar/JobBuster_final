import { useState } from 'react';
import { useJobGeneration } from '../hooks/useJobGeneration';
import JobCard from '../components/JobCard';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const jobGeneration = useJobGeneration();

  const handleSearch = async () => {
    setError(''); // Clear previous errors

    if (!keyword || !location) {
      setError('Please enter both a keyword and a location.');
      return;
    }

    try {
      await jobGeneration.mutateAsync({ keyword, location });
    } catch (error) {
      setError('Failed to fetch jobs. Please try again.');
      console.error('Error generating jobs:', error.message);
    }
  };

  return (
    <div>
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

      {error && <p className="error-message">{error}</p>}

      <section className="job-listings">
        {jobGeneration.isLoading && <p>Loading jobs...</p>}
        {jobGeneration.data?.jobs?.length > 0 ? (
          jobGeneration.data.jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          !jobGeneration.isLoading && <p>No jobs found. Try a different search.</p>
        )}
      </section>
    </div>
  );
}

export default Home;