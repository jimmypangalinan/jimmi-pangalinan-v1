import {
  ArrowUpRight,
  GitBranch,
  Cloud,
  ShieldCheck,
  Boxes,
  Mail,
  MapPin,
  PhoneCall,
  Check,
  Quote,
} from "lucide-react";
import {
  certifications,
  clients,
  coreSkills,
  experience,
  languages,
  posts,
  pricing,
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

export function AboutSection() {
  return (
    <section className="portfolio-section hero-section animate-rise">
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
            <dd>{s.value}</dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function WorksSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionTitle>Works</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {works.map((w) => (
          <article
            key={w.title}
            className="group rounded-2xl border border-border bg-surface-2/60 p-6 transition-colors hover:border-primary/50"
          >
            <span className="text-xs uppercase tracking-widest text-primary">{w.tag}</span>
            <h3 className="mt-3 flex items-start justify-between gap-3 text-lg font-medium">
              {w.title}
              <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:text-primary" />
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const serviceIcons = [GitBranch, Cloud, ShieldCheck, Boxes];

export function ServicesSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionTitle>Services</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = serviceIcons[i % serviceIcons.length]!;
          return (
            <article key={s.title} className="rounded-2xl border border-border bg-surface-2/60 p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-5 text-xs uppercase tracking-widest text-muted-foreground">
                {s.meta}
              </p>
              <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ResumeSection() {
  return (
    <section className="portfolio-section animate-rise space-y-14">
      <div>
        <SectionTitle>Experience</SectionTitle>
        <ol className="space-y-8 border-l border-border pl-6">
          {experience.map((e) => (
            <li key={e.role + e.period} className="relative">
              <span className="absolute -left-[1.68rem] top-2 size-2.5 rounded-full bg-primary" />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{e.period}</p>
              <h3 className="mt-2 text-lg font-medium">{e.role}</h3>
              <p className="text-sm text-primary">{e.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {e.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <SectionTitle>Certifications</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <article key={c.title} className="rounded-2xl border border-border bg-surface-2/60 p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.period}</p>
              <h3 className="mt-2 text-base font-medium">{c.title}</h3>
              <p className="text-sm text-primary">{c.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
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
  return (
    <section className="portfolio-section animate-rise space-y-14">
      <div>
        <SectionTitle>Skills</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          {coreSkills.map((s) => (
            <Bar key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Tools &amp; Platforms</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((t) => (
            <Bar key={t.name} {...t} />
          ))}
        </div>
      </div>

      <div className="grid gap-14 sm:grid-cols-2">
        <div>
          <SectionTitle>Languages</SectionTitle>
          <div className="space-y-5">
            {languages.map((l) => (
              <Bar key={l.name} {...l} />
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Soft Skills</SectionTitle>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {softSkills.map((s) => (
              <li key={s} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionTitle>Contact</SectionTitle>
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

export function PricingSection() {
  return (
    <section className="portfolio-section animate-rise space-y-14">
      <div>
        <SectionTitle>Pricing</SectionTitle>
        <div className="grid gap-4 lg:grid-cols-3">
          {pricing.map((p) => (
            <article
              key={p.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                p.highlighted ? "border-primary/60 bg-primary/5" : "border-border bg-surface-2/60"
              }`}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.name}</p>
              <p className="mt-4 text-3xl font-semibold">
                {p.price}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{p.unit}</span>
              </p>
              <p className="mt-2 text-sm text-primary">{p.tagline}</p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`Inquiry: ${p.name}`)}`}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-opacity ${
                  p.highlighted
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                Get Started
              </a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Harga indikatif dan dapat disesuaikan dengan scope, jumlah service, dan durasi engagement.
        </p>
      </div>

      <div>
        <SectionTitle>Clients &amp; Engagements</SectionTitle>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
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
    </section>
  );
}

export function BlogSection() {
  return (
    <section className="portfolio-section animate-rise">
      <SectionTitle>Blog</SectionTitle>
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
