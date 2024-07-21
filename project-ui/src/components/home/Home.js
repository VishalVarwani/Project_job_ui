import React, { useState } from 'react';

export default function Home() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_title: jobTitle, location: location }),
      });
      const data = await response.json();
      if (data.message) {
        console.log(data.message);
        fetchJobs(); // Fetch jobs after posting new search
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api');
      const data = await response.json();
      console.log('Fetched data:', data); // Log the data to see its structure
      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input 
            type="text" 
            value={jobTitle} 
            onChange={(e) => setJobTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Location:</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Fetch Jobs</button>
      </form>
      <div>
        {Array.isArray(jobs) ? (
          jobs.map((job, index) => (
            <div key={index}>
              <h2>{job.Title}</h2>
              <p>{job.Company}</p>
              <p>{job.Location}</p>
              <a href={job.Link} target="_blank" rel="noopener noreferrer">Job Link</a>
              <hr />
            </div>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </div>
    </div>
  );
}
