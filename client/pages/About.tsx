import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Heart,
  Users,
  Trophy,
  Target,
  Globe,
  Star,
  MessageCircle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const whatsappNumber = "+62 859-3241-6084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, "").replace("+", "")}`;

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "من نحن - حلم زول بسيط",
    description:
      "تعرف على قصة حلم زول بسيط ومؤسسها أسامة صالح، ورسالتنا في مساعدة الطلاب السودانيين والعرب للحصول على منح دراسية",
    url: "https://zolscholar.com/about",
  };

  const mission = [
    {
      title: "مساعدة الطلاب",
      description:
        "نهدف لمساعدة كل طالب سوداني وعربي في تحقيق حلم الدراسة في الخارج",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "توفير المعلومات",
      description: "نجمع ونوفر معلومات شاملة ومحدثة عن المنح الدراسية المتاحة",
      icon: Globe,
      color: "bg-green-500",
    },
    {
      title: "الدعم المستمر",
      description: "نقدم الدعم والمتابعة من بداية البحث حتى الحصول على المنحة",
      icon: Heart,
      color: "bg-red-500",
    },
  ];

  const achievements = [
    {
      number: "10,000+",
      label: "طالب استفاد",
      icon: Users,
    },
    {
      number: "500+",
      label: "قصة نجاح",
      icon: Trophy,
    },
    {
      number: "350+",
      label: "منحة متاحة",
      icon: GraduationCap,
    },
    {
      number: "50+",
      label: "دولة",
      icon: Globe,
    },
  ];

  const values = [
    {
      title: "الشفافية",
      description: "نؤمن بتقديم معلومات صادقة وواضحة للجميع",
      icon: CheckCircle,
    },
    {
      title: "المجانية",
      description: "معظم خدماتنا الأساسية مجانية لكل من يحتاجها",
      icon: Heart,
    },
    {
      title: "التطوير المستمر",
      description: "نحرص على تحديث وتطوير خدماتنا باستمرار",
      icon: TrendingUp,
    },
    {
      title: "التميز",
      description: "نسعى للتميز في كل ما نقدمه من خدمات ومعلومات",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="من نحن - حلم زول بسيط | منصة المنح الدراسية"
        description="تعرف على قصة حلم زول بسيط ومؤسسها أسامة صالح، ورسالتنا في مساعدة الطلاب السودانيين والعرب للحصول على منح دراسية مجانية في أفضل الجامعات العالمية"
        keywords="من نحن, حلم زول بسيط, أسامة صالح, منح دراسية, مؤسس, قصة نجاح"
        canonicalUrl="https://zolscholar.com/about"
        jsonLd={aboutJsonLd}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">من نحن؟</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            نحن منصة <strong>حلم زول بسيط</strong> - رحلة بدأت من حلم بسيط
            لمساعدة الطلاب السودانيين والعرب في تحقيق أحلامهم الدراسية في أفضل
            الجامعات العالمية
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                قصتنا
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                كيف بدأت رحلة "حلم زول بسيط"؟
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  بدأت الفكرة من حلم شخصي بسيط... حلم طالب سوداني يريد أن يدرس
                  في الخارج لكنه لا يعرف من أين يبدأ أو كيف يجد المنح المناسبة.
                </p>
                <p>
                  بعد البحث والتجربة والنجاح في الحصول على منح دراسية، قررت أن
                  أشارك هذه المعرفة مع كل طالب يحلم بنفس الحلم.
                </p>
                <p>
                  اليوم، بعد مساعدة آلاف الطلاب، أصبحت "حلم زول بسيط" منصة
                  موثوقة تجمع المنح من جميع أنحاء العالم في مكان واحد.
                </p>
              </div>
            </div>

            <Card className="scholarship-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  رؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed mb-6">
                  أن يكون لكل طالب سوداني وعربي الفرصة للدراسة في أفضل الجامعات
                  العالمية، بغض النظر عن وضعه المالي أو خلفيته الاجتماعية.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Heart className="w-5 h-5" />
                  "التعليم حق للجميع"
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">مهمتنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              نعمل على تحقيق أهداف واضحة لخدمة المجتمع الطلابي العربي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="scholarship-card text-center">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              إنجازاتنا
            </h2>
            <p className="text-xl text-muted-foreground">
              أرقام نفتخر بها ونسعى لتطويرها يومياً
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">قيمنا</h2>
            <p className="text-xl text-muted-foreground">
              المبادئ التي نؤمن بها ونعمل من خلالها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="scholarship-card text-center">
                  <CardHeader>
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="scholarship-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">أ.س</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  أسامة صالح
                </h3>
                <p className="text-xl text-primary font-semibold mb-4">
                  مؤسس حلم زول بسيط
                </p>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground text-center">
                <p>
                  "بدأت هذه الرحلة كطالب سوداني يحلم بالدراسة في الخارج. اليوم،
                  بفضل الله، أساعد آلاف الطلاب في تحقيق نفس الحلم."
                </p>
                <p>
                  "أؤمن أن التعليم هو أقوى سلاح لتغيير العالم، وكل طالب يستحق
                  الفرصة لل��صول إلى أفضل تعليم ممكن."
                </p>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="whatsapp-button">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    تواصل مع أسامة
                  </Button>
                </a>
                <a
                  href="https://tiktok.com/@osamasalih687"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">
                    <Star className="w-4 h-4 ml-2" />
                    تابع على تيك توك
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">انضم لعائلة حلم زول بسيط</h2>
          <p className="text-xl mb-8 opacity-90">
            كن جزءاً من قصة نجاح جديدة وابدأ رحلتك نحو المنحة الدراسية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/recommendations">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                <Target className="w-5 h-5 ml-2" />
                احصل على توصيات مخصصة
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
