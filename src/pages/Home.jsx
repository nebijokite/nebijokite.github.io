import { useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Works from "../components/Works";
import AboutSlider from "../components/AboutSlider";
import Footer from "../components/Footer";
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
