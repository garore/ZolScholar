// نظام قاعدة بيانات محلية للعملاء
export interface Application {
  id: string;
  email: string;
  phone: string;
  studentName: string;
  scholarshipName: string;
  university: string;
  submissionDate: string | null;
  status: string;
  statusCode: string;
  progress: number;
  currentStep: string;
  documents: {
    cv: string;
    motivationLetter: string;
    transcripts: string;
    passport: string;
    languageCert: string;
  };
  timeline: Array<{
    date: string;
    status: string;
    description: string;
  }>;
  nextSteps: string[];
  notes: string;
  expectedResponseDate: string;
}

const STORAGE_KEY = "zol_scholar_applications";

// بيانات افتراضية
const defaultApplications: Application[] = [
  {
    id: "TRK001",
    email: "ahmed.mohamed@email.com",
    phone: "+249123456789",
    studentName: "أحمد محمد علي",
    scholarshipName: "منحة Study in Iraq - الدراسة في العراق",
    university: "جامعة بغداد",
    submissionDate: "2024-12-15",
    status: "تم التقديم",
    statusCode: "submitted",
    progress: 100,
    currentStep: "انتظار رد الجامعة",
    documents: {
      cv: "جاهز",
      motivationLetter: "جاهز",
      transcripts: "جاهز",
      passport: "جاهز",
      languageCert: "جاهز"
    },
    timeline: [
      {
        date: "2024-12-10",
        status: "بدء العمل",
        description: "تم استلام الطلب وبدء العمل على إعداد المستندات"
      },
      {
        date: "2024-12-15",
        status: "تم التقديم",
        description: "تم تقديم الطلب بنجاح إلى الجامعة"
      }
    ],
    nextSteps: [
      "انتظار رد من الجامعة (15-30 يوم)",
      "متابعة حالة الطلب عبر موقع الجامعة"
    ],
    notes: "تم التقديم في الموعد المحدد. جميع المستندات مكتملة ومراجعة.",
    expectedResponseDate: "2025-01-15"
  },
  {
    id: "TRK002",
    email: "fatima.hassan@email.com",
    phone: "+249987654321",
    studentName: "فاطمة حسن أحمد",
    scholarshipName: "منحة جامعة المحمدية - إندونيسيا",
    university: "الجامعة المحمدية سوراكارتا",
    submissionDate: null,
    status: "قيد التجهيز",
    statusCode: "in_progress",
    progress: 65,
    currentStep: "إعداد رسالة الدافع",
    documents: {
      cv: "جاهز",
      motivationLetter: "قيد التجهيز",
      transcripts: "جاهز",
      passport: "جاهز",
      languageCert: "مطلوب"
    },
    timeline: [
      {
        date: "2024-12-18",
        status: "بدء العمل",
        description: "تم استلام الطلب وبدء العمل"
      }
    ],
    nextSteps: [
      "إنهاء رسالة الدافع",
      "الحصول على شهادة اللغة الإنجليزية"
    ],
    notes: "العمل متقدم بشكل جيد. يُتوقع إنهاء رسالة الدافع خلال يومين.",
    expectedResponseDate: "2025-02-10"
  }
];

// قراءة البيانات من localStorage
export const getApplications = (): Application[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // إذا لم توجد بيانات، احفظ البيانات الافتراضية
    saveApplications(defaultApplications);
    return defaultApplications;
  } catch (error) {
    console.error("Error reading applications:", error);
    return defaultApplications;
  }
};

// حفظ البيانات في localStorage
export const saveApplications = (applications: Application[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch (error) {
    console.error("Error saving applications:", error);
    return false;
  }
};

// البحث عن طلب
export const searchApplication = (query: string): Application | null => {
  const applications = getApplications();
  const searchQuery = query.trim().toLowerCase();
  
  return applications.find(app => 
    app.email.toLowerCase() === searchQuery ||
    app.id.toLowerCase() === searchQuery ||
    app.phone === query.trim()
  ) || null;
};

// إضافة طلب جديد
export const addApplication = (application: Application): boolean => {
  try {
    const applications = getApplications();
    
    // التحقق من عدم تكرار البريد
    const exists = applications.find(app => 
      app.email.toLowerCase() === application.email.toLowerCase()
    );
    
    if (exists) {
      return false; // البريد موجود مسبقاً
    }
    
    applications.push(application);
    return saveApplications(applications);
  } catch (error) {
    console.error("Error adding application:", error);
    return false;
  }
};

// تحديث طلب موجود
export const updateApplication = (id: string, updates: Partial<Application>): boolean => {
  try {
    const applications = getApplications();
    const index = applications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return false; // الطلب غير موجود
    }
    
    applications[index] = { ...applications[index], ...updates };
    return saveApplications(applications);
  } catch (error) {
    console.error("Error updating application:", error);
    return false;
  }
};

// حذف طلب
export const deleteApplication = (id: string): boolean => {
  try {
    const applications = getApplications();
    const filtered = applications.filter(app => app.id !== id);
    
    if (filtered.length === applications.length) {
      return false; // الطلب غير موجود
    }
    
    return saveApplications(filtered);
  } catch (error) {
    console.error("Error deleting application:", error);
    return false;
  }
};

// توليد رقم تتبع جديد
export const generateTrackingId = (): string => {
  return "TRK" + Date.now().toString().slice(-6);
};

// إحصائيات
export const getStats = () => {
  const applications = getApplications();
  return {
    total: applications.length,
    ready: applications.filter(app => app.statusCode === "ready").length,
    inProgress: applications.filter(app => app.statusCode === "in_progress").length,
    submitted: applications.filter(app => app.statusCode === "submitted").length,
    notSubmitted: applications.filter(app => app.statusCode === "not_submitted").length,
  };
};
