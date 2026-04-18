import { Card } from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Code2, Layers, Wrench, Cloud, Brain } from "lucide-react";

const skillGroups = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Python", "SQL"],
  },
  {
    icon: Layers,
    title: "Frameworks",
    skills: ["Django", "Django REST Framework", "Flask"],
  },
  {
    icon: Wrench,
    title: "Tools & Infra",
    skills: ["Celery", "Redis", "Docker", "GitHub Actions", "Boto3", "Git", "Postman"],
  },
  {
    icon: Cloud,
    title: "Cloud (AWS)",
    skills: ["EC2", "S3", "Lambda", "Bedrock"],
  },
  {
    icon: Brain,
    title: "AI & Data",
    skills: ["AI Agents", "Amazon Lex", "RAG", "Pinecone", "MySQL", "Pandas", "NumPy"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <ScrollRevealGroup className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The tools, frameworks, and platforms I use to ship production-grade backends.
            </p>
          </ScrollReveal>

          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group) => (
              <ScrollReveal key={group.title}>
                <Card className="card-gradient p-6 border-border/60 hover:border-primary/50 hover:shadow-elegant hover:-translate-y-1 transition-smooth group">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs font-mono rounded-md bg-secondary text-secondary-foreground border border-border/60 hover:border-primary/60 hover:text-primary transition-smooth"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </ScrollRevealGroup>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default Skills;
