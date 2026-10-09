
import { useEffect, useState } from "react";
import PasswordGate from "./PasswordGate";

function ProjectModal({ project, onClose }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderSection = (section, index) => {
    if (section.type === "text") {
      return (
        <section className="modal-section" key={index}>
          {section.title && <h3>{section.title}</h3>}
          <p>{section.content}</p>
        </section>
      );
    }

    if (section.type === "image") {
      return (
        <figure className="modal-image" key={index}>
          <img src={section.src} alt={section.alt || ""} />
        </figure>
      );
    }

    if (section.type === "images") {
      return (
        <div className="modal-images" key={index}>
          {section.items?.map((image, imageIndex) => (
            <figure key={imageIndex}>
              <img src={image.src} alt={image.alt || ""} />
            </figure>
          ))}
        </div>
      );
    }

    return null;
  };

  const showProtectedContent = !project.protected || unlocked;

  return (
    <div
      className="project-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="project-modal-header">
          <span className="project-modal-category">
            {project.category}
          </span>

          <button
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Закрыть проект"
          >
            ×
          </button>
        </div>

        <div className="project-modal-content">
          <div className="project-modal-title">
            <h2>{project.title}</h2>
            <span>{project.year}</span>
          </div>

          {!showProtectedContent ? (
            <PasswordGate
              project={project}
              onSuccess={() => setUnlocked(true)}
            />
          ) : (
            <>
              {project.description && (
                <p className="project-modal-description">
                  {project.description}
                </p>
              )}

              <div className="project-modal-details">
                {project.about && (
                  <div className="project-modal-detail">
                    <h3>О проекте</h3>
                    <p>{project.about}</p>
                  </div>
                )}

                {project.role && (
                  <div className="project-modal-detail">
                    <h3>Роль</h3>
                    <p>{project.role}</p>
                  </div>
                )}

                {project.responsibilities && (
                  <div className="project-modal-detail">
                    <h3>Задачи</h3>
                    <p>{project.responsibilities}</p>
                  </div>
                )}

                {project.platforms && (
                  <div className="project-modal-detail">
                    <h3>Платформы</h3>
                    <p>{project.platforms}</p>
                  </div>
                )}
              </div>

              {project.sections?.length > 0 && (
                <div className="project-modal-sections">
                  {project.sections.map(renderSection)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

