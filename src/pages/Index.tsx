import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, ShoppingCart, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "kn">("en");

  const translations = {
    en: {
      tagline: "Connect • Track • Serve",
      englishBtn: "English",
      kannadaBtn: "ಕನ್ನಡ",
      liveIn: "Live in Bangalore",
      heroTitle: "Your Neighborhood\nVendors, Now Online",
      heroDesc: "Connect with local push cart vendors in real-time. Fresh vegetables, fruits, and services delivered to your doorstep in Indiranagar, Koramangala, Whitefield & beyond.",
      vendorTitle: "I'm a Vendor",
      vendorDesc: "Share your location, alert customers when you arrive, and grow your business",
      vendorBtn: "Register as Vendor",
      customerTitle: "I'm a Customer",
      customerDesc: "Get instant alerts when vendors arrive near you. Track them on the map in real-time",
      customerBtn: "Register as Customer",
      adminTitle: "Admin Panel",
      adminDesc: "Manage vendors, monitor activity, and handle feedback from the community",
      adminBtn: "Admin Login",
      howItWorks: "How It Works",
      trackTitle: "Track Live Location",
      trackDesc: "Vendors share their GPS location in real-time",
      alertTitle: "Get Instant Alerts",
      alertDesc: "Receive notifications when vendors are nearby",
      rateTitle: "Rate & Review",
      rateDesc: "Share feedback and build trust in the community",
      footer: "© 2025 PushCart. Bringing Bangalore's neighborhoods closer."
    },
    kn: {
      tagline: "ಸಂಪರ್ಕಿಸಿ • ಟ್ರ್ಯಾಕ್ ಮಾಡಿ • ಸೇವೆ ಮಾಡಿ",
      englishBtn: "English",
      kannadaBtn: "ಕನ್ನಡ",
      liveIn: "ಬೆಂಗಳೂರಿನಲ್ಲಿ ಲೈವ್",
      heroTitle: "ನಿಮ್ಮ ನೆರೆಹೊರೆಯ\nವಿಕ್ರೇತರು, ಈಗ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ",
      heroDesc: "ಸ್ಥಳೀಯ ಪುಶ್ ಕಾರ್ಟ್ ವಿಕ್ರೇತರೊಂದಿಗೆ ನೇರ ಸಮಯದಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ. ಇಂದಿರಾನಗರ, ಕೊರಮಂಗಲ, ವೈಟ್‌ಫೀಲ್ಡ್ ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನ ಸ್ಥಳಗಳಲ್ಲಿ ತಾಜಾ ತರಕಾರಿಗಳು, ಹಣ್ಣುಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.",
      vendorTitle: "ನಾನು ವಿಕ್ರೇತ",
      vendorDesc: "ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ನೀವು ಬಂದಾಗ ಗ್ರಾಹಕರಿಗೆ ಎಚ್ಚರಿಕೆ ನೀಡಿ ಮತ್ತು ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಬೆಳೆಸಿ",
      vendorBtn: "ವಿಕ್ರೇತರಾಗಿ ನೋಂದಾಯಿಸಿ",
      customerTitle: "ನಾನು ಗ್ರಾಹಕ",
      customerDesc: "ವಿಕ್ರೇತರು ನಿಮ್ಮ ಹತ್ತಿರ ಬಂದಾಗ ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ. ನೇರ ಸಮಯದಲ್ಲಿ ನಕ್ಷೆಯಲ್ಲಿ ಅವರನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      customerBtn: "ಗ್ರಾಹಕರಾಗಿ ನೋಂದಾಯಿಸಿ",
      adminTitle: "ನಿರ್ವಾಹಕ ಫಲಕ",
      adminDesc: "ವಿಕ್ರೇತರನ್ನು ನಿರ್ವಹಿಸಿ, ಚಟುವಟಿಕೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ಸಮುದಾಯದಿಂದ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ವಹಿಸಿ",
      adminBtn: "ನಿರ್ವಾಹಕ ಲಾಗಿನ್",
      howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      trackTitle: "ಲೈವ್ ಸ್ಥಳವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      trackDesc: "ವಿಕ್ರೇತರು ತಮ್ಮ GPS ಸ್ಥಳವನ್ನು ನೇರ ಸಮಯದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ",
      alertTitle: "ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ",
      alertDesc: "ವಿಕ್ರೇತರು ಹತ್ತಿರದಲ್ಲಿದ್ದಾಗ ಅಧಿಸೂಚನೆಗಳನ್ನು ಸ್ವೀಕರಿಸಿ",
      rateTitle: "ರೇಟ್ ಮಾಡಿ ಮತ್ತು ವಿಮರ್ಶಿಸಿ",
      rateDesc: "ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ಸಮುದಾಯದಲ್ಲಿ ವಿಶ್ವಾಸವನ್ನು ನಿರ್ಮಿಸಿ",
      footer: "© 2025 PushCart. ಬೆಂಗಳೂರಿನ ನೆರೆಹೊರೆಗಳನ್ನು ಹತ್ತಿರ ತರುತ್ತಿದೆ."
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">PushCart</h1>
              <p className="text-xs text-muted-foreground">{t.tagline}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={language === "en" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setLanguage("en")}
            >
              {t.englishBtn}
            </Button>
            <Button 
              variant={language === "kn" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setLanguage("kn")}
            >
              {t.kannadaBtn}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t.liveIn}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight whitespace-pre-line">
            {t.heroTitle}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Role Selection Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Vendor Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-2"
            onClick={() => navigate('/vendor-register')}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <ShoppingCart className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.vendorTitle}</h3>
              <p className="text-muted-foreground">
                {t.vendorDesc}
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg">
                {t.vendorBtn}
              </Button>
            </CardContent>
          </Card>

          {/* Customer Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-secondary/50 hover:-translate-y-2"
            onClick={() => navigate('/customer-register')}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.customerTitle}</h3>
              <p className="text-muted-foreground">
                {t.customerDesc}
              </p>
              <Button className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:shadow-lg">
                {t.customerBtn}
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-accent/50 hover:-translate-y-2"
            onClick={() => navigate('/admin-login')}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.adminTitle}</h3>
              <p className="text-muted-foreground">
                {t.adminDesc}
              </p>
              <Button className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-lg">
                {t.adminBtn}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-3xl mb-16">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">{t.howItWorks}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-lg">{t.trackTitle}</h4>
              <p className="text-sm text-muted-foreground">{t.trackDesc}</p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-secondary/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">{t.alertTitle}</h4>
              <p className="text-sm text-muted-foreground">{t.alertDesc}</p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg">{t.rateTitle}</h4>
              <p className="text-sm text-muted-foreground">{t.rateDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
