import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceControl } from "@/components/VoiceControl";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: `🎉 ${t.registrationSuccess}`,
      description: t.welcomeMsg,
    });
    setTimeout(() => navigate('/customer-dashboard'), 2000);
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
          <div className="flex items-center gap-2">
            <VoiceControl />
            <LanguageSelector />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {t.customerRegistration}
              </CardTitle>
              <CardDescription className="text-base">
                {t.customerRegDesc}
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
                  <Label htmlFor="apartment">{t.apartment}</Label>
                  <Input
                    id="apartment"
                    placeholder={t.apartmentPlaceholder}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t.completeAddress} *</Label>
                  <textarea
                    id="address"
                    className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background text-foreground"
                    placeholder={t.addressPlaceholder}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pincode">{t.pinCode} *</Label>
                  <Input
                    id="pincode"
                    placeholder="560001"
                    required
                    maxLength={6}
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-secondary to-accent hover:opacity-90"
                >
                  {t.completeRegistration}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
