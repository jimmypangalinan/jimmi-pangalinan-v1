import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Briefcase, FileText, Newspaper, PenLine, Send, Settings, User } from "lucide-react";
import { ProfileCard } from "@/components/portfolio/ProfileCard";
import {
  AboutSection,
  BlogSection,
  ContactSection,
  ResumeSection,
  ServicesSection,
  SkillsSection,
  WorksSection,
} from "@/components/portfolio/Sections";

const title = "Jimmi Pangalinan — DevOps Engineer Portfolio";
const description =
  "DevOps Engineer specializing in automated CI/CD pipelines, Kubernetes, Terraform, and cloud infrastructure on AWS and GCP.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navigation = [
  { id: "about", label: "About", icon: User },
  { id: "works", label: "Works", icon: Briefcase },
  { id: "services", label: "Services", icon: Settings },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "skills", label: "Skills", icon: PenLine },
  { id: "blog", label: "Blog", icon: Newspaper },
  { id: "contact", label: "Contact", icon: Send },
] as const;

type SectionId = (typeof navigation)[number]["id"];

function Index() {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    const desktopLayout = window.matchMedia("(min-width: 1041px)");
    const resetOuterScroll = () => {
      if (desktopLayout.matches) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.history.scrollRestoration = "manual";
    resetOuterScroll();
    const frame = window.requestAnimationFrame(resetOuterScroll);
    desktopLayout.addEventListener("change", resetOuterScroll);

    const content = document.querySelector<HTMLElement>(".content-scroll");
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const useInternalScroller = window.matchMedia("(min-width: 1041px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      {
        root: useInternalScroller ? content : null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.cancelAnimationFrame(frame);
      desktopLayout.removeEventListener("change", resetOuterScroll);
      observer.disconnect();
    };
  }, []);

  const goToSection = (id: SectionId) => {
    setActive(id);
    const target = document.getElementById(id);
    if (!target) return;

    if (window.matchMedia("(min-width: 1041px)").matches) {
      const content = document.querySelector<HTMLElement>(".content-scroll");
      if (!content) return;

      const top =
        target.getBoundingClientRect().top -
        content.getBoundingClientRect().top +
        content.scrollTop;

      content.scrollTo({ top, left: 0, behavior: "smooth" });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <a className="skip-link" href="#about">
        Skip to portfolio content
      </a>
      <div className="portfolio-shell">
        <ProfileCard />

        <div className="portfolio-main">
          <nav
            id="portfolio-navigation"
            className="portfolio-navigation"
            aria-label="Portfolio sections"
          >
            {navigation.map(({ id, label, icon: Icon }) => {
              const isActive = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goToSection(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "is-active" : undefined}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <main className="content-scroll" tabIndex={0}>
            <div id="about" className="portfolio-page portfolio-page--hero">
              <AboutSection />
            </div>

            <div id="works" className="portfolio-page">
              <WorksSection />
            </div>

            <div id="services" className="portfolio-page section-stack">
              <ServicesSection />
            </div>

            <div id="resume" className="portfolio-page">
              <ResumeSection />
            </div>

            <div id="skills" className="portfolio-page">
              <SkillsSection />
            </div>

            <div id="blog" className="portfolio-page">
              <BlogSection />
            </div>

            <div id="contact" className="portfolio-page portfolio-page--contact">
              <ContactSection />
              <footer className="portfolio-footer">
                © {new Date().getFullYear()} {"Jimmi Pangalinan"}. All rights reserved.
              </footer>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
