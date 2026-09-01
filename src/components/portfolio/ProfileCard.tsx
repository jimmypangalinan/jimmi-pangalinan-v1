import {
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  PhoneCall,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePortfolioData } from "@/lib/usePortfolioStore";
import { ContactRequestDialog } from "./ContactRequestDialog";
import { ThemeToggle } from "./ThemeToggle";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram,
  YouTube: Youtube,
};

export function ProfileCard() {
  const { data } = usePortfolioData();
  const profile = data.profile;
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);
    return () => motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const currentRole = profile.roles[roleIndex] ?? profile.role;

    if (prefersReducedMotion) {
      setTypedRole(currentRole);
      return;
    }

    const isComplete = typedRole === currentRole;
    const isEmpty = typedRole.length === 0;
    const delay =
      isComplete && !isDeleting ? 1700 : isEmpty && isDeleting ? 320 : isDeleting ? 42 : 78;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty && isDeleting) {
        setIsDeleting(false);
        setRoleIndex((index) => (index + 1) % profile.roles.length);
        return;
      }

      const nextLength = typedRole.length + (isDeleting ? -1 : 1);
      setTypedRole(currentRole.slice(0, nextLength));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, prefersReducedMotion, profile.role, profile.roles, roleIndex, typedRole]);

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
        <img
          className="profile-card__photo-base"
          src="/jimmi.png"
          alt={`${profile.name}, ${profile.role}`}
          loading="eager"
        />
        <img
          className="profile-card__photo-glitch profile-card__photo-glitch--one"
          src="/jimmi.png"
          alt=""
          aria-hidden="true"
        />
        <img
          className="profile-card__photo-glitch profile-card__photo-glitch--two"
          src="/jimmi.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="profile-card__identity">
        <h2>{profile.name}</h2>
        <p aria-label={`Roles: ${profile.roles.join(", ")}`}>
          <span aria-hidden="true">{typedRole}</span>
          <span className="profile-card__role-cursor" aria-hidden="true">
            _
          </span>
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

      <div className="profile-card__actions">
        <ContactRequestDialog requestType="call">
          <button type="button" className="profile-card__call">
            <PhoneCall aria-hidden="true" />
            Request a Call
          </button>
        </ContactRequestDialog>

        <ContactRequestDialog requestType="cv">
          <button type="button" className="profile-card__download">
            <Download aria-hidden="true" />
            Download CV
          </button>
        </ContactRequestDialog>
      </div>
    </aside>
  );
}
