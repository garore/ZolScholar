import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// قراءة بيانات التتبع من ملف JSON
const getTrackingData = () => {
  try {
    const dataPath = path.join(__dirname, "../data/applications.json");
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading tracking data:", error);
    return { applications: [], statusOptions: {} };
  }
};

// البحث عن طلب بالبريد الإلكتروني أو رقم التتبع
router.post("/search", (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "يرجى إدخال البريد الإلكتروني أو رقم التتبع",
      });
    }

    const data = getTrackingData();
    const searchQuery = query.trim().toLowerCase();

    // البحث بالبريد الإلكتروني أو رقم التتبع
    const application = data.applications.find(
      (app: any) =>
        app.email.toLowerCase() === searchQuery ||
        app.id.toLowerCase() === searchQuery,
    );

    if (!application) {
      return res.json({
        success: false,
        message: "لم يتم العثور على طلب بهذا البريد الإلكتروني أو رقم التتبع",
        suggestions: [
          "تأكد من صحة البريد الإلكتروني",
          "تأكد من رقم التتبع",
          "تواصل معنا إذا كنت تواجه مشكلة",
        ],
      });
    }

    // إضافة تفاصيل الحالة
    const statusInfo = data.statusOptions[application.statusCode] || {
      label: application.status,
      icon: "❓",
      color: "gray",
      description: "حالة غير معروفة",
    };

    res.json({
      success: true,
      application: {
        ...application,
        statusInfo,
      },
      message: `تم العثور على ��لب ${application.studentName}`,
    });
  } catch (error) {
    console.error("Error in tracking search:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في البحث. يرجى المحاولة مرة أخرى.",
    });
  }
});

// الحصول على إحصائيات عامة (اختياري)
router.get("/stats", (req, res) => {
  try {
    const data = getTrackingData();
    const applications = data.applications;

    const stats = {
      total: applications.length,
      ready: applications.filter((app: any) => app.statusCode === "ready")
        .length,
      inProgress: applications.filter(
        (app: any) => app.statusCode === "in_progress",
      ).length,
      submitted: applications.filter(
        (app: any) => app.statusCode === "submitted",
      ).length,
      notSubmitted: applications.filter(
        (app: any) => app.statusCode === "not_submitted",
      ).length,
    };

    res.json({
      success: true,
      stats,
      statusOptions: data.statusOptions,
    });
  } catch (error) {
    console.error("Error getting stats:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في جلب الإحصائيات",
    });
  }
});

// الحصول على جميع الطلبات (للإدارة فقط)
router.get("/all", (req, res) => {
  try {
    const data = getTrackingData();

    // إضافة معلومات الحالة لكل طلب
    const applicationsWithStatus = data.applications.map((app: any) => ({
      ...app,
      statusInfo: data.statusOptions[app.statusCode] || {
        label: app.status,
        icon: "❓",
        color: "gray",
        description: "حالة غير معروفة",
      },
    }));

    res.json({
      success: true,
      applications: applicationsWithStatus,
      count: applicationsWithStatus.length,
    });
  } catch (error) {
    console.error("Error getting all applications:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في جلب البيانات",
    });
  }
});

export default router;
