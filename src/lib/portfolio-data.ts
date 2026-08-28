export const profile = {
  name: "Jimmi Pangalinan",
  role: "DevOps Engineer",
  roles: ["DevOps Engineer", "CI/CD Automation", "Cloud & Platform Engineer"],
  email: "pangalinan.jimmi@gmail.com",
  location: "Jakarta, Indonesia",
  phone: "+62 857-7823-3885",
  phoneHref: "tel:+6285778233885",
  whatsapp: "https://wa.me/6285778233885",
  cvRequestUrl:
    "https://script.google.com/macros/s/AKfycbysCYpkVgoNQafGYcVujtg_GHh_wct_ZC1QvpmoGEpsXnIqQxI9AzFSKa5YQi37ojT3Xg/exec",
  headlineLead: "DevOps Engineer",
  intro:
    "Highly motivated DevOps Engineer experienced in implementing automated CI/CD pipelines to improve deployment speed and reliability. Skilled in development, scripting, version control, and monitoring. Completed CCNAv7 at Cisco Academy, AWS re/Start at Orbit Academy, and certified as an AWS Certified Cloud Practitioner.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jimmipangalinan/" },
    { label: "GitHub", href: "https://github.com/jimmypangalinan" },
    { label: "Instagram", href: "https://www.instagram.com/jimmipangalinan/" },
    { label: "YouTube", href: "https://www.youtube.com/@jimmipang" },
  ],
};

export const stats = [
  { value: "5+", label: "Years of\nExperience" },
  { value: "20+", label: "Pipelines\nDelivered" },
  { value: "5", label: "Certifications\nEarned" },
];

export const services = [
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
];

export const works = [
  {
    title: "Jenkins Templating Engine pipeline platform",
    tag: "CI/CD",
    body: "Reusable pipeline templates shared across teams, cutting pipeline onboarding for a new service from days to hours.",
  },
  {
    title: "GitOps delivery on Kubernetes with ArgoCD",
    tag: "Kubernetes",
    body: "Declarative deployments with automated sync, rollback, and environment promotion for containerized workloads.",
  },
  {
    title: "Infrastructure as Code baseline",
    tag: "Cloud",
    body: "Terraform and Ansible modules to provision servers, networking, and hardened base images repeatably.",
  },
  {
    title: "DevSecOps quality gates",
    tag: "DevSecOps",
    body: "SonarQube analysis and Nexus artifact governance wired into pipelines as blocking release criteria.",
  },
];

export const experience = [
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
];

export const certifications = [
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
];

export const pricing = [
  {
    name: "Starter POC",
    price: "Rp 7,5 jt",
    unit: "/ paket",
    tagline: "Proof of Concept 1–2 minggu",
    features: [
      "1 pipeline CI/CD end-to-end",
      "Containerization 1 aplikasi",
      "Setup Git branching & quality gate dasar",
      "Dokumentasi & handover session",
    ],
  },
  {
    name: "DevOps Delivery",
    price: "Rp 25 jt",
    unit: "/ proyek",
    tagline: "Implementasi produksi 4–6 minggu",
    highlighted: true,
    features: [
      "Multi-env pipeline (dev / staging / prod)",
      "Kubernetes + GitOps (ArgoCD / Helm)",
      "Infrastructure as Code (Terraform, Ansible)",
      "DevSecOps: SonarQube, Nexus, secret management",
      "Monitoring & alerting dasar",
    ],
  },
  {
    name: "Platform Retainer",
    price: "Rp 12 jt",
    unit: "/ bulan",
    tagline: "Operasional & improvement berkelanjutan",
    features: [
      "Maintenance pipeline & cluster",
      "On-call support jam kerja",
      "Optimasi biaya cloud",
      "Laporan bulanan & roadmap improvement",
    ],
  },
];

export const clients = [
  { name: "Avows Technology", note: "Pipeline platform" },
  { name: "Naradacode", note: "DevSecOps POC" },
  { name: "Metrocom", note: "CI/CD automation" },
  { name: "SJS", note: "Platform operations" },
  { name: "Vlink Consulting", note: "DevOps support" },
  { name: "Orbit Academy", note: "Cloud program" },
];

export const testimonials = [
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
];

export const posts = [
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
];

export const coreSkills = [
  { name: "CI/CD & Jenkins", value: 92 },
  { name: "Docker & Kubernetes", value: 85 },
  { name: "Terraform & Ansible", value: 80 },
  { name: "AWS & GCP", value: 78 },
];

export const tools = [
  { name: "Jenkins", value: 92 },
  { name: "ArgoCD", value: 82 },
  { name: "Docker", value: 90 },
  { name: "Kubernetes", value: 84 },
  { name: "Terraform", value: 80 },
  { name: "Ansible", value: 78 },
  { name: "SonarQube", value: 76 },
  { name: "Nexus", value: 74 },
  { name: "Git", value: 90 },
  { name: "Linux", value: 88 },
  { name: "GitHub Actions", value: 82 },
  { name: "Helm", value: 80 },
  { name: "Prometheus & Grafana", value: 78 },
  { name: "OpenTelemetry", value: 70 },
];

export const softSkills = [
  "Cross-functional collaboration",
  "Secure SDLC mindset",
  "Automation scripting (Bash, Python)",
  "Monitoring & incident reporting",
  "Technical documentation",
  "Client-facing consulting",
];

export const languages = [
  { name: "Bahasa Indonesia", value: 100 },
  { name: "English", value: 75 },
];
