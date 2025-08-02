import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getApplications, addApplication, searchApplication, generateTrackingId } from "@/lib/localDB";

export default function TestLocalStorage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const apps = getApplications();
      setApplications(apps);
      addLog(`✅ تم تحميل ${apps.length} طلب من localStorage`);
    } catch (error) {
      addLog(`❌ خطأ في تحميل البيانات: ${error}`);
    }
  };

  const addTestApplication = () => {
    const trackingId = generateTrackingId();
    const testApp = {
      id: trackingId,
      email: "test@example.com",
      phone: "+249999999999",
      studentName: "طالب تجريبي",
      scholarshipName: "منحة تجريبية",
      university: "جامعة تجريبية",
      submissionDate: null,
      status: "لم يتم التقديم",
      statusCode: "not_submitted",
      progress: 20,
      currentStep: "بدء العمل",
      documents: {
        cv: "غير مبدوء",
        motivationLetter: "غير مبدوء",
        transcripts: "غير مبدوء",
        passport: "غير مبدوء",
        languageCert: "غير مبدوء",
      },
      timeline: [{
        date: new Date().toISOString().split("T")[0],
        status: "إنشاء تجريبي",
        description: "تم إنشاء هذا الطلب لأغراض الاختبار"
      }],
      nextSteps: ["اختبار البحث"],
      notes: "هذا طلب تجريبي للاختبار",
      expectedResponseDate: "2025-06-01"
    };

    const success = addApplication(testApp);
    if (success) {
      addLog(`✅ تم إضافة طلب تجريبي برقم التتبع: ${trackingId}`);
      loadData();
    } else {
      addLog(`❌ فشل في إضافة الطلب التجريبي`);
    }
  };

  const testSearch = () => {
    if (!searchQuery.trim()) {
      addLog("❌ يرجى إدخال نص للبحث");
      return;
    }

    try {
      const result = searchApplication(searchQuery.trim());
      if (result) {
        setSearchResult(result);
        addLog(`✅ تم العثور على النتيجة: ${result.studentName} (${result.id})`);
      } else {
        setSearchResult(null);
        addLog(`❌ لم يتم العثور على نتائج للبحث: ${searchQuery}`);
      }
    } catch (error) {
      addLog(`❌ خطأ في البحث: ${error}`);
    }
  };

  const clearData = () => {
    localStorage.removeItem("zol_scholar_applications");
    setApplications([]);
    setSearchResult(null);
    addLog("🗑️ تم مسح جميع البيانات من localStorage");
  };

  const viewRawData = () => {
    const rawData = localStorage.getItem("zol_scholar_applications");
    addLog(`📄 البيانات الخام: ${rawData || "لا توجد بيانات"}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🧪 اختبار localStorage</h1>
          <p className="text-lg text-muted-foreground">
            صفحة لاختبار وظائف حفظ واسترجاع البيانات محلياً
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>عمليات البيانات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={loadData} className="w-full">
                🔄 إعادة تحميل البيانات
              </Button>
              <Button onClick={addTestApplication} className="w-full" variant="outline">
                ➕ إضافة طلب تجريبي
              </Button>
              <Button onClick={viewRawData} className="w-full" variant="outline">
                📄 عرض البيانات الخام
              </Button>
              <Button onClick={clearData} className="w-full" variant="destructive">
                🗑️ مسح جميع البيانات
              </Button>
            </CardContent>
          </Card>

          {/* Search Test */}
          <Card>
            <CardHeader>
              <CardTitle>اختبار البحث</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ادخل البريد أو رقم التتبع للبحث"
                  className="flex-1 px-3 py-2 border rounded"
                />
                <Button onClick={testSearch}>
                  🔍 بحث
                </Button>
              </div>
              
              {searchResult && (
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h3 className="font-bold text-green-800">✅ تم العثور على النتيجة:</h3>
                  <p><strong>الاسم:</strong> {searchResult.studentName}</p>
                  <p><strong>رقم التتبع:</strong> {searchResult.id}</p>
                  <p><strong>البريد:</strong> {searchResult.email}</p>
                  <p><strong>المنحة:</strong> {searchResult.scholarshipName}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Applications List */}
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المحفوظة ({applications.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  لا توجد طلبات محفوظة
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {applications.map((app, index) => (
                    <div key={app.id} className="bg-gray-50 p-3 rounded border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{app.studentName}</span>
                        <span className="text-sm text-muted-foreground">{app.id}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {app.email} • {app.scholarshipName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Log */}
          <Card>
            <CardHeader>
              <CardTitle>سجل العمليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-60 overflow-y-auto">
                {log.length === 0 ? (
                  <p>لا توجد عمليات بعد...</p>
                ) : (
                  log.map((entry, index) => (
                    <div key={index}>{entry}</div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Test Examples */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>أمثلة سريعة للاختبار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSearchQuery("ahmed.mohamed@email.com")}
              >
                ahmed.mohamed@email.com
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSearchQuery("TRK001")}
              >
                TRK001
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSearchQuery("test@example.com")}
              >
                test@example.com
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSearchQuery("+249123456789")}
              >
                +249123456789
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
