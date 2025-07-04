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
      className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200"
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === "ar" ? "English" : "العربية"}
      </span>
    </Button>
  );
}
