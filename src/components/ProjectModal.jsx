
import { useEffect, useState } from "react";
import PasswordGate from "./PasswordGate";

function ProjectModal({ project, onClose }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
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
        <section className="project-modal__section" key={`text-${index}`}>
          {section.title && (
            <h3 className="project-modal__section-title">
              {section.title}
            </h3>
          )}
          {section.content && (
            <div className="project-modal__section-text">
              {section.content}
            </div>
          )}
        </section>
      );
    }

    if (section.type === "image") {
      return (
        <figure className="project-modal__image-block" key={`image-${index}`}>
          <img
            src={section.src}
            alt={section.alt || ""}
            className="project-modal__image"
          />
          {section.caption && (
            <figcaption className="project-modal__caption">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (section.type === "images") {
      return (
        <div className="project-modal__images" key={`images-${index}`}>
          {section.items?.map((image, imageIndex) => (
            <figure
              className="project-modal__image-block"
              key={`${image.src}-${imageIndex}`}
            >
              <img
                src={image.src}
                alt={image.alt || ""}
                className="project-modal__image"
              />
              {image.caption && (
                <figcaption className="project-modal__caption">
                  {image.caption}
                </figcaption>
              )}
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
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="project-modal__window">
        <button
          className="project-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть проект"
        >
          ×
        </button>

        <div className="project-modal__scroll">
          <div className="project-modal__content">
            <header className="project-modal__header">
              <div className="project-modal__eyebrow">
                {project.category}
              </div>

              <h2 id="project-modal-title">{project.title}</h2>

              {project.type && (
                <div className="project-modal__type">
                  {project.type}
                </div>
              )}
            </header>

            {!showProtectedContent ? (
              <PasswordGate
                project={project}
                onSuccess={() => {
                  setUnlocked(true)}
                }
              />
            ) : (
              <>
                <div className="project-modal__details">
                  {project.about && (
                    <div className="project-modal__detail">
                      <span>О проекте</span>
                      <p>{project.about}</p>
                    </div>
                  )}

                  {project.year && (
                    <div className="project-modal__detail">
                      <span>Год</span>
                      <p>{project.year}</p>
                    </div>
                  )}

                  {project.role && (
                    <div className="project-modal__detail">
                      <span>Моя роль</span>
                      <p>{project.role}</p>
                    </div>
                  )}

                  {project.responsibilities && (
                    <div className="project-modal__detail">
                      <span>Обязанности</span>
                      <p>{project.responsibilities}</p>
                    </div>
                  )}

                  {project.platforms && (
                    <div className="project-modal__detail">
                      <span>Платформы</span>
                      <p>{project.platforms}</p>
                    </div>
                  )}
                </div>

                {project.sections?.length > 0 && (
                  <div className="project-modal__body">
                    {project.sections.map(renderSection)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

