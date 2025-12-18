import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, LogOut, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface VendorData {
  id: string;
  vendor_name: string;
  phone: string;
  category: string;
  primary_area: string;
  description: string;
  is_approved: boolean;
  is_active: boolean;
  rating: number;
}

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/vendor-login");
      return;
    }

    const { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !data) {
      toast({
        title: "Error",
        description: "Could not fetch vendor data",
        variant: "destructive",
      });
      navigate("/vendor-login");
      return;
    }

    setVendor(data);
    setIsLoading(false);

    // Check if already tracking
    const { data: locationData } = await supabase
      .from("vendor_locations")
      .select("is_active")
      .eq("vendor_id", data.id)
      .maybeSingle();

    if (locationData?.is_active) {
      setIsTracking(true);
    }
  };

  const toggleTracking = async () => {
    if (!vendor) return;

    if (isTracking) {
      // Stop tracking
      await supabase
        .from("vendor_locations")
        .update({ is_active: false })
        .eq("vendor_id", vendor.id);
      
      setIsTracking(false);
      toast({
        title: "Tracking Stopped",
        description: "Your location is no longer visible to customers",
      });
    } else {
      // Start tracking
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Upsert location
            const { error } = await supabase
              .from("vendor_locations")
              .upsert({
                vendor_id: vendor.id,
                vendor_name: vendor.vendor_name,
                latitude,
                longitude,
                is_active: true,
                last_updated: new Date().toISOString(),
              }, {
                onConflict: "vendor_id",
              });

            if (error) {
              toast({
                title: "Error",
                description: "Failed to start tracking",
                variant: "destructive",
              });
            } else {
              setIsTracking(true);
              toast({
                title: "Tracking Started",
                description: "Customers can now see your location",
              });
            }
          },
          (error) => {
            toast({
              title: "Location Error",
              description: "Please enable location services",
              variant: "destructive",
            });
          }
        );
      }
    }
  };

  const handleLogout = async () => {
    if (isTracking && vendor) {
      await supabase
        .from("vendor_locations")
        .update({ is_active: false })
        .eq("vendor_id", vendor.id);
    }
    await supabase.auth.signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur border-b border-emerald-500/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
              <Store className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome, {vendor?.vendor_name} 👋</h1>
              <p className="text-sm text-muted-foreground">Vendor Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 space-y-4">
        {/* Approval Status Card */}
        <Card className="bg-card/80 backdrop-blur border-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {vendor?.is_approved ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-500" />
              )}
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge
                variant={vendor?.is_approved ? "default" : "secondary"}
                className={vendor?.is_approved ? "bg-green-600" : "bg-yellow-600"}
              >
                {vendor?.is_approved ? "Approved" : "Pending Approval"}
              </Badge>
              {!vendor?.is_approved && (
                <p className="text-sm text-muted-foreground">
                  Your account is awaiting admin approval. You'll be notified once approved.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vendor Info Card */}
        <Card className="bg-card/80 backdrop-blur border-emerald-500/20">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{vendor?.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{vendor?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Service Area</p>
                <p className="font-medium">{vendor?.primary_area || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-medium">{vendor?.rating || 4.5} ⭐</p>
              </div>
            </div>
            {vendor?.description && (
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{vendor.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Location Tracking Card */}
        {vendor?.is_approved && (
          <Card className="bg-card/80 backdrop-blur border-emerald-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isTracking
                      ? "Your location is visible to nearby customers"
                      : "Start tracking to let customers find you"}
                  </p>
                </div>
                <Button
                  onClick={toggleTracking}
                  variant={isTracking ? "destructive" : "default"}
                  className={!isTracking ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                >
                  {isTracking ? (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Stop Tracking
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Start Tracking
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default VendorDashboard;
