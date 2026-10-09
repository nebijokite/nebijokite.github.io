import { featuredProjects } from "../data/projects";
import ProjectCard from "./ProjectCard";

function Works({ onOpenProject }) {
  return (
    <section className="works" id="works">
      <div className="section-container">

        <div className="section-heading">
          <span className="section-heading__eyebrow">
            Избранное
          </span>

          <h2>Работы</h2>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>

        <button
          className="works__all"
          onClick={() => {
            window.history.pushState({}, "", "/projects");
            window.dispatchEvent(
              new PopStateEvent("popstate")
            );
            window.scrollTo(0, 0);
          }}
        >
          Все работы
          <span>↗</span>
        </button>

      </div>
    </section>
  );
}

export default Works;
