import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        <Button 
          variant={language === "en" ? "default" : "ghost"} 
          size="sm"
          onClick={() => setLanguage("en")}
        >
          English
        </Button>
        <Button 
          variant={language === "kn" ? "default" : "ghost"} 
          size="sm"
          onClick={() => setLanguage("kn")}
        >
          ಕನ್ನಡ
        </Button>
        <Button 
          variant={language === "hi" ? "default" : "ghost"} 
          size="sm"
          onClick={() => setLanguage("hi")}
        >
          हिंदी
        </Button>
      </div>
    </div>
  );
};
