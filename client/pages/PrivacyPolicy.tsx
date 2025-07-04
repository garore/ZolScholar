import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Users,
  Globe,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  const whatsappNumber = "+62 859-3241-6084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, "").replace("+", "")}`;

  const privacyJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "سياسة الخصوصية - حلم زول بسيط",
    description:
      "سياسة الخصوصية وحماية البيانات الخاصة بمنصة حلم زول بسيط للمنح الدراسية",
    url: "https://zolscholar.com/privacy-policy",
  };

  const dataTypes = [
    {
      title: "المعلومات الشخصية",
      description: "الاسم، العمر، البلد، المؤهل الدراسي",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "معلومات الاتصال",
      description: "البريد الإلكتروني، رقم الهاتف، عن��ان واتساب",
      icon: Phone,
      color: "bg-green-500",
    },
    {
      title: "التفضيلات الأكاديمية",
      description: "التخصص المطلوب، البلدان المفضلة، نوع المنحة",
      icon: Globe,
      color: "bg-purple-500",
    },
    {
      title: "بيانات الاستخدام",
      description: "الصفحات المزارة، الوقت المقضي، التفاعلات",
      icon: Eye,
      color: "bg-orange-500",
    },
  ];

  const sections = [
    {
      id: "collection",
      title: "جمع المعلومات",
      content: [
        "نجمع المعلومات التي تقدمها لنا مباشرة عند التسجيل أو التواصل معنا",
        "المعلومات التي نجمعها تلقائياً من خلال استخدامك للموقع",
        "معلومات من مصادر خارجية مثل منصات التواصل الاجتماعي (بإذنك)",
        "ملفات تعريف الارتباط (Cookies) لتحسين تجربة الاستخدام",
      ],
    },
    {
      id: "usage",
      title: "استخدام المعلومات",
      content: [
        "تقديم خدمات مخصصة وتوصيات مناسبة للمنح ا��دراسية",
        "التواصل معك بخصوص المنح الجديدة والفرص المتاحة",
        "تحسين خدماتنا وتطوير ميزات جديدة",
        "حماية الموقع ومنع الاستخدام غير المشروع",
        "الامتثال للمتطلبات القانونية عند الضرورة",
      ],
    },
    {
      id: "sharing",
      title: "مشاركة المعلومات",
      content: [
        "لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة",
        "قد نشارك معلوماتك مع الجامعات أو المؤسسات التعليمية (بإذنك)",
        "مشاركة محدودة مع مقدمي الخدمات الذين يساعدوننا في تشغيل الموقع",
        "الكشف عن المعلومات قد يحدث عند الضرورة القانونية أو لحماية حقوقنا",
      ],
    },
    {
      id: "protection",
      title: "حماية البيانات",
      content: [
        "نستخدم تشفير SSL لحماية البيانات أثناء النقل",
        "التخزين الآمن للبيانات مع حماية من الوصول غير المصرح به",
        "مراجعة منتظمة لإجراءات الأمان وتحديثها",
        "التحكم في الوصول للبيانات وفقاً لمبدأ 'الحد الأدنى من المعرفة'",
        "حذف البيانات غير الضرورية وفقاً لسياسات الاحتفاظ",
      ],
    },
    {
      id: "rights",
      title: "حقوقك",
      content: [
        "الحق في الوصول لبياناتك الشخصية ومعرفة كيفية استخدامها",
        "الحق في تصحيح أو تحديث معلوماتك",
        "الحق في حذف بياناتك (الحق في النسيان)",
        "الحق في تقييد أو منع معالجة بياناتك",
        "الحق في نقل بياناتك إلى خدمة أخرى",
        "الحق في سحب موافقتك في أي وقت",
      ],
    },
    {
      id: "cookies",
      title: "ملفات تعريف الارتباط",
      content: [
        "نستخدم ملفات تعريف الارتباط لتحسين تجربة الاستخدام",
        "تذكر تفضيلاتك وإعداداتك",
        "تحليل استخدام الموقع لتحسين الخدمات",
        "يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات ��لمتصفح",
        "بعض الميزات قد لا تعمل بشكل صحيح عند تعطيل ملفات تعريف الارتباط",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="سياسة الخصوصية - حلم زول بسيط"
        description="اطلع على سياسة الخصوصية وحماية البيانات الخاصة بمنصة حلم زول بسيط للمنح الدراسية. نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية."
        keywords="سياسة الخصوصية, حماية البيانات, خصوصية المستخدم, حلم زول بسيط"
        canonicalUrl="https://zolscholar.com/privacy-policy"
        jsonLd={privacyJsonLd}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            سياسة الخصوصية
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            نحن في حلم زول بسيط ملتزمون بحماية خصوصيتك وبياناتك الشخصية. هذه
            السياسة توضح كيفية جمع واستخدام وحماية معلوماتك.
          </p>
          <div className="mt-6 flex justify-center">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              آخر تحديث: يناير 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Summary */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="scholarship-card mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                ملخص سريع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>نحمي معلوماتك بأعلى معايير الأمان</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>لا نبيع بياناتك لأطراف ثالثة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span>تحكم كامل في بياناتك وحقوقك</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>تشفير قوي لحماية البيانات</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>شفافية كاملة في استخدام البيانات</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>دعم فوري لأي استفسارات</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              أنواع البيانات التي نجمعها
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <Card key={index} className="scholarship-card text-center">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="scholarship-card">
                <CardHeader>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="scholarship-card border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-orange-800">
                <AlertTriangle className="w-6 h-6" />
                تنبيه مهم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-orange-700">
                <p>
                  <strong>المستخدمون تحت 18 سنة:</strong> إذا كنت تحت سن 18، يجب
                  الحصول على موافقة ولي الأمر قبل استخدام خدماتنا.
                </p>
                <p>
                  <strong>التحديثات:</strong> قد نقوم بتحديث هذه السياسة من وقت
                  لآخر. سنخطرك بأي تغييرات مهمة.
                </p>
                <p>
                  <strong>القانون المطبق:</strong> هذه السياسة تخضع لقوانين دولة
                  السودان والقوانين الدولية المعمول بها.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">أسئلة حول الخصوصية؟</h2>
          <p className="text-xl mb-8 opacity-90">
            إذا كان لديك أي استفسارات حول سياسة الخصوصية أو تريد ممارسة حقوقك،
            تواصل معنا فوراً
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تواصل عبر واتساب
              </Button>
            </a>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Mail className="w-5 h-5 ml-2" />
                صفحة التواصل
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>البريد الإلكتروني: privacy@zolscholar.com</p>
            <p>للاستفسارات العاجلة: {whatsappNumber}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
