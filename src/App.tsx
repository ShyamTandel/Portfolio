import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InteractiveCursor from "@/components/InteractiveCursor";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { ThemeProvider } from "@/hooks/useTheme";

const App = () => (
  <ThemeProvider>
    <div className="min-h-screen bg-background text-foreground">
      <InteractiveCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  </ThemeProvider>
);

export default App;
