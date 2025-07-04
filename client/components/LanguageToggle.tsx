import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Globe, Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 border-blue-300/30 text-blue-800 hover:from-blue-500/30 hover:to-green-500/30 transition-all duration-200 shadow-sm"
      title={language === "ar" ? "Switch to English" : "التبديل للعربية"}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === "ar" ? "EN" : "ع"}
      </span>
    </Button>
  );
}
