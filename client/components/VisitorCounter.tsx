import { useEffect, useState } from "react";
import { Users, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VisitorCountResponse } from "@shared/api";

export default function VisitorCounter() {
  const [visitorData, setVisitorData] = useState<VisitorCountResponse | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndGetVisitors = async () => {
      try {
        // Track this visit
        await fetch("/api/visitor", { method: "POST" });

        // Get current visitor count
        const response = await fetch("/api/visitors");
        if (response.ok) {
          const data: VisitorCountResponse = await response.json();
          setVisitorData(data);
        }
      } catch (error) {
        console.error("Failed to track visitor:", error);
      } finally {
        setLoading(false);
      }
    };

    trackAndGetVisitors();
  }, []);

  if (loading || !visitorData) {
    return null; // Don't show anything while loading
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-900">
                {visitorData.totalVisitors.toLocaleString("ar-EG")}
              </div>
              <div className="text-blue-600 text-xs">إجمالي الزوار</div>
            </div>
          </div>

          <div className="h-8 w-px bg-blue-200"></div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-center">
              <div className="font-bold text-green-900">
                {visitorData.todayVisitors.toLocaleString("ar-EG")}
              </div>
              <div className="text-green-600 text-xs">زوار اليوم</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
