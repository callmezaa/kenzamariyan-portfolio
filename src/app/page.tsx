import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Playground from "./components/Playground";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <Playground />
      <Contact />
    </main>
  );
}
