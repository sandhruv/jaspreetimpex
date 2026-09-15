"use client";

import { useEffect, useState } from "react";

export default function WelcomeSound() {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (played) return;

    const playWelcome = () => {
      try {
        const msg = new SpeechSynthesisUtterance();
        msg.text = "Welcome to Jaspreet Impex. We are providing so many services. Let's explore our website.";
        msg.rate = 0.9;
        msg.pitch = 1;
        msg.volume = 0.8;
        msg.lang = "en-US";
        window.speechSynthesis.speak(msg);
        setPlayed(true);
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
