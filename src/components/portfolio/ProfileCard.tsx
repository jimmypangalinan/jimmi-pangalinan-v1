import { Download, Github, Instagram, Linkedin, Mail, Menu, Youtube } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { ContactRequestDialog } from "./ContactRequestDialog";
import { ThemeToggle } from "./ThemeToggle";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram,
  YouTube: Youtube,
};

export function ProfileCard() {
  const showNavigation = () => {
    const navigation = document.getElementById("portfolio-navigation");
    if (window.matchMedia("(max-width: 1040px)").matches) {
      navigation?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    navigation?.querySelector<HTMLElement>("button")?.focus({
      preventScroll: true,
    });
  };

  return (
    <aside className="profile-card">
      <div className="profile-card__controls">
        <button
          type="button"
          onClick={showNavigation}
          className="profile-card__menu"
          aria-label="Go to portfolio navigation"
          title="Portfolio navigation"
        >
          <Menu aria-hidden="true" />
        </button>
        <ThemeToggle />
      </div>

      <div className="profile-card__photo">
        <img src="/jimmi.png" alt={`${profile.name}, ${profile.role}`} loading="eager" />
      </div>

      <div className="profile-card__identity">
        <h2>{profile.name}</h2>
        <p>
          {profile.role} <span aria-hidden="true">—</span>
        </p>
      </div>

      <div className="profile-card__socials" aria-label="Social links">
        {profile.socials.map((s) => {
          const Icon = icons[s.label] ?? Mail;
          return (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={s.label}
            >
              <Icon aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <ContactRequestDialog requestType="cv">
        <button type="button" className="profile-card__download">
          <Download aria-hidden="true" />
          Download CV
        </button>
      </ContactRequestDialog>
    </aside>
  );
}
