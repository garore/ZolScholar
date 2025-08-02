import React, { useState } from "react";
import Navigation from "@/components/Navigation";

export default function TestAPI() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addTestResult = (message: string) => {
    setTestResults((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testTracking = async () => {
    setLoading(true);
    addTestResult("🧪 بدء اختبار API التتبع...");

    try {
      // Test 1: Search existing application
      addTestResult("1️⃣ اختبار البحث عن TRK001...");
      const searchResponse = await fetch("/api/tracking/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "TRK001" }),
      });
      const searchData = await searchResponse.json();
      addTestResult(
        `نتيجة البحث: ${searchData.success ? "✅ نجح" : "❌ فشل"} - ${searchData.message}`,
      );

      // Test 2: Get all applications
      addTestResult("2️⃣ اختبار جلب جميع الطلبات...");
      const allResponse = await fetch("/api/tracking/all");
      const allData = await allResponse.json();
      addTestResult(
        `جلب البيانات: ${allData.success ? "✅ نجح" : "❌ فشل"} - العدد: ${allData.count || 0}`,
      );

      // Test 3: Add new application
      addTestResult("3️⃣ اختبار إضافة طلب جديد...");
      const newApp = {
        id: "TEST" + Date.now(),
        email: "test" + Date.now() + "@example.com",
        phone: "+249" + Math.floor(Math.random() * 1000000000),
        studentName: "اختبار API",
        scholarshipName: "منحة تجريبية",
        university: "جامعة تجريبية",
        submissionDate: null,
        status: "لم يتم التقديم",
        statusCode: "not_submitted",
        progress: 20,
        currentStep: "بدء العمل",
        documents: {
          cv: "غير مب��وء",
          motivationLetter: "غير مبدوء",
          transcripts: "غير مبدوء",
          passport: "غير مبدوء",
          languageCert: "غير مبدوء",
        },
        timeline: [
          {
            date: new Date().toISOString().split("T")[0],
            status: "بدء العمل",
            description: "تم إنشاء الطلب من اختبار API",
          },
        ],
        nextSteps: ["البدء في إعداد المستندات"],
        expectedResponseDate: "2025-06-01",
        notes: "طلب تجريبي من اختبار API",
      };

      const addResponse = await fetch("/api/tracking/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp),
      });
      const addData = await addResponse.json();
      addTestResult(
        `إضافة طلب: ${addData.success ? "✅ نجح" : "❌ فشل"} - ${addData.message}`,
      );

      if (addData.success) {
        // Test 4: Search for the newly added application
        addTestResult("4️⃣ اختبار البحث عن الطلب الجديد...");
        const newSearchResponse = await fetch("/api/tracking/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: newApp.email }),
        });
        const newSearchData = await newSearchResponse.json();
        addTestResult(
          `البحث عن الطلب الجديد: ${newSearchData.success ? "✅ نجح" : "❌ فشل"}`,
        );
      }
    } catch (error) {
      addTestResult(`❌ خطأ في الاختبار: ${error}`);
    }

    setLoading(false);
    addTestResult("🏁 انتهى الاختبار");
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🧪 اختبار API التتبع</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={testTracking}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "جاري الاختبار..." : "🚀 تشغيل الاختبار"}
          </button>

          <button
            onClick={clearResults}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
          >
            🗑️ مسح النتائج
          </button>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
          <div className="mb-2 text-white">📊 نتائج الاختبار:</div>
          {testResults.length === 0 ? (
            <div className="text-gray-500">
              انقر على "تشغيل الاختبار" لبدء الفحص...
            </div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2">📋 ما يتم اختباره:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>البحث عن طلب موجود (TRK001)</li>
            <li>جلب جميع الطلبات من قاعدة البيانات</li>
            <li>إضافة طلب جديد</li>
            <li>البحث عن الطلب المضاف للتأكد من حفظه</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
