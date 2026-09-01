import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
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
import { usePortfolioData } from "@/lib/usePortfolioStore";
import { localizeValue, useLanguage } from "@/lib/i18n";
import { ContactRequestDialog } from "./ContactRequestDialog";
import { WorkDetailDialog } from "./WorkDetailDialog";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-kicker">{children}</h2>;
}

function useLocalizedPortfolioData() {
  const { data } = usePortfolioData();
  const { language } = useLanguage();
  return localizeValue(data, language);
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
  const { t } = useLanguage();

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
          {t(item.label)}
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
  const data = useLocalizedPortfolioData();
  const { language, t } = useLanguage();
  const { profile, stats } = data;

  return (
    <section className="portfolio-section hero-section animate-rise">
      <SectionHeader title={t("About")} />
      <p className="hero-eyebrow">
        {t("Hello, I'm")} <span>{profile.name}</span>
      </p>
      <h1 className="hero-title">
        {language === "id" ? (
          <>
            DevOps <span className="highlight-pill">Engineer</span> yang membangun platform CI/CD
            dan cloud yang andal.
          </>
        ) : (
          <>
            DevOps <span className="highlight-pill">Engineer</span> building reliable CI/CD and
            cloud platforms.
          </>
        )}
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
  const data = useLocalizedPortfolioData();
  const { t } = useLanguage();
  const works = data.works;
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
      <SectionHeader title={t("Works")}>
        <div className="works-filters" role="toolbar" aria-label={t("Filter DevOps projects")}>
          {workFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? "is-active" : undefined}
              aria-pressed={activeFilter === filter}
            >
              {t(filter)}
            </button>
          ))}
        </div>
      </SectionHeader>

      <p className="sr-only" aria-live="polite">
        {t("Showing")} {visibleWorks.length} {activeFilter === "All" ? "DevOps" : activeFilter}{" "}
        {t("projects")}
      </p>

      <div className="works-grid">
        {visibleWorks.map((work) => {
          const VisualIcon = workVisualIcons[work.visual] ?? GitBranch;
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const ytMatch = work.youtubeUrl?.match(regExp);
          const ytId = ytMatch?.[2];
          const ytThumb =
            ytId && ytId.length === 11
              ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
              : undefined;
          const thumbnail = work.image || ytThumb;
          const visibleTags = work.tags.slice(0, 6);
          const remainingTagCount = work.tags.length - visibleTags.length;

          return (
            <WorkDetailDialog key={work.title} work={work}>
              <article className="work-card" role="button" tabIndex={0}>
                <div className={`work-card__visual work-card__visual--${work.visual}`}>
                  <div className="work-visual__glow" />
                  {thumbnail ? (
                    <>
                      <img
                        src={thumbnail}
                        alt={work.title}
                        className="work-card__img"
                        loading="lazy"
                      />
                      <div className="work-card__img-overlay" />
                      {/* Clean corner badges */}
                      <div className="pointer-events-none absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md uppercase">
                          <VisualIcon className="size-3 text-primary" />
                          <span>{work.category}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
                          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{work.status}</span>
                        </span>
                      </div>
                    </>
                  ) : (
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
                  )}
                </div>

                <div className="work-card__tags" aria-label={t("Project technologies")}>
                  {visibleTags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                  {remainingTagCount > 0 && (
                    <span aria-label={`${remainingTagCount} additional technologies`}>
                      +{remainingTagCount} {t("Tools")}
                    </span>
                  )}
                </div>

                <div className="work-card__heading">
                  <h3>{work.title}</h3>
                  <span className="work-card__arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </div>
                <p>{work.body}</p>
              </article>
            </WorkDetailDialog>
          );
        })}
      </div>
    </section>
  );
}

export function ServicesSection() {
  const data = useLocalizedPortfolioData();
  const { t } = useLanguage();
  const { services, works } = data;
  const [activeSection, setActiveSection] = useState<string>(serviceShortcuts[0].id);
  const showAll = activeSection === "services-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title={t("Services")}>
        <SectionTabs
          items={serviceShortcuts}
          label={t("Services")}
          activeId={activeSection}
          onChange={setActiveSection}
        />
      </SectionHeader>

      <div
        id={`${activeSection}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeSection}-tab`}
        className={`section-tab-panel animate-rise${showAll ? " section-tab-panel--stack section-tab-panel--wide" : ""}`}
      >
        {(showAll || activeSection === "services-overview") && (
          <div className="service-solutions-grid">
            {services.map((s) => {
              const relatedWork = s.relatedWorkTitle
                ? works.find((work) => work.title === s.relatedWorkTitle)
                : undefined;

              return (
                <article
                  key={s.title}
                  className={`service-solution-card${s.featured ? " is-featured" : ""}`}
                >
                  <div className="service-solution-card__visual">
                    {s.image && <img src={s.image} alt="" loading="lazy" />}
                    <span>{s.meta}</span>
                  </div>

                  <div className="service-solution-card__content">
                    <p className="service-solution-card__eyebrow">{s.eyebrow ?? s.meta}</p>
                    <h3>{s.title}</h3>
                    <p className="service-solution-card__body">{s.body}</p>

                    {s.outcomes && s.outcomes.length > 0 && (
                      <ul
                        className="service-solution-card__outcomes"
                        aria-label={t("Solution outcomes")}
                      >
                        {s.outcomes.map((outcome) => (
                          <li key={outcome}>
                            <CheckCircle2 aria-hidden="true" />
                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.tools && s.tools.length > 0 && (
                      <div className="service-solution-card__tools">
                        <small>{t("Technology foundation")}</small>
                        <div>
                          {s.tools.map((tool) => (
                            <span key={tool}>{tool}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="service-solution-card__actions">
                      <ContactRequestDialog requestType="proposal" service={s.title}>
                        <button type="button" className="service-solution-card__cta">
                          <span>{s.cta ?? t("Discuss Your Project")}</span>
                          <ArrowUpRight aria-hidden="true" />
                        </button>
                      </ContactRequestDialog>

                      {relatedWork && (
                        <WorkDetailDialog work={relatedWork}>
                          <button type="button" className="service-solution-card__case-study">
                            {t("View Case Study")}
                          </button>
                        </WorkDetailDialog>
                      )}
                    </div>
                  </div>
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
  const data = useLocalizedPortfolioData();
  const { t } = useLanguage();
  const { experience, certifications } = data;
  const [activeSection, setActiveSection] = useState<string>(resumeShortcuts[0].id);
  const showAll = activeSection === "resume-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title={t("Resume")}>
        <SectionTabs
          items={resumeShortcuts}
          label={t("Resume")}
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
            <SectionTitle>{t("Experience")}</SectionTitle>
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
            <SectionTitle>{t("Certifications")}</SectionTitle>
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
  const data = useLocalizedPortfolioData();
  const { t } = useLanguage();
  const { coreSkills, tools, languages, softSkills } = data;
  const [activeSection, setActiveSection] = useState<string>(skillsShortcuts[0].id);
  const showAll = activeSection === "skills-all";

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title={t("Skills")}>
        <SectionTabs
          items={skillsShortcuts}
          label={t("Skills")}
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
            <SectionTitle>{t("Core Skills")}</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {coreSkills.map((s) => (
                <Bar key={s.name} {...s} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-tools") && (
          <div>
            <SectionTitle>{t("Tools")} &amp; Platforms</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {tools.map((t) => (
                <Bar key={t.name} {...t} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-languages") && (
          <div>
            <SectionTitle>{t("Languages")}</SectionTitle>
            <div className="grid gap-5 sm:grid-cols-2">
              {languages.map((l) => (
                <Bar key={l.name} {...l} />
              ))}
            </div>
          </div>
        )}

        {(showAll || activeSection === "skills-soft") && (
          <div>
            <SectionTitle>{t("Soft Skills")}</SectionTitle>
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
  const data = useLocalizedPortfolioData();
  const { language, t } = useLanguage();
  const profile = data.profile;

  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title={t("Contact")} />
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
                <span className="contact-card__label">{t("Request a Call")}</span>
                <span className="contact-card__value">
                  {language === "id" ? "Bagikan detail kontak Anda" : "Share your contact details"}
                </span>
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
            <span className="contact-card__label">{language === "id" ? "Lokasi" : "Location"}</span>
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
          {language === "id" ? "Mari membangun sesuatu yang" : "Let's ship something"}{" "}
          <span className="highlight-pill">{language === "id" ? "andal" : "reliable"}</span>
        </h3>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {language === "id"
            ? "Tersedia untuk pekerjaan DevOps, platform engineering, dan otomasi CI/CD. Kirim pesan dan saya akan segera menghubungi Anda."
            : "Available for DevOps, platform engineering, and CI/CD automation work. Send a message and I'll get back to you."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {language === "id" ? "Kirim Pesan" : "Send Message"} <ArrowUpRight className="size-4" />
          </a>
          <ContactRequestDialog requestType="call">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("Request a Call")} <PhoneCall className="size-4" />
            </button>
          </ContactRequestDialog>
        </div>
      </div>
    </section>
  );
}

function ServiceDetailsSection({ activeSection }: { activeSection: string }) {
  const data = useLocalizedPortfolioData();
  const { language, t } = useLanguage();
  const { clients, testimonials } = data;
  const showAll = activeSection === "services-all";

  return (
    <section className="portfolio-section service-tab-sections">
      {(showAll || activeSection === "services-clients") && (
        <div>
          <SectionTitle>
            {t("Clients")} &amp; {language === "id" ? "Kolaborasi" : "Engagements"}
          </SectionTitle>
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
          <SectionTitle>{t("Testimonials")}</SectionTitle>
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
  const data = useLocalizedPortfolioData();
  const { t } = useLanguage();
  const posts = data.posts;
  return (
    <section className="portfolio-section animate-rise">
      <SectionHeader title={t("Blog")} />
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
