// src/pages/Projects.jsx
import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projects from '../services/ProjectsData';
import './Projects.css';

function Projects() {
  return (
    <section className="projects-page">
      <h1>All Projects</h1>
      <div className="projects-grid">
        {projects.map((proj) => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </section>
  );
}
export default Projects;
