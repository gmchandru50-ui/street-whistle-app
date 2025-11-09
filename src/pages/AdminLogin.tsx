import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.loginSuccessful,
      description: t.welcomeToAdmin,
    });
    setTimeout(() => navigate('/admin-dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
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

        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-2">
            <CardHeader className="space-y-4 pb-8 text-center">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                {t.adminPortal}
              </CardTitle>
              <CardDescription className="text-base">
                {t.secureAccess}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">{t.adminUsername}</Label>
                  <Input
                    id="username"
                    placeholder={t.enterAdminUsername}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.enterPassword}
                    required
                    className="h-12"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gradient-to-r from-accent to-accent/90 hover:opacity-90"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  {t.loginToDashboard}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t.demoCredentials}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
