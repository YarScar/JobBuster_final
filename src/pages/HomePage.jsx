import JobCard from '../components/JobCard';
import useSearch from '../hooks/useSearch';

function Home() {
  // local state is now managed by the useSearch hook

  // In a real app, this data would come from an API call
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      location: 'Remote',
      company: 'Tech Solutions Inc.',
      status: 'verified',
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'New York',
      company: 'Innovate Co.',
      status: 'warning',
    },
    {
      id: 3,
      title: 'UX Designer',
      location: 'San Francisco',
      company: 'Creative Minds LLC',
      status: 'verified',
    },

  ];

  // use the client-side search hook to filter jobs by keyword + location
  const { keyword: jobKeyword, setKeyword, location, setLocation, results: filteredJobs, reset } = useSearch(jobs, { keys: ['title', 'company', 'location'] });

  const handleSearch = () => {
    // For now we log the active filters; filtering already happens live via the hook
    console.log('Searching for:', { jobKeyword, location });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Verified Jobs You Can Trust</h1>
        <p>All Job postings on my site are verified and safe</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Job title or Keyword"
            value={jobKeyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="Job keyword"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Location"
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button className="search-btn" onClick={reset} style={{marginLeft:8}}>Clear</button>
        </div>
      </section>

      {/* Job Listings */}
      <section className="job-listings">
        <h2>Job Listings</h2>
        {filteredJobs.length === 0 ? (
          <p>No jobs match your search.</p>
        ) : (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        )}
      </section>
    </div>
  );
}

export default Home;
