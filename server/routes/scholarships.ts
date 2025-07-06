import { Router } from "express";

const router = Router();

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

// المنح الدراسية المتاحة
const scholarships: Scholarship[] = [
  {
    id: "iraq-study-2024",
    title: "منحة Study in Iraq – الدراسة في العراق",
    country: "العراق",
    flag: "🇮���",
    university: "وزارة التعليم العالي والبحث العلمي العراقية",
    description:
      "منحة مقدمة من وزارة التعليم العالي والبحث العلمي العراقية للعام الأكاديمي 2024–2025. تشمل تمويلاً كاملاً أو جزئياً (تشمل الرسوم الدراسية، السكن، التأمين الصحي) لمرحلة البكالوريوس والماجستير والدكتوراه.",
    funding: "ممولة بالكامل / جزئياً",
    level: "بكالوريوس، ماجستير، دكتوراه",
    deadline: "متابعة الموقع لإعلان دورة 2025",
    requirements: [
      "البكالوريوس: معدلات قبول من 60–85% حسب التخصص",
      "البكالوريوس: حد عمر ≤33 سنة",
      "الدراسات العليا: معدلات من 65–75%",
      "الدراسات العليا: عمر ≤40–45 سنة حسب الدرجة",
    ],
    applicationSteps: [
      "الدخول إلى منصة وزارة العراق",
      "إنشاء حساب وتفعيل البريد الإلكتروني",
      "تعبئة البيانات الأكاديمية والشخصية",
      "رفع الوثائق المطلوبة (��هادة، عنوان، جواز)",
      "اختيار البرنامج والمنحة (كاملة أو نصف)",
      "تقديم الطلب إلكترونياً",
    ],
    documents: [
      "شهادة التخرج",
      "كشف درجات",
      "إثبات عنوان",
      "جواز السفر",
      "صورة شخصية",
    ],
    benefits: [
      "الرسوم الدراسية",
      "السكن الجامعي",
      "التأمين الصحي",
      "مصاريف المعيشة (للمنحة الكاملة)",
    ],
    applicationLink: "https://studyiniraq.scrd-gate.gov.iq",
    additionalLinks: [
      {
        name: "موقع وزارة الخارجية العراقية",
        url: "https://mofa.gov.iq",
      },
    ],
    isActive: true,
    createdAt: "2024-12-20",
  },
  {
    id: "ums-muhammadiyah-2024",
    title: "منحة جامعة المحمدية – Muhammadiyah Surakarta",
    country: "إندونيسيا",
    flag: "🇮🇩",
    university: "الجامعة المحمدية سوراكارتا (UMS)",
    description:
      "تقدم الجامعة المحمدية سوراكارتا (UMS) عدة منح لمرحلة البكالوريوس لمن هم من الكادر المحمدي أو ذوي الأد��ء الأكاديمي المرتفع أو في حالات المواهب والحفظ وغيرها.",
    funding: "دعم جزئي ومصاريف تعليمية",
    level: "بكالوريوس، ماجستير",
    deadline: "يناير–فبراير (دفعة أولى) ومايو–يونيو (دفعة ثانية)",
    requirements: [
      "نشاط في منظمة المحمدية",
      "معدلات دراسية ممتازة (أعلى النسب)",
      "أن يكون ضمن أفضل 5% للحصول على منحة BKAD",
      "التميز الأكاديمي أو المواهب الخاصة",
    ],
    applicationSteps: [
      "زيارة موقع pmb.ums.ac.id",
      "اختيار 'Beasiswa' ضمن طريقة التقديم",
      "إنشاء حساب جديد",
      "تعبئة البيانات المطلوبة",
      "رفع المستندات المطلوبة",
      "تقديم الطلب قبل الموعد النهائي",
    ],
    documents: [
      "توصية من المدرسة",
      "توصية من منظمة المحمدية",
      "إثبات الدخل",
      "صورة شخصية",
      "كشف درجات",
      "شهادة التخرج",
    ],
    benefits: [
      "دعم شهري ~Rp 400,000 (لمنحة BKAD)",
      "تغطية المصاريف التعليمية",
      "خصم 25% أو 50% حسب نوع المنحة",
      "دعم أكاديمي إضافي",
    ],
    applicationLink: "https://pmb.ums.ac.id",
    additionalLinks: [
      {
        name: "موقع المحمدية سولو",
        url: "https://muhammadiyahsolo.com",
      },
    ],
    isActive: true,
    createdAt: "2024-12-20",
  },
  {
    id: "psu-prince-sultan-2025",
    title: "منحة الأمير سلطان – Prince Sultan University",
    country: "السعودية",
    flag: "🤴",
    university: "جامعة الأمير سلطان (PSU)",
    description:
      "PSU تقدم منحاً دراسية لطلاب البكالوريوس من داخل السعودية وخارجها؛ تشمل تغطية 100% أو 50% أو 25% للرسوم الدراسية، مع مكافأة شهرية وسكن للمنحة الكاملة.",
    funding: "ممولة بالكامل أو جزئياً",
    level: "بكالوريوس",
    deadline: "15 يوليو 2025",
    requirements: [
      "حاصل على شهادة الثانوية العامة",
      "قبول في برنامج بكالوريوس في PSU",
      "سجل أكاديمي قوي ومتميز",
      "أنشطة قيادية أو تطوعية (مرغوب بها)",
      "إتقان اللغة الإنجليزية",
    ],
    applicationSteps: [
      "زيارة بوابة PSU Scholarship Portal",
      "النقر على 'Apply for Scholarship'",
      "إنشاء حساب جديد أو تسجيل الدخول",
      "تعبئة استمارة المنحة بالكامل",
      "رفع جميع المستندات المطلوبة",
      "كتابة رسالة الدوافع",
      "تقديم الطلب قبل الموعد النهائي",
    ],
    documents: [
      "استمارة منحة مكتملة",
      "الشهادة الرسمية + كشف درجات",
      "رسالة دوافع شخصية",
      "توصيتان أكاديميتان",
      "جواز السفر أو الهوية",
      "صورة شخصية حديثة",
    ],
    benefits: [
      "تغطية 100% أو 50% أو 25% للرسوم الدراسية",
      "مكافأة شهرية للمنحة الكاملة",
      "سكن جامعي مجاني",
      "تأمين صحي شامل",
      "دعم أكاديمي ومهني",
    ],
    applicationLink: "https://www.psu.edu.sa/scholarship-apply",
    additionalLinks: [
      {
        name: "بوابة vacancybridge للتقديم",
        url: "https://vacancybridge.com",
      },
    ],
    isActive: true,
    createdAt: "2024-12-20",
  },
];

// GET all scholarships
router.get("/", (req, res) => {
  const activeScholarships = scholarships.filter((s) => s.isActive);
  res.json({
    success: true,
    count: activeScholarships.length,
    scholarships: activeScholarships,
    motivationalMessage:
      "💪 لا تستسلم أبداً! كل خطوة تخطوها اليوم تقربك من حلمك. المنح الدراسية ليست مجرد أموال، بل هي بوابة لمستقبل أفضل وحياة مليئة بالإنجازات. ابدأ الآن واجعل حلمك حقيقة! 🌟",
  });
});

// GET scholarship by ID
router.get("/:id", (req, res) => {
  const scholarship = scholarships.find(
    (s) => s.id === req.params.id && s.isActive,
  );

  if (!scholarship) {
    return res.status(404).json({
      success: false,
      message: "المنحة غير موجودة",
    });
  }

  res.json({
    success: true,
    scholarship,
    motivationalMessage:
      "🚀 هذه فرصتك الذهبية! لا تدع الشك يوقفك، فأنت تستحق الأفضل. اقرأ التفاصيل جيداً وابدأ التحضير فوراً! 💎",
  });
});

// GET scholarships by country
router.get("/country/:country", (req, res) => {
  const countryScholarships = scholarships.filter(
    (s) =>
      s.country.toLowerCase().includes(req.params.country.toLowerCase()) &&
      s.isActive,
  );

  res.json({
    success: true,
    count: countryScholarships.length,
    country: req.params.country,
    scholarships: countryScholarships,
    motivationalMessage: `🎯 منح رائعة من ${req.params.country}! كل منحة هي فرصة جديدة لتغيير حياتك. اختر ما يناسبك وابدأ رحلتك نحو النجاح! ✨`,
  });
});

// GET scholarships by level
router.get("/level/:level", (req, res) => {
  const levelScholarships = scholarships.filter(
    (s) => s.level.includes(req.params.level) && s.isActive,
  );

  res.json({
    success: true,
    count: levelScholarships.length,
    level: req.params.level,
    scholarships: levelScholarships,
    motivationalMessage: `📚 منح ${req.params.level} في انتظارك! التعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم. ابدأ الآن! 🌟`,
  });
});

// Search scholarships
router.get("/search/:query", (req, res) => {
  const query = req.params.query.toLowerCase();
  const searchResults = scholarships.filter(
    (s) =>
      s.isActive &&
      (s.title.toLowerCase().includes(query) ||
        s.country.toLowerCase().includes(query) ||
        s.university.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.level.toLowerCase().includes(query)),
  );

  res.json({
    success: true,
    query: req.params.query,
    count: searchResults.length,
    scholarships: searchResults,
    motivationalMessage:
      searchResults.length > 0
        ? "🔍 وجدنا لك منح رائعة! اقرأ التفاصيل واختر ما يناسب أهدافك. النجاح ينتظرك! 💫"
        : "🤔 لم نجد نتائج مطابقة، لكن لا تيأس! جرب البحث بكلمات أخرى أو تصفح جميع المنح المتاحة. حلمك قريب! 💪",
  });
});

export default router;
