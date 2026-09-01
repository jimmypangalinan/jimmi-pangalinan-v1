import {
  Activity,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Cloud,
  FileText,
  GitBranch,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState, type ReactElement } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { WorkItem } from "@/lib/portfolio-data";
import { useLanguage } from "@/lib/i18n";
import { ContactRequestDialog } from "./ContactRequestDialog";

const workVisualIcons: Record<string, typeof GitBranch> = {
  pipeline: GitBranch,
  cloud: Cloud,
  kubernetes: Boxes,
  security: ShieldCheck,
  observability: Activity,
};

function getYoutubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match?.[2];
    return videoId && videoId.length === 11
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : null;
  } catch {
    return null;
  }
}

function getYoutubeThumbnailUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match?.[2];
    return videoId && videoId.length === 11
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  } catch {
    return null;
  }
}

interface WorkDetailDialogProps {
  work: WorkItem;
  children: ReactElement;
}

export function WorkDetailDialog({ work, children }: WorkDetailDialogProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const VisualIcon = workVisualIcons[work.visual] ?? GitBranch;

  const youtubeEmbedUrl = getYoutubeEmbedUrl(work.youtubeUrl);
  const youtubeThumbnail = getYoutubeThumbnailUrl(work.youtubeUrl);
  const bannerImage = work.image || youtubeThumbnail;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setIsPlayingVideo(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="flex flex-col max-h-[92vh] w-[95vw] max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface/95 p-0 shadow-2xl backdrop-blur-2xl sm:max-h-[88vh] gap-0">
        {/* Project Visual / Video Media Banner (Sticky Top) */}
        <div className="relative aspect-video max-h-[320px] w-full shrink-0 overflow-hidden bg-black border-b border-border/70">
          {youtubeEmbedUrl && isPlayingVideo ? (
            <iframe
              src={youtubeEmbedUrl}
              title={work.title}
              className="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt={work.title}
                  className="size-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-surface-2 to-surface">
                  <VisualIcon className="size-20 text-primary/40" />
                </div>
              )}

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* YouTube Play Button Overlay if Video Available */}
              {youtubeEmbedUrl && (
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 transition-all hover:bg-black/20 cursor-pointer"
                  aria-label={t("Project video demo")}
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                    <Play className="ml-1 size-6 fill-white" />
                  </span>
                  <span className="rounded-full border border-white/20 bg-black/70 px-4 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-md transition-colors group-hover:border-red-500">
                    {t("Click to Play Video Demo")}
                  </span>
                </button>
              )}

              {/* Corner Badges */}
              <div className="pointer-events-none absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-semibold tracking-wider text-primary backdrop-blur-md uppercase">
                  <VisualIcon className="size-3.5" />
                  <span>{work.category}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur-md">
                  <Terminal className="size-3 text-primary" />
                  <span>{work.console}</span>
                </span>
              </div>

              <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/80 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{work.status}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Content Details */}
        <div className="flex-1 overflow-y-auto space-y-6 p-6 sm:p-8">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl leading-snug">
              {work.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-1.5" aria-label="Tech stack tags">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-border bg-surface-2/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </DialogHeader>

          {/* 1. Brief Summary */}
          {work.body && (
            <div className="rounded-2xl border border-border/70 bg-surface-2/50 p-4">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
                <FileText className="size-3.5" /> {t("Brief Summary")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground font-medium">
                {work.body}
              </p>
            </div>
          )}

          {/* 2. Detailed Technical Overview */}
          {work.overview && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
                <Sparkles className="size-3.5" /> {t("Detailed Technical Overview")}
              </h3>
              <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                {work.overview}
              </DialogDescription>
            </div>
          )}

          {/* 3. Key Technical Deliverables */}
          {work.deliverables && work.deliverables.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase">
                <CheckCircle2 className="size-3.5" /> {t("Key Technical Deliverables")}
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {work.deliverables.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-surface-2/30 p-3 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dialog Action Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-4 border-t border-border/80 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("Close Overview")}
            </button>

            <ContactRequestDialog requestType="proposal" service={work.title}>
              <button
                type="button"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20 active:scale-95"
              >
                <span>{t("Request Proposal for Similar Solution")}</span>
                <ArrowUpRight className="size-4" />
              </button>
            </ContactRequestDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
