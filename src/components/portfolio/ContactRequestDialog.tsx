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
import { profile } from "@/lib/portfolio-data";

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
      "Share a few details about your inquiry. I will review your request and contact you by email.",
    submit: "Submit Call Request",
    successTitle: "Call request received",
    successMessage: "Thank you. I will review your request and follow up at",
  },
} as const;

type RequestType = keyof typeof dialogCopy;
type RequestStatus = "idle" | "submitting" | "success" | "error";

interface ContactRequestDialogProps {
  requestType: RequestType;
  children: ReactElement;
}

export function ContactRequestDialog({ requestType, children }: ContactRequestDialogProps) {
  const copy = dialogCopy[requestType];
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
      const response = await fetch(profile.contactRequestUrl, {
        method: "POST",
        body,
        redirect: "follow",
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Your request could not be sent. Please try again.");
      }

      setSubmittedEmail(email);
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
              {copy.successMessage} <strong>{submittedEmail}</strong>.
              {requestType === "cv" && " Please check your spam folder if it is not in your inbox."}
            </DialogDescription>
            <button type="button" onClick={() => handleOpenChange(false)}>
              Done
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

              <div className="cv-request__field">
                <label htmlFor={`${requestType}-request-name`}>Full Name</label>
                <input
                  id={`${requestType}-request-name`}
                  name="name"
                  type="text"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="cv-request__field">
                <label htmlFor={`${requestType}-request-email`}>Email Address</label>
                <input
                  id={`${requestType}-request-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div className="cv-request__field">
                <label htmlFor={`${requestType}-request-need`}>Purpose</label>
                <select id={`${requestType}-request-need`} name="need" defaultValue="" required>
                  <option value="" disabled>
                    Select your purpose
                  </option>
                  {needOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

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
                Your information will only be used to fulfill this request and follow up on the
                purpose you selected.
              </p>

              <button
                type="submit"
                className="cv-request__submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="cv-request__spinner" aria-hidden="true" />
                    Sending...
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
