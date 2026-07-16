import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Exploration from "./components/Exploration";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main id="main-content" className="min-h-dvh">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Achievements />
      <Exploration />
      <Contact />
    </main>
  );
}
