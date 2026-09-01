import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "id";

const STORAGE_KEY = "portfolio_language";

const idMessages: Record<string, string> = {
  About: "Tentang",
  Works: "Karya",
  Services: "Layanan",
  Resume: "Resume",
  Skills: "Keahlian",
  Blog: "Blog",
  Contact: "Kontak",
  All: "Semua",
  Experience: "Pengalaman",
  Certifications: "Sertifikasi",
  "Core Skills": "Keahlian Utama",
  Tools: "Tools",
  Languages: "Bahasa",
  "Soft Skills": "Soft Skills",
  Clients: "Klien",
  Testimonials: "Testimoni",
  "Hello, I'm": "Halo, saya",
  "Years of\nExperience": "Tahun\nPengalaman",
  "Projects\nCompleted": "Proyek\nDiselesaikan",
  "Support\nAvailable": "Dukungan\nTersedia",
  "Request a Call": "Jadwalkan Panggilan",
  "Download CV": "Unduh CV",
  "Skip to portfolio content": "Lewati ke konten portfolio",
  "Portfolio sections": "Bagian portfolio",
  "Go to portfolio navigation": "Buka navigasi portfolio",
  "Portfolio navigation": "Navigasi portfolio",
  "Social links": "Tautan media sosial",
  "All rights reserved.": "Hak cipta dilindungi.",
  "Filter DevOps projects": "Filter proyek DevOps",
  "Project technologies": "Teknologi proyek",
  "Technology foundation": "Fondasi teknologi",
  "Solution outcomes": "Hasil solusi",
  "View Case Study": "Lihat Studi Kasus",
  "Discuss Your Project": "Diskusikan Proyek Anda",
  Showing: "Menampilkan",
  projects: "proyek",
  "additional technologies": "teknologi tambahan",
  "Request a Proposal": "Minta Proposal",
  "Request Proposal for Similar Solution": "Minta Proposal untuk Solusi Serupa",
  "Close Overview": "Tutup Ringkasan",
  "Click to Play Video Demo": "Klik untuk Memutar Demo Video",
  "Brief Summary": "Ringkasan Singkat",
  "Detailed Technical Overview": "Ikhtisar Teknis",
  "Key Technical Deliverables": "Deliverable Teknis Utama",
  "Project video demo": "Demo video proyek",
  "Switch to light mode": "Beralih ke mode terang",
  "Switch to dark mode": "Beralih ke mode gelap",
  "From Commit to Release": "Dari Commit hingga Release",
  "Consistent by Design": "Konsisten Sejak Tahap Desain",
  "Featured Solution": "Solusi Unggulan",
  "Declarative and Resilient": "Deklaratif dan Andal",
  "Delivery Automation": "Otomasi Delivery",
  "Infrastructure as Code": "Infrastructure as Code",
  "Secure Software Delivery": "Software Delivery yang Aman",
  "Cloud-Native Operations": "Operasional Cloud-Native",
  "CI/CD Delivery Automation": "Otomasi Delivery CI/CD",
  "Cloud Infrastructure Automation": "Otomasi Infrastruktur Cloud",
  "DevSecOps & Supply Chain Security": "DevSecOps & Keamanan Software Supply Chain",
  "Kubernetes & GitOps Platform": "Platform Kubernetes & GitOps",
  "Standardize and automate software delivery so every release follows a reliable, repeatable, and controlled path to production.":
    "Standarkan dan otomatiskan software delivery agar setiap release mengikuti alur menuju production yang andal, konsisten, dan terkontrol.",
  "Turn infrastructure requirements into reusable code for secure, consistent, and easier-to-operate cloud environments.":
    "Ubah kebutuhan infrastruktur menjadi kode yang reusable untuk membangun environment cloud yang aman, konsisten, dan lebih mudah dioperasikan.",
  "Embed layered security controls into the delivery workflow to identify code, dependency, secret, and container risks before release.":
    "Integrasikan kontrol keamanan berlapis ke dalam delivery workflow untuk mengidentifikasi risiko pada kode, dependency, secret, dan container sebelum release.",
  "Deliver and operate containerized applications through a declarative platform with controlled synchronization, scaling, rollback, and visibility.":
    "Deploy dan operasikan aplikasi berbasis container melalui platform deklaratif dengan sinkronisasi, scaling, rollback, dan visibility yang terkontrol.",
  "Repeatable release workflows": "Release workflow yang konsisten",
  "Automated validation and quality gates": "Validasi dan quality gate otomatis",
  "Safer environment promotion": "Promosi antar-environment yang lebih aman",
  "Reusable infrastructure modules": "Modul infrastruktur yang reusable",
  "Consistent environment baselines": "Baseline environment yang konsisten",
  "Traceable and reviewable changes": "Perubahan yang dapat ditelusuri dan direview",
  "Security checks before deployment": "Pemeriksaan keamanan sebelum deployment",
  "SBOM and dependency visibility": "Visibility terhadap SBOM dan dependency",
  "Governed artifact promotion": "Promosi artifact yang terkontrol",
  "Git-driven deployment control": "Kontrol deployment berbasis Git",
  "Scalable application workloads": "Workload aplikasi yang scalable",
  "Faster recovery through rollback": "Pemulihan lebih cepat melalui rollback",
  "Discuss Your Delivery Pipeline": "Diskusikan Delivery Pipeline Anda",
  "Plan Your Cloud Foundation": "Rencanakan Fondasi Cloud Anda",
  "Strengthen Your Delivery Security": "Perkuat Keamanan Delivery Anda",
  "Design Your Kubernetes Platform": "Rancang Platform Kubernetes Anda",
  "Enterprise DevSecOps CI/CD & GitOps Platform": "Platform Enterprise DevSecOps CI/CD & GitOps",
  "A production-oriented delivery platform that automates build, security validation, artifact publishing, and GitOps deployment from source code to Kubernetes.":
    "Platform delivery berorientasi production yang mengotomatiskan build, validasi keamanan, publikasi artifact, dan deployment GitOps dari source code hingga Kubernetes.",
  "Designed and implemented an end-to-end DevSecOps delivery platform using GitLab, Jenkins, Docker, and Kubernetes. The solution integrates automated testing, code-quality enforcement, secret detection, dependency analysis, SBOM generation, container vulnerability scanning, and controlled artifact publishing into a single repeatable workflow. Once every quality and security gate passes, the pipeline publishes versioned artifacts and container images to Nexus, updates the Helm deployment configuration, and allows ArgoCD to synchronize the approved release to Kubernetes. Slack notifications and centralized ELK logging provide deployment visibility and post-release observability.":
    "Merancang dan mengimplementasikan platform delivery DevSecOps end-to-end menggunakan GitLab, Jenkins, Docker, dan Kubernetes. Solusi ini mengintegrasikan automated testing, penerapan code quality, secret detection, dependency analysis, pembuatan SBOM, container vulnerability scanning, dan publikasi artifact terkontrol ke dalam satu workflow yang konsisten. Setelah seluruh quality gate dan security gate berhasil, pipeline memublikasikan artifact serta container image berversi ke Nexus, memperbarui konfigurasi deployment Helm, dan memungkinkan Argo CD menyinkronkan release yang telah disetujui ke Kubernetes. Notifikasi Slack dan centralized logging melalui ELK memberikan visibility terhadap deployment dan observability setelah release.",
  "Build & Validate": "Build & Validasi",
  "Security Gates": "Security Gate",
  "GitOps Delivery": "Delivery GitOps",
  "Security gates passed": "Security gate berhasil",
  "Reusable Jenkins pipeline workflow supporting Node.js, Maven, and Gradle applications":
    "Workflow pipeline Jenkins reusable yang mendukung aplikasi Node.js, Maven, dan Gradle",
  "Automated unit testing, linting, and SonarQube quality-gate enforcement":
    "Unit testing, linting, dan penerapan quality gate SonarQube secara otomatis",
  "Gitleaks secret detection across source code and repository history":
    "Secret detection dengan Gitleaks pada source code dan riwayat repository",
  "Trivy dependency scanning, container-image scanning, and SBOM generation":
    "Dependency scanning, container image scanning, dan pembuatan SBOM menggunakan Trivy",
  "Dependency-Track integration for ongoing open-source component risk monitoring":
    "Integrasi Dependency-Track untuk monitoring berkelanjutan terhadap risiko komponen open-source",
  "Versioned application artifacts and container images managed through Nexus Repository":
    "Artifact aplikasi dan container image berversi yang dikelola melalui Nexus Repository",
  "GitOps-based Kubernetes delivery using Helm configuration and ArgoCD synchronization":
    "Delivery Kubernetes berbasis GitOps menggunakan konfigurasi Helm dan sinkronisasi Argo CD",
  "Slack deployment notifications and centralized application logging through the ELK Stack":
    "Notifikasi deployment melalui Slack dan centralized application logging menggunakan ELK Stack",
  "Highly motivated DevOps Engineer experienced in implementing automated CI/CD pipelines to improve deployment speed and reliability. Skilled in development, scripting, version control, and monitoring. Completed CCNAv7 at Cisco Academy, AWS re/Start at Orbit Academy, and certified as an AWS Certified Cloud Practitioner.":
    "DevOps Engineer yang berpengalaman mengimplementasikan pipeline CI/CD otomatis untuk meningkatkan kecepatan dan keandalan deployment. Terampil dalam development, scripting, version control, dan monitoring. Telah menyelesaikan CCNAv7 di Cisco Academy dan AWS re/Start di Orbit Academy, serta memiliki sertifikasi AWS Certified Cloud Practitioner.",
  "2025 — Present": "2025 — Sekarang",
  "DevOps Engineer & Consultant": "DevOps Engineer & Konsultan",
  "DevOps Platform Engineer & Operations": "DevOps Platform Engineer & Operations",
  "Develop and manage automated CI/CD pipelines using Jenkins Templating Engine (JTE), collaborate with cross-functional teams on secure SDLC practices, manage server infrastructure, and support scalable DevOps architecture across environments.":
    "Mengembangkan dan mengelola pipeline CI/CD otomatis menggunakan Jenkins Templating Engine (JTE), berkolaborasi dengan tim lintas fungsi dalam penerapan secure SDLC, mengelola infrastruktur server, dan mendukung arsitektur DevOps yang scalable di berbagai environment.",
  "Research and development in DevOps and DevSecOps technologies, evaluating Proofs of Concept, guiding client teams technically, and delivering structured reports on DevOps initiatives and pilot implementations.":
    "Melakukan riset dan pengembangan teknologi DevOps dan DevSecOps, mengevaluasi Proof of Concept, memberikan arahan teknis kepada tim klien, serta menyusun laporan terstruktur untuk inisiatif dan implementasi pilot DevOps.",
  "Built and managed CI/CD pipelines to automate deployments, worked with development, operations, and security teams on secure SDLC practices, and installed, configured, and managed server instances.":
    "Membangun dan mengelola pipeline CI/CD untuk mengotomatiskan deployment, bekerja sama dengan tim development, operations, dan security dalam penerapan secure SDLC, serta menginstal, mengonfigurasi, dan mengelola server instance.",
  "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and reporting on deployments, incidents, and pipeline improvements.":
    "Mendukung proses CI/CD dengan menyelesaikan kendala, mengembangkan automation script, meninjau permintaan akses tool DevOps, memantau ketersediaan tool, serta membuat laporan deployment, incident, dan peningkatan pipeline.",
  "Supported CI/CD processes by resolving issues, developing automation scripts, reviewing DevOps tool access requests, monitoring tool availability, and generating operational reports.":
    "Mendukung proses CI/CD dengan menyelesaikan kendala, mengembangkan automation script, meninjau permintaan akses tool DevOps, memantau ketersediaan tool, dan menyusun laporan operasional.",
  "Foundational understanding of AWS cloud services, architecture, security, pricing, and support models.":
    "Pemahaman fundamental mengenai layanan cloud AWS, arsitektur, keamanan, pricing, dan support model.",
  "Intensive cloud fundamentals program covering Linux, networking, Python scripting, and core AWS services.":
    "Program intensif cloud fundamentals yang mencakup Linux, networking, Python scripting, dan layanan inti AWS.",
  "Routing, switching, network fundamentals, and troubleshooting across enterprise network topologies.":
    "Routing, switching, fundamental jaringan, dan troubleshooting pada topologi jaringan enterprise.",
  "Cluster architecture, workloads, services, storage, and Helm-based deployment of containerized applications.":
    "Arsitektur cluster, workload, service, storage, dan deployment aplikasi berbasis container menggunakan Helm.",
  "Pipeline security gates, SAST with SonarQube, artifact governance with Nexus, and secret management practices.":
    "Security gate pada pipeline, SAST dengan SonarQube, governance artifact dengan Nexus, dan praktik secret management.",
  Program: "Program",
  Networking: "Jaringan",
  "Pipeline platform": "Platform pipeline",
  "CI/CD automation": "Otomasi CI/CD",
  "Platform operations": "Operasional platform",
  "DevOps support": "Dukungan DevOps",
  "Cross-functional collaboration": "Kolaborasi lintas fungsi",
  "Secure SDLC mindset": "Mindset secure SDLC",
  "Automation scripting (Bash, Python)": "Automation scripting (Bash, Python)",
  "Monitoring & incident reporting": "Monitoring & pelaporan incident",
  "Technical documentation": "Dokumentasi teknis",
  "Client-facing consulting": "Konsultasi langsung dengan klien",
};

const enMessages: Record<string, string> = {
  "Jimmi memangkas waktu onboarding pipeline service baru dari beberapa hari jadi beberapa jam dengan template Jenkins yang ia bangun.":
    "Jimmi reduced pipeline onboarding for new services from several days to a few hours with the Jenkins templates he built.",
  "POC DevSecOps yang ia jalankan jelas, terukur, dan langsung bisa diadopsi tim klien tanpa banyak revisi.":
    "The DevSecOps POC he delivered was clear, measurable, and ready for the client team to adopt with minimal revision.",
  "Deployment yang dulu manual dan rawan error jadi otomatis dan konsisten di semua environment.":
    "Deployments that were previously manual and error-prone became automated and consistent across environments.",
  "Internal Developer Platform dengan Backstage & ArgoCD":
    "Internal Developer Platform with Backstage & Argo CD",
  "Menyatukan katalog service, template pipeline, dan GitOps delivery jadi satu portal self-service untuk developer.":
    "Bringing the service catalog, pipeline templates, and GitOps delivery together in one developer self-service portal.",
  "AIOps praktis: LLM untuk triage alert & root cause":
    "Practical AIOps: LLMs for alert triage and root-cause analysis",
  "Memakai LLM gateway untuk merangkum log, mengelompokkan alert berulang, dan mempercepat postmortem.":
    "Using an LLM gateway to summarize logs, group recurring alerts, and accelerate postmortems.",
  "Supply chain security: SBOM, Sigstore, dan policy as code":
    "Supply chain security: SBOM, Sigstore, and policy as code",
  "Menandatangani artifact, menghasilkan SBOM otomatis, dan menegakkan kebijakan rilis dengan OPA/Kyverno.":
    "Signing artifacts, generating SBOMs automatically, and enforcing release policies with OPA/Kyverno.",
  "OpenTelemetry end-to-end di Kubernetes": "End-to-end OpenTelemetry on Kubernetes",
  "Tracing, metrics, dan logs terpadu dengan OTel Collector, Prometheus, Loki, dan Grafana.":
    "Unified tracing, metrics, and logs with OTel Collector, Prometheus, Loki, and Grafana.",
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") setLanguageState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "id" ? "id" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (nextLanguage) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem(STORAGE_KEY, nextLanguage);
      },
      t: (text) => (language === "id" ? (idMessages[text] ?? text) : (enMessages[text] ?? text)),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function localizeValue<T>(value: T, language: Language): T {
  if (typeof value === "string") {
    return (language === "id" ? (idMessages[value] ?? value) : (enMessages[value] ?? value)) as T;
  }
  if (Array.isArray(value)) return value.map((item) => localizeValue(item, language)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeValue(item, language)]),
    ) as T;
  }
  return value;
}
