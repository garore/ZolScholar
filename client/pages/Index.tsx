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
      description: "مساعدة في إنشاء وتفعيل حساباتك في المنصات ا��مختلفة",
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
      level: "ماجستير، دكتوراه",
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
      <section className="relative py-20 px-4 overflow-hidden gradient-bg-hero opacity-95">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        {/* Subtle Sudan flag pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-red-500"></div>
          <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
          <div className="absolute top-2/3 left-0 w-full h-1/3 bg-black"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            {/* Logo/Title */}
            <div className="mb-8">
              <h1
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{
                  fontFamily:
                    language === "ar" ? "Cairo, serif" : "Inter, serif",
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 bg-clip-text text-transparent">
                  {t("home.hero.title")}
                </span>
              </h1>
            </div>

            {/* Personal Story - Simple & Short */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div
                className="space-y-4 text-lg leading-relaxed text-center"
                style={{
                  fontFamily:
                    language === "ar" ? "Cairo, serif" : "Inter, serif",
                }}
              >
                <p className="text-blue-800 font-semibold text-xl">
                  {t("home.hero.description")}
                </p>

                <p className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  {t("home.hero.message")}
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <Link to="/search">
                  <button className="cta-primary text-xl px-12 py-5 inline-flex items-center gap-3">
                    {language === "ar" && <GraduationCap className="w-6 h-6" />}
                    {t("home.hero.cta")}
                    {language === "en" && <GraduationCap className="w-6 h-6" />}
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ طالب مستفيد</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>500+ قصة نجاح</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>من القلب للقلب</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access to Main Features */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            <Link to="/recommendations" className="group">
              <Card className="feature-card border-2 hover:border-accent/30">
                <CardContent className="p-6">
                  <div className="icon-wrapper bg-gradient-to-br from-accent to-accent/80">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {t("home.quick.recommendations")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("home.quick.recommendations_desc")}
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/success-stories" className="group">
              <Card className="feature-card border-2 hover:border-warning/30">
                <CardContent className="p-6">
                  <div className="icon-wrapper bg-gradient-to-br from-warning to-warning/80">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {t("home.quick.success")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
              <Card className="scholarship-card text-center hover:scale-105 transition-all duration-300 border-2 hover:border-green-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {t("home.quick.contact")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("home.quick.contact_desc")}
                  </p>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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

      {/* Scholarship Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t("categories.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("categories.description")}
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
              منح مميزة هذا الشهر
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
                      الت��اصيل
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
                  اكتشف قصص ملهمة لطلاب حصلوا على منح في أفضل الجامعات
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
                  دليل شامل بأفضل النصائح والاستراتيجيات للحصول على المنح
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
            معانا حتلقى منح عربية وأجنبية، وأدوات تسا��دك تخلي طريق�� للتقديم
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
                منصتك الأولى للمنح الدراسية الممولة بالكامل حول العالم
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
                © 2024 حلم زول بسيط. جميع الحقوق محفوظة.
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
