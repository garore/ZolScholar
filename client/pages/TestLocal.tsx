import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { getApplications, searchApplication, addApplication, generateTrackingId } from "@/lib/localDB";

export default function TestLocal() {
  const [testResult, setTestResult] = useState<string>("");

  const runTest = () => {
    let results = "🧪 اختبار النظام المحلي:\n\n";

    try {
      // Test 1: جلب البيانات
      const apps = getApplications();
      results += `1️⃣ جلب البيانات: ✅ وُجد ${apps.length} طلب\n`;

      // Test 2: البحث عن طلب موجود
      const search1 = searchApplication("ahmed.mohamed@email.com");
      results += `2️⃣ البحث ��ن ahmed.mohamed@email.com: ${search1 ? "✅ موجود" : "❌ غير موجود"}\n`;

      // Test 3: البحث برقم التتبع
      const search2 = searchApplication("TRK001");
      results += `3️⃣ البحث عن TRK001: ${search2 ? "✅ موجود" : "❌ غير موجود"}\n`;

      // Test 4: إضافة طلب جديد
      const newApp = {
        id: generateTrackingId(),
        email: `test${Date.now()}@example.com`,
        phone: "+249999999999",
        studentName: "طلب تجريبي",
        scholarshipName: "منحة تجريبية",
        university: "جامعة تجريبية",
        submissionDate: null,
        status: "لم يتم التقديم",
        statusCode: "not_submitted" as const,
        progress: 20,
        currentStep: "بدء العمل",
        documents: {
          cv: "غير مبدوء",
          motivationLetter: "غير مبدوء",
          transcripts: "غير مبدوء",
          passport: "غير مبدوء",
          languageCert: "غير مبدوء"
        },
        timeline: [{
          date: new Date().toISOString().split("T")[0],
          status: "بدء العمل",
          description: "تم إنشاء الطلب للاختبار"
        }],
        nextSteps: ["البدء في إعداد المستندات"],
        notes: "طلب تجريبي للاختبار",
        expectedResponseDate: "2025-06-01"
      };

      const addResult = addApplication(newApp);
      results += `4️⃣ إضافة طلب جديد: ${addResult ? "✅ نجح" : "❌ فشل"}\n`;
      
      if (addResult) {
        results += `   📧 البريد: ${newApp.email}\n`;
        results += `   🆔 رقم التتبع: ${newApp.id}\n`;

        // Test 5: البحث عن الطلب الجديد
        const search3 = searchApplication(newApp.email);
        results += `5️⃣ البحث عن الطلب الجديد: ${search3 ? "✅ موجود" : "❌ غير موجود"}\n`;
      }

      // Test 6: عرض العدد النهائي
      const finalApps = getApplications();
      results += `6️⃣ العدد النهائي: ${finalApps.length} طلب\n`;

      results += "\n✅ جميع الاختبارات مكتملة!";

    } catch (error) {
      results += `\n❌ خطأ في الاختبار: ${error}`;
    }

    setTestResult(results);
  };

  const clearData = () => {
    localStorage.removeItem("zol_scholar_applications");
    setTestResult("🗑️ تم مسح جميع البيانات المحلية");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">🧪 اختبار النظام المحلي</h1>
        
        <div className="flex gap-4 mb-6">
          <button
            onClick={runTest}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            🚀 تشغيل الاختبار
          </button>
          
          <button
            onClick={clearData}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            🗑️ مسح البيانات
          </button>
        </div>

        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line">
          {testResult || "انقر على 'تشغيل الاختبار' لبدء الفحص..."}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2">ℹ️ معلومات النظام:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>يستخدم localStorage للحفظ المحلي</li>
            <li>البيانات تبقى حتى لو تم إغلاق المتصفح</li>
            <li>لا يعتمد على اتصال الإنترنت</li>
            <li>يعمل على جميع الأجهزة والمتصفحات</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
