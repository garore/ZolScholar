import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language = "ar" | "en";

interface TranslationContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.search": "البحث",
    "nav.about": "من نحن",
    "nav.services": "خدماتنا",
    "nav.contact": "تواصل معنا",
    "nav.recommendations": "التوصيات",
    "nav.tracker": "متابع الطلبات",
    "nav.blog": "المدونة",
    "nav.success_stories": "قصص النجاح",

    // Home page
    "home.title": "حلم زول بسيط",
    "home.subtitle": "منح دراسية مجانية للطلاب السودانيين والعرب",
    "home.hero.title": "✨ حلم زول بسيط ✨",
    "home.hero.description":
      '"حلم زول بسيط" - منصة مجانية لمساعدة الطلاب السودانيين في الحصول على منح دراسية.',
    "home.hero.message": "لو وصلت هنا، فأنت ما وحدك… ✊",
    "home.hero.cta": "ابدأ رحلة حلمك",

    // Quick access
    "home.quick.search": "ابحث عن منح",
    "home.quick.search_desc": "اكتشف مئات المنح المتاحة",
    "home.quick.recommendations": "توصيات ذكية",
    "home.quick.recommendations_desc": "منح مخصصة لملفك",
    "home.quick.success": "قصص النجاح",
    "home.quick.success_desc": "اقرأ قصص ملهمة",
    "home.quick.contact": "تحدث معنا",
    "home.quick.contact_desc": "احصل على مساعدة فورية",

    // Stats
    "stats.students": "طالب مستفيد",
    "stats.scholarships": "منحة متاحة",
    "stats.success_rate": "معدل النجاح",
    "stats.countries": "دولة",

    // Scholarship categories
    "categories.title": "أقسام المنح الدراسية",
    "categories.description":
      "اختر النوع المناسب لك من منحنا المتنوعة والمصممة لتلبية احتياجاتك التعليمية",
    "categories.fully_funded": "منح ��راسية ممولة بالكامل",
    "categories.fully_funded_desc":
      "منح تغطي جميع التكاليف: الدراسة + السكن + المعيشة + السفر",
    "categories.airfare": "منح جوية",
    "categories.airfare_desc": "منح تشمل تذاكر الطيران مجاناً",
    "categories.arab": "منح عربية",
    "categories.arab_desc": "من السعودية، الإمارات، مصر، قطر، السودان",
    "categories.foreign": "منح أجنبية",
    "categories.foreign_desc":
      "من ألمانيا، تركيا، أمريكا، كندا، إندونيسيا، ماليزيا",
    "categories.explore_now": "استكشف الآن",

    // Common
    "common.visitors_total": "إجمالي الزوار",
    "common.visitors_today": "زوار اليوم",
    "common.whatsapp_contact": "تواصل عبر واتساب",
    "common.try_now": "جرب الآن",
    "common.read_more": "اقرأ المزيد",
    "common.get_started": "ابدأ الآن",
    "common.loading": "جاري التحميل...",

    // Footer
    "footer.description":
      "منصتك الأولى للمنح الدراسية الممولة بالكامل حول العالم",
    "footer.quick_links": "روابط سريعة",
    "footer.contact_us": "تواصل معنا",
    "footer.copyright": "© 2024 حلم زول بسيط. جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الاستخدام",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.search": "Search",
    "nav.about": "About Us",
    "nav.services": "Our Services",
    "nav.contact": "Contact Us",
    "nav.recommendations": "Recommendations",
    "nav.tracker": "Application Tracker",
    "nav.blog": "Blog",
    "nav.success_stories": "Success Stories",

    // Home page
    "home.title": "Simple Guy's Dream",
    "home.subtitle": "Free Scholarships for Sudanese and Arab Students",
    "home.hero.title": "✨ Simple Guy's Dream ✨",
    "home.hero.description":
      '"Simple Guy\'s Dream" - A free platform to help Sudanese students get scholarships.',
    "home.hero.message": "If you're here, you're not alone… ✊",
    "home.hero.cta": "Start Your Dream Journey",

    // Quick access
    "home.quick.search": "Search Scholarships",
    "home.quick.search_desc": "Discover hundreds of available scholarships",
    "home.quick.recommendations": "Smart Recommendations",
    "home.quick.recommendations_desc": "Scholarships tailored to your profile",
    "home.quick.success": "Success Stories",
    "home.quick.success_desc": "Read inspiring stories",
    "home.quick.contact": "Talk to Us",
    "home.quick.contact_desc": "Get instant help",

    // Stats
    "stats.students": "Students Helped",
    "stats.scholarships": "Available Scholarships",
    "stats.success_rate": "Success Rate",
    "stats.countries": "Countries",

    // Scholarship categories
    "categories.title": "Scholarship Categories",
    "categories.description":
      "Choose the type that suits you from our diverse scholarships designed to meet your educational needs",
    "categories.fully_funded": "Fully Funded Scholarships",
    "categories.fully_funded_desc":
      "Scholarships covering all costs: tuition + accommodation + living + travel",
    "categories.airfare": "Airfare Scholarships",
    "categories.airfare_desc": "Scholarships including free flight tickets",
    "categories.arab": "Arab Scholarships",
    "categories.arab_desc": "From Saudi Arabia, UAE, Egypt, Qatar, Sudan",
    "categories.foreign": "International Scholarships",
    "categories.foreign_desc":
      "From Germany, Turkey, USA, Canada, Indonesia, Malaysia",
    "categories.explore_now": "Explore Now",

    // Common
    "common.visitors_total": "Total Visitors",
    "common.visitors_today": "Today's Visitors",
    "common.whatsapp_contact": "Contact via WhatsApp",
    "common.try_now": "Try Now",
    "common.read_more": "Read More",
    "common.get_started": "Get Started",
    "common.loading": "Loading...",

    // Footer
    "footer.description":
      "Your first platform for fully funded scholarships worldwide",
    "footer.quick_links": "Quick Links",
    "footer.contact_us": "Contact Us",
    "footer.copyright": "© 2024 Simple Guy's Dream. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "ar" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Update font family based on language
    document.body.style.fontFamily =
      language === "ar"
        ? '"Cairo", "Inter", sans-serif'
        : '"Inter", "Cairo", sans-serif';
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["ar"]] || key
    );
  };

  return (
    <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
