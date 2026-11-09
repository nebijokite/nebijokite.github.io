<<<<<<< HEAD
=======
import { useState } from "react";

import Header from "../components/Header";
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
import Hero from "../components/Hero";
import Works from "../components/Works";
import AboutSlider from "../components/AboutSlider";
import Footer from "../components/Footer";
<<<<<<< HEAD
import { projects } from "../data/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 2);
  return (
    <main>
      <Hero />
      <Works list={featured} showAllLink />
      <AboutSlider />
      <Footer />
    </main>
  );
}
=======
import ProjectModal from "../components/ProjectModal";

function Home() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <Header />

      <main>
        <Hero />

        <Works
          onOpenProject={setActiveProject}
        />

        <AboutSlider />

        <Footer />
      </main>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

export default Home;
>>>>>>> 67d56fc93b8702593fe1db63d11206050054a884
