import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

export default function Works({ onOpenProject, heading = "Работы", showAllLink = false, id = "works" }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="works" id={id}>
      <div className="section-container">
        <div className="section-heading">
          <span className="section-heading__eyebrow">Избранное</span>
          <h2>{heading}</h2>
        </div>

        <div className="projects-grid">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
          ))}
        </div>

        {showAllLink && (
          <Link className="works__all" to="/projects">
            Все работы <span>↗</span>
          </Link>
        )}
      </div>
    </section>
  );
}