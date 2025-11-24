import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Star, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const VendorsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      toast({
        title: "Error",
        description: "Failed to load vendors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojiMap: { [key: string]: string } = {
      vegetables: "🥬",
      fruits: "🍎",
      both: "🛒",
      knife: "🔪",
      utensils: "🍽️",
      flowers: "🌺",
      barber: "💈",
      handicrafts: "🎨",
      streetfood: "🍜",
      tailor: "🧵",
      laundry: "👕",
      plumber: "🔧",
      electrician: "💡",
      other: "📦",
    };
    return emojiMap[category?.toLowerCase()] || "📦";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              All Registered Vendors
            </CardTitle>
            <p className="text-muted-foreground">
              Total Vendors: {vendors.length}
            </p>
          </CardHeader>
        </Card>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Loading vendors...</p>
            </CardContent>
          </Card>
        ) : vendors.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No vendors registered yet</p>
              <Button 
                onClick={() => navigate('/vendor-register')}
                className="mt-4"
              >
                Register First Vendor
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl flex-shrink-0">
                      {vendor.photo_url ? (
                        <img
                          src={vendor.photo_url}
                          alt={vendor.vendor_name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />
                      ) : (
                        getCategoryEmoji(vendor.category)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-1 truncate">
                        {vendor.vendor_name || "Unnamed Vendor"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {vendor.category || "Unknown Category"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant={vendor.is_approved ? "default" : "secondary"}>
                          {vendor.is_approved ? "Approved" : "Pending"}
                        </Badge>
                        {vendor.is_active && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {vendor.primary_area && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{vendor.primary_area}</span>
                    </div>
                  )}

                  {vendor.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Phone className="h-4 w-4" />
                      <span>{vendor.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm mb-3">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{vendor.rating || 4.5}</span>
                  </div>

                  {vendor.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {vendor.description}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorsList;
