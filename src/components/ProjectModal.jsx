
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import PasswordGate from "./PasswordGate";

function Block({ block }) {
  switch (block.type) {
    case "heading": return <h3 className="pm__h">{block.text}</h3>;
    case "text": return <p className="pm__p">{block.text}</p>;
    case "list": return <ul className="pm__ul">{block.items.map((t, i) => <li key={i}>{t}</li>)}</ul>;
    case "image":
      return (
        <figure className="pm__fig">
          {block.src ? <img src={block.src} alt={block.alt || ""} loading="lazy" /> : <div className="pm__ph">Изображение</div>}
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    default: return null;
  }
}

export default function ProjectModal({ project, onClose }) {
  const key = `unlocked:${project.id}`;
  const [unlocked, setUnlocked] = useState(() => !project.protected || sessionStorage.getItem(key) === "1");
  const sheet = useRef(null);
  const closeBtn = useRef(null);

  // scroll lock + возврат фокуса
  useEffect(() => {
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, []);

  // Esc + focus trap
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !sheet.current) return;
      const els = sheet.current.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const unlock = () => { sessionStorage.setItem(key, "1"); setUnlocked(true); };

  return createPortal(
    <motion.div className="pm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
      <motion.div ref={sheet} className="pm__sheet" role="dialog" aria-modal="true" aria-labelledby="pm-title"
        initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
        <button ref={closeBtn} type="button" className="pm__close" onClick={onClose} aria-label="Закрыть проект">✕</button>
        <header className="pm__head">
          <p className="pm__meta">{project.category} · {project.type} · {project.year}</p>
          <h2 id="pm-title" className="pm__title">{project.title}</h2>
        </header>
        {unlocked ? (
          <div className="pm__body">
            <div className="pm__cover">
              {project.image ? <img src={project.image} alt={project.title} /> : <div className="pm__ph">Обложка проекта</div>}
            </div>
            <p className="pm__lead">{project.description}</p>
            {project.sections.map((b, i) => <Block key={i} block={b} />)}
          </div>
        ) : (
          <PasswordGate project={project} onUnlock={unlock} />
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}
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

