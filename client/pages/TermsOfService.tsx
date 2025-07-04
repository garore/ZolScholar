import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  CheckCircle,
  Users,
  Globe,
  MessageCircle,
  Scale,
  Shield,
  Clock,
  Ban,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
  const whatsappNumber = "+62 859-3241-6084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, "").replace("+", "")}`;

  const termsJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "شروط الاستخدام - حلم زول بسيط",
    description: "شروط وأحكام استخدام منصة حلم زول بسيط للمنح الدراسية",
    url: "https://zolscholar.com/terms-of-service",
  };

  const keyPoints = [
    {
      title: "استخدام مجاني",
      description: "معظم خدماتنا الأساسية مجانية تماماً",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "عدم الضمان",
      description: "لا نضمن الحصول على المنحة لكن نساعد بأقصى ما نستطيع",
      icon: AlertTriangle,
      color: "bg-yellow-500",
    },
    {
      title: "الاستخدام المسؤول",
      description: "يجب استخدام الموقع بطريقة قانونية ومسؤولة",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "حقوق الملكية",
      description: "جميع المحتويات محمية بحقوق الطبع والنشر",
      icon: Shield,
      color: "bg-purple-500",
    },
  ];

  const sections = [
    {
      id: "acceptance",
      title: "قبول الشروط",
      icon: CheckCircle,
      content: [
        "باستخدام موقع حلم زول بسيط، فإنك توافق على هذه الشروط والأحكام",
        "إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع",
        "نحتفظ بالحق في تعديل هذه الشروط في أي وقت مع إشعار مسبق",
        "استمرارك في استخدام الموقع يعني موافقتك على الشروط المحدثة",
      ],
    },
    {
      id: "services",
      title: "وصف الخدمات",
      icon: Globe,
      content: [
        "نوفر معلومات عن المنح الدراسية من مصادر مختلفة",
        "نقدم استشارات تعليمية ومساعدة في التقديم على المنح",
        "نوفر أدوات للبحث والتصفية والمقارنة بين المنح",
        "نقدم خدمات إضافية مثل كتابة السيرة الذاتية ورسائل الدافع",
        "جميع الخدمات تهدف للمساعدة وليس الضمان",
      ],
    },
    {
      id: "user-responsibilities",
      title: "مسؤوليات المستخدم",
      icon: Users,
      content: [
        "تقديم معلومات صحيحة ودقيقة عند التسجيل",
        "عدم استخدام الموقع لأي أغراض غير قانونية أو ضارة",
        "عدم انتهاك حقوق الملكية الفكرية أو الخصوصية",
        "التعامل بأدب واحترام مع فريق الدعم والمستخدمين الآخرين",
        "الإبلاغ عن أي مشاكل أو انتهاكات تواجهها في الموقع",
      ],
    },
    {
      id: "limitations",
      title: "حدود المسؤولية",
      icon: AlertTriangle,
      content: [
        "لا نضمن الحصول على منحة دراسية أو قبول في أي جامعة",
        "لا نتحمل مسؤولية قرارات الجامعات أو المؤسسات التعليمية",
        "المعلومات المقدمة هي للإرشاد وقد تحتاج للتحقق من المصادر الأصلية",
        "لا نتحمل مسؤولية أي أضرار مباشرة أو غير مباشرة من استخدام الموقع",
        "نبذل قصارى جهدنا لضمان دقة المعلومات لكن الأخطاء واردة",
      ],
    },
    {
      id: "intellectual-property",
      title: "حقوق الملكية الفكرية",
      icon: Shield,
      content: [
        "جميع المحتويات في الموقع محمية بحقوق الطبع والنشر",
        "لا يجوز نسخ أو توزيع المحتوى دون إذن خطي مسبق",
        "يمكن مشاركة الروابط والاقتباس مع ذكر المصدر",
        "علامة 'حلم زول بسيط' هي علامة تجارية محفوظة",
        "نحترم حقوق الملكية الفكرية للآخرين ونتوقع نفس الشيء",
      ],
    },
    {
      id: "payment-refund",
      title: "الدفع والاسترداد",
      icon: Scale,
      content: [
        "الخدمات الأساسية مجانية تماماً",
        "الخدمات المدفوعة لها أسعار واضحة ومحددة مسبقاً",
        "الدفع يتم عبر وسائل آمنة ومعتمدة",
        "سياسة الاسترداد تعتمد على نوع الخدمة والظروف",
        "نقدم ضمان الرضا لمعظم الخدمات المدفوعة",
        "للاستفسار عن الاسترداد تواصل معنا مباشرة",
      ],
    },
    {
      id: "prohibited-uses",
      title: "الاستخدامات المحظورة",
      icon: Ban,
      content: [
        "استخدام الموقع لأي أغراض غير قانونية",
        "محاولة اختراق أو إتلاف النظام",
        "إرسال محتوى مسيء أو غير لائق",
        "انتحال الشخصية أو تقديم معلومات كاذبة",
        "استخدام برامج آلية لاستخراج المحتوى",
        "إعادة بيع أو توزيع خدماتنا دون إذن",
      ],
    },
    {
      id: "termination",
      title: "إنهاء الخدمة",
      icon: Clock,
      content: [
        "يمكنك إلغاء حسابك في أي وقت",
        "نحتفظ بالحق في تعليق أو إلغاء الحسابات المخالفة",
        "عند إنهاء الحساب، ستفقد الوصول للخدمات المدفوعة",
        "البيانات الشخصية ستُحذف وفقاً لسياسة الخصوصية",
        "بعض الالتزامات قد تستمر حتى بعد إنهاء الخدمة",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="شروط الاستخدام - حلم زول ب��يط"
        description="اطلع على شروط وأحكام استخدام منصة حلم زول بسيط للمنح الدراسية. تعرف على حقوقك وواجباتك كمستخدم للمنصة."
        keywords="شروط الاستخدام, أحكام الاستخدام, قوانين الموقع, حلم زول بسيط"
        canonicalUrl="https://zolscholar.com/terms-of-service"
        jsonLd={termsJsonLd}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            شروط الاستخدام
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            هذه الشروط والأحكام تحكم استخدامك لموقع وخدمات حلم زول بسيط. يرجى
            قراءتها بعناية قبل استخدام خدماتنا.
          </p>
          <div className="mt-6 flex justify-center">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              آخر تحديث: يناير 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            النقاط الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {keyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card key={index} className="scholarship-card text-center">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 ${point.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="scholarship-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Icon className="w-6 h-6 text-primary" />
                      {section.title}
                    </CardTitle>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Important Legal Notice */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="scholarship-card border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-800">
                <AlertTriangle className="w-6 h-6" />
                إشعار قانوني مهم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-red-700">
                <p>
                  <strong>إخلاء المسؤولية:</strong> منصة حلم زول بسيط تقدم خدمات
                  المعلومات والاستشارات التعليمية. لا نضمن الحصول على منحة
                  دراسية أو قبول في أي جامعة.
                </p>
                <p>
                  <strong>القانون المطبق:</strong> هذه الشروط تخضع لقوانين دولة
                  السودان والقوانين الدولية المعمول بها.
                </p>
                <p>
                  <strong>حل النزاعات:</strong> أي نزاع ينشأ من استخدام الموقع
                  سيتم حله عبر التفاوض الودي أولاً، وفي حالة عدم التوصل لحل،
                  سيخضع للقضاء السوداني المختص.
                </p>
                <p>
                  <strong>قابلية الفصل:</strong> إذا كان أي جزء من هذه الشروط
                  غير قانوني أو غير قابل للتنفيذ، فإن باقي الشروط تبقى سارية
                  المفعول.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Agreement Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-6">هل توافق على الشروط؟</h2>
          <p className="text-xl mb-8 opacity-90">
            استخدامك المستمر للموقع يعني موافقتك على جميع الشروط والأحكام
            المذكورة أعلاه
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                <CheckCircle className="w-5 h-5 ml-2" />
                أوافق وأريد البدء
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                لدي استفسارات
              </Button>
            </a>
          </div>

          <div className="mt-8 text-sm opacity-75">
            <p>للأسئلة القانونية: legal@zolscholar.com</p>
            <p>للدعم العام: {whatsappNumber}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
