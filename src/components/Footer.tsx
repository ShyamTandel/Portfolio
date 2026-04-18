import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8">
      <ScrollReveal
        className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <p className="text-sm text-muted-foreground font-mono">&copy; {year} Shyam Tandel &middot; Built with React + Tailwind</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ShyamTandel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-smooth"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/shyam-tandel-053819255/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-smooth"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shyamtandel.dev@gmail.com"
            className="text-muted-foreground hover:text-primary transition-smooth"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
