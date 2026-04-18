import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, TrendingUp } from "lucide-react";

const projects = [
  {
    title: "DeltaStrategy",
    subtitle: "Automated Options Trading Backend",
    period: "Nov - Dec 2025",
    description:
      "Production-ready automated trading backend integrated with Delta Exchange APIs. Implements secure authentication, real-time market data processing, and end-to-end trade lifecycle management with async strategy execution.",
    features: [
      "Async strategy execution with Celery + Redis",
      "Containerized with Docker, deployed on AWS EC2",
      "CI/CD pipelines via GitHub Actions",
      "Secure secrets & environment management",
    ],
    stack: ["Django", "DRF", "MySQL", "Celery", "Redis", "Docker", "GitHub Actions", "AWS EC2", "Delta Exchange API"],
    github: "https://github.com/ShyamTandel/DeltaStrategy",
    featured: true,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A selection of backend systems I&apos;ve designed, built, and shipped.
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="project-card card-gradient overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-elegant transition-smooth group"
                data-cursor="View"
                data-magnetic-strength="0.08"
                data-project-card
              >
                <div className="grid md:grid-cols-5 gap-0">
                  <div
                    className="md:col-span-2 relative bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-10 flex items-center justify-center min-h-[260px]"
                    data-project-media
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--primary)/0.2),transparent_58%)] opacity-70 transition-smooth group-hover:opacity-100" />
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-glow-pulse project-card__glow" />
                      <div
                        className="relative p-6 rounded-2xl bg-background/40 backdrop-blur-sm border border-border/60 group-hover:scale-110 group-hover:rotate-3 transition-smooth"
                        data-project-visual
                      >
                        <TrendingUp className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-3 p-8 space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {project.featured && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">
                            Featured
                          </span>
                        )}
                        <span className="text-xs font-mono text-muted-foreground">{project.period}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                      <p className="text-primary font-medium">{project.subtitle}</p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <ul className="space-y-1.5">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">&rsaquo;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tool) => (
                        <span key={tool} className="px-2.5 py-0.5 text-xs font-mono rounded bg-secondary text-secondary-foreground">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Code
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="text-primary">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Details <ExternalLink className="ml-2 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
