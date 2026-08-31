import {
  Activity,
  ArrowUpRight,
  GitBranch,
  Cloud,
  ShieldCheck,
  Boxes,
  Mail,
  MapPin,
  PhoneCall,
  Quote,
} from "lucide-react";
import { useState } from "react";
import {
  certifications,
  clients,
  coreSkills,
  experience,
  languages,
  posts,
  profile,
  services,
  softSkills,
  stats,
  testimonials,
  tools,
  works,
} from "@/lib/portfolio-data";
import { ContactRequestDialog } from "./ContactRequestDialog";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-kicker">{children}</h2>;
}

function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="section-heading-block">
      <div className="section-heading">
        <h2 className="section-heading__title">
          <span>{title.charAt(0)}</span>
          {title.slice(1).toUpperCase()}
        </h2>
        {children}
      </div>
      <div className="section-heading__divider" />
    </header>
  );
}

type SectionShortcut = {
  id: string;
  label: string;
};

function SectionTabs({
  items,
  label,
  activeId,
  onChange,
}: {
  items: readonly SectionShortcut[];
  label: string;
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="section-tabs" role="tablist" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          id={`${item.id}-tab`}
          aria-controls={`${item.id}-panel`}
          aria-selected={activeId === item.id}
          onClick={() => onChange(item.id)}
          className={activeId === item.id ? "is-active" : undefined}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

const serviceShortcuts = [
  { id: "services-all", label: "All" },
  { id: "services-overview", label: "Services" },
  { id: "services-clients", label: "Clients" },
  { id: "services-testimonials", label: "Testimonials" },
] as const;

const resumeShortcuts = [
  { id: "resume-all", label: "All" },
  { id: "resume-experience", label: "Experience" },
  { id: "resume-certifications", label: "Certifications" },
] as const;

const skillsShortcuts = [
  { id: "skills-all", label: "All" },
  { id: "skills-core", label: "Core Skills" },
  { id: "skills-tools", label: "Tools" },
  { id: "skills-languages", label: "Languages" },
  { id: "skills-soft", label: "Soft Skills" },
] as const;

export function AboutSection() {
  return (
    <section className="portfolio-section hero-section animate-rise">
      <SectionHeader title="About" />
      <p className="hero-eyebrow">
        Hello, I&apos;m <span>{profile.name}</span>
      </p>
      <h1 className="hero-title">
        DevOps <span className="highlight-pill">Engineer</span> building reliable CI/CD and cloud
        platforms.
      </h1>
      <p className="hero-summary">{profile.intro}</p>

      <dl className="hero-stats">
        {stats.map((s) => (
          <div key={s.value}>
            <dd>
              {s.value}
              {s.suffix && <span className="hero-stats__suffix">{s.suffix}</span>}
            </dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function WorksSection() {
  const workFilters = ["All", "CI/CD", "Cloud", "Kubernetes", "DevSecOps", "Observability"];
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleWorks =
    activeFilter === "All" ? works : works.filter((work) => work.category === activeFilter);

  const workVisualIcons: Record<string, typeof GitBranch> = {
    pipeline: GitBranch,
    cloud: Cloud,
    kubernetes: Boxes,
    security: ShieldCheck,
    observability: Activity,
  };

  return (
    <section className="portfolio-section works-showcase animate-rise">
      <SectionHeader title="Works">
        <div className="works-filters" role="toolbar" aria-label="Filter DevOps projects">
          {workFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? "is-active" : undefined}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </SectionHeader>

      <p className="sr-only" aria-live="polite">
        Showing {visibleWorks.length} {activeFilter === "All" ? "DevOps" : activeFilter} projects
      </p>

      <div className="works-grid">
        {visibleWorks.map((work) => {
          const VisualIcon = workVisualIcons[work.visual] ?? GitBranch;

          return (
            <article key={work.title} className="work-card">
              <div className={`work-card__visual work-card__visual--${work.visual}`}>
                <div className="work-visual__glow" />
                <div className="work-visual__window">
                  <div className="work-visual__bar">
                    <span className="work-visual__lights" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>{work.console}</span>
                  </div>
                  <div className="work-visual__summary">
                    <span className="work-visual__icon">
                      <VisualIcon aria-hidden="true" />
                    </span>
                    <span>
                      <small>Environment</small>
                      <strong>Production</strong>
                    </span>
                  </div>
                  <div className="work-visual__stages">
                    {work.stages.map((stage, index) => (
                      <span key={stage}>
                        <i>{String(index + 1).padStart(2, "0")}</i>
                        {stage}
                      </span>
                    ))}
                  </div>
                  <div className="work-visual__status">
                    <span aria-hidden="true" />
                    {work.status}
                  </div>
                </div>
              </div>

              <div className="work-card__tags" aria-label="Project technologies">
                {work.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="work-card__heading">
                <h3>{work.title}</h3>
                <span className="work-card__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </div>
              <p>{work.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const serviceIcons = [GitBranch, Cloud, ShieldCheck, Boxes];

export function ServicesSection() {
  const [activeSection, setActiveSection] = useState(serviceShortcuts[0].id);
  const showAll = activeSection === "services-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title="Services">
        <SectionTabs
          items={serviceShortcuts}
          label="Service content"
          activeId={activeSection}
          onChange={setActiveSection}
        />
      </SectionHeader>

      <div
        key={activeSection}
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection}-tab`}
        className={`section-tab-panel animate-rise${showAll ? " section-tab-panel--stack section-tab-panel--wide" : ""}`}
      >
        {(showAll || activeSection === "services-overview") && (
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length]!;
              return (
                <article
                  key={s.title}
                  className="flex flex-col rounded-2xl border border-border bg-surface-2/60 p-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.meta}
                  </p>
                  <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                  <ContactRequestDialog requestType="proposal" service={s.title}>
                    <button
                      type="button"
                      className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Request a Proposal <ArrowUpRight className="size-4" />
                    </button>
                  </ContactRequestDialog>
                </article>
              );
            })}
          </div>
        )}

        {(showAll || activeSection !== "services-overview") && (
          <ServiceDetailsSection activeSection={activeSection} />
        )}
      </div>
    </section>
  );
}

export function ResumeSection() {
  const [activeSection, setActiveSection] = useState(resumeShortcuts[0].id);
  const showAll = activeSection === "resume-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title="Resume">
        <SectionTabs
          items={resumeShortcuts}
          label="Resume content"
          activeId={activeSection}
          onChange={setActiveSection}
        />
      </SectionHeader>

      <div
        key={activeSection}
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection}-tab`}
        className={`section-tab-panel animate-rise${showAll ? " section-tab-panel--stack" : ""}`}
      >
        {(showAll || activeSection === "resume-experience") && (
          <div>
            <SectionTitle>Experience</SectionTitle>
            <ol className="space-y-8 border-l border-border pl-6">
              {experience.map((e) => (
                <li key={e.role + e.period} className="relative">
                  <span className="absolute -left-[1.68rem] top-2 size-2.5 rounded-full bg-primary" />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {e.period}
                  </p>
                  <h3 className="mt-2 text-lg font-medium">{e.role}</h3>
                  <p className="text-sm text-primary">{e.company}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {e.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {(showAll || activeSection === "resume-certifications") && (
          <div>
            <SectionTitle>Certifications</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <article
                  key={c.title}
                  className="rounded-2xl border border-border bg-surface-2/60 p-6"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.period}
                  </p>
                  <h3 className="mt-2 text-base font-medium">{c.title}</h3>
                  <p className="text-sm text-primary">{c.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Bar({ name, value }: { name: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const [activeSection, setActiveSection] = useState(skillsShortcuts[0].id);
  const showAll = activeSection === "skills-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title="Skills">
        <SectionTabs
          items={skillsShortcuts}
          label="Skills content"
          activeId={activeSection}
          onChange={setActiveSection}
        />
      </SectionHeader>

      <div
        key={activeSection}
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection}-tab`}
        className={`section-tab-panel animate-rise${showAll ? " section-tab-panel--stack" : ""}`}
      >
        {(showAll || activeSection === "skills-core") && (
          <div>
            <SectionTitle>Core Skills</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {coreSkills.map((s) => (
                <Bar key={s.name} {...s} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-tools") && (
          <div>
            <SectionTitle>Tools &amp; Platforms</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {tools.map((t) => (
                <Bar key={t.name} {...t} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-languages") && (
          <div>
            <SectionTitle>Languages</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {languages.map((l) => (
                <Bar key={l.name} {...l} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-soft") && (
          <div>
            <SectionTitle>Soft Skills</SectionTitle>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              {softSkills.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title="Contact" />
      <div className="contact-list">
        <div className="contact-list__primary">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <span className="contact-card__icon">
              <Mail aria-hidden="true" />
            </span>
            <span className="contact-card__copy">
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">{profile.email}</span>
            </span>
            <ArrowUpRight className="contact-card__arrow" aria-hidden="true" />
          </a>

          <ContactRequestDialog requestType="call">
            <button type="button" className="contact-card">
              <span className="contact-card__icon">
                <PhoneCall aria-hidden="true" />
              </span>
              <span className="contact-card__copy">
                <span className="contact-card__label">Request a Call</span>
                <span className="contact-card__value">Share your contact details</span>
              </span>
              <ArrowUpRight className="contact-card__arrow" aria-hidden="true" />
            </button>
          </ContactRequestDialog>
        </div>

        <div className="contact-card contact-card--location">
          <span className="contact-card__icon">
            <MapPin aria-hidden="true" />
          </span>
          <span className="contact-card__copy">
            <span className="contact-card__label">Location</span>
            <span className="contact-card__value">{profile.location}</span>
          </span>
        </div>
      </div>

      <div className="contact-cta">
        <img
          className="contact-cta__logo"
          src="/name-logo-maroon.png"
          alt="Jimmi Pangalinan"
          width="1740"
          height="904"
        />
        <h3 className="text-3xl font-semibold sm:text-4xl">
          Let&apos;s ship something <span className="highlight-pill">reliable</span>
        </h3>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Available for DevOps, platform engineering, and CI/CD automation work. Send a message and
          I&apos;ll get back to you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Send Message <ArrowUpRight className="size-4" />
          </a>
          <ContactRequestDialog requestType="call">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Request a Call <PhoneCall className="size-4" />
            </button>
          </ContactRequestDialog>
        </div>
      </div>
    </section>
  );
}

function ServiceDetailsSection({ activeSection }: { activeSection: string }) {
  const showAll = activeSection === "services-all";

  return (
    <section className="portfolio-section service-tab-sections">
      {(showAll || activeSection === "services-clients") && (
        <div>
          <SectionTitle>Clients &amp; Engagements</SectionTitle>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface-2/60 p-6 text-center"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {c.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="mt-3 text-sm font-medium">{c.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(showAll || activeSection === "services-testimonials") && (
        <div>
          <SectionTitle>Testimonials</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name + t.role}
                className="rounded-2xl border border-border bg-surface-2/60 p-6"
              >
                <Quote className="size-5 text-primary" />
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function BlogSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title="Blog" />
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <article
            key={p.title}
            className="group rounded-2xl border border-border bg-surface-2/60 p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
              <span className="text-primary">{p.tag}</span>
              <span className="text-muted-foreground">{p.date}</span>
            </div>
            <h3 className="mt-3 flex items-start justify-between gap-3 text-lg font-medium">
              {p.title}
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-primary" />
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
