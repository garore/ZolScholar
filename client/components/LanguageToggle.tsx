import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Globe, Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="language-toggle flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl"
      title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}
