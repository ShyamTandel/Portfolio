import { Award, Cloud, Database, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";

const highlights = [
  { icon: Database, label: "Backend Engineering", desc: "Django, DRF, MySQL, REST APIs" },
  { icon: Cloud, label: "Cloud & DevOps", desc: "AWS, Docker, CI/CD pipelines" },
  { icon: Sparkles, label: "AI Systems", desc: "Bedrock, Lex, RAG with Pinecone" },
  { icon: Award, label: "AWS Certified", desc: "AI Practitioner" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollRevealGroup className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-12 items-center">
            <ScrollRevealGroup className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed text-lg">
              <ScrollReveal>
                I&apos;m a <span className="text-foreground font-semibold">Python Backend Developer</span> with 1.4
                years of hands-on experience designing Django-based web applications and managing MySQL databases.
              </ScrollReveal>
              <ScrollReveal>
                I love crafting <span className="text-foreground font-semibold">RESTful APIs</span>, optimizing
                database schemas, and building reliable backend systems for aviation and fintech domains. My work spans
                real-time data pipelines, async task processing with Celery & Redis, and containerized deployments on
                AWS.
              </ScrollReveal>
              <ScrollReveal>
                As an <span className="text-foreground font-semibold">AWS Certified AI Practitioner</span>, I&apos;m
                exploring the intersection of cloud infrastructure and AI - building chatbots with Amazon Lex and
                RAG-powered retrieval with Pinecone & Bedrock.
              </ScrollReveal>
            </ScrollRevealGroup>

            <ScrollRevealGroup className="md:col-span-2 grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <ScrollReveal key={h.label}>
                  <Card
                    className="card-gradient p-5 border-border/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-elegant transition-smooth"
                  >
                    <h.icon className="h-7 w-7 text-primary mb-3" />
                    <h3 className="font-semibold text-sm mb-1">{h.label}</h3>
                    <p className="text-xs text-muted-foreground">{h.desc}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </ScrollRevealGroup>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default About;
