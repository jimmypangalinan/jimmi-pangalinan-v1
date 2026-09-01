import { generateFullPortfolioDataFileContent } from "./data-exporter";

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

export const defaultPortfolioData: PortfolioData = {
  "profile": {
    "name": "Jimmi Pangalinan",
    "role": "DevOps Engineer",
    "roles": [
      "DevOps Engineer",
      "DevSecOps Engineer",
      "AI Software Developer",
      "Platform Engineer"
    ],
    "email": "pangalinan.jimmi@gmail.com",
    "location": "Jakarta, Indonesia",
    "contactRequestUrl": "https://script.google.com/macros/s/AKfycbysCYpkVgoNQafGYcVujtg_GHh_wct_ZC1QvpmoGEpsXnIqQxI9AzFSKa5YQi37ojT3Xg/exec",
    "headlineLead": "DevOps Engineer",
    "intro": "Highly motivated DevOps Engineer experienced in implementing automated CI/CD pipelines to improve deployment speed and reliability. Skilled in development, scripting, version control, and monitoring. Completed CCNAv7 at Cisco Academy, AWS re/Start at Orbit Academy, and certified as an AWS Certified Cloud Practitioner.",
    "socials": [
      {
        "label": "LinkedIn",
        "href": "https://www.linkedin.com/in/jimmipangalinan/"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/jimmypangalinan"
      },
      {
        "label": "Instagram",
        "href": "https://www.instagram.com/jimmipangalinan/"
      },
      {
        "label": "YouTube",
        "href": "https://www.youtube.com/@jimmipangalinan"
      }
    ]
  },
  "stats": [
    {
      "value": "5+",
      "label": "Years of\nExperience"
    },
    {
      "value": "30+",
      "label": "Projects\nCompleted"
    },
    {
      "value": "24",
      "suffix": "/7",
      "label": "Support\nAvailable"
    }
  ],
  "services": [
    {
      "title": "CI/CD Delivery Automation",
      "meta": "Delivery Automation",
      "eyebrow": "From Commit to Release",
      "body": "Standardize and automate software delivery so every release follows a reliable, repeatable, and controlled path to production.",
      "image": "/services/cicd-delivery-automation.webp",
      "outcomes": [
        "Repeatable release workflows",
        "Automated validation and quality gates",
        "Safer environment promotion"
      ],
      "tools": ["Jenkins", "GitLab", "Argo CD", "Nexus"],
      "cta": "Discuss Your Delivery Pipeline"
    },
    {
      "title": "Cloud Infrastructure Automation",
      "meta": "Infrastructure as Code",
      "eyebrow": "Consistent by Design",
      "body": "Turn infrastructure requirements into reusable code for secure, consistent, and easier-to-operate cloud environments.",
      "image": "/services/cloud-infrastructure-automation.webp",
      "outcomes": [
        "Reusable infrastructure modules",
        "Consistent environment baselines",
        "Traceable and reviewable changes"
      ],
      "tools": ["Terraform", "Ansible", "AWS", "GCP"],
      "cta": "Plan Your Cloud Foundation"
    },
    {
      "title": "DevSecOps & Supply Chain Security",
      "meta": "Secure Software Delivery",
      "eyebrow": "Featured Solution",
      "body": "Embed layered security controls into the delivery workflow to identify code, dependency, secret, and container risks before release.",
      "image": "/services/devsecops-supply-chain-security.webp",
      "outcomes": [
        "Security checks before deployment",
        "SBOM and dependency visibility",
        "Governed artifact promotion"
      ],
      "tools": ["SonarQube", "Trivy", "Gitleaks", "Dependency-Track", "Nexus"],
      "cta": "Strengthen Your Delivery Security",
      "featured": true,
      "relatedWorkTitle": "Enterprise DevSecOps CI/CD & GitOps Platform"
    },
    {
      "title": "Kubernetes & GitOps Platform",
      "meta": "Cloud-Native Operations",
      "eyebrow": "Declarative and Resilient",
      "body": "Deliver and operate containerized applications through a declarative platform with controlled synchronization, scaling, rollback, and visibility.",
      "image": "/services/kubernetes-gitops-platform.webp",
      "outcomes": [
        "Git-driven deployment control",
        "Scalable application workloads",
        "Faster recovery through rollback"
      ],
      "tools": ["Docker", "Kubernetes", "Helm", "Argo CD"],
      "cta": "Design Your Kubernetes Platform"
    }
  ],
  "works": [
    {
      "title": "Enterprise DevSecOps CI/CD & GitOps Platform",
      "category": "DevSecOps",
      "tags": [
        "Jenkins",
        "GitLab",
        "Docker",
        "SonarQube",
        "Trivy",
        "Gitleaks",
        "Nexus",
        "ArgoCD",
        "Helm",
        "Kubernetes"
      ],
      "visual": "security",
      "console": "Secure Delivery Pipeline",
      "stages": [
        "Build & Validate",
        "Security Gates",
        "GitOps Delivery"
      ],
      "status": "Security gates passed",
      "image": "/projects/devsecops-delivery-platform-v3.png",
      "youtubeUrl": "https://youtu.be/xKAwIJHW3M0",
      "body": "A production-oriented delivery platform that automates build, security validation, artifact publishing, and GitOps deployment from source code to Kubernetes.",
      "overview": "Designed and implemented an end-to-end DevSecOps delivery platform using GitLab, Jenkins, Docker, and Kubernetes. The solution integrates automated testing, code-quality enforcement, secret detection, dependency analysis, SBOM generation, container vulnerability scanning, and controlled artifact publishing into a single repeatable workflow. Once every quality and security gate passes, the pipeline publishes versioned artifacts and container images to Nexus, updates the Helm deployment configuration, and allows ArgoCD to synchronize the approved release to Kubernetes. Slack notifications and centralized ELK logging provide deployment visibility and post-release observability.",
      "deliverables": [
        "Reusable Jenkins pipeline workflow supporting Node.js, Maven, and Gradle applications",
        "Automated unit testing, linting, and SonarQube quality-gate enforcement",
        "Gitleaks secret detection across source code and repository history",
        "Trivy dependency scanning, container-image scanning, and SBOM generation",
        "Dependency-Track integration for ongoing open-source component risk monitoring",
        "Versioned application artifacts and container images managed through Nexus Repository",
        "GitOps-based Kubernetes delivery using Helm configuration and ArgoCD synchronization",
        "Slack deployment notifications and centralized application logging through the ELK Stack"
      ]
    }
  ],
  "experience": [
    {
      "period": "2025 — Present",
      "role": "DevOps Engineer",
      "company": "Avows Technology",
      "body": "Develop and manage automated CI/CD pipelines using Jenkins Templating Engine (JTE), collaborate with cross-functional teams on secure SDLC practices, manage server infrastructure, and support scalable DevOps architecture across environments."
    },
    {
      "period": "2025",
      "role": "DevOps Engineer & Consultant",
      "company": "Naradacode",
      "body": "Research and development in DevOps and DevSecOps technologies, evaluating Proofs of Concept, guiding client teams technically, and delivering structured reports on DevOps initiatives and pilot implementations."
    },
    {
      "period": "2024",
      "role": "DevOps Engineer",
      "company": "Metrocom",
      "body": "Built and managed CI/CD pipelines to automate deployments, worked with development, operations, and security teams on secure SDLC practices, and installed, configured, and managed server instances."
    },
    {
      "period": "2023",
      "role": "DevOps Platform Engineer & Operations",
      "company": "SJS",
      "body": "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and reporting on deployments, incidents, and pipeline improvements."
    },
    {
      "period": "2022",
      "role": "DevOps Platform Engineer & Operations",
      "company": "Vlink Consulting",
      "body": "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and generating operational reports."
    }
  ],
  "certifications": [
    {
      "period": "AWS",
      "title": "AWS Certified Cloud Practitioner",
      "org": "Amazon Web Services",
      "body": "Foundational understanding of AWS cloud services, architecture, security, pricing, and support models."
    },
    {
      "period": "Program",
      "title": "AWS re/Start Graduate",
      "org": "Orbit Academy",
      "body": "Intensive cloud fundamentals program covering Linux, networking, Python scripting, and core AWS services."
    },
    {
      "period": "Networking",
      "title": "CCNAv7",
      "org": "Cisco Networking Academy",
      "body": "Routing, switching, network fundamentals, and troubleshooting across enterprise network topologies."
    },
    {
      "period": "Kubernetes",
      "title": "Kubernetes & Container Fundamentals",
      "org": "Linux Foundation / KodeKloud",
      "body": "Cluster architecture, workloads, services, storage, and Helm-based deployment of containerized applications."
    },
    {
      "period": "DevSecOps",
      "title": "DevSecOps & Secure SDLC Practitioner",
      "org": "Internal / Vendor Training",
      "body": "Pipeline security gates, SAST with SonarQube, artifact governance with Nexus, and secret management practices."
    }
  ],
  "clients": [
    {
      "name": "Avows Technology",
      "note": "Pipeline platform"
    },
    {
      "name": "Naradacode",
      "note": "DevSecOps POC"
    },
    {
      "name": "Metrocom",
      "note": "CI/CD automation"
    },
    {
      "name": "SJS",
      "note": "Platform operations"
    },
    {
      "name": "Vlink Consulting",
      "note": "DevOps support"
    },
    {
      "name": "Orbit Academy",
      "note": "AWS Re/Start"
    }
  ],
  "testimonials": [
    {
      "quote": "Jimmi memangkas waktu onboarding pipeline service baru dari beberapa hari jadi beberapa jam dengan template Jenkins yang ia bangun.",
      "name": "Engineering Lead",
      "role": "Avows Technology"
    },
    {
      "quote": "POC DevSecOps yang ia jalankan jelas, terukur, dan langsung bisa diadopsi tim klien tanpa banyak revisi.",
      "name": "Technical Consultant",
      "role": "Naradacode"
    },
    {
      "quote": "Deployment yang dulu manual dan rawan error jadi otomatis dan konsisten di semua environment.",
      "name": "Product Owner",
      "role": "Metrocom"
    }
  ],
  "posts": [
    {
      "date": "2026",
      "tag": "Platform Engineering",
      "title": "Internal Developer Platform dengan Backstage & ArgoCD",
      "body": "Menyatukan katalog service, template pipeline, dan GitOps delivery jadi satu portal self-service untuk developer."
    },
    {
      "date": "2026",
      "tag": "AI for Ops",
      "title": "AIOps praktis: LLM untuk triage alert & root cause",
      "body": "Memakai LLM gateway untuk merangkum log, mengelompokkan alert berulang, dan mempercepat postmortem."
    },
    {
      "date": "2026",
      "tag": "Security",
      "title": "Supply chain security: SBOM, Sigstore, dan policy as code",
      "body": "Menandatangani artifact, menghasilkan SBOM otomatis, dan menegakkan kebijakan rilis dengan OPA/Kyverno."
    },
    {
      "date": "2026",
      "tag": "Observability",
      "title": "OpenTelemetry end-to-end di Kubernetes",
      "body": "Tracing, metrics, dan logs terpadu dengan OTel Collector, Prometheus, Loki, dan Grafana."
    }
  ],
  "coreSkills": [
    {
      "name": "CI/CD & Jenkins",
      "value": 92
    },
    {
      "name": "Docker & Kubernetes",
      "value": 85
    },
    {
      "name": "Terraform & Ansible",
      "value": 80
    },
    {
      "name": "AWS & GCP",
      "value": 78
    }
  ],
  "tools": [
    {
      "name": "Jenkins",
      "value": 92
    },
    {
      "name": "ArgoCD",
      "value": 82
    },
    {
      "name": "Docker",
      "value": 90
    },
    {
      "name": "Kubernetes",
      "value": 84
    },
    {
      "name": "Terraform",
      "value": 80
    },
    {
      "name": "Ansible",
      "value": 78
    },
    {
      "name": "SonarQube",
      "value": 76
    },
    {
      "name": "Nexus",
      "value": 74
    },
    {
      "name": "Git",
      "value": 90
    },
    {
      "name": "Linux",
      "value": 88
    },
    {
      "name": "GitHub Actions",
      "value": 82
    },
    {
      "name": "Helm",
      "value": 80
    },
    {
      "name": "Prometheus & Grafana",
      "value": 78
    },
    {
      "name": "OpenTelemetry",
      "value": 70
    }
  ],
  "softSkills": [
    "Cross-functional collaboration",
    "Secure SDLC mindset",
    "Automation scripting (Bash, Python)",
    "Monitoring & incident reporting",
    "Technical documentation",
    "Client-facing consulting"
  ],
  "languages": [
    {
      "name": "Bahasa Indonesia",
      "value": 100
    },
    {
      "name": "English",
      "value": 75
    }
  ]
};

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
