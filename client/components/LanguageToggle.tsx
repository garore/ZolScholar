import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Globe, Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      onClick={toggleLanguage}
      className="language-toggle flex items-center gap-2 px-3 py-2 text-sm font-bold rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-all duration-200 shadow-sm hover:shadow-md"
      title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-base">{language === "ar" ? "EN" : "ع"}</span>
    </button>
  );
}
