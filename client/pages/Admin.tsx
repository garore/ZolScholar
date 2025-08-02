import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Search,
  Eye,
  RefreshCw,
  Save,
  X,
} from "lucide-react";

interface Application {
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
  notes: string;
  expectedResponseDate: string;
}

export default function Admin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // New application form state
  const [newApp, setNewApp] = useState({
    email: "",
    phone: "",
    studentName: "",
    scholarshipName: "",
    university: "",
    statusCode: "not_submitted",
    currentStep: "بدء العمل",
    notes: "",
    expectedResponseDate: "",
  });

  const statusOptions = {
    ready: { label: "جاهز", icon: "✅", color: "bg-green-500" },
    in_progress: { label: "قيد التجهيز", icon: "⏳", color: "bg-blue-500" },
    submitted: { label: "تم التقديم", icon: "✅", color: "bg-purple-500" },
    not_submitted: { label: "لم يتم التقديم", icon: "❌", color: "bg-red-500" },
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tracking/all");
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateTrackingId = () => {
    return "TRK" + String(Date.now()).slice(-6);
  };

  const handleAddApplication = async () => {
    if (!newApp.email || !newApp.studentName || !newApp.scholarshipName) {
      alert("يرجى ملء الحقول المطلوبة");
      return;
    }

    const trackingId = generateTrackingId();
    const currentDate = new Date().toISOString().split("T")[0];

    const application: Application = {
      id: trackingId,
      email: newApp.email,
      phone: newApp.phone,
      studentName: newApp.studentName,
      scholarshipName: newApp.scholarshipName,
      university: newApp.university,
      submissionDate: null,
      status: statusOptions[newApp.statusCode as keyof typeof statusOptions].label,
      statusCode: newApp.statusCode,
      progress: newApp.statusCode === "ready" ? 100 : 20,
      currentStep: newApp.currentStep,
      documents: {
        cv: "غير مبدوء",
        motivationLetter: "غير مبدوء",
        transcripts: "غير مبدوء",
        passport: "غير مبدوء",
        languageCert: "غير مبدوء",
      },
      notes: newApp.notes,
      expectedResponseDate: newApp.expectedResponseDate || "2025-06-01",
    };

    try {
      // هنا يمكن إضافة API call لحفظ البيانات
      setApplications([...applications, application]);
      setShowAddForm(false);
      setNewApp({
        email: "",
        phone: "",
        studentName: "",
        scholarshipName: "",
        university: "",
        statusCode: "not_submitted",
        currentStep: "بدء العمل",
        notes: "",
        expectedResponseDate: "",
      });
      alert(`تم إنشاء الطلب بنجاح! رقم التتبع: ${trackingId}`);
    } catch (error) {
      alert("حدث خطأ في إضافة الطلب");
    }
  };

  const handleUpdateStatus = (appId: string, newStatus: string, newProgress: number) => {
    setApplications(applications.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            statusCode: newStatus,
            status: statusOptions[newStatus as keyof typeof statusOptions].label,
            progress: newProgress,
            submissionDate: newStatus === "submitted" ? new Date().toISOString().split("T")[0] : app.submissionDate
          }
        : app
    ));
  };

  const handleDeleteApplication = (appId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      setApplications(applications.filter(app => app.id !== appId));
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || app.statusCode === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ["رقم التتبع", "اسم الطالب", "البريد الإلكتروني", "ا��هاتف", "المنحة", "الحالة", "التقدم"];
    const csvContent = [
      headers.join(","),
      ...applications.map(app => [
        app.id,
        app.studentName,
        app.email,
        app.phone,
        app.scholarshipName,
        app.status,
        `${app.progress}%`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `applications_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n");
      const headers = lines[0].split(",");
      
      // تحويل CSV إلى طلبات
      const newApplications = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(",");
        const trackingId = values[0] || generateTrackingId();
        
        return {
          id: trackingId,
          studentName: values[1] || "",
          email: values[2] || "",
          phone: values[3] || "",
          scholarshipName: values[4] || "",
          university: values[5] || "غير محدد",
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
          notes: values[6] || "",
          expectedResponseDate: "2025-06-01",
        };
      });

      setApplications([...applications, ...newApplications]);
      alert(`تم إضافة ${newApplications.length} طلب جديد`);
    };
    
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-muted-foreground">جاري تحميل البيانات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="لوحة التحكم الإدارية - حلم زول بسيط"
        description="إدارة طلبات العملاء وتتبع حالة المنح الدراسية"
      />
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              🛠️ لوحة التحكم الإدارية
            </h1>
            <p className="text-xl text-muted-foreground">
              إدارة طلبات العملاء وتتبع حالة المنح الدراسية
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة عميل جديد
            </Button>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="w-4 h-4 ml-2" />
              تصدير Excel
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="w-4 h-4 ml-2" />
                  رفع ملف
                </span>
              </Button>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{applications.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الطلبات</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {applications.filter(app => app.statusCode === "ready").length}
              </div>
              <div className="text-sm text-muted-foreground">جاهز</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {applications.filter(app => app.statusCode === "in_progress").length}
              </div>
              <div className="text-sm text-muted-foreground">قيد التجهيز</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {applications.filter(app => app.statusCode === "not_submitted").length}
              </div>
              <div className="text-sm text-muted-foreground">لم يتم التقديم</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="بحث بالاسم، رقم التتبع، البريد، أو الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="all">جميع الحالات</option>
                <option value="ready">جاهز</option>
                <option value="in_progress">قيد التجهيز</option>
                <option value="submitted">تم التقديم</option>
                <option value="not_submitted">لم يتم التقديم</option>
              </select>
              <Button onClick={fetchApplications} variant="outline">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              قائمة الطلبات ({filteredApplications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-3">رقم التتبع</th>
                    <th className="text-right p-3">اسم الطالب</th>
                    <th className="text-right p-3">البريد/الهاتف</th>
                    <th className="text-right p-3">المنحة</th>
                    <th className="text-right p-3">الحالة</th>
                    <th className="text-right p-3">التقدم</th>
                    <th className="text-right p-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono">{app.id}</td>
                      <td className="p-3 font-semibold">{app.studentName}</td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div>{app.email}</div>
                          {app.phone && <div className="text-muted-foreground">{app.phone}</div>}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="text-sm">
                          <div className="font-medium">{app.scholarshipName}</div>
                          <div className="text-muted-foreground">{app.university}</div>
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={app.statusCode}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            const newProgress = newStatus === "ready" ? 100 : 
                                              newStatus === "submitted" ? 100 :
                                              newStatus === "in_progress" ? 60 : 20;
                            handleUpdateStatus(app.id, newStatus, newProgress);
                          }}
                          className="px-2 py-1 border rounded text-sm"
                        >
                          {Object.entries(statusOptions).map(([key, option]) => (
                            <option key={key} value={key}>
                              {option.icon} {option.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${app.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{app.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingApp(app)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteApplication(app.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Application Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  إضافة عميل جديد
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAddForm(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      اسم الطالب *
                    </label>
                    <Input
                      value={newApp.studentName}
                      onChange={(e) => setNewApp({...newApp, studentName: e.target.value})}
                      placeholder="أدخل اسم الطالب"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      البريد الإلكتروني *
                    </label>
                    <Input
                      type="email"
                      value={newApp.email}
                      onChange={(e) => setNewApp({...newApp, email: e.target.value})}
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      رقم الهاتف
                    </label>
                    <Input
                      value={newApp.phone}
                      onChange={(e) => setNewApp({...newApp, phone: e.target.value})}
                      placeholder="+249123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      المنحة الدراسية *
                    </label>
                    <Input
                      value={newApp.scholarshipName}
                      onChange={(e) => setNewApp({...newApp, scholarshipName: e.target.value})}
                      placeholder="اسم المنحة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      الجامعة
                    </label>
                    <Input
                      value={newApp.university}
                      onChange={(e) => setNewApp({...newApp, university: e.target.value})}
                      placeholder="اسم الجامعة"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      الحالة الأولية
                    </label>
                    <select
                      value={newApp.statusCode}
                      onChange={(e) => setNewApp({...newApp, statusCode: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      {Object.entries(statusOptions).map(([key, option]) => (
                        <option key={key} value={key}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    ملاحظات
                  </label>
                  <Textarea
                    value={newApp.notes}
                    onChange={(e) => setNewApp({...newApp, notes: e.target.value})}
                    placeholder="أي ملاحظات إضافية..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAddApplication} className="flex-1">
                    <Save className="w-4 h-4 ml-2" />
                    حفظ العميل
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CSV Template Instructions */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-500" />
              إرشادات رفع ملف Excel/CSV
            </h3>
            <div className="text-sm space-y-2">
              <p className="font-medium">تنسيق الملف المطلوب:</p>
              <div className="bg-white p-3 rounded border font-mono text-xs">
                رقم التتبع,اسم الطالب,البريد الإلكتروني,رقم الهاتف,اسم المنحة,الجامعة,ملاحظات<br />
                TRK001,أحمد محمد,ahmed@email.com,+249123456789,منحة تركيا,جامعة إسطنبول,عميل جديد
              </div>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>أترك رقم التتبع فارغاً لتوليد رقم تلقائياً</li>
                <li>الحقول المطلوبة: اسم الطالب، البريد الإلكتروني، اسم المنحة</li>
                <li>يمكن رفع ملفات .csv أو .xlsx</li>
                <li>الحالة الأولية ستكون "لم يتم التقديم"</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
