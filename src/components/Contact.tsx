import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ui/scroll-reveal";
import { Mail, Github, Linkedin, MapPin, Phone, ArrowUpRight } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "shyamtandel.dev@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=shyamtandel.dev@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Shyam Tandel",
    href: "https://www.linkedin.com/in/shyam-tandel-053819255/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "ShyamTandel",
    href: "https://github.com/ShyamTandel",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 90542 21578",
    href: "tel:+919054221578",
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-bg pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <ScrollRevealGroup className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4" /> Ahmedabad, Gujarat, India
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto mt-3">
              Open to backend, cloud, and AI engineering opportunities. Drop a message and I&apos;ll get back to you.
            </p>
          </ScrollReveal>

          <ScrollRevealGroup className="grid sm:grid-cols-2 gap-4 mb-10">
            {contacts.map((c) => (
              <ScrollReveal key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group"
                  data-cursor="Click"
                >
                  <Card className="card-gradient p-5 border-border/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-elegant transition-smooth flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:gradient-bg group-hover:text-primary-foreground transition-smooth">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-mono">{c.label}</p>
                      <p className="font-medium truncate">{c.value}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
                  </Card>
                </a>
              </ScrollReveal>
            ))}
          </ScrollRevealGroup>

          <ScrollReveal className="text-center">
            <Button
              size="lg"
              asChild
              className="gradient-bg text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105 transition-smooth border-0"
            >
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shyamtandel.dev@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Mail className="mr-2 h-4 w-4" /> Send me an email
              </a>
            </Button>
          </ScrollReveal>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default Contact;
