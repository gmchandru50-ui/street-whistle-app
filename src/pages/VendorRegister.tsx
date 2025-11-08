import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const VendorRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];
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
      title: t.registrationSubmitted,
      description: t.pendingApproval,
    });
    setTimeout(() => navigate('/vendor-dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backHome}
          </Button>
          <LanguageSelector />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.vendorRegistration}
              </CardTitle>
              <CardDescription className="text-base">
                {t.vendorRegDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.fullName} *</Label>
                  <Input
                    id="name"
                    placeholder={t.fullName}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phoneNumber} *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{t.serviceType} *</Label>
                  <Select required>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t.selectService} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">🥬 {t.vegetables}</SelectItem>
                      <SelectItem value="fruits">🍎 {t.fruits}</SelectItem>
                      <SelectItem value="both">🛒 {t.both}</SelectItem>
                      <SelectItem value="knife">🔪 {t.knife}</SelectItem>
                      <SelectItem value="utensils">🍽️ {t.utensils}</SelectItem>
                      <SelectItem value="flowers">🌺 {t.flowers}</SelectItem>
                      <SelectItem value="barber">💈 {t.barber}</SelectItem>
                      <SelectItem value="handicrafts">🎨 {t.handicrafts}</SelectItem>
                      <SelectItem value="streetfood">🍜 {t.streetFood}</SelectItem>
                      <SelectItem value="tailor">🧵 {t.tailor}</SelectItem>
                      <SelectItem value="laundry">👕 {t.laundry}</SelectItem>
                      <SelectItem value="plumber">🔧 {t.plumber}</SelectItem>
                      <SelectItem value="electrician">💡 {t.electrician}</SelectItem>
                      <SelectItem value="other">📦 {t.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">{t.primaryArea}</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t.selectArea} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="indiranagar">{t.indiranagar}</SelectItem>
                      <SelectItem value="koramangala">{t.koramangala}</SelectItem>
                      <SelectItem value="whitefield">{t.whitefield}</SelectItem>
                      <SelectItem value="hebbal">{t.hebbal}</SelectItem>
                      <SelectItem value="bellandur">{t.bellandur}</SelectItem>
                      <SelectItem value="marathahalli">{t.marathahalli}</SelectItem>
                      <SelectItem value="jp-nagar">{t.jpNagar}</SelectItem>
                      <SelectItem value="other">{t.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.uploadPhoto} *</Label>
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
                      {photoPreview ? t.changePhoto : t.uploadPhoto}
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
                  <Label htmlFor="description">{t.aboutService}</Label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    placeholder={t.aboutServicePlaceholder}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {t.registerVendor}
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
