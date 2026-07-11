import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Achievements />
      <Contact />
    </main>
  );
}
