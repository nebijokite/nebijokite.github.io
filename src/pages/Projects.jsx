import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <div className="projects-page">
        <main>
          <section className="projects-archive">
            <div className="section-container">
              <div className="archive-heading">
                <span>Архив</span>
                <h1>Все работы</h1>
              </div>

              <div className="projects-grid">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={setActiveProject}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}