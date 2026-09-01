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
  profile: {
    name: "Jimmi Pangalinan",
    role: "DevOps Engineer",
    roles: ["DevOps Engineer", "DevSecOps Engineer", "AI Software Developer", "Platform Engineer"],
    email: "pangalinan.jimmi@gmail.com",
    location: "Jakarta, Indonesia",
    contactRequestUrl:
      "https://script.google.com/macros/s/AKfycbysCYpkVgoNQafGYcVujtg_GHh_wct_ZC1QvpmoGEpsXnIqQxI9AzFSKa5YQi37ojT3Xg/exec",
    headlineLead: "DevOps Engineer",
    intro:
      "Highly motivated DevOps Engineer experienced in implementing automated CI/CD pipelines to improve deployment speed and reliability. Skilled in development, scripting, version control, and monitoring. Completed CCNAv7 at Cisco Academy, AWS re/Start at Orbit Academy, and certified as an AWS Certified Cloud Practitioner.",
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jimmipangalinan/",
      },
      {
        label: "GitHub",
        href: "https://github.com/jimmypangalinan",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/jimmipangalinan/",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/@jimmipangalinan",
      },
    ],
  },
  stats: [
    {
      value: "5+",
      label: "Years of\nExperience",
    },
    {
      value: "30+",
      label: "Projects\nCompleted",
    },
    {
      value: "24",
      suffix: "/7",
      label: "Support\nAvailable",
    },
  ],
  services: [
    {
      title: "CI/CD Pipeline Engineering",
      meta: "Jenkins · GitLab CI · ArgoCD",
      body: "Design and maintain automated build, test, and deployment pipelines — including Jenkins Templating Engine (JTE) — to shorten release cycles and make deployments repeatable.",
    },
    {
      title: "Cloud & Server Infrastructure",
      meta: "AWS · GCP · Linux",
      body: "Provision, configure, and manage server instances and cloud resources with Terraform and Ansible, keeping environments consistent from dev to production.",
    },
    {
      title: "DevSecOps & Secure SDLC",
      meta: "SonarQube · Nexus",
      body: "Embed quality gates, artifact management, and security scanning into the delivery flow so vulnerabilities are caught before they reach production.",
    },
    {
      title: "Containers & Kubernetes",
      meta: "Docker · Kubernetes · Helm",
      body: "Containerize applications and run them on Kubernetes with GitOps delivery, autoscaling, and clear observability across every environment.",
    },
  ],
  works: [
    {
      title: "Jenkins Templating Engine pipeline platform",
      category: "CI/CD",
      tags: ["Jenkins", "Automation"],
      visual: "pipeline",
      console: "Pipeline #248",
      stages: ["Build", "Scan", "Deploy"],
      status: "3 stages passed",
      image: "/projects/jte-pipeline.jpg",
      youtubeUrl: "https://youtu.be/xKAwIJHW3M0",
      projectUrl: "https://github.com/jimmypangalinan",
      body: "Reusable pipeline templates shared across teams, cutting pipeline onboarding for a new service from days to hours.",
      overview:
        "Designed and implemented an enterprise-grade CI/CD pipeline framework utilizing the Jenkins Templating Engine (JTE). This solution standardizes the build, test, scan, and release processes across dozens of microservices with reusable, centralized pipeline configurations. It eliminates pipeline configuration drift and accelerates new microservice onboarding from days to just a couple of hours with comprehensive governance and automated rollbacks.",
      deliverables: [
        "Modular JTE template library with pluggable build and security steps",
        "Automated Docker containerization and image scanning",
        "Integration with SonarQube quality gates and Nexus artifact repositories",
        "Self-service onboarding documentation for engineering teams",
      ],
    },
    {
      title: "GitOps delivery on Kubernetes with ArgoCD",
      category: "Kubernetes",
      tags: ["Kubernetes", "ArgoCD"],
      visual: "kubernetes",
      console: "Sync / Production",
      stages: ["Manifest", "ArgoCD", "Cluster"],
      status: "Healthy & synced",
      image: "https://www.gstatic.com/bricks/image/b7d5622f-d39e-4bf4-958b-ca3982699fe0.png",
      projectUrl: "https://github.com/jimmypangalinan",
      body: "Declarative deployments with automated sync, rollback, and environment promotion for containerized workloads.",
      overview:
        "Constructed a declarative GitOps continuous delivery system on Kubernetes managed by ArgoCD. Application manifests, Helm charts, and environment-specific parameters are tracked in version control, providing immutable audit trails, automatic drift detection, and instantaneous zero-downtime canary or blue/green deployments.",
      deliverables: [
        "Multi-cluster ArgoCD deployment setup with automated sync hooks",
        "Helm chart repository structure for microservice application manifests",
        "Automated rollbacks and health monitoring checks on failed deployments",
        "Role-Based Access Control (RBAC) configured for development and operations teams",
      ],
      youtubeUrl: "https://youtu.be/xKAwIJHW3M0",
    },
    {
      title: "Infrastructure as Code baseline",
      category: "Cloud",
      tags: ["Terraform", "Ansible"],
      visual: "cloud",
      console: "Terraform plan",
      stages: ["Network", "Compute", "Baseline"],
      status: "24 resources ready",
      image: "/projects/terraform-iac.jpg",
      projectUrl: "https://github.com/jimmypangalinan",
      body: "Terraform and Ansible modules to provision servers, networking, and hardened base images repeatably.",
      overview:
        "Engineered production-ready, modular Infrastructure as Code (IaC) templates using Terraform and Ansible. The infrastructure automates the deployment of secure Virtual Private Clouds (VPC), multi-tier compute clusters, load balancers, managed databases, and CIS-benchmark hardened Linux instances across AWS and GCP environments.",
      deliverables: [
        "Reusable Terraform modules for VPC, Subnets, Security Groups, and IAM",
        "Ansible playbooks for OS-level hardening, user provisioning, and agent installation",
        "Remote state management with DynamoDB locking and encrypted S3 backends",
        "Automated Terraform plan and linting checks embedded in PR workflows",
      ],
    },
    {
      title: "DevSecOps quality gates",
      category: "DevSecOps",
      tags: ["SonarQube", "Nexus"],
      visual: "security",
      console: "Security gate",
      stages: ["SAST", "Artifact", "Policy"],
      status: "Quality gate passed",
      image: "/projects/devsecops-gates.jpg",
      projectUrl: "https://github.com/jimmypangalinan",
      body: "SonarQube analysis and Nexus artifact governance wired into pipelines as blocking release criteria.",
      overview:
        "Built comprehensive DevSecOps guardrails into the software development lifecycle (SDLC). The system automatically runs Static Application Security Testing (SAST), Software Composition Analysis (SCA), container vulnerability scanning, and secret leak detection. Releases are strictly gated based on customizable security and code quality metrics.",
      deliverables: [
        "Automated SonarQube scanner integration with blocking quality gates",
        "Nexus Repository Manager integration for trusted, signed artifact storage",
        "Vulnerability scanning for container images and open-source dependencies",
        "Compliance reporting and automated security alerting via Slack/email",
      ],
    },
    {
      title: "Kubernetes observability stack",
      category: "Observability",
      tags: ["Prometheus", "Grafana"],
      visual: "observability",
      console: "Cluster overview",
      stages: ["Metrics", "Logs", "Traces"],
      status: "All systems observable",
      image: "/projects/observability-stack.jpg",
      projectUrl: "https://github.com/jimmypangalinan",
      body: "Unified dashboards, actionable alerts, and service telemetry for faster incident triage across production workloads.",
      overview:
        "Architected an end-to-end cloud-native observability platform across Kubernetes clusters using Prometheus, Grafana, OpenTelemetry, and centralized logging. The system provides real-time visibility into infrastructure health, application latency, resource saturation, and distributed tracing for ultra-fast root cause analysis and proactive incident mitigation.",
      deliverables: [
        "Prometheus Operator deployed with high-availability metric scraping",
        "Custom Grafana operational dashboards tailored for SREs and developers",
        "Actionable Alertmanager notification routing with severity-based escalation",
        "Distributed tracing and structured log aggregation pipeline",
      ],
    },
  ],
  experience: [
    {
      period: "2025 — Present",
      role: "DevOps Engineer",
      company: "Avows Technology",
      body: "Develop and manage automated CI/CD pipelines using Jenkins Templating Engine (JTE), collaborate with cross-functional teams on secure SDLC practices, manage server infrastructure, and support scalable DevOps architecture across environments.",
    },
    {
      period: "2025",
      role: "DevOps Engineer & Consultant",
      company: "Naradacode",
      body: "Research and development in DevOps and DevSecOps technologies, evaluating Proofs of Concept, guiding client teams technically, and delivering structured reports on DevOps initiatives and pilot implementations.",
    },
    {
      period: "2024",
      role: "DevOps Engineer",
      company: "Metrocom",
      body: "Built and managed CI/CD pipelines to automate deployments, worked with development, operations, and security teams on secure SDLC practices, and installed, configured, and managed server instances.",
    },
    {
      period: "2023",
      role: "DevOps Platform Engineer & Operations",
      company: "SJS",
      body: "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and reporting on deployments, incidents, and pipeline improvements.",
    },
    {
      period: "2022",
      role: "DevOps Platform Engineer & Operations",
      company: "Vlink Consulting",
      body: "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and generating operational reports.",
    },
  ],
  certifications: [
    {
      period: "AWS",
      title: "AWS Certified Cloud Practitioner",
      org: "Amazon Web Services",
      body: "Foundational understanding of AWS cloud services, architecture, security, pricing, and support models.",
    },
    {
      period: "Program",
      title: "AWS re/Start Graduate",
      org: "Orbit Academy",
      body: "Intensive cloud fundamentals program covering Linux, networking, Python scripting, and core AWS services.",
    },
    {
      period: "Networking",
      title: "CCNAv7",
      org: "Cisco Networking Academy",
      body: "Routing, switching, network fundamentals, and troubleshooting across enterprise network topologies.",
    },
    {
      period: "Kubernetes",
      title: "Kubernetes & Container Fundamentals",
      org: "Linux Foundation / KodeKloud",
      body: "Cluster architecture, workloads, services, storage, and Helm-based deployment of containerized applications.",
    },
    {
      period: "DevSecOps",
      title: "DevSecOps & Secure SDLC Practitioner",
      org: "Internal / Vendor Training",
      body: "Pipeline security gates, SAST with SonarQube, artifact governance with Nexus, and secret management practices.",
    },
  ],
  clients: [
    {
      name: "Avows Technology",
      note: "Pipeline platform",
    },
    {
      name: "Naradacode",
      note: "DevSecOps POC",
    },
    {
      name: "Metrocom",
      note: "CI/CD automation",
    },
    {
      name: "SJS",
      note: "Platform operations",
    },
    {
      name: "Vlink Consulting",
      note: "DevOps support",
    },
    {
      name: "Orbit Academy",
      note: "AWS Re/Start",
    },
  ],
  testimonials: [
    {
      quote:
        "Jimmi memangkas waktu onboarding pipeline service baru dari beberapa hari jadi beberapa jam dengan template Jenkins yang ia bangun.",
      name: "Engineering Lead",
      role: "Avows Technology",
    },
    {
      quote:
        "POC DevSecOps yang ia jalankan jelas, terukur, dan langsung bisa diadopsi tim klien tanpa banyak revisi.",
      name: "Technical Consultant",
      role: "Naradacode",
    },
    {
      quote:
        "Deployment yang dulu manual dan rawan error jadi otomatis dan konsisten di semua environment.",
      name: "Product Owner",
      role: "Metrocom",
    },
  ],
  posts: [
    {
      date: "2026",
      tag: "Platform Engineering",
      title: "Internal Developer Platform dengan Backstage & ArgoCD",
      body: "Menyatukan katalog service, template pipeline, dan GitOps delivery jadi satu portal self-service untuk developer.",
    },
    {
      date: "2026",
      tag: "AI for Ops",
      title: "AIOps praktis: LLM untuk triage alert & root cause",
      body: "Memakai LLM gateway untuk merangkum log, mengelompokkan alert berulang, dan mempercepat postmortem.",
    },
    {
      date: "2026",
      tag: "Security",
      title: "Supply chain security: SBOM, Sigstore, dan policy as code",
      body: "Menandatangani artifact, menghasilkan SBOM otomatis, dan menegakkan kebijakan rilis dengan OPA/Kyverno.",
    },
    {
      date: "2026",
      tag: "Observability",
      title: "OpenTelemetry end-to-end di Kubernetes",
      body: "Tracing, metrics, dan logs terpadu dengan OTel Collector, Prometheus, Loki, dan Grafana.",
    },
  ],
  coreSkills: [
    {
      name: "CI/CD & Jenkins",
      value: 92,
    },
    {
      name: "Docker & Kubernetes",
      value: 85,
    },
    {
      name: "Terraform & Ansible",
      value: 80,
    },
    {
      name: "AWS & GCP",
      value: 78,
    },
  ],
  tools: [
    {
      name: "Jenkins",
      value: 92,
    },
    {
      name: "ArgoCD",
      value: 82,
    },
    {
      name: "Docker",
      value: 90,
    },
    {
      name: "Kubernetes",
      value: 84,
    },
    {
      name: "Terraform",
      value: 80,
    },
    {
      name: "Ansible",
      value: 78,
    },
    {
      name: "SonarQube",
      value: 76,
    },
    {
      name: "Nexus",
      value: 74,
    },
    {
      name: "Git",
      value: 90,
    },
    {
      name: "Linux",
      value: 88,
    },
    {
      name: "GitHub Actions",
      value: 82,
    },
    {
      name: "Helm",
      value: 80,
    },
    {
      name: "Prometheus & Grafana",
      value: 78,
    },
    {
      name: "OpenTelemetry",
      value: 70,
    },
  ],
  softSkills: [
    "Cross-functional collaboration",
    "Secure SDLC mindset",
    "Automation scripting (Bash, Python)",
    "Monitoring & incident reporting",
    "Technical documentation",
    "Client-facing consulting",
  ],
  languages: [
    {
      name: "Bahasa Indonesia",
      value: 100,
    },
    {
      name: "English",
      value: 75,
    },
  ],
};

const STORAGE_KEY = "portfolio_custom_data_v1";

export function loadPortfolioData(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultPortfolioData;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolioData;
    const parsed = JSON.parse(raw) as Partial<PortfolioData>;

    // Deep merge works to preserve images & new fields from defaults if missing
    const mergedWorks = (parsed.works ?? defaultPortfolioData.works).map((w, idx) => {
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

    return {
      ...defaultPortfolioData,
      ...parsed,
      profile: { ...defaultPortfolioData.profile, ...(parsed.profile ?? {}) },
      works: mergedWorks,
    };
  } catch (e) {
    console.error("Failed to parse custom portfolio data:", e);
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("portfolio-data-updated", { detail: data }));
  } catch (e) {
    console.error("Failed to save portfolio data:", e);
  }
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
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
