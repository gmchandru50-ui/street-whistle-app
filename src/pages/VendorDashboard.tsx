import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, Clock, Star, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const handleArrivalAlert = () => {
    toast({
      title: "Alert Sent! 📢",
      description: "All nearby customers have been notified of your arrival",
    });
  };

  const toggleLocationSharing = () => {
    setIsSharing(!isSharing);
    toast({
      title: isSharing ? "Location Sharing Stopped" : "Location Sharing Started",
      description: isSharing
        ? "You're now offline"
        : "Customers can now track your location",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">RS</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Ravi's Vegetables</h1>
              <p className="text-xs text-muted-foreground">Vendor ID: #V12345</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Status Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Vendor Status</CardTitle>
              <Badge variant={isSharing ? "default" : "secondary"} className="text-sm">
                {isSharing ? "🟢 Online" : "⚫ Offline"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Alerts Today</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-secondary">4.5</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={toggleLocationSharing}
            className={`w-full h-20 text-xl font-bold ${
              isSharing
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-gradient-to-r from-secondary to-secondary/90 hover:shadow-xl"
            }`}
          >
            <MapPin className="mr-3 h-8 w-8" />
            {isSharing ? "Stop Location Sharing" : "Start Location Sharing"}
          </Button>

          <Button
            onClick={handleArrivalAlert}
            disabled={!isSharing}
            className="w-full h-20 text-xl font-bold bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl disabled:opacity-50"
          >
            <Bell className="mr-3 h-8 w-8" />
            I've Arrived - Alert Customers!
          </Button>
        </div>

        {/* Current Location */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSharing ? (
              <div className="space-y-2">
                <p className="font-medium">Near Sobha Lakeview Apartments</p>
                <p className="text-sm text-muted-foreground">Bellandur, Bangalore - 560103</p>
                <div className="mt-4 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map View</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Start location sharing to display your current location
              </p>
            )}
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              Regular Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Monday - Saturday</span>
                <span className="text-sm text-muted-foreground">8:00 AM - 10:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Bellandur Area</span>
                <Badge>Active</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Edit Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Priya M.</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Fresh vegetables every morning! Very friendly vendor.
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Amit K.</span>
                  <div className="flex">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Good quality products. Arrives on time regularly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default VendorDashboard;
