"use client";

import { useEffect, useState } from "react";

export default function WelcomeSound() {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (played) return;

    const playWelcome = () => {
      try {
        const synth = window.speechSynthesis;

        const speak = () => {
          const msg = new SpeechSynthesisUtterance();
          msg.text = "Welcome to Jaspreet Impex. We are providing so many services. Let's explore our website.";
          msg.rate = 0.9;
          msg.pitch = 1;
          msg.volume = 0.8;
          msg.lang = "en-US";
          synth.cancel();
          synth.speak(msg);
          setPlayed(true);
        };

        if (synth.getVoices().length === 0) {
          synth.onvoiceschanged = () => speak();
          setTimeout(speak, 500);
        } else {
          speak();
        }
      } catch (e) {
        console.log("Speech not supported");
      }
    };

    const handleInteraction = () => {
      playWelcome();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [played]);

  return null;
}
