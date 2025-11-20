import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bell, Clock, Star, Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceAccessibility } from "@/contexts/VoiceAccessibilityContext";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceControl } from "@/components/VoiceControl";
import { supabase } from "@/integrations/supabase/client";
import { watchLocation } from "@/utils/geolocation";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { announce } = useVoiceAccessibility();
  const t = translations[language];
  const [isSharing, setIsSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const vendorId = "V12345"; // In real app, get from auth
  const vendorName = "Ravi's Vegetables";

  // Update location in database
  const updateLocationInDB = async (lat: number, lng: number) => {
    try {
      const { error } = await supabase
        .from('vendor_locations')
        .upsert({
          vendor_id: vendorId,
          vendor_name: vendorName,
          latitude: lat,
          longitude: lng,
          is_active: true,
          last_updated: new Date().toISOString(),
        }, {
          onConflict: 'vendor_id'
        });

      if (error) throw error;
      console.log('Location updated:', { lat, lng });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  // Stop tracking
  const stopTracking = async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }

    // Mark vendor as inactive
    try {
      await supabase
        .from('vendor_locations')
        .update({ is_active: false })
        .eq('vendor_id', vendorId);
    } catch (error) {
      console.error('Error stopping tracking:', error);
    }

    setIsSharing(false);
    setCurrentLocation(null);
  };

  // Start tracking
  const startTracking = () => {
    if (watchIdRef.current !== null) return; // Already tracking

    watchIdRef.current = watchLocation(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          title: "Location Error",
          description: "Unable to access your location. Please enable location services.",
          variant: "destructive",
        });
      }
    );

    // Update location every 7 seconds
    locationIntervalRef.current = setInterval(async () => {
      if (currentLocation) {
        await updateLocationInDB(currentLocation.lat, currentLocation.lng);
      }
    }, 7000);

    setIsSharing(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  // Update location when currentLocation changes
  useEffect(() => {
    if (currentLocation && isSharing) {
      updateLocationInDB(currentLocation.lat, currentLocation.lng);
    }
  }, [currentLocation, isSharing]);

  const handleArrivalAlert = () => {
    toast({
      title: t.alertSent,
      description: t.allCustomersNotified,
    });
  };

  const toggleLocationSharing = () => {
    if (isSharing) {
      stopTracking();
      toast({
        title: t.locationSharingStopped,
        description: t.nowOffline,
      });
    } else {
      startTracking();
      toast({
        title: t.locationSharingStarted,
        description: t.customersCanTrack,
      });
    }
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
            <VoiceControl />
            <LanguageSelector />
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
              <CardTitle>{t.vendorStatus}</CardTitle>
              <Badge variant={isSharing ? "default" : "secondary"} className="text-sm">
                {isSharing ? `🟢 ${t.online}` : `⚫ ${t.offline}`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">{t.alertsToday}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-secondary">4.5</p>
                <p className="text-sm text-muted-foreground">{t.rating}</p>
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
            {isSharing ? t.stopLocationSharing : t.startLocationSharing}
          </Button>

          <Button
            onClick={handleArrivalAlert}
            disabled={!isSharing}
            className="w-full h-20 text-xl font-bold bg-gradient-to-r from-primary to-primary/90 hover:shadow-xl disabled:opacity-50"
          >
            <Bell className="mr-3 h-8 w-8" />
            {t.arrivedAlert}
          </Button>
        </div>

        {/* Current Location */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {t.currentLocation}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSharing && currentLocation ? (
              <div className="space-y-2">
                <p className="font-medium">📍 Live Tracking Active</p>
                <p className="text-sm text-muted-foreground">
                  Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                </p>
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    🟢 Your location is being shared with customers
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updates every 7 seconds
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                {t.startSharingToDisplay}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              {t.regularSchedule}
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
                <Badge>{t.active}</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              {t.editSchedule}
            </Button>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              {t.recentReviews}
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
                  {t.freshVegetables}
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
                  {t.goodQuality}
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
          {t.logout}
        </Button>
      </div>
    </div>
  );
};

export default VendorDashboard;
