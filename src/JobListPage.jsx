import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function JobListPage() {
  const [jobs, setJobs] = useState([]);
  const username=localStorage.getItem("usename");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jobs/")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Failed to fetch job:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
    
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1
         
         className="text-xl font-bold text-blue-700">JobPortal</h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="/jobs" className="hover:text-blue-700">Jobs</a>
            <a href="#" className="hover:text-blue-700">Companies</a>
            <a href="#" className="hover:text-blue-700">My Applications</a>
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hello, {username}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
              T
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-8 flex-1">
        <h2 className="text-2xl font-bold mb-4">Recommended Jobs</h2>


        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs Found</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-lg border bg-white p-5 mb-4 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {job.title}
              </h3>

              <p className="text-sm text-gray-700">{job.company}</p>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="rounded bg-gray-100 px-2 py-1">
                  📍 {job.location}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1">
                  💰 {job.salary_range}
                </span>
                <span className="rounded bg-gray-100 px-2 py-1">🕒 Full Time</span>
              </div>
              <div className="mt-4 flex justify-end">
            <NavLink to={`/apply/${job.id}`} className="text-sm font-medium text-blue-700 hover:underline">View Details →</NavLink>
          </div>
        </div>

            
          ))
        )}
      </main>
    </div>
  );
}
