import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import { searchApplication, type Application } from "@/lib/localDB";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Download,
  Eye,
  Zap,
  Target,
  BookOpen,
  Star,
} from "lucide-react";

export default function ApplicationTracker() {
  const { t, language } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Application | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("يرجى إدخال البريد الإلكتروني أو رقم التتبع");
      return;
    }

    setLoading(true);
    setError("");
    setSearchResult(null);

    try {
      const result = searchApplication(searchQuery.trim());

      if (result) {
        // إضافة معلومات الحالة
        const statusInfo = {
          ready: { label: "جاهز", icon: "✅", color: "green", description: "تم قبول الطلب أو العمل مكتمل" },
          in_progress: { label: "قيد التجهيز", icon: "⏳", color: "blue", description: "جاري العمل على إعداد المستندات" },
          submitted: { label: "تم التقديم", icon: "✅", color: "purple", description: "تم تقديم الطلب وننتظر الرد" },
          not_submitted: { label: "لم يتم التقديم", icon: "❌", color: "red", description: "لم يتم تقديم الطلب بعد" }
        };

        const resultWithStatus = {
          ...result,
          statusInfo: statusInfo[result.statusCode as keyof typeof statusInfo] || {
            label: result.status,
            icon: "❓",
            color: "gray",
            description: "حالة غير معروفة"
          }
        };

        setSearchResult(resultWithStatus);
        setSearched(true);
      } else {
        setError("لم يتم العثور على طلب بهذا البريد الإلكتروني، رقم التتبع، أو رقم الهاتف");
        setSearched(true);
      }
    } catch (err) {
      setError("حدث خطأ في البحث. يرجى المحاولة مرة أخرى.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statusCode: string) => {
    const colors = {
      ready: "bg-green-500",
      in_progress: "bg-blue-500",
      submitted: "bg-purple-500",
      not_submitted: "bg-red-500",
    };
    return colors[statusCode as keyof typeof colors] || "bg-gray-500";
  };

  const getDocumentIcon = (status: string) => {
    switch (status) {
      case "جاهز":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "قيد التجهيز":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "قيد المراجعة":
        return <Eye className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const whatsappNumber = "+62 859-3241-6084";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\s+/g, "").replace("+", "")}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="تتبع طلبات المنح الدراسية - حلم زول بسيط"
        description="تتبع حالة طلبك للمنح الدراسية. أدخل بريدك الإلكتروني أو رقم التتبع لمعرفة آخر التحديثات على طلبك."
        keywords="تتبع طلبات المنح, حالة التقديم, رقم التتبع, متابعة الطلب"
      />
      <Navigation />

      {/* Header Section */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-6">
            <Search className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold">تتبع الطلبات</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 mobile-arabic-title">
            🔍 تتبع حالة طلبك
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 mobile-arabic-text">
            أدخل بريدك الإلكتروني أو رقم التتبع لمعرفة آخر التحديثات على طلب
            المنحة الدراسية الخاص بك
          </p>

          {/* Search Form */}
          <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border-2">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="أدخل بريدك الإلكتروني، رقم التتبع، أو رقم الهاتف"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg py-3 px-4 mobile-arabic-text"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg py-3 px-8"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="w-5 h-5 ml-2" />
                      بحث
                    </>
                  )}
                </Button>
              </div>

              {/* Search Examples */}
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">أمثلة للبحث:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSearchQuery("TRK001")}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    TRK001
                  </button>
                  <button
                    onClick={() => setSearchQuery("ahmed.mohamed@email.com")}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    ahmed.mohamed@email.com
                  </button>
                  <button
                    onClick={() => setSearchQuery("TRK004")}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    TRK004
                  </button>
                  <button
                    onClick={() => setSearchQuery("+249123456789")}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    +249123456789
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  لم يتم العثور على نتائج
                </h3>
                <p className="text-red-700 mb-4">{error}</p>
                <div className="text-sm text-red-600 space-y-1">
                  <p>• تأكد من صحة البريد الإلكتروني</p>
                  <p>• تأكد من رقم التتبع</p>
                  <p>• تواصل معنا إذا كنت تواجه مشكلة</p>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 bg-red-500 hover:bg-red-600">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    تواصل معنا
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Search Results */}
      {searchResult && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Application Header */}
            <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {searchResult.statusInfo?.icon || "📋"}
                    </div>
                    <div>
                      <CardTitle className="text-2xl mobile-arabic-title">
                        {searchResult.studentName}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        رقم التتبع: {searchResult.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Badge
                      className={`${getStatusColor(searchResult.statusCode)} text-white text-lg px-4 py-2`}
                    >
                      {searchResult.statusInfo?.icon}{" "}
                      {searchResult.statusInfo?.label || searchResult.status}
                    </Badge>
                    <Badge variant="outline" className="text-base px-3 py-1">
                      <Calendar className="w-4 h-4 ml-1" />
                      {searchResult.progress}% مكتمل
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">تقدم الطلب</span>
                    <span className="text-sm text-muted-foreground">
                      {searchResult.progress}%
                    </span>
                  </div>
                  <Progress value={searchResult.progress} className="h-3" />
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Scholarship Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                      تفاصيل المنحة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                          اسم المنحة
                        </h4>
                        <p className="mobile-arabic-text">
                          {searchResult.scholarshipName}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                          الجامعة
                        </h4>
                        <p className="mobile-arabic-text">
                          {searchResult.university}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                          تاريخ التقديم
                        </h4>
                        <p>
                          {searchResult.submissionDate
                            ? formatDate(searchResult.submissionDate)
                            : "لم يتم التقديم بعد"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                          التاريخ المتوقع للرد
                        </h4>
                        <p>{formatDate(searchResult.expectedResponseDate)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      الحالة الحالية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <span className="font-semibold text-blue-800">
                          {searchResult.currentStep}
                        </span>
                      </div>
                      <p className="text-sm text-blue-700">
                        {searchResult.statusInfo?.description ||
                          "جاري العمل على طلبك"}
                      </p>
                    </div>

                    {searchResult.notes && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          ملاحظات إضافية
                        </h4>
                        <p className="text-sm text-muted-foreground mobile-arabic-text">
                          {searchResult.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Documents Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-purple-500" />
                      حالة المستندات
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">السيرة الذاتية</span>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(searchResult.documents.cv)}
                          <span className="text-sm font-medium">
                            {searchResult.documents.cv}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">رسالة الدافع</span>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(
                            searchResult.documents.motivationLetter,
                          )}
                          <span className="text-sm font-medium">
                            {searchResult.documents.motivationLetter}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">كشف الدرجات</span>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(searchResult.documents.transcripts)}
                          <span className="text-sm font-medium">
                            {searchResult.documents.transcripts}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">جواز السفر</span>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(searchResult.documents.passport)}
                          <span className="text-sm font-medium">
                            {searchResult.documents.passport}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between md:col-span-2">
                        <span className="text-sm">��هادة اللغة</span>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(searchResult.documents.languageCert)}
                          <span className="text-sm font-medium">
                            {searchResult.documents.languageCert}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-500" />
                      مراحل العمل
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {searchResult.timeline &&
                      searchResult.timeline.length > 0 ? (
                        searchResult.timeline.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              {index < searchResult.timeline.length - 1 && (
                                <div className="w-px h-8 bg-gray-200 mt-2"></div>
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">
                                  {item.status}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(item.date)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mobile-arabic-text">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          لا توج�� مراحل محفوظة بعد
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-green-500" />
                      بيانات التواصل
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{searchResult.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        رقم التتبع: {searchResult.id}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      الخطوات التالية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {searchResult.nextSteps &&
                      searchResult.nextSteps.length > 0 ? (
                        searchResult.nextSteps.map((step, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-sm mobile-arabic-text">
                              {step}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-center py-4">
                          لا توجد خطوات محددة بعد
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Support */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">تحتاج مساعدة؟</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      فريقنا جاهز لمساعدتك
                    </p>
                    <div className="space-y-2">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          <MessageCircle className="w-4 h-4 ml-2" />
                          واتساب
                        </Button>
                      </a>
                      <Button variant="outline" className="w-full">
                        <Phone className="w-4 h-4 ml-2" />
                        اتصال مباشر
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How to Use Section */}
      {!searched && (
        <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                🤔 كيفية استخدام نظام التتبع
              </h2>
              <p className="text-lg text-muted-foreground">
                خطوات بسيطة لمتابعة حالة طلبك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="font-bold mb-2">1. أدخل بيانا��ك</h3>
                  <p className="text-sm text-muted-foreground">
                    أ��خل بريدك الإلكتروني أو رقم التتبع الذي تم إرساله لك
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-bold mb-2">2. ابحث عن طلبك</h3>
                  <p className="text-sm text-muted-foreground">
                    انقر على زر البحث لعرض تفاصيل حالة طلبك
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-500" />
                  </div>
                  <h3 className="font-bold mb-2">3. تابع التقدم</h3>
                  <p className="text-sm text-muted-foreground">
                    شاهد تفاصيل حالة طلبك و��لخطوات التالية المطلوبة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            💪 نحن معك في كل خطوة
          </h2>
          <p className="text-xl mb-8 opacity-90">
            فريقنا المتخصص يعمل بجد لضمان نجاح طلبك. تابع معنا رحلتك نحو حلمك
            الأكاديمي!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                تواصل معنا الآن
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ExternalLink className="w-5 h-5 ml-2" />
              تصفح المنح المتاحة
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
