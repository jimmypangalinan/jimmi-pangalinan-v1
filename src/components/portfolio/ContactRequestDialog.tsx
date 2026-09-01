import { useState, type FormEvent, type ReactElement } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePortfolioData } from "@/lib/usePortfolioStore";
import { useLanguage } from "@/lib/i18n";

const needOptions = [
  "Hiring / Recruitment",
  "Project Collaboration / Freelance",
  "DevOps, Cloud, or CI/CD Consulting",
  "Networking / Other",
] as const;

const dialogCopy = {
  cv: {
    eyebrow: "REQUEST MY CV",
    title: "A quick introduction first",
    description: "Tell me a little about yourself and I will send my CV directly to your email.",
    submit: "Send CV to My Email",
    successTitle: "CV sent successfully",
    successMessage: "My CV has been sent to",
  },
  call: {
    eyebrow: "REQUEST A CALL",
    title: "Let’s start a conversation",
    description:
      "Share your contact details and a little about your inquiry. I will review your request and contact you directly.",
    submit: "Submit Call Request",
    successTitle: "Call request received",
    successMessage: "Thank you. I will review your request and contact you at",
  },
  proposal: {
    eyebrow: "REQUEST A PROPOSAL",
    title: "Tell me about your project",
    description:
      "Share a few contact details and a short project brief. I will review it and follow up with you directly.",
    submit: "Send Proposal Request",
    successTitle: "Proposal request received",
    successMessage: "Thank you. I will review your project and contact you at",
  },
} as const;

type RequestType = keyof typeof dialogCopy;
type RequestStatus = "idle" | "submitting" | "success" | "error";

interface ContactRequestDialogProps {
  requestType: RequestType;
  service?: string;
  children: ReactElement;
}

export function ContactRequestDialog({
  requestType,
  service,
  children,
}: ContactRequestDialogProps) {
  const { data } = usePortfolioData();
  const { language } = useLanguage();
  const profile = data.profile;
  const copy =
    language === "id"
      ? {
          cv: {
            eyebrow: "MINTA CV SAYA",
            title: "Mari berkenalan terlebih dahulu",
            description:
              "Ceritakan sedikit tentang Anda dan saya akan mengirimkan CV langsung ke email Anda.",
            submit: "Kirim CV ke Email Saya",
            successTitle: "CV berhasil dikirim",
            successMessage: "CV saya telah dikirim ke",
          },
          call: {
            eyebrow: "JADWALKAN PANGGILAN",
            title: "Mari mulai percakapan",
            description:
              "Bagikan detail kontak dan kebutuhan Anda. Saya akan memeriksanya dan menghubungi Anda secara langsung.",
            submit: "Kirim Permintaan Panggilan",
            successTitle: "Permintaan panggilan diterima",
            successMessage: "Terima kasih. Saya akan memeriksa permintaan Anda dan menghubungi",
          },
          proposal: {
            eyebrow: "MINTA PROPOSAL",
            title: "Ceritakan proyek Anda",
            description:
              "Bagikan detail kontak dan brief singkat proyek Anda. Saya akan memeriksanya dan menghubungi Anda secara langsung.",
            submit: "Kirim Permintaan Proposal",
            successTitle: "Permintaan proposal diterima",
            successMessage: "Terima kasih. Saya akan memeriksa proyek Anda dan menghubungi",
          },
        }[requestType]
      : dialogCopy[requestType];
  const isProposal = requestType === "proposal";
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [message, setMessage] = useState("");
  const [submittedContact, setSubmittedContact] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && status === "submitting") return;

    setOpen(nextOpen);
    if (!nextOpen) {
      setStatus("idle");
      setMessage("");
      setSubmittedContact("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const body = new URLSearchParams();

    if (isProposal) {
      formData.set("requestType", "proposal");
    }

    formData.forEach((value, key) => body.append(key, String(value)));
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(profile.contactRequestUrl, {
        method: "POST",
        body,
        redirect: "follow",
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Your request could not be sent. Please try again.");
      }

      setSubmittedContact(requestType === "cv" ? email : phone);
      setMessage(result.message || "Your request was sent successfully.");
      setStatus("success");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending your request. Please try again.",
      );
      setStatus("error");
    }
  };

  const phoneField = (
    <div className="cv-request__field">
      <label htmlFor={`${requestType}-request-phone`}>
        {language === "id" ? "Nomor Telepon / WhatsApp" : "Phone / WhatsApp Number"}
      </label>
      <input
        id={`${requestType}-request-phone`}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        minLength={8}
        maxLength={20}
        pattern="[+0-9][0-9 .()\u002D]{7,19}"
        placeholder="+62 812 3456 7890"
        aria-describedby={`${requestType}-request-phone-hint`}
        required
      />
      <span id={`${requestType}-request-phone-hint`} className="cv-request__field-hint">
        {language === "id"
          ? "Sertakan kode negara agar saya dapat menghubungi Anda secara langsung."
          : "Include the country code so I can contact you directly."}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="cv-request-dialog">
        {status === "success" ? (
          <div className="cv-request__success" role="status">
            <span className="cv-request__success-icon" aria-hidden="true">
              <CheckCircle2 />
            </span>
            <DialogTitle>{copy.successTitle}</DialogTitle>
            <DialogDescription>
              {copy.successMessage} <strong>{submittedContact}</strong>.
              {requestType === "cv" &&
                (language === "id"
                  ? " Silakan periksa folder spam jika tidak ada di inbox."
                  : " Please check your spam folder if it is not in your inbox.")}
            </DialogDescription>
            <button type="button" onClick={() => handleOpenChange(false)}>
              {language === "id" ? "Selesai" : "Done"}
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="cv-request__header">
              <span className="cv-request__eyebrow">{copy.eyebrow}</span>
              <DialogTitle className="cv-request__title">{copy.title}</DialogTitle>
              <DialogDescription className="cv-request__description">
                {copy.description}
              </DialogDescription>
            </DialogHeader>

            <form className="cv-request__form" onSubmit={handleSubmit}>
              <input type="hidden" name="requestType" value={requestType} />

              <div className="cv-request__row">
                <div className="cv-request__field">
                  <label htmlFor={`${requestType}-request-name`}>
                    {language === "id" ? "Nama Lengkap" : "Full Name"}
                  </label>
                  <input
                    id={`${requestType}-request-name`}
                    name="name"
                    type="text"
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder={language === "id" ? "Nama Anda" : "Your name"}
                    required
                  />
                </div>

                <div className="cv-request__field">
                  <label htmlFor={`${requestType}-request-email`}>
                    {language === "id" ? "Alamat Email" : "Email Address"}
                  </label>
                  <input
                    id={`${requestType}-request-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              {isProposal ? (
                <div className="cv-request__row">
                  {phoneField}
                  <div className="cv-request__field">
                    <label htmlFor="proposal-request-company">
                      {language === "id" ? "Perusahaan (Opsional)" : "Company (Optional)"}
                    </label>
                    <input
                      id="proposal-request-company"
                      name="company"
                      type="text"
                      maxLength={100}
                      autoComplete="organization"
                      placeholder={language === "id" ? "Nama perusahaan" : "Company name"}
                    />
                  </div>
                </div>
              ) : (
                requestType === "call" && phoneField
              )}

              {isProposal ? (
                <>
                  <div className="cv-request__field">
                    <label htmlFor="proposal-request-service">
                      {language === "id" ? "Layanan yang Dipilih" : "Selected Service"}
                    </label>
                    <input
                      id="proposal-request-service"
                      name="service"
                      type="text"
                      value={service ?? ""}
                      readOnly
                    />
                  </div>

                  <div className="cv-request__field">
                    <label htmlFor="proposal-request-description">
                      {language === "id" ? "Deskripsi Proyek" : "Project Description"}
                    </label>
                    <textarea
                      id="proposal-request-description"
                      name="projectDescription"
                      minLength={20}
                      maxLength={1200}
                      rows={4}
                      placeholder={
                        language === "id"
                          ? "Jelaskan secara singkat bantuan yang Anda perlukan..."
                          : "Briefly describe what you need help with..."
                      }
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="cv-request__field">
                  <label htmlFor={`${requestType}-request-need`}>
                    {language === "id" ? "Tujuan" : "Purpose"}
                  </label>
                  <select id={`${requestType}-request-need`} name="need" defaultValue="" required>
                    <option value="" disabled>
                      {language === "id" ? "Pilih tujuan Anda" : "Select your purpose"}
                    </option>
                    {needOptions.map((option) => (
                      <option key={option} value={option}>
                        {language === "id"
                          ? {
                              "Hiring / Recruitment": "Perekrutan",
                              "Project Collaboration / Freelance": "Kolaborasi Proyek / Freelance",
                              "DevOps, Cloud, or CI/CD Consulting":
                                "Konsultasi DevOps, Cloud, atau CI/CD",
                              "Networking / Other": "Networking / Lainnya",
                            }[option]
                          : option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="cv-request__honeypot" aria-hidden="true">
                <label htmlFor={`${requestType}-request-website`}>Website</label>
                <input
                  id={`${requestType}-request-website`}
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
                {isProposal
                  ? language === "id"
                    ? "Informasi Anda hanya digunakan untuk meninjau proyek dan menghubungi Anda."
                    : "Your information will only be used to review your project request and contact you."
                  : language === "id"
                    ? "Informasi Anda hanya digunakan untuk memenuhi permintaan ini dan menindaklanjuti tujuan yang dipilih."
                    : "Your information will only be used to fulfill this request and follow up on the purpose you selected."}
              </p>

              <button
                type="submit"
                className="cv-request__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="cv-request__spinner" aria-hidden="true" />
                    {language === "id" ? "Mengirim..." : "Sending..."}
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" />
                    {copy.submit}
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
