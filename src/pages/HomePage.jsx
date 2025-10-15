import JobCard from '../components/JobCard';
import useSearch from '../hooks/useSearch';
import { useState, useEffect } from 'react';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from ChatGPT API
 useEffect(() => {
  // const fetchJobsFromChatGPT = async () => {
    try {

      setLoading(true);
      setError(null);

      console.log('🔍 Debug Info:');
      console.log('API Key exists:', !!import.meta.env.VITE_OPENAI_API_KEY);

      const response = fetch('https://api.openai.com/v1/chat/completions',{ 
        //my backend endpoint is /api/generate-jobs
        //problem (I had  a direct call which is a security risk)
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a job listings generator. Generate realistic job postings in valid JSON format only. Return an array of 15-20 job objects."
            },
            {
              role: "user",
              content: `Generate a diverse list of current job openings. Each job should have: id, title, company, location, salary, description (brief), verified (boolean), and requirements (array). Include various tech, business, creative, and remote positions. Return only valid JSON array with no additional text.`
            }
          ],
          //max_tokens: 2000,
          temperature: 0.7
        })
      });
     
      if (!response.ok) {
        throw new Error(`ChatGPT API Error: ${response.status} ${response.statusText}`);
      }

      const data = response.json();
      console.log('ChatGPT Response:', data);
      
      // Extract the generated job JSON from ChatGPT's response
      const jobsText = data.choices[0].message.content;
      
      // Parse the JSON response from ChatGPT
      //let generatedJobs;
      // try {
      //   // Clean the response (remove any markdown formatting)
      //   const cleanedText = jobsText.replace(/```json|```/g, '').trim();
      //   generatedJobs = JSON.parse(cleanedText);
      // } catch (parseError) {
      //   console.error('JSON Parse Error:', parseError);
      //   throw new Error('Failed to parse job data from ChatGPT');
      // }
      
      // Ensure we have an array
      // if (!Array.isArray(generatedJobs)) {
      //   throw new Error('ChatGPT did not return a valid job array');
      // }

      console.log('Parsed Jobs:', jobsText);
      
      //Map ChatGPT response to our job structure
      const mappedJobs = jobsText.map((job, index) => ({
        id: job.id || index + 1,
        title: job.title || 'Position Available',
        company: job.company || 'Great Company',
        location: job.location || 'Various Locations',
        salary: job.salary || 'Competitive',
        status: job.verified ? 'verified' : 'warning',
        icon: getJobIcon(job.title || ''),
        description: job.description || 'Exciting opportunity',
        requirements: job.requirements || []
      }));
      
      setJobs(mappedJobs);
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
      
      // Fallback to high-quality static data
      setJobs([
        {
          id: 1,
          title: 'Senior Software Engineer',
          location: 'Remote',
          company: 'TechFlow Solutions',
          status: 'verified',
          salary: '$120,000 - $160,000',
          icon: '💻',
          description: 'Build scalable applications with modern tech stack',
          requirements: ['React', 'Node.js', '5+ years experience']
        },
        {
          id: 2,
          title: 'Product Manager',
          location: 'San Francisco, CA',
          company: 'Innovation Labs',
          status: 'verified',
          salary: '$130,000 - $170,000',
          icon: '📊',
          description: 'Lead product strategy and development',
          requirements: ['MBA preferred', 'Product management', 'Analytics']
        },
        {
          id: 3,
          title: 'UX/UI Designer',
          location: 'New York, NY',
          company: 'Creative Studio Pro',
          status: 'verified',
          salary: '$85,000 - $120,000',
          icon: '🎨',
          description: 'Design beautiful user experiences',
          requirements: ['Figma', 'Design systems', 'User research']
        },
        {
          id: 4,
          title: 'Data Scientist',
          location: 'Austin, TX',
          company: 'DataCore Analytics',
          status: 'warning',
          salary: '$110,000 - $150,000',
          icon: '📈',
          description: 'Extract insights from complex datasets',
          requirements: ['Python', 'Machine Learning', 'SQL']
        },
        {
          id: 5,
          title: 'DevOps Engineer',
          location: 'Remote',
          company: 'CloudTech Systems',
          status: 'verified',
          salary: '$115,000 - $145,000',
          icon: '⚙️',
          description: 'Manage cloud infrastructure and deployments',
          requirements: ['AWS', 'Docker', 'Kubernetes']
        }
      ]);
    } finally {
      setLoading(false);
    }
  // };
}, []);

  // Helper function to assign icons based on job title
  const getJobIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('engineer') || titleLower.includes('developer')) return '💻';
    if (titleLower.includes('designer') || titleLower.includes('creative')) return '🎨';
    if (titleLower.includes('manager') || titleLower.includes('director')) return '📊';
    if (titleLower.includes('data') || titleLower.includes('analyst')) return '📈';
    if (titleLower.includes('marketing') || titleLower.includes('sales')) return '📢';
    if (titleLower.includes('devops') || titleLower.includes('ops')) return '⚙️';
    if (titleLower.includes('security')) return '🔒';
    if (titleLower.includes('hr') || titleLower.includes('people')) return '👥';
    return '💼';
  };

  // Use the client-side search hook
  const { keyword: jobKeyword, setKeyword, location, setLocation, results: filteredJobs, reset } = useSearch(jobs, { 
    keys: ['title', 'company', 'location'] 
  });

  const handleSearch = () => {
    console.log('Searching for:', { jobKeyword, location });
    console.log('Filtered results:', filteredJobs.length, 'jobs found');
  };

  // Refresh jobs function
  const getNewJobs = (e) => {
    //gives jobs based on search
    console.log('Fetching user input', { jobKeyword, location });
    e.preventDefault();
    setJobs([]);
    setLoading(true);
    setError(null);
    // Re-trigger the useEffect
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div>
        <section className="hero">
          <h1>Find Verified Jobs You Can Trust</h1>
          <p>AI is generating fresh job opportunities for you...</p>
          <div className="search-box">
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: '10px',
              backdropFilter: 'blur(10px)'
            }}>
              <p>🤖 ChatGPT is creating personalized job listings...</p>
              <div style={{ marginTop: '10px' }}>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: '2px', 
                  overflow: 'hidden' 
                }}>
                  <div style={{ 
                    width: '60%', 
                    height: '100%', 
                    background: 'linear-gradient(45deg, #667eea, #764ba2)', 
                    animation: 'loading 2s ease-in-out infinite' 
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state with fallback
  // Error state with fallback
if (error) {
  return (
    <div>
      <section className="hero">
        <h1>Find Verified Jobs You Can Trust</h1>
        <p>All Job postings on my site are verified and safe</p>
        
        {/* Keep the active search box */}
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
          <button className="search-btn" onClick={reset} style={{marginLeft: 8}}>Clear</button>
          <button className="search-btn" onClick={getNewJobs} style={{marginLeft: 8, background: '#10b981'}}>
            🔄 New Jobs
          </button>
        </div>
        
        {/* Error message below search */}
        <div style={{ 
          padding: '15px', 
          textAlign: 'center', 
          background: 'rgba(255,100,100,0.1)', 
          borderRadius: '10px',
          color: '#ff6b6b',
          marginTop: '20px'
        }}>
          <p>⚠️ AI Error: {error}</p>
          <p>Showing curated sample jobs instead - search still works!</p>
        </div>
      </section>

      <section className="job-listings">
        <h2>Job Listings (Curated Sample) - ({filteredJobs.length} jobs found)</h2>
        {filteredJobs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px',
            backdropFilter: 'blur(10px)'
          }}>
            <p>🔍 No jobs match your search criteria.</p>
            <p>Try different keywords or generate new job listings.</p>
            <button className="search-btn" onClick={reset} style={{marginTop: 10, marginRight: 8}}>
              Clear Filters
            </button>
            <button className="search-btn" onClick={getNewJobs} style={{marginTop: 10, background: '#10b981'}}>
              Generate New Jobs
            </button>
          </div>
        ) : (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        )}
      </section>
    </div>
  );
}

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Find Verified Jobs You Can Trust</h1>
        <p>AI-powered job listings tailored for you</p>
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
          <button className="search-btn" onClick={reset} style={{marginLeft: 8}}>Clear</button>
          <button className="search-btn" onClick={(e) => getNewJobs(e)} style={{marginLeft: 8, background: '#10b981'}}>
            🔄 New Jobs
          </button>
        </div>
      </section>

      {/* Job Listings */}
      <section className="job-listings">
        <h2>AI-Generated Job Listings ({filteredJobs.length} jobs found)</h2>
        {filteredJobs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '10px',
            backdropFilter: 'blur(10px)'
          }}>
            <p>🔍 No jobs match your search criteria.</p>
            <p>Try different keywords or generate new job listings.</p>
            <button className="search-btn" onClick={reset} style={{marginTop: 10, marginRight: 8}}>
              Clear Filters
            </button>
            <button className="search-btn" onClick={refreshJobs} style={{marginTop: 10, background: '#10b981'}}>
              Generate New Jobs
            </button>
          </div>
        ) : (
          filteredJobs.map(job => <JobCard key={job.id} job={job} />)
        )}
      </section>
    </div>
  );
}

export default Home;
