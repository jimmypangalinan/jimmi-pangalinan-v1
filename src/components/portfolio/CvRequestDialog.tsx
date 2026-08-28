import { useState, type FormEvent } from "react";
import { CheckCircle2, Download, LoaderCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { profile } from "@/lib/portfolio-data";

const needOptions = [
  "Rekrutmen / Hire",
  "Kerja sama proyek / Freelance",
  "Konsultasi DevOps, Cloud, atau CI/CD",
  "Networking atau kebutuhan lainnya",
] as const;

type RequestStatus = "idle" | "submitting" | "success" | "error";

export function CvRequestDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [message, setMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && status === "submitting") return;

    setOpen(nextOpen);
    if (!nextOpen) {
      setStatus("idle");
      setMessage("");
      setSubmittedEmail("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const body = new URLSearchParams();

    formData.forEach((value, key) => body.append(key, String(value)));
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(profile.cvRequestUrl, {
        method: "POST",
        body,
        redirect: "follow",
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "CV belum dapat dikirim. Silakan coba kembali.");
      }

      setSubmittedEmail(email);
      setMessage(result.message || "CV berhasil dikirim.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim CV. Silakan coba kembali.",
      );
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button type="button" className="profile-card__download">
          <Download aria-hidden="true" />
          Download CV
        </button>
      </DialogTrigger>

      <DialogContent className="cv-request-dialog">
        {status === "success" ? (
          <div className="cv-request__success" role="status">
            <span className="cv-request__success-icon" aria-hidden="true">
              <CheckCircle2 />
            </span>
            <DialogTitle>CV berhasil dikirim</DialogTitle>
            <DialogDescription>
              {message} Kami mengirimkannya ke <strong>{submittedEmail}</strong>. Periksa juga
              folder spam jika belum terlihat.
            </DialogDescription>
            <button type="button" onClick={() => handleOpenChange(false)}>
              Selesai
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="cv-request__header">
              <span className="cv-request__eyebrow">REQUEST MY CV</span>
              <DialogTitle className="cv-request__title">Mari saling mengenal dahulu</DialogTitle>
              <DialogDescription className="cv-request__description">
                Isi data singkat berikut. CV akan langsung dikirim ke email Anda.
              </DialogDescription>
            </DialogHeader>

            <form className="cv-request__form" onSubmit={handleSubmit}>
              <div className="cv-request__field">
                <label htmlFor="cv-request-name">Nama lengkap</label>
                <input
                  id="cv-request-name"
                  name="name"
                  type="text"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Nama Anda"
                  required
                />
              </div>

              <div className="cv-request__field">
                <label htmlFor="cv-request-email">Email</label>
                <input
                  id="cv-request-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@perusahaan.com"
                  required
                />
              </div>

              <div className="cv-request__field">
                <label htmlFor="cv-request-need">Kebutuhan</label>
                <select id="cv-request-need" name="need" defaultValue="" required>
                  <option value="" disabled>
                    Pilih kebutuhan Anda
                  </option>
                  {needOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="cv-request__honeypot" aria-hidden="true">
                <label htmlFor="cv-request-website">Website</label>
                <input
                  id="cv-request-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "error" && (
                <p className="cv-request__error" role="alert">
                  {message}
                </p>
              )}

              <p className="cv-request__privacy">
                Data Anda hanya digunakan untuk mengirim CV dan menindaklanjuti kebutuhan yang
                dipilih.
              </p>

              <button
                type="submit"
                className="cv-request__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="cv-request__spinner" aria-hidden="true" />
                    Mengirim CV...
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    Kirim CV ke Email
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
