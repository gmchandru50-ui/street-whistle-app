import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "./LanguageContext";

interface VoiceAccessibilityContextType {
  announce: (message: string) => void;
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
}

const VoiceAccessibilityContext = createContext<VoiceAccessibilityContextType | undefined>(undefined);

// Language codes for speech synthesis
const languageMap = {
  en: "en-US",
  kn: "kn-IN",
  hi: "hi-IN",
};

export const VoiceAccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem("voice-enabled");
    return saved === "true";
  });
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Text-to-Speech announcement
  const announce = useCallback((message: string) => {
    if (!isVoiceEnabled || !synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = languageMap[language as keyof typeof languageMap];
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    synthRef.current.speak(utterance);
  }, [isVoiceEnabled, language]);

  const toggleVoice = useCallback(() => {
    const newValue = !isVoiceEnabled;
    setIsVoiceEnabled(newValue);
    localStorage.setItem("voice-enabled", String(newValue));
    
    if (newValue) {
      announce(language === "en" ? "Voice navigation enabled" : 
               language === "kn" ? "ಧ್ವನಿ ನ್ಯಾವಿಗೇಶನ್ ಸಕ್ರಿಯಗೊಂಡಿದೆ" :
               "वॉयस नेविगेशन सक्षम");
    }
  }, [isVoiceEnabled, announce, language]);

  // Speech Recognition for voice commands
  const startListening = useCallback(() => {
    if (!isVoiceEnabled || typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = languageMap[language as keyof typeof languageMap];

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
        console.log("Voice command:", transcript);
        handleVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
      announce(language === "en" ? "Listening for commands" :
               language === "kn" ? "ಆದೇಶಗಳನ್ನು ಆಲಿಸುತ್ತಿದೆ" :
               "आदेश सुन रहा है");
    } catch (error) {
      console.error("Failed to start recognition:", error);
    }
  }, [isVoiceEnabled, language, announce]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    // Navigation commands
    if (command.includes("home") || command.includes("ಮುಖಪುಟ") || command.includes("होम")) {
      window.location.href = "/";
      announce(language === "en" ? "Going to home page" :
               language === "kn" ? "ಮುಖಪುಟಕ್ಕೆ ಹೋಗುತ್ತಿದೆ" :
               "होम पेज पर जा रहे हैं");
    } else if (command.includes("cart") || command.includes("ಕಾರ್ಟ್") || command.includes("कार्ट")) {
      // Trigger cart drawer - dispatch custom event
      window.dispatchEvent(new CustomEvent("voice-open-cart"));
      announce(language === "en" ? "Opening cart" :
               language === "kn" ? "ಕಾರ್ಟ್ ತೆರೆಯುತ್ತಿದೆ" :
               "कार्ट खोल रहे हैं");
    } else if (command.includes("vendor") || command.includes("ವಿಕ್ರೇತ") || command.includes("विक्रेता")) {
      window.location.href = "/vendor-register";
      announce(language === "en" ? "Going to vendor registration" :
               language === "kn" ? "ವಿಕ್ರೇತ ನೋಂದಣಿಗೆ ಹೋಗುತ್ತಿದೆ" :
               "विक्रेता पंजीकरण पर जा रहे हैं");
    } else if (command.includes("customer") || command.includes("ಗ್ರಾಹಕ") || command.includes("ग्राहक")) {
      window.location.href = "/customer-register";
      announce(language === "en" ? "Going to customer registration" :
               language === "kn" ? "ಗ್ರಾಹಕ ನೋಂದಣಿಗೆ ಹೋಗುತ್ತಿದೆ" :
               "ग्राहक पंजीकरण पर जा रहे हैं");
    }
    // Language switching
    else if (command.includes("english") || command.includes("ಇಂಗ್ಲಿಷ್") || command.includes("अंग्रेजी")) {
      window.dispatchEvent(new CustomEvent("voice-change-language", { detail: "en" }));
      announce("Switching to English");
    } else if (command.includes("kannada") || command.includes("ಕನ್ನಡ") || command.includes("कन्नड़")) {
      window.dispatchEvent(new CustomEvent("voice-change-language", { detail: "kn" }));
      announce("ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸುತ್ತಿದೆ");
    } else if (command.includes("hindi") || command.includes("ಹಿಂದಿ") || command.includes("हिंदी")) {
      window.dispatchEvent(new CustomEvent("voice-change-language", { detail: "hi" }));
      announce("हिंदी में बदल रहे हैं");
    }
  };

  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <VoiceAccessibilityContext.Provider 
      value={{ 
        announce, 
        isVoiceEnabled, 
        toggleVoice,
        isListening,
        startListening,
        stopListening
      }}
    >
      {children}
    </VoiceAccessibilityContext.Provider>
  );
};

export const useVoiceAccessibility = () => {
  const context = useContext(VoiceAccessibilityContext);
  if (!context) {
    throw new Error("useVoiceAccessibility must be used within VoiceAccessibilityProvider");
  }
  return context;
};
