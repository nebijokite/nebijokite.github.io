<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

const pattern = ["a", "b", "b", "a"]; // зигзаг: широкая / узкая со сдвигом

export default function Works({ list, heading = "Работы", showAllLink = false, id = "works" }) {
  const [active, setActive] = useState(null);
  return (
    <section id={id} className="works" data-theme="dark">
      <div className="wrap">
        <div className="works__top">
          <h2 className="works__title">{heading}</h2>
          {showAllLink && <Link className="works__all" to="/projects">Все работы →</Link>}
        </div>
        <div className="works__grid">
          {list.map((p, i) => (
            <motion.div key={p.id} className={`works__item works__item--${pattern[i % 4]}`}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
              <ProjectCard project={p} variant={pattern[i % 4]} onOpen={setActive} />
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && <ProjectModal key={active.id} project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
=======
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
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
