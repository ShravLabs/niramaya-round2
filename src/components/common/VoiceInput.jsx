import { useState, useRef } from "react";

const LANGUAGES = [
  { code: "hi-IN", label: "हिंदी", name: "Hindi" },
  { code: "te-IN", label: "తెలుగు", name: "Telugu" },
  { code: "ta-IN", label: "தமிழ்", name: "Tamil" },
  { code: "kn-IN", label: "ಕನ್ನಡ", name: "Kannada" },
  { code: "ml-IN", label: "മലയാളം", name: "Malayalam" },
  { code: "mr-IN", label: "मराठी", name: "Marathi" },
  { code: "bn-IN", label: "বাংলা", name: "Bengali" },
  { code: "gu-IN", label: "ગુજરાતી", name: "Gujarati" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ", name: "Punjabi" },
  { code: "ur-IN", label: "اردو", name: "Urdu" },
  { code: "or-IN", label: "ଓଡ଼ିଆ", name: "Odia" },
  { code: "en-IN", label: "English", name: "English" },
];

export default function VoiceInput({ onResult }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]); // Hindi default
  const [status, setStatus] = useState("idle"); // idle | listening | done | error
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("error");
      setTranscript("Speech recognition not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.code;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("listening");
      setTranscript("");
    };

    recognition.onresult = (event) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interimText += result[0].transcript;
        }
      }

      const current = finalText || interimText;
      setTranscript(current);

      if (finalText) {
        setStatus("done");
        setIsListening(false);
        if (onResult) onResult(finalText, selectedLang);
      }
    };

    recognition.onerror = (event) => {
      setStatus("error");
      setIsListening(false);
      if (event.error === "not-allowed") {
        setTranscript("Microphone permission denied. Please allow microphone access.");
      } else if (event.error === "no-speech") {
        setTranscript("No speech detected. Please try again.");
      } else {
        setTranscript(`Error: ${event.error}. Please try again.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      if (status === "listening") setStatus("done");
    };

    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setStatus("done");
  };

  const reset = () => {
    setTranscript("");
    setStatus("idle");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-1">🎙️ Voice Symptom Input</h2>
      <p className="text-gray-500 text-sm mb-4">
        Select your language and speak your symptoms
      </p>

      {/* Language Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-2">
          🌐 Select Language / भाषा चुनें
        </label>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLang(lang);
                reset();
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selectedLang.code === lang.code
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Selected: <strong>{selectedLang.name}</strong> ({selectedLang.code})
        </p>
      </div>

      {/* Mic Button */}
      <div className="flex flex-col items-center my-6">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-20 h-20 rounded-full text-white text-3xl flex items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
            isListening
              ? "bg-red-500 animate-pulse"
              : status === "done"
              ? "bg-green-500"
              : "bg-blue-600"
          }`}
        >
          {isListening ? "⏹" : status === "done" ? "✓" : "🎙️"}
        </button>
        <p className="mt-3 text-sm font-medium text-gray-600">
          {isListening
            ? `🔴 Listening in ${selectedLang.name}... (tap to stop)`
            : status === "done"
            ? "✅ Speech captured!"
            : `Tap to speak in ${selectedLang.name}`}
        </p>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div
          className={`rounded-xl p-4 mb-4 border ${
            status === "error"
              ? "bg-red-50 border-red-200"
              : status === "done"
              ? "bg-green-50 border-green-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {status === "listening" ? "Hearing..." : "You said"} ({selectedLang.name})
            </p>
            <button
              onClick={reset}
              className="text-xs text-gray-400 hover:text-red-500"
            >
              ✕ Clear
            </button>
          </div>
          <p
            className={`text-lg font-medium ${
              status === "error" ? "text-red-700" : "text-gray-800"
            }`}
            style={{
              fontFamily:
                selectedLang.code.startsWith("hi") ||
                selectedLang.code.startsWith("mr")
                  ? "'Noto Sans Devanagari', sans-serif"
                  : "inherit",
            }}
          >
            {transcript}
          </p>
        </div>
      )}

      {/* Submit Button */}
      {status === "done" && transcript && (
        <button
          onClick={() => {
            if (onResult) onResult(transcript, selectedLang);
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          🔍 Analyze Symptoms
        </button>
      )}
    </div>
  );
}
