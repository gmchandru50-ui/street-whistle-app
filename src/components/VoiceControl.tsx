import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceAccessibility } from "@/contexts/VoiceAccessibilityContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export const VoiceControl = () => {
  const { isVoiceEnabled, toggleVoice, isListening, startListening, stopListening } = useVoiceAccessibility();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isVoiceEnabled ? "default" : "ghost"}
        size="sm"
        onClick={toggleVoice}
        aria-label={isVoiceEnabled ? "Disable voice" : "Enable voice"}
        title={isVoiceEnabled ? "Disable voice announcements" : "Enable voice announcements"}
      >
        {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
      
      {isVoiceEnabled && (
        <Button
          variant={isListening ? "destructive" : "secondary"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          aria-label={isListening ? "Stop listening" : "Start voice commands"}
          title={isListening ? "Stop listening" : "Start voice commands"}
          className="relative"
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {isListening && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </Button>
      )}
    </div>
  );
};
