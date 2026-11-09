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
    case "images":
      return (
        <div className="pm__gallery">
          {block.items.map((it, i) => (
            <figure className="pm__fig" key={i}>
              {it.src ? <img src={it.src} alt={it.alt || ""} loading="lazy" /> : <div className="pm__ph">Изображение</div>}
              {it.caption && <figcaption>{it.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    default: return null;
  }
}

export default function ProjectModal({ project, onClose }) {
  const key = project ? `unlocked:${project.id}` : "";
  const [unlocked, setUnlocked] = useState(() => !project || !project.protected || sessionStorage.getItem(key) === "1");
  const sheet = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
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
  }, [onClose, project]);

  if (!project) return null;

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
            {project.sections?.map((b, i) => <Block key={i} block={b} />)}
          </div>
        ) : (
          <PasswordGate project={project} onUnlock={unlock} />
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}