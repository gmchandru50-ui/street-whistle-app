import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, ShoppingCart, User, Store, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import CustomerFeedback from "@/components/CustomerFeedback";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">PushCart</h1>
                <p className="text-xs text-muted-foreground">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-4 flex flex-wrap justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/customer-register")}
              className="text-primary hover:bg-primary/10"
            >
              <User className="h-4 w-4 mr-1" />
              Customer Login
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/vendor-login")}
              className="text-emerald-600 hover:bg-emerald-600/10"
            >
              <Store className="h-4 w-4 mr-1" />
              Vendor Login
            </Button>
          </nav>
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

      {/* User Type Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Customer Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50 hover:-translate-y-2"
            onClick={() => navigate('/customer-register')}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">{t.customerTitle}</h3>
              <p className="text-muted-foreground text-sm">
                {t.customerDesc}
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg">
                {t.customerBtn}
              </Button>
            </CardContent>
          </Card>

          {/* Vendor Card */}
          <Card 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-500/50 hover:-translate-y-2"
            onClick={() => navigate('/vendor-login')}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-600/70 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                <Store className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Vendor Portal</h3>
              <p className="text-muted-foreground text-sm">
                Register your business, manage orders, and track your location for customers.
              </p>
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-600/90 hover:shadow-lg">
                Vendor Login
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

      {/* Feedback Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-bold">Share Your Feedback</h3>
          <p className="text-muted-foreground">Help us improve PushCart by sharing your thoughts and suggestions.</p>
          <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="gap-2">
                <MessageSquare className="h-5 w-5" />
                Give Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg p-0 border-0">
              <CustomerFeedback onClose={() => setFeedbackOpen(false)} />
            </DialogContent>
          </Dialog>
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
