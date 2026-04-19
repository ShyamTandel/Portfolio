import { Card } from "@/components/ui/card";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Briefcase, Award, ArrowUpRight } from "lucide-react";

const Experience = () => {
  const bullets = [
    "Built and maintained backend services for aviation projects: GroundOps (Ground Operations) and FOTM (Flight Track Management System) using Django + MySQL.",
    "Designed RESTful APIs with Django Views to power real-time flight tracking and operational workflows.",
    "Contributed to the RefreshFlight module for flight data processing and authored Luigi workflows for automated data sync and pipeline management.",
    "Optimized database schemas, SQL queries, and indexing to improve retrieval efficiency and overall system performance.",
    "Developed an AI-powered chatbot using Amazon Lex and built a RAG-based knowledge retrieval system using Pinecone vector DB.",
    "Worked with AWS (S3, Lambda, Bedrock) via Boto3 SDK for storage, serverless execution, and AI service integration.",
  ];

  return (
    <section id="experience" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <ScrollRevealGroup className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <Card className="card-gradient p-8 border-border/60 hover:border-primary/50 hover:shadow-elegant transition-smooth mb-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl gradient-bg text-primary-foreground shadow-glow shrink-0">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold">Python Backend Engineer</h3>
                    <span className="text-sm font-mono text-muted-foreground">Jan 2025 - Present</span>
                  </div>
                  <p className="text-primary font-medium">Peerbits Solution Pvt. Ltd. &middot; Ahmedabad, Gujarat</p>
                </div>
              </div>

              <ul className="space-y-3 ml-1">
                {bullets.map((b) => (
                  <li key={b} className="text-muted-foreground flex items-start gap-3 leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">&rsaquo;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </ScrollReveal>

          <ScrollRevealGroup>
            <ScrollReveal>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="h-6 w-6 text-primary" />
                Certifications
              </h3>
            </ScrollReveal>

            <ScrollRevealGroup className="grid md:grid-cols-2 gap-4">
              <ScrollReveal>
                <a
                  href="https://www.credly.com/badges/4d40340f-c2ab-4c1f-bb85-a6cdb6484cf7/linked_in_profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-cursor="Click"
                >
                  <Card className="card-gradient p-5 border-border/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-elegant transition-smooth">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">AWS Certified AI Practitioner</h4>
                          <p className="text-xs text-muted-foreground">Amazon Web Services</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
                    </div>
                  </Card>
                </a>
              </ScrollReveal>

              <ScrollReveal>
                <a
                  href="https://drive.google.com/file/d/1Yhsgr2__A2JKPPBKM3F_P8b5uAsp9uHI/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-cursor="Click"
                >
                  <Card className="card-gradient p-5 border-border/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-elegant transition-smooth">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Applied Cloud Computing</h4>
                          <p className="text-xs text-muted-foreground">Microsoft</p>
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
                    </div>
                  </Card>
                </a>
              </ScrollReveal>
            </ScrollRevealGroup>
          </ScrollRevealGroup>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default Experience;
