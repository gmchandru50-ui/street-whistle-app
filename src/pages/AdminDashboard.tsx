import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, MessageSquare, LogOut, Check, X, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Vendor {
  id: string;
  vendor_name: string;
  phone: string;
  category: string;
  primary_area: string;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
}

interface Feedback {
  id: string;
  customer_name: string;
  customer_email: string;
  feedback_type: string;
  message: string;
  rating: number;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
    fetchVendors();
    fetchFeedback();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/admin-login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVendors(data);
    }
    setIsLoading(false);
  };

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("customer_feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setFeedback(data as Feedback[]);
    }
  };

  const handleApproval = async (vendorId: string, approved: boolean) => {
    const { error } = await supabase
      .from("vendors")
      .update({ is_approved: approved })
      .eq("id", vendorId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive",
      });
    } else {
      toast({
        title: approved ? "Vendor Approved" : "Vendor Rejected",
        description: `Vendor has been ${approved ? "approved" : "rejected"} successfully`,
      });
      fetchVendors();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-purple-500/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage vendors and feedback</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Vendors
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Vendors ({vendors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center text-muted-foreground">Loading...</p>
                ) : vendors.length === 0 ? (
                  <p className="text-center text-muted-foreground">No vendors registered yet</p>
                ) : (
                  <div className="space-y-4">
                    {vendors.map((vendor) => (
                      <div
                        key={vendor.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/50 rounded-lg gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{vendor.vendor_name}</h3>
                            <Badge variant={vendor.is_approved ? "default" : "secondary"}>
                              {vendor.is_approved ? "Approved" : "Pending"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {vendor.category} • {vendor.primary_area}
                          </p>
                          <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          {!vendor.is_approved && (
                            <Button
                              size="sm"
                              onClick={() => handleApproval(vendor.id, true)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          )}
                          {vendor.is_approved && (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApproval(vendor.id, false)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4">
            <Card className="bg-card/80 backdrop-blur border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Customer Feedback ({feedback.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {feedback.length === 0 ? (
                  <p className="text-center text-muted-foreground">No feedback received yet</p>
                ) : (
                  <div className="space-y-4">
                    {feedback.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-muted/50 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{item.customer_name}</h3>
                            <p className="text-sm text-muted-foreground">{item.customer_email}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {item.rating && (
                              <>
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span className="text-sm font-medium">{item.rating}/5</span>
                              </>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline">{item.feedback_type}</Badge>
                        <p className="text-sm">{item.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
