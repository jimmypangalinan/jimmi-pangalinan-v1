import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "en" ? "id" : "en";

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={language === "en" ? "Gunakan Bahasa Indonesia" : "Use English"}
      title={language === "en" ? "Bahasa Indonesia" : "English"}
    >
      <Languages aria-hidden="true" />
      <span>{language === "en" ? "EN" : "IN"}</span>
    </button>
  );
}
