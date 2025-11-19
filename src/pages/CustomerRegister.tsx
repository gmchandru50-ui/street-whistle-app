import { useState } from "react";
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
import { useVoiceAccessibility } from "@/contexts/VoiceAccessibilityContext";
import { translations } from "@/translations";

const CustomerRegister = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { announce } = useVoiceAccessibility();
  const t = translations[language];
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const handleSendOTP = () => {
    if (phone && phone.length >= 10) {
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setOtpSent(true);
      
      // In a real app, this would be sent via SMS
      console.log(`OTP for ${phone}: ${otp}`);
      
      toast({
        title: `✅ ${t.otpSent}`,
        description: `${t.otpSentDesc} ${phone}. Demo OTP: ${otp}`,
        duration: 10000,
      });
    } else {
      toast({
        title: `❌ ${t.invalidPhone}`,
        description: t.invalidPhoneDesc,
        variant: "destructive",
      });
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput === generatedOtp) {
      toast({
        title: `✅ ${t.otpVerified}`,
        description: t.otpVerifiedDesc,
      });
      return true;
    } else {
      toast({
        title: `❌ ${t.invalidOTP}`,
        description: t.invalidOTPDesc,
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!handleVerifyOtp()) {
      return;
    }
    
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
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="h-12"
                      disabled={otpSent}
                    />
                    {!otpSent && (
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        className="h-12 bg-secondary hover:bg-secondary/90"
                      >
                        {t.sendOTP}
                      </Button>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2 animate-in slide-in-from-top duration-300">
                    <Label htmlFor="otp">{t.enterOTP} *</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder={t.otpPlaceholder}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      maxLength={6}
                      className="h-12 text-center text-2xl tracking-widest"
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {t.demoMode}
                      </p>
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm text-primary"
                        onClick={handleSendOTP}
                      >
                        {t.resendOTP}
                      </Button>
                    </div>
                  </div>
                )}

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
                  disabled={!otpSent}
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
