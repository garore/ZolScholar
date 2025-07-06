import React, { useState, useEffect } from "react";
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
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Search,
  ExternalLink,
  Calendar,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  ArrowLeft,
  Heart,
  Star,
  Globe,
} from "lucide-react";

interface Scholarship {
  id: string;
  title: string;
  country: string;
  flag: string;
  university: string;
  description: string;
  funding: string;
  level: string;
  deadline: string;
  requirements: string[];
  applicationSteps: string[];
  documents: string[];
  benefits: string[];
  applicationLink: string;
  additionalLinks?: { name: string; url: string }[];
  isActive: boolean;
  createdAt: string;
}

interface ScholarshipsResponse {
  success: boolean;
  count: number;
  scholarships: Scholarship[];
  motivationalMessage: string;
}

export default function Scholarships() {
  const { t, language } = useTranslation();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedScholarship, setSelectedScholarship] =
    useState<Scholarship | null>(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/scholarships");
      const data: ScholarshipsResponse = await response.json();

      if (data.success) {
        setScholarships(data.scholarships);
        setMotivationalMessage(data.motivationalMessage);
      } else {
        setError("فشل في تحميل المنح");
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال");
      console.error("Error fetching scholarships:", err);
    } finally {
      setLoading(false);
    }
  };

  const openScholarshipDetails = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
  };

  const closeScholarshipDetails = () => {
    setSelectedScholarship(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">جاري تحميل المنح...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">{error}</p>
            <Button onClick={fetchScholarships}>إعادة المحاو��ة</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="المنح الدراسية المتاحة - حلم زول بسيط"
        description="اكتشف أفضل المنح الدراسية المتاحة حالياً من العراق وإندونيسيا والسعودية. منح ممولة بالكامل للطلاب العرب والسودانيين."
        keywords="منح دراسية, منحة العراق, منحة إندونيسيا, منحة السعودية, منح مجانية, Study in Iraq, UMS, Prince Sultan University"
      />
      <Navigation />

      {/* Header Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-white to-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-6">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-purple-700 font-semibold">
              منح دراسية حصرية
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 mobile-arabic-title">
            🎓 المنح الدراسية المتاحة
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 mobile-arabic-text">
            اكتشف أفضل الفرص التعليمية المتاحة حالياً من أفضل الجامعات حول
            العالم. كل منحة مختارة بعناية لتناسب طموحاتك التعليمية.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>{scholarships.length} منحة متاحة</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-500" />
              <span>محدثة باستمرار</span>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Message */}
      {motivationalMessage && (
        <section className="py-8 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-200" />
              <span className="text-lg font-semibold">رسالة تحفيزية</span>
              <Heart className="w-6 h-6 text-pink-200" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed mobile-arabic-text">
              {motivationalMessage}
            </p>
          </div>
        </section>
      )}

      {/* Scholarships Grid */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholarships.map((scholarship) => (
              <Card
                key={scholarship.id}
                className="scholarship-card h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/20"
                onClick={() => openScholarshipDetails(scholarship)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary text-white text-lg px-3 py-1">
                      {scholarship.flag} {scholarship.country}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 ml-1" />
                      جديد
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mobile-arabic-title mb-3 leading-tight">
                    {scholarship.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    📍 {scholarship.university}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 text-success border-success/30"
                    >
                      <DollarSign className="w-3 h-3 ml-1" />
                      {scholarship.funding}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Users className="w-3 h-3 ml-1" />
                      {scholarship.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 leading-relaxed mobile-arabic-text">
                    {scholarship.description.substring(0, 120)}...
                  </CardDescription>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">
                      📅 موعد التقديم:
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {scholarship.deadline}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-sm mb-2 text-foreground">
                      🎯 المزايا:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.benefits.slice(0, 3).map((benefit, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {benefit}
                        </Badge>
                      ))}
                      {scholarship.benefits.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-600"
                        >
                          +{scholarship.benefits.length - 3} المزيد
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary text-white hover:bg-primary/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        openScholarshipDetails(scholarship);
                      }}
                    >
                      <FileText className="w-4 h-4 ml-2" />
                      التفاصيل الكاملة
                    </Button>
                    <a
                      href={scholarship.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        className="bg-success text-white border-success hover:bg-success/90"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Details Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground mobile-arabic-title">
                {selectedScholarship.title}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeScholarshipDetails}
              >
                ✕
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* University and Country */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-3xl">{selectedScholarship.flag}</div>
                <div>
                  <h3 className="font-bold text-lg">
                    {selectedScholarship.country}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedScholarship.university}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  📝 وصف المنحة
                </h3>
                <p className="text-muted-foreground leading-relaxed mobile-arabic-text">
                  {selectedScholarship.description}
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  ✅ الشروط المطلوبة
                </h3>
                <ul className="space-y-2">
                  {selectedScholarship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground mobile-arabic-text">
                        {req}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Steps */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  📋 خطوات التقديم
                </h3>
                <ol className="space-y-2">
                  {selectedScholarship.applicationSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground mobile-arabic-text">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  📄 المستندات المطلوبة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedScholarship.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
                    >
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-blue-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  🎁 مزايا المنحة
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedScholarship.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Application Links */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  🔗 روابط التقديم
                </h3>
                <div className="space-y-3">
                  <a
                    href={selectedScholarship.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 text-lg py-3">
                      <ExternalLink className="w-5 h-5 ml-2" />
                      التقديم الرسمي للمنحة
                    </Button>
                  </a>
                  {selectedScholarship.additionalLinks?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-primary text-primary hover:bg-primary/10"
                      >
                        <Globe className="w-4 h-4 ml-2" />
                        {link.name}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>

              {/* Deadline Warning */}
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">
                    موعد انتهاء التقديم:
                  </span>
                </div>
                <p className="text-yellow-700 font-medium">
                  {selectedScholarship.deadline}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 هل أنت مستعد لبدء رحلتك؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            لا تتردد! كل يوم تؤجل فيه التقديم هو يوم تبتعد فيه عن حلمك. ابدأ
            الآن واجعل المستحيل ممكناً!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                <Search className="w-5 h-5 ml-2" />
                ابحث عن المزيد من المنح
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                احتاج مساعدة
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
