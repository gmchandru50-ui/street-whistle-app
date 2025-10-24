import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VendorRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted!",
      description: "Your vendor account is pending approval. We'll notify you soon.",
    });
    setTimeout(() => navigate('/vendor-dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Vendor Registration
              </CardTitle>
              <CardDescription className="text-base">
                Join PushCart and connect with customers across Bangalore
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">🥬 Vegetables</SelectItem>
                      <SelectItem value="fruits">🍎 Fruits</SelectItem>
                      <SelectItem value="both">🛒 Vegetables & Fruits</SelectItem>
                      <SelectItem value="knife">🔪 Knife Sharpening</SelectItem>
                      <SelectItem value="utensils">🍽️ Utensils</SelectItem>
                      <SelectItem value="flowers">🌺 Flowers</SelectItem>
                      <SelectItem value="other">📦 Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Primary Area</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indiranagar">Indiranagar</SelectItem>
                      <SelectItem value="koramangala">Koramangala</SelectItem>
                      <SelectItem value="whitefield">Whitefield</SelectItem>
                      <SelectItem value="hebbal">Hebbal</SelectItem>
                      <SelectItem value="bellandur">Bellandur</SelectItem>
                      <SelectItem value="marathahalli">Marathahalli</SelectItem>
                      <SelectItem value="jp-nagar">JP Nagar</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Upload Photo *</Label>
                  <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="h-32 w-32 rounded-full object-cover border-4 border-primary/20"
                      />
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <Label
                      htmlFor="photo"
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      {photoPreview ? "Change Photo" : "Upload Photo"}
                    </Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">About Your Service (Optional)</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    placeholder="Tell customers about your products and service..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Register as Vendor
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
