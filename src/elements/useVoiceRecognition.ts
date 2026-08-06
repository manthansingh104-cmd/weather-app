import { useEffect, useRef, useState, useCallback } from "react";

export function useVoiceRecognition(onResult: (text: string) => void) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("[voice] recognition started");
      setIsListening(true);
    };
    recognition.onend = () => {
      console.log("[voice] recognition ended");
      setIsListening(false);
    };
    recognition.onerror = (event: any) => {
      console.error("[voice] recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string;
      const cleaned = transcript
        .replace(/^(what'?s the weather in|weather in|show me|search for|find)\s+/i, "")
        .trim();
      if (cleaned) onResult(cleaned);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onResult]);

  const start = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch {
        // ignore duplicate-start errors
      }
    }
  }, [isListening]);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  return { isListening, isSupported, start, stop };
}