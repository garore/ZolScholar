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

  // استخدام قاعدة البيانات الشاملة
  const getFilteredScholarships = () => {
    let filtered = scholarshipsDatabase;

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
          scholarship.subjects.some((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
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
    new Set(scholarshipsDatabase.map((s) => s.country)),
  ).sort();
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
                <option value="بكالوريوس">بكالوريو��</option>
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
                className="scholarship-card group hover:scale-105 transition-transform"
              >
                <CardHeader>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={scholarship.image}
                      alt={scholarship.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={scholarship.badgeColor}>
                      {scholarship.country}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 ml-1" />
                        {scholarship.deadline}
                      </div>
                      <div className="flex items-center text-green-600">
                        <Star className="w-4 h-4 ml-1" />
                        {scholarship.successRate}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <DollarSign className="w-4 h-4 ml-1" />
                      {scholarship.funding}
                    </div>
                    <div className="flex items-center text-blue-600">
                      <MapPin className="w-4 h-4 ml-1" />
                      {scholarship.level}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {scholarship.description.slice(0, 120)}...
                  </p>
                  <div className="flex gap-2">
                    <Link
                      to={`/scholarship/${scholarship.id}`}
                      className="flex-1"
                    >
                      <Button className="w-full">
                        عرض التفاصيل
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                    <a
                      href="https://wa.me/6285932416084"
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
