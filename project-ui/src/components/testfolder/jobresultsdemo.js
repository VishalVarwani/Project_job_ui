import React,{useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headerjs from '../common/header/header';
import "../testfolder/jobresultsdemo.css";

export default function JobResults() {
  const Location = useLocation();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const { jobs } = Location.state || { jobs: [] };

  return (
    <div className='JobResults'>
      <Headerjs />
      <div className="page-container">
        <div className="sidebar">
          <h3>Filters</h3>
          <div className="filter-option">
            <label htmlFor="jobType">Job Type</label>
            <select id="jobType">
              <option value="">All</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div className="filter-option">
            <label>Location</label>
              <input
              className=""
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="filter-option">
            <label htmlFor="companySize">Company Size</label>
            <select id="companySize">
              <option value="">All</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <button className="apply-filters">Apply Filters</button>
        </div>

        <div className="main-content">
          <h2>Results from your search</h2>
          <button className="Backtosearch" onClick={() => navigate('/')}>Back to Search</button>

          {jobs.length > 0 ? (
            <div className="job-grid">
              {jobs.map((job, index) => (
                <div key={index} className='job-item'>
                  <div className="job-header">
                  <h2 style={{textAlign:"center"}}>{job.Title}</h2>
                  </div>
                  <p><strong>Company:</strong> {job.Company} <strong>Location:</strong> {job.Location}  </p>
                  {/* <p><strong>Posted:</strong> {job.PostedDate || 'Not specified'}</p>
                  <p><strong>Salary:</strong> {job.Salary || 'Not specified'}</p> */}
                  <a href={job.Link} target="_blank" rel="noopener noreferrer" className="apply-link">Apply now at LinkedIn</a>

                  <div className="job-details">
                    <button className="toggle-details">More Details</button>
                    <div className="details-content">
                      <h3>Job Description</h3>
                      <p>{job.JobDescription || 'No description available'}</p>

                      <h3>Responsibilities</h3>
                      <p>{job.Responsibilities || 'No responsibilities available'}</p>

                      <h3>Qualifications</h3>
                      <p>{job.Qualifications || 'No qualifications available'}</p>

                      <h3>Perks</h3>
                      <p>{job.Perks || 'No perks available'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>
  );
}
