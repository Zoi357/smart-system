"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    /* fill progress bar over ~2.2s */
    const steps = 44;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 100 / steps;
      });
    }, 50);

    /* start fade-out at 2.4s, call onDone at 2.9s */
    const fadeTimer = setTimeout(() => setFadeOut(true), 2400);
    const doneTimer = setTimeout(() => onDone(), 2900);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "linear-gradient(160deg, #e8eeff 0%, #f0f4ff 50%, #eaf0ff 100%)" }}
    >
      {/* logo */}
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* spinning ring behind logo */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-44 h-44 rounded-full border-4 border-transparent animate-spin"
            style={{
              borderTopColor: "#2563eb",
              borderRightColor: "#c0440a",
              animationDuration: "1.4s",
            }}
          />
          <div className="w-36 h-36 rounded-full bg-white shadow-2xl shadow-blue-200 flex items-center justify-center overflow-hidden p-2">
            <Image
              src="/image.png"
              alt="Benedicto College"
              width={128}
              height={128}
              priority
            />
          </div>
        </div>

        {/* school name */}
        <div className="text-center">
          <h1 className="text-slate-800 font-extrabold text-2xl tracking-tight">
            Benedicto College
          </h1>
          <p className="text-slate-400 text-sm mt-1 italic">
            Your Education... Our Mission
          </p>
        </div>

        {/* system name */}
        <div className="flex items-center gap-2 bg-blue-600 rounded-full px-5 py-2 shadow-md shadow-blue-200">
          <span className="text-white font-extrabold text-base tracking-widest">INFORM</span>
          <span className="text-blue-200 text-xs font-medium">Student Information System</span>
        </div>

        {/* progress bar */}
        <div className="w-64 flex flex-col items-center gap-2">
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-75"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: "linear-gradient(90deg, #2563eb, #c0440a)",
              }}
            />
          </div>
          <p className="text-slate-400 text-xs">Loading system...</p>
        </div>
      </div>
    </div>
  );
}
