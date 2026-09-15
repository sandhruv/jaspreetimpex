"use client";

import { useEffect, useState } from "react";

export default function WelcomeSound() {
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (played) return;

    const playWelcome = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

        const playNote = (freq: number, start: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, ctx.currentTime + start);
          gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + start + 0.05);
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + start);
          osc.stop(ctx.currentTime + start + duration);
        };

        playNote(523.25, 0, 0.3);
        playNote(659.25, 0.15, 0.3);
        playNote(783.99, 0.3, 0.4);

        setPlayed(true);
      } catch (e) {
        console.log("Audio not supported");
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
