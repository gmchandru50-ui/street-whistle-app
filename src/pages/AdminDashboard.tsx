import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ShoppingCart, AlertCircle, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

  const pendingVendors = [
    { id: 1, name: "Suresh Kumar", type: "Vegetables", area: "Indiranagar", date: "2 hours ago" },
    { id: 2, name: "Anita Devi", type: "Flowers", area: "Koramangala", date: "5 hours ago" },
  ];

  const activeVendors = [
    { id: 1, name: "Ravi's Vegetables", rating: 4.5, orders: 234, status: "online" },
    { id: 2, name: "Kumar's Service", rating: 4.8, orders: 189, status: "offline" },
    { id: 3, name: "Lakshmi Flowers", rating: 4.6, orders: 156, status: "online" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">{t.adminDashboard}</h1>
              <p className="text-xs text-muted-foreground">{t.systemManagement}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button variant="outline" onClick={() => navigate('/')}>
              <LogOut className="mr-2 h-4 w-4" />
              {t.logout}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t.totalVendorsCount}</CardTitle>
              <ShoppingCart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 {t.pendingApprovalCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t.activeCustomersCount}</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">487</div>
              <p className="text-xs text-muted-foreground">+32 {t.thisWeek}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t.alertsSent}</CardTitle>
              <AlertCircle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">{t.today}: 89</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{t.avgRating}</CardTitle>
              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">{t.fromReviews.replace('{count}', '892')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="pending">{t.pendingApprovals}</TabsTrigger>
            <TabsTrigger value="vendors">{t.vendors}</TabsTrigger>
            <TabsTrigger value="feedback">{t.feedback}</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.pendingVendorApprovals}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {vendor.type} • {vendor.area} • {vendor.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          {t.approve}
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="mr-1 h-4 w-4" />
                          {t.reject}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.activeVendorsList}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeVendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{vendor.name}</p>
                          <Badge variant={vendor.status === "online" ? "default" : "secondary"}>
                            {vendor.status === "online" ? `🟢 ${t.online}` : `⚫ ${t.offline}`}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t.rating}: {vendor.rating} ⭐ • {vendor.orders} {t.totalAlerts}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        {t.viewDetails}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.recentFeedback}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{t.greatService}</p>
                        <p className="text-sm text-muted-foreground">{t.from}: Priya M. • {t.about}: Ravi's Vegetables</p>
                      </div>
                      <Badge>⭐ 5.0</Badge>
                    </div>
                    <p className="text-sm">{t.vendorOnTime}</p>
                  </div>
                  <div className="p-4 border rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{t.couldImprove}</p>
                        <p className="text-sm text-muted-foreground">{t.from}: Amit K. • {t.about}: Lakshmi Flowers</p>
                      </div>
                      <Badge variant="secondary">⭐ 3.0</Badge>
                    </div>
                    <p className="text-sm">{t.qualityGood}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
