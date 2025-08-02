import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

// قراءة بيانات التتبع من ملف JSON
const getTrackingData = () => {
  try {
    // البحث عن الملف في المسارات المختلفة
    const possiblePaths = [
      path.join(process.cwd(), "server/data/applications.json"),
      path.join(__dirname, "../data/applications.json"),
      path.join(process.cwd(), "data/applications.json"),
    ];

    let dataPath = "";
    for (const testPath of possiblePaths) {
      console.log(`Checking path: ${testPath}, exists: ${fs.existsSync(testPath)}`);
      if (fs.existsSync(testPath)) {
        dataPath = testPath;
        break;
      }
    }

    if (!dataPath) {
      console.error("applications.json not found in any expected location");
      console.error("Current working directory:", process.cwd());
      console.error("__dirname:", __dirname);
      return { applications: [], statusOptions: {} };
    }

    console.log(`Reading data from: ${dataPath}`);
    const data = fs.readFileSync(dataPath, "utf8");
    const parsedData = JSON.parse(data);
    console.log(`Found ${parsedData.applications?.length || 0} applications`);
    return parsedData;
  } catch (error) {
    console.error("Error reading tracking data:", error);
    return { applications: [], statusOptions: {} };
  }
};

// حفظ بيانات التتبع إلى ملف JSON
const saveTrackingData = (data: any) => {
  try {
    // البحث عن الملف في المسارات المختلفة
    const possiblePaths = [
      path.join(__dirname, "../data/applications.json"),
      path.join(process.cwd(), "server/data/applications.json"),
      path.join(process.cwd(), "data/applications.json"),
    ];

    let dataPath = "";
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        dataPath = testPath;
        break;
      }
    }

    if (!dataPath) {
      // إنشاء الملف في المسار الافتراضي
      dataPath = path.join(process.cwd(), "server/data/applications.json");
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving tracking data:", error);
    return false;
  }
};

// البحث عن ط��ب بالبريد الإلكتروني أو رقم التتبع
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

// إضافة طلب جديد
router.post("/add", (req, res) => {
  try {
    const data = getTrackingData();
    const newApplication = req.body;

    // التحقق من البيانات المطلوبة
    if (
      !newApplication.email ||
      !newApplication.studentName ||
      !newApplication.scholarshipName
    ) {
      return res.status(400).json({
        success: false,
        message: "البيانات المطلوبة مفقودة",
      });
    }

    // التحقق من عدم تكرار البريد الإلكتروني
    const existingApp = data.applications.find(
      (app: any) =>
        app.email.toLowerCase() === newApplication.email.toLowerCase(),
    );

    if (existingApp) {
      return res.status(400).json({
        success: false,
        message: "يوجد طلب مسجل بهذا البريد الإلكتروني بالفعل",
      });
    }

    // إضافة الطلب الجديد
    data.applications.push(newApplication);

    if (saveTrackingData(data)) {
      res.json({
        success: true,
        message: "تم إضافة الطلب بنجاح",
        application: newApplication,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "فشل في حفظ البيانات",
      });
    }
  } catch (error) {
    console.error("Error adding application:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في إضافة الطلب",
    });
  }
});

// تحديث طلب موجود
router.put("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const data = getTrackingData();

    const appIndex = data.applications.findIndex((app: any) => app.id === id);

    if (appIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود",
      });
    }

    // تحديث البيانات
    data.applications[appIndex] = {
      ...data.applications[appIndex],
      ...updatedData,
    };

    if (saveTrackingData(data)) {
      res.json({
        success: true,
        message: "تم تحديث الطلب بنجاح",
        application: data.applications[appIndex],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "فشل في حفظ التحديثات",
      });
    }
  } catch (error) {
    console.error("Error updating application:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في تحديث الطلب",
    });
  }
});

// حذف طلب
router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = getTrackingData();

    const appIndex = data.applications.findIndex((app: any) => app.id === id);

    if (appIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود",
      });
    }

    // حذف الطلب
    data.applications.splice(appIndex, 1);

    if (saveTrackingData(data)) {
      res.json({
        success: true,
        message: "تم حذف الطلب بنجاح",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "فشل في ح��ظ التغييرات",
      });
    }
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في حذف الطلب",
    });
  }
});

// البحث برقم الهاتف أيضاً
router.post("/search", (req, res) => {
  try {
    const { query } = req.body;

    console.log(`Search request received with query: "${query}"`);

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "يرجى إدخال البريد الإلكتروني، رقم التتبع، أو رقم الهاتف",
      });
    }

    const data = getTrackingData();
    console.log(`Data loaded with ${data.applications?.length || 0} applications`);

    const searchQuery = query.trim().toLowerCase();

    // البحث بالبريد الإلكتروني، رقم التتبع، أو رقم الهاتف
    const application = data.applications.find(
      (app: any) => {
        const emailMatch = app.email.toLowerCase() === searchQuery;
        const idMatch = app.id.toLowerCase() === searchQuery;
        const phoneMatch = app.phone === query.trim();

        console.log(`Checking app ${app.id}: email(${emailMatch}), id(${idMatch}), phone(${phoneMatch})`);

        return emailMatch || idMatch || phoneMatch;
      }
    );

    if (!application) {
      return res.json({
        success: false,
        message:
          "لم يتم العثور على طلب بهذا البريد الإلكتروني، رقم التتبع، أو رقم الهاتف",
        suggestions: [
          "تأكد من صحة البريد الإ��كتروني",
          "تأكد من رقم التتبع",
          "تأكد من رقم الهاتف",
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
      message: `تم العثور على طلب ${application.studentName}`,
    });
  } catch (error) {
    console.error("Error in tracking search:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في البحث. يرجى المحاولة مرة أخرى.",
    });
  }
});

export default router;
