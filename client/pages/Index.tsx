import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import VisitorCounter from "@/components/VisitorCounter";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Search,
  GraduationCap,
  Plane,
  Globe,
  MapPin,
  Heart,
  Users,
  Trophy,
  ArrowLeft,
  ExternalLink,
  Clock,
  DollarSign,
  BookOpen,
  MessageCircle,
  FileText,
  UserCheck,
  Languages,
  Video,
  HeadphonesIcon,
} from "lucide-react";

export default function Index() {
  const { t, language } = useTranslation();
  const whatsappNumber = "+62 859-3241-6084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, "").replace("+", "")}`;

  // Structured data for homepage
  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "حلم زول بسيط",
    alternateName: "Simple Guy's Dream",
    url: "https://zolscholar.com",
    logo: "https://zolscholar.com/favicon.svg",
    description:
      "منصة مجانية لمساعدة ا��طلاب السودانيين والعرب في العثور على منح دراسية ممولة بالكامل في جميع أنحاء العالم",
    areaServed: {
      "@type": "Country",
      name: "Sudan",
    },
    serviceType: "Educational Consulting",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "منح دراسية",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "منح دراسية ممولة بالكامل",
            description: "مساعدة في العثور على منح دراسية ممولة بالكامل",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "منح عربية وأجنبية",
            description: "منح من الدول العربية والأجنبية",
          },
        },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-859-3241-6084",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
  };

  const scholarshipCategories = [
    {
      title: t("categories.fully_funded"),
      description: t("categories.fully_funded_desc"),
      icon: GraduationCap,
      href: "/scholarships/fully-funded",
      color: "bg-primary",
      count: "100+",
      badge: language === "ar" ? "الأكثر طلباً" : "Most Popular",
    },
    {
      title: t("categories.airfare"),
      description: t("categories.airfare_desc"),
      icon: Plane,
      href: "/scholarships/airfare",
      color: "bg-blue-500",
      count: "50+",
      badge: "جدي��",
    },
    {
      title: t("categories.arab"),
      description: t("categories.arab_desc"),
      icon: MapPin,
      href: "/scholarships/arab",
      color: "bg-amber-500",
      count: "80+",
      badge: language === "ar" ? "محدث" : "Updated",
    },
    {
      title: t("categories.foreign"),
      description: t("categories.foreign_desc"),
      icon: Globe,
      href: "/scholarships/foreign",
      color: "bg-accent",
      count: "120+",
      badge: language === "ar" ? "مميز" : "Featured",
    },
  ];

  const services = [
    {
      title: "تصميم سيرة ذاتية احترافية",
      icon: FileText,
      description: "سيرة ذاتية مميزة تبرز مهاراتك وإنجازاتك",
    },
    {
      title: "كتابة رسالة الدافع",
      icon: BookOpen,
      description: "رسالة دافع مقنعة ومؤثرة لزيادة فرص القبول",
    },
    {
      title: "إنشاء حسابات في منصات التقديم",
      icon: UserCheck,
      description: "مساعدة في إنشاء وتفعيل حساباتك في ا��منصات المختلفة",
    },
    {
      title: "ترجمة المستندات",
      icon: Languages,
      description: "تر��مة دقيقة ومعتمدة لجميع المستندات المطلوبة",
    },
    {
      title: "تدريب على المقابلات",
      icon: Video,
      description: "تدريب مكثف للمقابلات الشخصية عبر الإنترنت",
    },
    {
      title: "استشارات خاصة",
      icon: HeadphonesIcon,
      description: "استشارات شخصية ومتابعة مستمرة عبر واتساب",
    },
  ];

  const stats = [
    { number: "10,000+", label: "students", icon: Users },
    { number: "350+", label: "scholarships", icon: GraduationCap },
    { number: "95%", label: "success_rate", icon: Trophy },
    { number: "50+", label: "countries", icon: Globe },
  ];

  const featuredScholarships = [
    {
      title: "منحة ���لحكومة التركية 2024",
      country: "تركيا",
      deadline: "31 يناير 2024",
      funding: "ممولة بالكامل",
      level: "بكالوريوس، ماجستير، دكتوراه",
      benefits: ["راتب شهري", "سكن مجاني", "تأمين صحي", "تذاكر طيران"],
    },
    {
      title: "منحة DAAD الألمانية",
      country: "ألمانيا",
      deadline: "15 ف��راير 2024",
      funding: "ممولة بالكامل",
      level: "ماجستي��، دكتوراه",
      benefits: ["راتب 850€", "تأمين صحي", "دورات لغة"],
    },
    {
      title: "منحة جامعة الملك سعود",
      country: "السعودية",
      deadline: "28 فبراير 2024",
      funding: "ممولة بالكامل",
      level: "جميع المستويات",
      benefits: ["راتب شهري", "سكن وطعام", "تذاكر طيران سنوية"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="حلم زول بسيط - منح دراسية مجانية للطلاب السودانيين والعرب"
        description="منصة مجانية لمساعدة الطلاب السودانيين والع��ب في العثور على منح دراسية ممولة بالكامل في جميع أنحاء العالم. أكثر من 350 منحة متاحة من أفضل الجامعات العالمية."
        keywords="منح دراسية مجانية, منح للسودانيين, حلم زول بسيط, منح ممولة بالكامل, منح عربية, منح أجنبية, دراسة مجانية, منح تركيا, منح ألمانيا, scholarship"
        canonicalUrl="https://zolscholar.com/"
        jsonLd={homepageJsonLd}
      />
      <Navigation />

      {/* Visitor Counter */}
      <div className="py-4 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <VisitorCounter />
        </div>
      </div>

      {/* Personal Introduction Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent/5">

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            {/* Logo/Brand - Prominent and Clear */}
            <div className="mb-8 md:mb-12">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary mobile-arabic-title">
                  {t("home.title")}
                </h1>
              </div>

              {/* Main Value Proposition */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 mobile-arabic-title leading-tight">
                بوابتك للمنح الدراسية والفرص التعليمية
              </h2>

              {/* Simplified Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mobile-arabic-text">
                منصة شاملة تساعدك في العثور على أفضل المنح الدراسية المجانية والممولة بالكامل في جميع أنحاء العالم
              </p>
            </div>

            {/* Primary CTA */}
            <div className="mb-12">
              <Link to="/search" className="inline-block">
                <button className="cta-primary text-xl md:text-2xl px-12 md:px-16 py-4 md:py-6 inline-flex items-center gap-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl">
                  <Search className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="font-bold">ابدأ البحث عن منحتك</span>
                </button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن منح حسب التخصص أو البلد..."
                  className="w-full px-6 py-4 md:py-5 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary focus:outline-none shadow-lg bg-white/95 backdrop-blur-sm mobile-arabic-text"
                />
                <button className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

              {/* Social proof - Much more comfortable for mobile */}
              <div className="mt-10 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 md:flex md:items-center md:justify-center md:gap-8">
                <div className="mobile-card-comfortable flex items-center justify-center gap-3 py-6 md:py-4 bg-gradient-to-r from-blue-50 to-blue-100 md:bg-transparent rounded-2xl md:rounded-none border-2 border-blue-200 md:border-none">
                  <Users className="w-7 h-7 md:w-5 md:h-5 text-blue-600" />
                  <span className="font-bold text-xl md:text-lg mobile-arabic-text text-blue-800">
                    10,000+ طالب مستفيد
                  </span>
                </div>
                <div className="mobile-card-comfortable flex items-center justify-center gap-3 py-6 md:py-4 bg-gradient-to-r from-yellow-50 to-yellow-100 md:bg-transparent rounded-2xl md:rounded-none border-2 border-yellow-200 md:border-none">
                  <Trophy className="w-7 h-7 md:w-5 md:h-5 text-yellow-600" />
                  <span className="font-bold text-xl md:text-lg mobile-arabic-text text-yellow-800">
                    500+ قصة ن��اح
                  </span>
                </div>
                <div className="mobile-card-comfortable flex items-center justify-center gap-3 py-6 md:py-4 bg-gradient-to-r from-red-50 to-red-100 md:bg-transparent rounded-2xl md:rounded-none border-2 border-red-200 md:border-none">
                  <Heart className="w-7 h-7 md:w-5 md:h-5 text-red-500" />
                  <span className="font-bold text-xl md:text-lg mobile-arabic-text text-red-800">
                    من القلب للقلب
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Scholarships This Month */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mobile-arabic-title">
              المنح المميزة هذا الشهر
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mobile-arabic-text">
              أفضل الفرص المتاحة حالياً مع مواعيد التقديم القريبة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "منحة الحكومة التركية 2024",
                country: "تركيا",
                funding: "ممولة بالكامل",
                level: "جميع المستويات",
                deadline: "31 يناير 2024",
                benefits: [
                  "راتب شهري",
                  "سكن مجاني",
                  "تأمين صحي",
                  "تذاكر طيران",
                ],
              },
              {
                title: "منحة DAAD الألمانية",
                country: "ألمانيا",
                funding: "ممولة بالكامل",
                level: "ماجستير، دكتوراه",
                deadline: "15 فبراير 2024",
                benefits: ["راتب 850€", "تأمين صحي", "دورات لغة"],
              },
              {
                title: "منحة جامعة الملك سعود",
                country: "السعودية",
                funding: "ممولة بالكامل",
                level: "جميع المستويات",
                deadline: "28 فبراير 2024",
                benefits: ["راتب شهري", "سكن وطعام", "تذاكر طيران"],
              },
            ].map((scholarship, index) => (
              <Card
                key={index}
                className="scholarship-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-accent text-white">
                      {scholarship.country}
                    </Badge>
                    <div className="flex items-center text-sm text-red-600 font-medium">
                      <Clock className="w-4 h-4 ml-1" />
                      {scholarship.deadline}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mobile-arabic-title mb-2">
                    {scholarship.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 text-success border-success/30"
                    >
                      {scholarship.funding}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {scholarship.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 mobile-arabic-text">
                      المزايا:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.benefits.map((benefit, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary"
                        >
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                      التفاصيل
                    </button>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-success text-white p-2 rounded-lg hover:bg-success/90 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access to Main Features */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Title - Much larger and clearer */}
          <div className="text-center mb-12 md:mb-8 px-4">
            <h2 className="mobile-title-xl text-4xl md:text-3xl font-extrabold text-foreground mb-6 md:mb-3 mobile-arabic-title">
              الخدمات الرئيسية
            </h2>
            <p className="mobile-text-lead text-2xl md:text-lg text-muted-foreground leading-relaxed mobile-arabic-text">
              اختر ما تحتاجه لبدء رحلتك
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 px-2 md:px-0">
            <Link to="/search" className="group">
              <Card className="scholarship-card text-center hover:scale-105 transition-all duration-300 border-2 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Search className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">ابحث عن منح</h3>
                  <p className="text-sm text-muted-foreground">
                    اك��شف مئات المنح المتاحة
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/recommendations" className="group block">
              <Card className="mobile-card-elevated feature-card border-2 hover:border-accent/30 group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 md:p-6 text-center">
                  <div className="mobile-icon-xl icon-wrapper bg-gradient-to-br from-accent to-accent/80 mx-auto mb-6 shadow-lg">
                    <span className="text-4xl md:text-2xl">🤖</span>
                  </div>
                  <h3 className="mobile-subtitle-comfort font-extrabold text-2xl md:text-lg mb-4 md:mb-2 mobile-arabic-title">
                    {t("home.quick.recommendations")}
                  </h3>
                  <p className="mobile-text-body text-xl md:text-sm text-muted-foreground leading-relaxed mobile-arabic-text">
                    {t("home.quick.recommendations_desc")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/success-stories" className="group block">
              <Card className="mobile-card-elevated feature-card border-2 hover:border-warning/30 group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 md:p-6 text-center">
                  <div className="mobile-icon-xl icon-wrapper bg-gradient-to-br from-warning to-warning/80 mx-auto mb-6 shadow-lg">
                    <Trophy className="w-12 h-12 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="mobile-subtitle-comfort font-extrabold text-2xl md:text-lg mb-4 md:mb-2 mobile-arabic-title">
                    {t("home.quick.success")}
                  </h3>
                  <p className="mobile-text-body text-xl md:text-sm text-muted-foreground leading-relaxed mobile-arabic-text">
                    {t("home.quick.success_desc")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="mobile-card-elevated feature-card border-2 hover:border-success/30 group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8 md:p-6 text-center">
                  <div className="mobile-icon-xl icon-wrapper bg-gradient-to-br from-success to-success/80 mx-auto mb-6 shadow-lg">
                    <MessageCircle className="w-12 h-12 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="mobile-subtitle-comfort font-extrabold text-2xl md:text-lg mb-4 md:mb-2 mobile-arabic-title">
                    {t("home.quick.contact")}
                  </h3>
                  <p className="mobile-text-body text-xl md:text-sm text-muted-foreground leading-relaxed mobile-arabic-text">
                    {t("home.quick.contact_desc")}
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          {/* Mobile title */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              إنجازاتنا
            </h2>
            <p className="text-muted-foreground text-lg">أرقام نفتخر بها</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {t(`stats.${stat.label.toLowerCase().replace(" ", "_")}`) ||
                      stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Scholarship Categories */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mobile-arabic-title">
              أقسام المنح الرئيسية
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mobile-arabic-text">
              اختر نوع المنحة المناسب لك من الأقسام الرئيسية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scholarshipCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="scholarship-card hover:scale-105 transition-transform cursor-pointer group"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{category.badge}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {category.count}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-6 leading-relaxed">
                      {category.description}
                    </CardDescription>
                    <Link to={category.href}>
                      <Button className="w-full group-hover:bg-primary/90">
                        {language === "ar" && (
                          <ArrowLeft className="w-4 h-4 ml-2" />
                        )}
                        {t("categories.explore_now")}
                        {language === "en" && (
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        )}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              منح مميز�� هذا الشهر
            </h2>
            <p className="text-xl text-muted-foreground">
              أفضل الفرص المتاحة حالياً مع مواعيد التقدي�� القريبة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredScholarships.map((scholarship, index) => (
              <Card key={index} className="scholarship-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-accent text-accent-foreground">
                      {scholarship.country}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 ml-1" />
                      {scholarship.deadline}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {scholarship.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <DollarSign className="w-4 h-4 ml-1" />
                      {scholarship.funding}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <BookOpen className="w-4 h-4 ml-1" />
                      {scholarship.level}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <h4 className="font-semibold text-sm">المزايا:</h4>
                    <div className="flex flex-wrap gap-2">
                      {scholarship.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      التفاصيل
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="icon">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">خدماتنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نقدم لك كل ما تحتاجه لضمان نجاح طلب المنحة ��لدراسية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="scholarship-card cursor-pointer group"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center mb-6 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button
                      className="w-full whatsapp-button justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(whatsappLink, "_blank");
                      }}
                    >
                      <MessageCircle className="w-4 h-4 ml-2" />
                      تواصل معنا
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Amazing Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-purple-500" />
              <span className="text-purple-700 font-semibold">
                مميزات حصرية
              </span>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              🚀 أدوات ذكية لضمان نجاحك
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              اكتشف مجموعة من الأدوات المبتكرة المصممة خصيصاً لمساعدتك في الحصول
              على المنحة المثالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="scholarship-card group hover:scale-105 transition-all duration-300 border-2 hover:border-purple-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle className="text-xl font-bold">توصيات ذكية</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  محرك ذكاء اصطناعي يحلل ملفك ويجد أفضل المنح المناسبة لك
                </p>
                <Link to="/recommendations">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    جربه الآن
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="scholarship-card group hover:scale-105 transition-all duration-300 border-2 hover:border-blue-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle className="text-xl font-bold">
                  متابع الطلبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  تتبع جميع طلباتك للمنح مع تذكيرات المواعيد وحالة التقدم
                </p>
                <Link to="/tracker">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    ابدأ الآن
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="scholarship-card group hover:scale-105 transition-all duration-300 border-2 hover:border-yellow-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🏆</span>
                </div>
                <CardTitle className="text-xl font-bold">قصص النجاح</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  اكتشف قصص ملهمة لطلاب حصلوا على م��ح في أفضل الجامعات
                </p>
                <Link to="/success-stories">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    اقرأ القصص
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="scholarship-card group hover:scale-105 transition-all duration-300 border-2 hover:border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📚</span>
                </div>
                <CardTitle className="text-xl font-bold">مدونة المنح</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center mb-6">
                  دليل شامل بأفضل النصائح والاستراتيجيات لل��صول على المنح
                </p>
                <Link to="/blog">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                    اقرأ المقالات
                    <ArrowLeft className="w-4 h-4 mr-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ابدأ رحلتك نحو حلمك الدراسي اليوم
          </h2>
          <p className="text-xl mb-8 opacity-90">
            معانا حتلقى منح عربية وأجنبية، وأدوات تسا��دك تخلي طريقك للتقديم
            أسهل�� ونتابعك خطوة بخطوة لحدي ما تنجح إن شاء الله
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recommendations">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                <span className="text-xl mr-2">🤖</span>
                احصل على توصيات ذكية
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تحدث معنا
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center ml-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">حلم زول بسيط</span>
              </div>
              <p className="text-muted mb-4">
                منصتك الأولى للمنح الدراسية الممولة بالكام�� حول العالم
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <div className="space-y-2">
                <Link
                  to="/scholarships/fully-funded"
                  className="block text-muted hover:text-white transition-colors"
                >
                  منح ممولة بالكامل
                </Link>
                <Link
                  to="/scholarships/arab"
                  className="block text-muted hover:text-white transition-colors"
                >
                  منح عربية
                </Link>
                <Link
                  to="/about"
                  className="block text-muted hover:text-white transition-colors"
                >
                  من نحن
                </Link>
                <Link
                  to="/services"
                  className="block text-muted hover:text-white transition-colors"
                >
                  خدماتنا
                </Link>
                <Link
                  to="/contact"
                  className="block text-muted hover:text-white transition-colors"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted hover:text-white transition-colors"
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  {whatsappNumber}
                </a>
                <a
                  href="https://tiktok.com/@osamasalih687"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted hover:text-white transition-colors"
                >
                  TikTok: @osamasalih687
                </a>
                <div className="text-muted">LinkedIn: Osama on LinkedIn</div>
              </div>
            </div>
          </div>

          <div className="border-t border-muted/20 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted">
                © 2024 حلم زول بسيط. جميع الحق��ق محفوظة.
              </p>
              <div className="flex gap-4 text-sm">
                <Link
                  to="/privacy-policy"
                  className="text-muted hover:text-white transition-colors"
                >
                  سياسة الخصوصية
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-muted hover:text-white transition-colors"
                >
                  شروط الاستخدام
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}