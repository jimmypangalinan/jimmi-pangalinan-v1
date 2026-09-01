import type { PortfolioData } from "./portfolio-data";

export function generateFullPortfolioDataFileContent(data: PortfolioData): string {
  return `import { generateFullPortfolioDataFileContent } from "./data-exporter";

export interface SocialLink {
  label: string;
  href: string;
}

export interface ProfileData {
  name: string;
  role: string;
  roles: string[];
  email: string;
  location: string;
  contactRequestUrl: string;
  headlineLead: string;
  intro: string;
  socials: SocialLink[];
}

export interface StatItem {
  value: string;
  suffix?: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  meta: string;
  body: string;
  eyebrow?: string;
  image?: string;
  outcomes?: string[];
  tools?: string[];
  cta?: string;
  featured?: boolean;
  relatedWorkTitle?: string;
}

export interface WorkItem {
  title: string;
  category: string;
  tags: string[];
  visual: string;
  console: string;
  stages: string[];
  status: string;
  body: string;
  image?: string;
  overview?: string;
  deliverables?: string[];
  projectUrl?: string;
  youtubeUrl?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  body: string;
}

export interface CertificationItem {
  period: string;
  title: string;
  org: string;
  body: string;
}

export interface ClientItem {
  name: string;
  note: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface BlogPost {
  date: string;
  tag: string;
  title: string;
  body: string;
}

export interface SkillItem {
  name: string;
  value: number;
}

export interface PortfolioData {
  profile: ProfileData;
  stats: StatItem[];
  services: ServiceItem[];
  works: WorkItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  clients: ClientItem[];
  testimonials: TestimonialItem[];
  posts: BlogPost[];
  coreSkills: SkillItem[];
  tools: SkillItem[];
  softSkills: string[];
  languages: SkillItem[];
}

export const defaultPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};

const STORAGE_KEY = "portfolio_custom_data_v1";
const STORAGE_VERSION_KEY = "portfolio_custom_data_version";
const CURRENT_STORAGE_VERSION = 7;

export function loadPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultPortfolioData;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolioData;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;
    let mergedServices = parsed.services ?? defaultPortfolioData.services;

    // Deep merge works to preserve images & new fields from defaults if missing
    let mergedWorks = (parsed.works ?? defaultPortfolioData.works).map((w, idx) => {
      const def = defaultPortfolioData.works[idx] ?? {};
      return {
        ...def,
        ...w,
        image: w.image || def.image,
        overview: w.overview || def.overview,
        deliverables:
          w.deliverables && w.deliverables.length > 0 ? w.deliverables : def.deliverables,
        youtubeUrl: w.youtubeUrl || def.youtubeUrl,
        projectUrl: w.projectUrl || def.projectUrl,
      };
    });

    const storedVersion = Number(localStorage.getItem(STORAGE_VERSION_KEY) ?? 1);
    if (storedVersion < CURRENT_STORAGE_VERSION) {
      // Versioned content migrations use the checked-in collections as the source of truth.
      // This removes stale cards that may still exist in localStorage from older releases.
      mergedServices = defaultPortfolioData.services;
      mergedWorks = defaultPortfolioData.works;
    }

    const mergedData = {
      ...defaultPortfolioData,
      ...parsed,
      profile: { ...defaultPortfolioData.profile, ...(parsed.profile ?? {}) },
      services: mergedServices,
      works: mergedWorks,
    };

    if (storedVersion < CURRENT_STORAGE_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
      localStorage.setItem(STORAGE_VERSION_KEY, String(CURRENT_STORAGE_VERSION));
    }

    return mergedData;
  } catch (e) {
    console.error("Failed to parse custom portfolio data:", e);
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_VERSION_KEY, String(CURRENT_STORAGE_VERSION));
    window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: data }));
  } catch (e) {
    console.error("Failed to save portfolio data:", e);
  }
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_VERSION_KEY);
    window.dispatchEvent(
      new CustomEvent("portfolio-data-updated", { detail: defaultPortfolioData }),
    );
  } catch (e) {
    console.error("Failed to reset portfolio data:", e);
  }
}

export function exportPortfolioDataCode(data: PortfolioData): string {
  return generateFullPortfolioDataFileContent(data);
}

// Backward-compatible individual exports
export const profile = defaultPortfolioData.profile;
export const stats = defaultPortfolioData.stats;
export const services = defaultPortfolioData.services;
export const works = defaultPortfolioData.works;
export const experience = defaultPortfolioData.experience;
export const certifications = defaultPortfolioData.certifications;
export const clients = defaultPortfolioData.clients;
export const testimonials = defaultPortfolioData.testimonials;
export const posts = defaultPortfolioData.posts;
export const coreSkills = defaultPortfolioData.coreSkills;
export const tools = defaultPortfolioData.tools;
export const softSkills = defaultPortfolioData.softSkills;
export const languages = defaultPortfolioData.languages;
`;
}
