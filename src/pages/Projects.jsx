import Works from "../components/Works";
import Footer from "../components/Footer";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <main className="archive">
      <Works list={projects} heading="Все работы" id="archive" />
      <Footer />
    </main>
  );
}
