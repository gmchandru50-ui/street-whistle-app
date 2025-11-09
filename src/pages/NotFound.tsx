import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background relative">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.oops} {t.pageNotFound}</p>
        <a href="/" className="text-primary underline hover:opacity-80">
          {t.returnToHome}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
