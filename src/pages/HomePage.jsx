import { useState } from 'react';
import { useJobGeneration } from '../hooks/useJobGeneration';
import { JobAssistant } from '../components/JobAssistantChatBot';
import JobCard from '../components/JobCard';

function Home() {

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  
  // Job Assistant state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const toggleAssistant = () => {
    setIsAssistantOpen(prev => !prev);
  };
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
    <>
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

      <section>
        {/* Job Assistant Toggle Button */}
        <JobAssistant 
                  jobContext={null} 
                  isOpen={isAssistantOpen} 
                  onClose={() => setIsAssistantOpen(false)} 
                />

        {/* Job Assistant Toggle Button */}
        <button
          className="assistant-toggle"
          onClick={toggleAssistant}
          aria-label="Toggle job assistant"
        >
          🤖
        </button>
        
      </section>


      
    </>
  );
}

export default Home;