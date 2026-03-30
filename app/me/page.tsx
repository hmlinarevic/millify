import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { Github, Mail } from "lucide-react";
import {
  profile,
  experience,
  projects,
  skillsByCategory,
  education,
} from "@/lib/portfolio-data";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StarTrekPopup } from "./star-trek-popup";
import { SessionLogo } from "@/components/session-logo";
import { CrosswitLogo } from "@/components/crosswit-logo";

export const metadata: Metadata = {
  title: "Hrvoje Mlinarević | Web Dev",
  description: profile.bio,
};

/** Responsive grid: 1 column on small screens, 2 columns from sm up (Projects & Technologies) */
const TWO_COL_GRID =
  "grid gap-4 w-full grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 sm:scroll-mt-24">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <div className="page-me min-h-screen bg-background text-foreground">
      {/* Decorative gradient */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(184,168,138,0.06),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 pt-[max(2.5rem,env(safe-area-inset-top))] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12 md:px-8 md:py-16">
        {/* Header / Hero - same spacing as between sections (space-y-10 md:space-y-12) */}
        <header id="top" className="mb-10 md:mb-12 scroll-mt-20">
          <nav className="mb-8 flex items-center gap-4 text-base text-muted-foreground sm:mb-10">
            <Link
              href="/"
              className="min-h-[44px] min-w-[44px] -m-2 flex items-center justify-center rounded p-2 !text-muted-foreground hover:!no-underline"
            >
              millify.dev
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-muted-foreground">me</span>
          </nav>

          <h1 className="mb-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {profile.name}
          </h1>
          <p className="mb-3 text-base text-primary sm:text-lg">
            {profile.title}
          </p>
          <p className="mb-4 max-w-xl text-base text-muted-foreground">
            {profile.tagline}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="link-coral inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors self-start"
            >
              <Mail className="size-4" aria-hidden />
              Get In Touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-coral inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors self-start"
            >
              <Github className="size-4" aria-hidden />
              GitHub
            </a>
          </div>
        </header>

        <main className="space-y-10 md:space-y-12">
          {/* Experience */}
          <Section id="experience" title="Experience">
            <ul className="space-y-6 sm:space-y-8">
              {experience.map((job) => (
                <li key={job.company} className="border-l-2 border-border pl-4">
                  <div className="mb-1 flex flex-wrap items-baseline gap-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {job.company}
                    </h3>
                    <span className="text-sm text-muted-foreground/80">·</span>
                    <span className="text-base text-primary">{job.role}</span>
                  </div>
                  <p className="mb-2 text-base text-muted-foreground">
                    {job.description}
                  </p>
                  <p className="mb-3 text-sm text-muted-foreground/80">
                    {job.period} · {job.location}
                  </p>
                  <div className="mb-3 flex flex-wrap gap-1.5 sm:gap-2">
                    {job.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="rounded-md border border-primary/20 bg-primary/8 px-1.5 py-0.5 font-mono text-xs text-primary/90"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground sm:text-base">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Section>

          {/* Projects */}
          <Section id="projects" title="Projects">
            <ul className={TWO_COL_GRID}>
              {projects.map((project) => {
                const cardContent = (
                  <CardHeader className="flex flex-row items-center justify-center gap-3 px-4 py-4 sm:px-6">
                    {project.name === "Sessions" ? (
                      <div className="shrink-0 text-foreground">
                        <SessionLogo />
                      </div>
                    ) : project.name === "Crosswit" ? (
                      <CrosswitLogo className="text-foreground" />
                    ) : null}
                  </CardHeader>
                );
                return (
                  <a key={project.name} href={project.url || ""} className="project-card-link min-w-0 block">
                    <Card
                      className="h-full w-full min-w-0 border-border bg-card/50 text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-colors hover:border-foreground/40 hover:bg-foreground/10 cursor-pointer"
                    >
                      {cardContent}
                    </Card>
                  </a>
                );
              })}
            </ul>
          </Section>

          {/* Education */}
          <Section id="background" title="Background">
            <div className="space-y-4">
              <p className="leading-relaxed text-base text-muted-foreground">
                {education.selfTaught.intro}
              </p>
            </div>
          </Section>

          {/* Skills */}
          <Section id="skills" title="Technologies">
            <div className={TWO_COL_GRID}>
              <div className="min-w-0 rounded-xl border border-border bg-muted/20 p-4">
                <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-primary">
                  Frontend
                </span>
                <div className="flex flex-wrap justify-start gap-2">
                  {skillsByCategory.frontend.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="flex flex-col items-center transition-transform hover:scale-105 border-0 bg-transparent p-0 cursor-default"
                        >
                          <div className="flex size-11 items-center justify-center rounded-xl border border-border/80 bg-background/80 p-2.5 shadow-sm transition-all hover:border-primary/30">
                            <img
                              src={tech.icon}
                              alt=""
                              className="size-5 object-contain"
                            />
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{tech.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className="min-w-0 rounded-xl border border-border bg-muted/20 p-4">
                <span className="mb-3 block text-sm font-semibold uppercase tracking-wider text-primary">
                  Backend
                </span>
                <div className="flex flex-wrap justify-start gap-2">
                  {skillsByCategory.backend.map((tech) => (
                    <Tooltip key={tech.name}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="flex shrink-0 flex-col items-center transition-transform hover:scale-105 border-0 bg-transparent p-0 cursor-default"
                        >
                          <div className="flex size-10 items-center justify-center rounded-lg border border-border/80 bg-background/80 p-2 shadow-sm transition-all hover:border-primary/30">
                            <img
                              src={tech.icon}
                              alt=""
                              className="size-5 object-contain"
                            />
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">{tech.name}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </main>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center gap-4 text-center rounded-xl px-4 py-8 md:mt-20 md:px-6 md:py-10 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:items-center sm:gap-4 sm:text-left">
          <a
            href={`mailto:${profile.email}`}
            className="link-coral inline-flex items-center justify-center gap-2 text-sm font-medium transition-colors sm:justify-self-end"
          >
            <Mail className="size-4" aria-hidden />
            Get In Touch
          </a>
          <span className="text-xs text-muted-foreground sm:col-start-2 sm:row-start-2 sm:block sm:text-right">
            <StarTrekPopup />
          </span>
          <span className="text-xs text-muted-foreground sm:col-start-1 sm:row-start-2 sm:block">
            © {new Date().getFullYear()} Hrvoje Mlinarević
          </span>
          <Link
            href="/"
            className="inline-flex items-center text-sm !text-muted-foreground hover:!no-underline sm:col-start-1 sm:row-start-1 sm:justify-self-start"
          >
            millify.dev
          </Link>
        </footer>
      </div>
    </div>
  );
}
