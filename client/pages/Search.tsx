import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search as SearchIcon,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  MessageCircle,
  Star,
  ExternalLink,
  CheckCircle,
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

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedFunding, setSelectedFunding] = useState("");
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
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
      const data = await response.json();

      if (data.success) {
        setScholarships(data.scholarships);
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

  // استخدام المنح من API
  const getFilteredScholarships = () => {
    let filtered = scholarships;

    // فلترة بالبحث النصي
    if (searchTerm) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scholarship.country
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.university
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          scholarship.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    // فلترة بالدولة
    if (selectedCountry && selectedCountry !== "جميع الدول") {
      filtered = filtered.filter(
        (scholarship) => scholarship.country === selectedCountry,
      );
    }

    // فلترة بالمستوى
    if (selectedLevel && selectedLevel !== "جميع المستويات") {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.level.includes(selectedLevel) ||
          scholarship.level === "جميع المستويات",
      );
    }

    // فلترة بنوع التمويل
    if (selectedFunding && selectedFunding !== "نوع التمويل") {
      filtered = filtered.filter((scholarship) =>
        scholarship.funding.includes(selectedFunding),
      );
    }

    return filtered;
  };

  const filteredScholarships = getFilteredScholarships();

  // الحصول على قائمة الدول المتاحة
  const availableCountries = Array.from(
    new Set(scholarships.map((s) => s.country)),
  ).sort();

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
            <Button onClick={fetchScholarships}>إعادة المحاولة</Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            البحث عن المنح الدراسية
          </h1>
          <p className="text-xl text-muted-foreground">
            ابحث عن المنحة المناسبة لك من بين مئات الفرص المتاحة
          </p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              فلاتر البحث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <SearchIcon className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن منحة..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-input rounded-md bg-background"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">جميع الدول</option>
                {availableCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 border border-input rounded-md bg-background"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">جميع المستويات</option>
                <option value="بكالوريوس">بكالوريوس</option>
                <option value="ماجستير">ماجستير</option>
                <option value="دكتوراه">دكتوراه</option>
              </select>
              <select
                className="px-3 py-2 border border-input rounded-md bg-background"
                value={selectedFunding}
                onChange={(e) => setSelectedFunding(e.target.value)}
              >
                <option value="">نوع التمويل</option>
                <option value="ممولة بالكامل">ممول بالكامل</option>
                <option value="منحة جزئية">ممول جزئياً</option>
              </select>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("");
                  setSelectedLevel("");
                  setSelectedFunding("");
                }}
                variant="outline"
              >
                مسح الفلاتر
              </Button>
              <div className="text-sm text-muted-foreground">
                عُثر على {filteredScholarships.length} منحة
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship) => (
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
                      <MapPin className="w-3 h-3 ml-1" />
                      {scholarship.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed mobile-arabic-text">
                    {scholarship.description.substring(0, 120)}...
                  </p>

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
                      التفاصيل الكاملة
                      <ArrowRight className="w-4 h-4 mr-2" />
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                لم نجد منح مطابقة لبحثك
              </h3>
              <p className="text-muted-foreground mb-4">
                جرب تغيير معايير البحث أو التواصل معنا للمساعدة
              </p>
              <a
                href="https://wa.me/6285932416084"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <MessageCircle className="w-4 h-4 ml-2" />
                  تحدث مع خبير
                </Button>
              </a>
            </div>
          )}
        </div>

        {filteredScholarships.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-2">
                تحتاج مساعدة في اختيار المنحة المناسبة؟
              </h3>
              <p className="text-muted-foreground mb-4">
                تحدث مع خبرائنا للحصول على توصيات مخصصة لملفك الأكاديمي
              </p>
              <a
                href="https://wa.me/6285932416084"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="whatsapp-button">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  احصل على استشارة مجانية
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
