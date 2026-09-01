import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Layers,
  LoaderCircle,
  Lock,
  LogOut,
  MessageSquare,
  Newspaper,
  PenLine,
  Plus,
  RotateCcw,
  Save,
  Send,
  Settings,
  ShieldCheck,
  Sliders,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { generateFullPortfolioDataFileContent } from "@/lib/data-exporter";
import {
  exportPortfolioDataCode,
  type BlogPost,
  type CertificationItem,
  type ClientItem,
  type ExperienceItem,
  type PortfolioData,
  type ServiceItem,
  type SkillItem,
  type SocialLink,
  type StatItem,
  type TestimonialItem,
  type WorkItem,
} from "@/lib/portfolio-data";
import { usePortfolioData } from "@/lib/usePortfolioStore";

export const savePortfolioDataToFile = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as PortfolioData)
  .handler(async ({ data }) => {
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const filePath = path.resolve(process.cwd(), "src/lib/portfolio-data.ts");
      const content = generateFullPortfolioDataFileContent(data);
      await fs.writeFile(filePath, content, "utf-8");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        "Could not write directly to local file (e.g. read-only environment):",
        errorMsg,
      );
      return { success: false, updatedFile: false, error: errorMsg };
    }
  });

const title = "Admin CMS & Content Editor — Jimmi Pangalinan";
const description = "Portfolio administration and content management portal.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type AuthState = "idle" | "authenticating" | "error";
type EditorTab =
  | "profile"
  | "stats"
  | "services"
  | "works"
  | "experience"
  | "certifications"
  | "skills"
  | "testimonials"
  | "blog";

function AdminPage() {
  const { data: storedData, updateAndSave, resetAndSave, defaultData } = usePortfolioData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthState>("idle");
  const [authError, setAuthError] = useState("");

  // Editor form working state
  const [formData, setFormData] = useState<PortfolioData>(storedData);
  const [activeTab, setActiveTab] = useState<EditorTab>("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Check existing session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("admin_auth_session");
      if (session === "active") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  // Sync formData with storedData on load
  useEffect(() => {
    setFormData(storedData);
  }, [storedData]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError("");

    if (!username.trim() || !password.trim()) {
      setAuthError("Please fill in both username and password.");
      setAuthStatus("error");
      return;
    }

    setAuthStatus("authenticating");

    setTimeout(() => {
      if (
        (username.toLowerCase() === "admin" || username.toLowerCase().includes("jimmi")) &&
        password.length >= 6
      ) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("admin_auth_session", "active");
        }
      } else {
        setAuthStatus("error");
        setAuthError(
          "Invalid credentials or access unauthorized. (Demo login: username 'admin', password min. 6 chars)",
        );
      }
    }, 800);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_auth_session");
    }
  };

  const [fileUpdated, setFileUpdated] = useState(false);

  const handleSave = async () => {
    updateAndSave(formData);
    setSaveSuccess(true);
    try {
      const res = await savePortfolioDataToFile({ data: formData });
      if (res && res.updatedFile) {
        setFileUpdated(true);
      }
    } catch {
      // client-only environment fallback
    }
    setTimeout(() => {
      setSaveSuccess(false);
      setFileUpdated(false);
    }, 4000);
  };

  const handleResetToDefault = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset all portfolio content back to the original default data?",
      )
    ) {
      resetAndSave();
      setFormData(defaultData);
      setSaveSuccess(true);
      try {
        await savePortfolioDataToFile({ data: defaultData });
        setFileUpdated(true);
      } catch {
        // fallback
      }
      setTimeout(() => {
        setSaveSuccess(false);
        setFileUpdated(false);
      }, 4000);
    }
  };

  const handleCopyCode = () => {
    const code = exportPortfolioDataCode(formData);
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    });
  };

  // -------------------------------------------------------------
  // RENDER: LOGIN FORM (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-foreground selection:bg-primary selection:text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <header className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/80 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-md transition-all hover:border-primary hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        <main className="relative z-10 w-full max-w-md">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface/90 p-8 shadow-2xl backdrop-blur-xl transition-all sm:p-10">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                <Terminal className="size-3.5" aria-hidden="true" />
                <span>Portfolio Content Manager</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Editor Access</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to customize all portfolio sections, projects, experience, and profile
                details.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2 text-left">
                <label
                  htmlFor="login-username"
                  className="block text-xs font-medium tracking-wide uppercase text-muted-foreground"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <User className="size-4" aria-hidden="true" />
                  </div>
                  <input
                    id="login-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin or user@domain.com"
                    required
                    disabled={authStatus === "authenticating"}
                    className="w-full rounded-xl border border-border bg-surface-2/70 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-medium tracking-wide uppercase text-muted-foreground"
                  >
                    Password
                  </label>
                  <span className="text-xs text-muted-foreground/80">Min. 6 characters</span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <Lock className="size-4" aria-hidden="true" />
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    disabled={authStatus === "authenticating"}
                    className="w-full rounded-xl border border-border bg-surface-2/70 py-3 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {authStatus === "error" && authError && (
                <div
                  className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive animate-rise"
                  role="alert"
                >
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authStatus === "authenticating"}
                className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {authStatus === "authenticating" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Content Editor</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 border-t border-border/60 pt-5 text-center">
              <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/80">
                <KeyRound className="size-3 text-primary" aria-hidden="true" />
                <span>
                  Demo access credentials: username &quot;admin&quot;, password min 6 chars.
                </span>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: FULL ADMIN CONTENT EDITOR CMS
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Terminal className="size-5" />
            </span>
            <div>
              <h1 className="text-sm font-bold tracking-tight sm:text-base">
                Portfolio Content Editor
              </h1>
              <p className="text-[11px] text-muted-foreground">
                Live CMS • Real-time synchronization
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-xl border border-border bg-surface-2/60 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:inline-flex"
            >
              <ExternalLink className="size-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-surface-2/80 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              <Code2 className="size-3.5" />
              <span className="hidden sm:inline">Export Code</span>
            </button>

            <button
              type="button"
              onClick={handleResetToDefault}
              title="Reset all content to original defaults"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-surface-2/80 px-3 py-2 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95"
            >
              <Save className="size-3.5" />
              <span>Save Changes</span>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface-2/60 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save Notification */}
      {saveSuccess && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-950/90 px-4 py-3 text-xs font-medium text-emerald-300 shadow-2xl backdrop-blur-xl animate-rise"
          role="status"
        >
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>
            {fileUpdated
              ? "Changes saved & portfolio-data.ts file updated directly on disk!"
              : "Changes saved successfully & applied to live portfolio!"}
          </span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Section Tabs Sidebar */}
          <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
            <nav className="flex flex-row flex-wrap gap-1 rounded-2xl border border-border bg-surface-2/60 p-2 lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:overflow-y-auto">
              {[
                { id: "profile", label: "Profile & Bio", icon: User },
                { id: "stats", label: "Hero Stats", icon: Layers },
                { id: "services", label: "Services", icon: Settings },
                { id: "works", label: "Works / Projects", icon: Briefcase },
                { id: "experience", label: "Experience", icon: FileText },
                { id: "certifications", label: "Certifications", icon: Award },
                { id: "skills", label: "Skills & Languages", icon: PenLine },
                { id: "testimonials", label: "Testimonials & Clients", icon: MessageSquare },
                { id: "blog", label: "Blog Posts", icon: Newspaper },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as EditorTab)}
                    className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Editor Form Body */}
          <main className="space-y-6 pb-24">
            {/* 1. PROFILE & BIO EDITOR */}
            {activeTab === "profile" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="border-b border-border/60 pb-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Profile &amp; Bio Settings
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Manage your personal identity, animated roles, intro text, and social channels.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.profile.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, name: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Primary Role
                    </label>
                    <input
                      type="text"
                      value={formData.profile.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, role: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.profile.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, email: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.profile.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, location: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Animated Roles List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Animated Typing Roles (Card Carousel)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          profile: {
                            ...formData.profile,
                            roles: [...formData.profile.roles, "New Role"],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Role
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.profile.roles.map((role, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => {
                            const newRoles = [...formData.profile.roles];
                            newRoles[idx] = e.target.value;
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, roles: newRoles },
                            });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newRoles = formData.profile.roles.filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, roles: newRoles },
                            });
                          }}
                          disabled={formData.profile.roles.length <= 1}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intro Bio */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    About Intro Paragraph
                  </label>
                  <textarea
                    rows={4}
                    value={formData.profile.intro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, intro: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Contact Webhook URL */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase">
                    Contact Form Endpoint (Google Apps Script Webhook)
                  </label>
                  <input
                    type="url"
                    value={formData.profile.contactRequestUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, contactRequestUrl: e.target.value },
                      })
                    }
                    className="w-full rounded-xl border border-border bg-surface-2/70 px-3.5 py-2.5 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground uppercase">
                      Social Media Links
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          profile: {
                            ...formData.profile,
                            socials: [
                              ...formData.profile.socials,
                              { label: "New Link", href: "https://" },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Social Link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.profile.socials.map((social, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-2 rounded-2xl border border-border bg-surface-2/40 p-3 sm:flex-row sm:items-center"
                      >
                        <input
                          type="text"
                          value={social.label}
                          placeholder="Label (LinkedIn, GitHub, etc.)"
                          onChange={(e) => {
                            const next = [...formData.profile.socials];
                            next[idx] = { ...next[idx], label: e.target.value };
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, socials: next },
                            });
                          }}
                          className="w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs font-medium sm:w-36"
                        />
                        <input
                          type="text"
                          value={social.href}
                          placeholder="URL"
                          onChange={(e) => {
                            const next = [...formData.profile.socials];
                            next[idx] = { ...next[idx], href: e.target.value };
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, socials: next },
                            });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.profile.socials.filter((_, i) => i !== idx);
                            setFormData({
                              ...formData,
                              profile: { ...formData.profile, socials: next },
                            });
                          }}
                          className="self-end rounded-lg p-2 text-muted-foreground hover:text-destructive sm:self-auto"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 2. HERO STATS EDITOR */}
            {activeTab === "stats" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">Hero Statistics</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit key metrics displayed on the About Hero section.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        stats: [...formData.stats, { value: "10+", label: "New Metric" }],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Stat
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="grid gap-3 rounded-2xl border border-border bg-surface-2/40 p-4 sm:grid-cols-4 sm:items-center"
                    >
                      <div>
                        <label className="block text-[10px] font-medium uppercase text-muted-foreground">
                          Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const next = [...formData.stats];
                            next[idx] = { ...next[idx], value: e.target.value };
                            setFormData({ ...formData, stats: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium uppercase text-muted-foreground">
                          Suffix (optional)
                        </label>
                        <input
                          type="text"
                          value={stat.suffix ?? ""}
                          placeholder="e.g. /7 or %"
                          onChange={(e) => {
                            const next = [...formData.stats];
                            next[idx] = { ...next[idx], suffix: e.target.value };
                            setFormData({ ...formData, stats: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label className="block text-[10px] font-medium uppercase text-muted-foreground">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const next = [...formData.stats];
                            next[idx] = { ...next[idx], label: e.target.value };
                            setFormData({ ...formData, stats: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="flex justify-end sm:pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.stats.filter((_, i) => i !== idx);
                            setFormData({ ...formData, stats: next });
                          }}
                          className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. SERVICES EDITOR */}
            {activeTab === "services" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">Services Offerings</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit service titles, technology tags, and scope descriptions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        services: [
                          ...formData.services,
                          {
                            title: "New Service",
                            meta: "Tech · Stack · Tools",
                            body: "Service description here...",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Service
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-2xl border border-border bg-surface-2/40 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">
                          Service #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.services.filter((_, i) => i !== idx);
                            setFormData({ ...formData, services: next });
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Title
                          </label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const next = [...formData.services];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setFormData({ ...formData, services: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Tech Meta (e.g. Jenkins · AWS · Docker)
                          </label>
                          <input
                            type="text"
                            value={service.meta}
                            onChange={(e) => {
                              const next = [...formData.services];
                              next[idx] = { ...next[idx], meta: e.target.value };
                              setFormData({ ...formData, services: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={service.body}
                          onChange={(e) => {
                            const next = [...formData.services];
                            next[idx] = { ...next[idx], body: e.target.value };
                            setFormData({ ...formData, services: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. WORKS / PROJECTS EDITOR */}
            {activeTab === "works" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Works / Projects Showcase
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Manage project cards, terminal mockups, categories, and stages.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        works: [
                          ...formData.works,
                          {
                            title: "New Project Showcase",
                            category: "CI/CD",
                            tags: ["Docker", "Kubernetes"],
                            visual: "pipeline",
                            console: "Pipeline #100",
                            stages: ["Build", "Test", "Deploy"],
                            status: "Passed",
                            body: "Project overview description...",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Project
                  </button>
                </div>

                <div className="space-y-6">
                  {formData.works.map((work, idx) => (
                    <div
                      key={idx}
                      className="space-y-4 rounded-2xl border border-border bg-surface-2/40 p-5"
                    >
                      <div className="flex items-center justify-between border-b border-border/40 pb-2">
                        <span className="text-xs font-bold text-primary uppercase">
                          Project #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.works.filter((_, i) => i !== idx);
                            setFormData({ ...formData, works: next });
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Project Title
                          </label>
                          <input
                            type="text"
                            value={work.title}
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Category Filter
                          </label>
                          <input
                            type="text"
                            value={work.category}
                            placeholder="CI/CD, Cloud, Kubernetes, etc."
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], category: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Visual Style
                          </label>
                          <select
                            value={work.visual}
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], visual: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          >
                            <option value="pipeline">Pipeline</option>
                            <option value="cloud">Cloud</option>
                            <option value="kubernetes">Kubernetes</option>
                            <option value="security">Security</option>
                            <option value="observability">Observability</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Console Header Text
                          </label>
                          <input
                            type="text"
                            value={work.console}
                            placeholder="Pipeline #248"
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], console: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Status Pill Text
                          </label>
                          <input
                            type="text"
                            value={work.status}
                            placeholder="3 stages passed"
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], status: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Tags (comma separated)
                          </label>
                          <input
                            type="text"
                            value={work.tags.join(", ")}
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = {
                                ...next[idx],
                                tags: e.target.value
                                  .split(",")
                                  .map((t) => t.trim())
                                  .filter(Boolean),
                              };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Pipeline Stages (comma separated)
                          </label>
                          <input
                            type="text"
                            value={work.stages.join(", ")}
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = {
                                ...next[idx],
                                stages: e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Project Image / Banner URL (e.g. /projects/jte-pipeline.jpg)
                        </label>
                        <input
                          type="text"
                          value={work.image ?? ""}
                          placeholder="/projects/your-image.jpg"
                          onChange={(e) => {
                            const next = [...formData.works];
                            next[idx] = { ...next[idx], image: e.target.value };
                            setFormData({ ...formData, works: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Brief Card Summary
                        </label>
                        <textarea
                          rows={2}
                          value={work.body}
                          onChange={(e) => {
                            const next = [...formData.works];
                            next[idx] = { ...next[idx], body: e.target.value };
                            setFormData({ ...formData, works: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Detailed Project Overview (Shown in Clickable Modal)
                        </label>
                        <textarea
                          rows={4}
                          value={work.overview ?? ""}
                          placeholder="Comprehensive description of the architectural decisions, tools, and outcomes..."
                          onChange={(e) => {
                            const next = [...formData.works];
                            next[idx] = { ...next[idx], overview: e.target.value };
                            setFormData({ ...formData, works: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            YouTube Video / Demo Link
                          </label>
                          <input
                            type="url"
                            value={work.youtubeUrl ?? ""}
                            placeholder="https://www.youtube.com/watch?v=..."
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], youtubeUrl: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Project URL / Documentation Link
                          </label>
                          <input
                            type="url"
                            value={work.projectUrl ?? ""}
                            placeholder="https://github.com/... or https://..."
                            onChange={(e) => {
                              const next = [...formData.works];
                              next[idx] = { ...next[idx], projectUrl: e.target.value };
                              setFormData({ ...formData, works: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Key Technical Deliverables (One per line)
                        </label>
                        <textarea
                          rows={3}
                          value={(work.deliverables ?? []).join("\n")}
                          placeholder="Modular JTE template library&#10;Automated Docker containerization&#10;Integration with SonarQube..."
                          onChange={(e) => {
                            const next = [...formData.works];
                            next[idx] = {
                              ...next[idx],
                              deliverables: e.target.value
                                .split("\n")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            };
                            setFormData({ ...formData, works: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. EXPERIENCE & RESUME EDITOR */}
            {activeTab === "experience" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">Work Experience</h2>
                    <p className="text-xs text-muted-foreground">
                      Edit roles, companies, dates, and responsibilities.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        experience: [
                          ...formData.experience,
                          {
                            period: "2026 — Present",
                            role: "DevOps Engineer",
                            company: "Company Name",
                            body: "Key responsibilities and achievements...",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Experience
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.experience.map((item, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-2xl border border-border bg-surface-2/40 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">
                          Experience #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.experience.filter((_, i) => i !== idx);
                            setFormData({ ...formData, experience: next });
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Role / Job Title
                          </label>
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const next = [...formData.experience];
                              next[idx] = { ...next[idx], role: e.target.value };
                              setFormData({ ...formData, experience: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Company
                          </label>
                          <input
                            type="text"
                            value={item.company}
                            onChange={(e) => {
                              const next = [...formData.experience];
                              next[idx] = { ...next[idx], company: e.target.value };
                              setFormData({ ...formData, experience: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Period (e.g. 2024 — 2025)
                          </label>
                          <input
                            type="text"
                            value={item.period}
                            onChange={(e) => {
                              const next = [...formData.experience];
                              next[idx] = { ...next[idx], period: e.target.value };
                              setFormData({ ...formData, experience: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Description &amp; Achievements
                        </label>
                        <textarea
                          rows={3}
                          value={item.body}
                          onChange={(e) => {
                            const next = [...formData.experience];
                            next[idx] = { ...next[idx], body: e.target.value };
                            setFormData({ ...formData, experience: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. CERTIFICATIONS EDITOR */}
            {activeTab === "certifications" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Certifications &amp; Credentials
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Manage certificates, issuing organizations, and badges.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        certifications: [
                          ...formData.certifications,
                          {
                            period: "AWS",
                            title: "New Certification",
                            org: "Issuing Organization",
                            body: "Certificate details and key coverage...",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Certificate
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-2xl border border-border bg-surface-2/40 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">
                          Certificate #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.certifications.filter((_, i) => i !== idx);
                            setFormData({ ...formData, certifications: next });
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Certificate Title
                          </label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const next = [...formData.certifications];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setFormData({ ...formData, certifications: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Organization
                          </label>
                          <input
                            type="text"
                            value={cert.org}
                            onChange={(e) => {
                              const next = [...formData.certifications];
                              next[idx] = { ...next[idx], org: e.target.value };
                              setFormData({ ...formData, certifications: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Badge / Period (e.g. AWS, Networking)
                          </label>
                          <input
                            type="text"
                            value={cert.period}
                            onChange={(e) => {
                              const next = [...formData.certifications];
                              next[idx] = { ...next[idx], period: e.target.value };
                              setFormData({ ...formData, certifications: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-medium uppercase text-muted-foreground">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={cert.body}
                          onChange={(e) => {
                            const next = [...formData.certifications];
                            next[idx] = { ...next[idx], body: e.target.value };
                            setFormData({ ...formData, certifications: next });
                          }}
                          className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. SKILLS & LANGUAGES EDITOR */}
            {activeTab === "skills" && (
              <section className="space-y-8 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="border-b border-border/60 pb-4">
                  <h2 className="text-lg font-semibold tracking-tight">Skills &amp; Languages</h2>
                  <p className="text-xs text-muted-foreground">
                    Adjust proficiency percentages, platforms, and interpersonal soft skills.
                  </p>
                </div>

                {/* Core Skills */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">Core Skills</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          coreSkills: [...formData.coreSkills, { name: "New Skill", value: 80 }],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Core Skill
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formData.coreSkills.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/40 p-3"
                      >
                        <input
                          type="text"
                          value={s.name}
                          onChange={(e) => {
                            const next = [...formData.coreSkills];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setFormData({ ...formData, coreSkills: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-1.5 text-xs font-medium"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={s.value}
                            onChange={(e) => {
                              const next = [...formData.coreSkills];
                              next[idx] = { ...next[idx], value: Number(e.target.value) };
                              setFormData({ ...formData, coreSkills: next });
                            }}
                            className="w-20 accent-primary"
                          />
                          <span className="w-8 text-right text-xs font-semibold text-muted-foreground">
                            {s.value}%
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.coreSkills.filter((_, i) => i !== idx);
                            setFormData({ ...formData, coreSkills: next });
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Platforms */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">
                      Tools &amp; Platforms
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          tools: [...formData.tools, { name: "New Tool", value: 75 }],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Tool
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formData.tools.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/40 p-3"
                      >
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => {
                            const next = [...formData.tools];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setFormData({ ...formData, tools: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-1.5 text-xs font-medium"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={t.value}
                            onChange={(e) => {
                              const next = [...formData.tools];
                              next[idx] = { ...next[idx], value: Number(e.target.value) };
                              setFormData({ ...formData, tools: next });
                            }}
                            className="w-20 accent-primary"
                          />
                          <span className="w-8 text-right text-xs font-semibold text-muted-foreground">
                            {t.value}%
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.tools.filter((_, i) => i !== idx);
                            setFormData({ ...formData, tools: next });
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">Languages</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          languages: [...formData.languages, { name: "Language", value: 70 }],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Language
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formData.languages.map((l, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/40 p-3"
                      >
                        <input
                          type="text"
                          value={l.name}
                          onChange={(e) => {
                            const next = [...formData.languages];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setFormData({ ...formData, languages: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-1.5 text-xs font-medium"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={l.value}
                            onChange={(e) => {
                              const next = [...formData.languages];
                              next[idx] = { ...next[idx], value: Number(e.target.value) };
                              setFormData({ ...formData, languages: next });
                            }}
                            className="w-20 accent-primary"
                          />
                          <span className="w-8 text-right text-xs font-semibold text-muted-foreground">
                            {l.value}%
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.languages.filter((_, i) => i !== idx);
                            setFormData({ ...formData, languages: next });
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">Soft Skills</h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          softSkills: [...formData.softSkills, "New Soft Skill"],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Soft Skill
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.softSkills.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={s}
                          onChange={(e) => {
                            const next = [...formData.softSkills];
                            next[idx] = e.target.value;
                            setFormData({ ...formData, softSkills: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.softSkills.filter((_, i) => i !== idx);
                            setFormData({ ...formData, softSkills: next });
                          }}
                          className="rounded-lg p-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 8. TESTIMONIALS & CLIENTS EDITOR */}
            {activeTab === "testimonials" && (
              <section className="space-y-8 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="border-b border-border/60 pb-4">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Testimonials &amp; Clients
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Manage client reviews, quotes, company badges, and notes.
                  </p>
                </div>

                {/* Testimonials */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">
                      Client Testimonials
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          testimonials: [
                            ...formData.testimonials,
                            {
                              quote: "Outstanding work and reliability...",
                              name: "Reviewer Name",
                              role: "Lead Engineer",
                            },
                          ],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Testimonial
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.testimonials.map((t, idx) => (
                      <div
                        key={idx}
                        className="space-y-3 rounded-2xl border border-border bg-surface-2/40 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-muted-foreground">
                            Review #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const next = formData.testimonials.filter((_, i) => i !== idx);
                              setFormData({ ...formData, testimonials: next });
                            }}
                            className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            type="text"
                            value={t.name}
                            placeholder="Name"
                            onChange={(e) => {
                              const next = [...formData.testimonials];
                              next[idx] = { ...next[idx], name: e.target.value };
                              setFormData({ ...formData, testimonials: next });
                            }}
                            className="rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs"
                          />
                          <input
                            type="text"
                            value={t.role}
                            placeholder="Role / Company"
                            onChange={(e) => {
                              const next = [...formData.testimonials];
                              next[idx] = { ...next[idx], role: e.target.value };
                              setFormData({ ...formData, testimonials: next });
                            }}
                            className="rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs"
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={t.quote}
                          placeholder="Testimonial quote..."
                          onChange={(e) => {
                            const next = [...formData.testimonials];
                            next[idx] = { ...next[idx], quote: e.target.value };
                            setFormData({ ...formData, testimonials: next });
                          }}
                          className="w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clients */}
                <div className="space-y-4 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-primary uppercase">
                      Clients &amp; Partners
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          clients: [
                            ...formData.clients,
                            { name: "New Client", note: "Engagement scope" },
                          ],
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Plus className="size-3.5" /> Add Client
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {formData.clients.map((c, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-2xl border border-border bg-surface-2/40 p-3"
                      >
                        <input
                          type="text"
                          value={c.name}
                          placeholder="Client name"
                          onChange={(e) => {
                            const next = [...formData.clients];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setFormData({ ...formData, clients: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs font-medium"
                        />
                        <input
                          type="text"
                          value={c.note}
                          placeholder="Project note"
                          onChange={(e) => {
                            const next = [...formData.clients];
                            next[idx] = { ...next[idx], note: e.target.value };
                            setFormData({ ...formData, clients: next });
                          }}
                          className="flex-1 rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.clients.filter((_, i) => i !== idx);
                            setFormData({ ...formData, clients: next });
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 9. BLOG POSTS EDITOR */}
            {activeTab === "blog" && (
              <section className="space-y-6 rounded-3xl border border-border bg-surface/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-border/60 pb-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight">
                      Blog Posts &amp; Articles
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Manage published article titles, topic tags, and summaries.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        posts: [
                          ...formData.posts,
                          {
                            date: "2026",
                            tag: "DevOps",
                            title: "New Blog Article Title",
                            body: "Article summary description...",
                          },
                        ],
                      })
                    }
                    className="inline-flex items-center gap-1 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20"
                  >
                    <Plus className="size-3.5" /> Add Post
                  </button>
                </div>

                <div className="space-y-5">
                  {formData.posts.map((post, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-2xl border border-border bg-surface-2/40 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary uppercase">
                          Article #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const next = formData.posts.filter((_, i) => i !== idx);
                            setFormData({ ...formData, posts: next });
                          }}
                          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="sm:col-span-2">
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Article Title
                          </label>
                          <input
                            type="text"
                            value={post.title}
                            onChange={(e) => {
                              const next = [...formData.posts];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setFormData({ ...formData, posts: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Topic Tag
                          </label>
                          <input
                            type="text"
                            value={post.tag}
                            placeholder="e.g. Platform Engineering"
                            onChange={(e) => {
                              const next = [...formData.posts];
                              next[idx] = { ...next[idx], tag: e.target.value };
                              setFormData({ ...formData, posts: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-4">
                        <div>
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Date / Year
                          </label>
                          <input
                            type="text"
                            value={post.date}
                            placeholder="2026"
                            onChange={(e) => {
                              const next = [...formData.posts];
                              next[idx] = { ...next[idx], date: e.target.value };
                              setFormData({ ...formData, posts: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="text-[10px] font-medium uppercase text-muted-foreground">
                            Summary Description
                          </label>
                          <textarea
                            rows={2}
                            value={post.body}
                            onChange={(e) => {
                              const next = [...formData.posts];
                              next[idx] = { ...next[idx], body: e.target.value };
                              setFormData({ ...formData, posts: next });
                            }}
                            className="mt-1 w-full rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* EXPORT TS CODE MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-rise">
          <div className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-3xl border border-border bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Code2 className="size-5 text-primary" />
                <h3 className="font-semibold">Export TypeScript Data Code</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <p className="mb-3 text-xs text-muted-foreground">
                You can copy this code and paste it directly into{" "}
                <code className="text-primary">src/lib/portfolio-data.ts</code> to permanently
                commit your changes in Git.
              </p>
              <pre className="max-h-[50vh] overflow-auto rounded-2xl border border-border bg-surface-2/90 p-4 font-mono text-xs text-foreground">
                {exportPortfolioDataCode(formData)}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {copiedCode ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                <span>{copiedCode ? "Copied to Clipboard!" : "Copy Code"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
