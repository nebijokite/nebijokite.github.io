import Hero from "../components/Hero";
import Works from "../components/Works";
import AboutSlider from "../components/AboutSlider";
import Footer from "../components/Footer";
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
