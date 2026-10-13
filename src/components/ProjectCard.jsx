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
