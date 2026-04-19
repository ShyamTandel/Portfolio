import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-20"
      data-parallax-root
    >
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
        data-parallax="10"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-glow-pulse pointer-events-none"
        data-parallax="34"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-glow-pulse pointer-events-none"
        data-parallax="28"
      />
      <div
        className="absolute inset-x-0 top-24 mx-auto h-64 w-[34rem] rounded-full bg-primary/10 blur-[120px] pointer-events-none"
        data-parallax="18"
      />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollRevealGroup className="max-w-4xl mx-auto text-center space-y-8" amount={0.15}>
          <ScrollReveal
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-mono"
            data-parallax="10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            Available for new opportunities
          </ScrollReveal>

          <ScrollReveal data-parallax="18">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              Hi, I&apos;m <span className="gradient-text">Shyam Tandel</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal data-parallax="12">
            <p className="text-xl md:text-2xl font-medium text-muted-foreground">
              Python Backend Developer <span className="text-primary">&middot;</span> AWS Certified AI Practitioner
            </p>
          </ScrollReveal>

          <ScrollReveal className="max-w-2xl mx-auto" data-parallax="8">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Building scalable backend systems and exploring AI-powered solutions. Crafting REST APIs, automating
              workflows, and shipping production-ready cloud apps.
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex flex-wrap items-center justify-center gap-4 pt-4" data-parallax="16">
            <Button
              size="lg"
              asChild
              className="gradient-bg text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105 transition-smooth border-0"
            >
              <a href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-smooth">
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" /> Contact Me
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild className="hover:scale-105 transition-smooth">
              <a href="/Shyam_Tandel_Resume.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="flex items-center justify-center gap-6 pt-6" data-parallax="14">
            <a
              href="https://github.com/ShyamTandel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
              data-cursor="Click"
              data-magnetic
              data-magnetic-strength="0.18"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/shyam-tandel-053819255/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
              data-cursor="Click"
              data-magnetic
              data-magnetic-strength="0.18"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shyamtandel.dev@gmail.com"
              className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
              data-cursor="Click"
              data-magnetic
              data-magnetic-strength="0.18"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </ScrollReveal>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default Hero;
