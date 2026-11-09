<<<<<<< HEAD
export default function ProjectCard({ project, variant = "a", onOpen }) {
  const { title, category, type, year, image } = project;
  return (
    <button type="button" className={`card card--${variant}`} onClick={() => onOpen(project)} aria-haspopup="dialog">
      <span className="card__media">
        {image ? (
          <img src={image} alt="" loading="lazy" />
        ) : (
          <span className="card__ph">Обложка проекта</span>
        )}
      </span>
      <span className="card__info">
        <span className="card__title">{title}</span>
        <span className="card__meta">
          {category} · {type} · {year}
          {project.protected ? " · Закрытый" : ""}
        </span>
      </span>
    </button>
  );
}
=======

function ProjectCard({ project, onOpen }) {
  const isInDevelopment =
    project.statusType === "development" ||
    project.statusType === "in-development" ||
    project.status === "В разработке";

  const handleOpen = () => {
    if (isInDevelopment) return;
    onOpen(project);
  };

  return (
    <article
      className={`project-card ${
        isInDevelopment ? "project-card--disabled" : ""
      }`}
    >
      <button
        className="project-card__button"
        type="button"
        onClick={handleOpen}
        disabled={isInDevelopment}
        aria-label={
          isInDevelopment
            ? `Проект ${project.title} находится в разработке`
            : `Открыть проект ${project.title}`
        }
        aria-disabled={isInDevelopment}
      >
        <div className="project-card__image-wrap">
          <img
            className="project-card__image"
            src={project.image}
            alt={project.title}
          />

          {!isInDevelopment && (
            <div className="project-card__overlay">
              <span>
                {project.protected
                  ? "Открыть проект"
                  : "Смотреть проект"}
              </span>
              <span className="project-card__arrow">↗</span>
            </div>
          )}
        </div>

        <div className="project-card__info">
          <div className="project-card__title-row">
            <h3>{project.title}</h3>

            <span
              className={`project-card__status project-card__status--${project.statusType}`}
            >
              <span className="project-card__status-dot" />
              {project.status}
            </span>
          </div>

          <p>{project.description}</p>

          <div className="project-card__meta">
            {project.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </button>
    </article>
  );
}

export default ProjectCard;

>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
