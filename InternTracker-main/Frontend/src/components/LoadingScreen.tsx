import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isDark: boolean;
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ isDark, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  // Smooth cinematic progress counter mimicking an asset preload engine
  useEffect(() => {
    let startTime = Date.now();
    const duration = 2500; // 2.5 seconds for premium pacing

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve for highly natural, realistic simulation slowing down at the end
      const easeProgress = 1 - Math.pow(1 - linearProgress, 3);
      const nextProgress = Math.floor(easeProgress * 100);

      setProgress(nextProgress);

      if (linearProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          if (onLoadingComplete) onLoadingComplete();
        }, 500); // Elegant deliberate hold at 100%
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onLoadingComplete]);

  // Generate deterministic coordinates for the organic fluid infinity ribbon path
  const PARTICLE_COUNT=50;
  const ribbonPoints = Array.from(
    { length: PARTICLE_COUNT }, (_, i) => {
    const t = (i / PARTICLE_COUNT) * Math.PI * 2;
    // Classic algebraic Lemniscate of Bernoulli mathematical mapping
    const scale = 320 / (3 - Math.cos(2 * t));
    const x = scale * Math.cos(t);
    const y = (scale * Math.sin(2 * t)) / 2;
    return { x, y, id: i };
  });

  return (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.04,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none transition-colors duration-1000 ${
            isDark ? "bg-[#050505]" : "bg-[#FBFBFD]"
          }`}
        >
          {/* --- CINEMATIC VOLUMETRIC BACKDROP GLOWS --- */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen dark:mix-blend-normal">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                x: [-20, 20, -20],
                y: [-10, 10, -10]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[140px] bg-gradient-to-tr from-blue-600/20 to-indigo-500/10 dark:from-blue-900/15" 
            />
            <motion.div 
              animate={{ 
                scale: [1.1, 0.95, 1.1],
                x: [30, -30, 30],
                y: [20, -20, 20]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full blur-[160px] bg-gradient-to-tr from-violet-500/15 to-purple-500/5 dark:from-purple-900/10" 
            />
          </div>

          {/* --- FINE GRAIN EMBEDDED TEXTURE NOISE OVERLAY --- */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025]"
            style={{
                backgroundImage:
                "radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.03) 100%)",
            }}
            />

          {/* --- 3D CANVAS EMULATION SPACE --- */}
          <div className="relative w-full max-w-3xl aspect-video flex items-center justify-center scale-90 sm:scale-100">
            
            {/* ORGANIC MORPHING AMBIENT LIGHT RIBBON */}
            <svg viewBox="-400 -250 800 500" className="absolute w-full h-full pointer-events-none overflow-visible mix-blend-screen dark:mix-blend-normal">
              <defs>
                <linearGradient id="ribbonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#2563EB" : "#111827"} stopOpacity="0.8" />
                  <stop offset="50%" stopColor={isDark ? "#7C3AED" : "#6B7280"} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={isDark ? "#1D4ED8" : "#60A5FA"} stopOpacity="0" />
                </linearGradient>
                <filter id="ultraBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="30" />
                </filter>
                <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>

              {/* Underlying Base Fluid Mesh Glow */}
              <motion.path
                d="M -290,0 C -290,130 -10,130 0,0 C 10,-130 290,-130 290,0 C 290,130 10,130 0,0 C -10,-130 -290,-130 -290,0 Z"
                fill="none"
                stroke="url(#ribbonGlow)"
                strokeWidth="70"
                filter="url(#ultraBlur)"
                opacity="0.35"
                animate={{
                  d: [
                    "M -290,0 C -290,130 -10,130 0,0 C 10,-130 290,-130 290,0 C 290,130 10,130 0,0 C -10,-130 -290,-130 -290,0 Z",
                    "M -300,-10 C -280,140 -20,110 0,10 C 20,-110 280,-140 300,-10 C 280,120 20,140 0,-10 C -20,-140 -280,-110 -300,-10 Z",
                    "M -290,0 C -290,130 -10,130 0,0 C 10,-130 290,-130 290,0 C 290,130 10,130 0,0 C -10,-130 -290,-130 -290,0 Z"
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Core Kinetic Sharp Core Energy Streak */}
              <motion.path
                d="M -290,0 C -290,130 -10,130 0,0 C 10,-130 290,-130 290,0 C 290,130 10,130 0,0 C -10,-130 -290,-130 -290,0 Z"
                fill="none"
                stroke="url(#ribbonGlow)"
                strokeWidth="12"
                filter="url(#softBlur)"
                opacity="0.8"
                strokeDasharray="400 1200"
                animate={{ strokeDashoffset: [0, -1600] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />

              {/* --- ADVANCED KINETIC PARTICLES SYSTEM (THOUSANDS ALONG THE STREAM) --- */}
              {ribbonPoints.map((pt, idx) => {
                const randomOffset = Math.sin(idx * 0.5) * 16;
                const speedMulti = 0.5 + (idx % 3) * 0.4;
                const particleDelay = (idx / PARTICLE_COUNT) * -4.5;

                return (
                  <motion.circle
                    key={`p-${pt.id}`}
                    r={idx % 4 === 0 ? 2.5 : 1.2}
                    fill="#FFFFFF"
                    className="drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
                    animate={{
                      cx: [pt.x + randomOffset, pt.x - randomOffset, pt.x + randomOffset],
                      cy: [pt.y - randomOffset, pt.y + randomOffset, pt.y - randomOffset],
                      opacity: [0.2, 0.9, 0.2]
                    }}
                    transition={{
                      cx: { duration: 6 * speedMulti, repeat: Infinity, ease: "easeInOut", delay: particleDelay },
                      cy: { duration: 5 * speedMulti, repeat: Infinity, ease: "easeInOut", delay: particleDelay },
                      opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                );
              })}
            </svg>

            {/* --- LIQUID FLOATING GLASS PANELS (MAC NATIVE DISSOLVE EFFECT) --- */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {[
                { top: "15%", left: "18%", delay: 0.2, rotate: -6 },
                { bottom: "12%", right: "15%", delay: 1.4, rotate: 12 },
                { top: "25%", right: "22%", delay: 2.5, rotate: -8 }
              ].map((glass, index) => (
                <motion.div
                  key={`glass-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ 
                    opacity: [0, 0.65, 0.65, 0],
                    y: [-5, -15, -25, -35],
                    scale: 1,
                    rotate: glass.rotate
                  }}
                  transition={{
                    duration: 4.5,
                    delay: glass.delay,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  style={{ top: glass.top, left: glass.left, right: glass.right }}
                  className={`absolute w-28 h-20 rounded-2xl border shadow-2xl backdrop-blur-md ${
                    isDark 
                      ? "bg-white/[0.02] border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" 
                      : "bg-white/20 border-white/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]"
                  }`}
                />
              ))}
            </div>

            {/* --- APPLE FITNESS-INSPIRED STEPPED CIRCULAR ENERGY RING --- */}
            <div className="absolute flex items-center justify-center pointer-events-none">
              <svg className="w-56 h-56 transform -rotate-90 overflow-visible">
                {/* Clean Transparent Under-track */}
                <circle 
                  cx="112" 
                  cy="112" 
                  r="102" 
                  className={`${isDark ? "stroke-white/[0.02]" : "stroke-black/[0.02]"}`} 
                  strokeWidth="1.5" 
                  fill="none" 
                />
                {/* Micro-Geometric Active Loading Line */}
                <motion.circle 
                  cx="112" 
                  cy="112" 
                  r="102" 
                  stroke={isDark ? "url(#darkRingGlow)" : "url(#lightRingGlow)"}
                  strokeWidth="2.5" 
                  fill="none" 
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 640.88,
                    strokeDashoffset: 640.88 - (640.88 * progress) / 100
                  }}
                />
                <defs>
                  <linearGradient id="darkRingGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="lightRingGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* --- CENTERPIECE HEADLINE IDENTITY LAYER --- */}
            <div className="absolute text-center flex flex-col items-center justify-center z-20">
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <h1 className={`text-4xl md:text-5xl font-bold tracking-tighter ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>
                  Intern<span className="text-blue-500 font-extrabold tracking-tight">Tracker</span>
                </h1>
                
                <p className="text-[11px] font-black tracking-[0.35em] text-zinc-400 dark:text-zinc-500 uppercase mt-4 block pr-[-0.35em]">
                  Connecting Talent With Opportunity
                </p>
              </motion.div>
            </div>

          </div>

          {/* --- MINIMAL CRITICAL NUMERIC HUD STATUS DISPLAY --- */}
          <div className="absolute bottom-16 flex flex-col items-center font-sans tracking-tight">
            <div className="h-7 overflow-hidden relative flex justify-center w-24">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={progress}
                  initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-xl font-bold tabular-nums tracking-tighter ${
                    isDark ? "text-zinc-300" : "text-zinc-800"
                  }`}
                >
                  {progress}<span className="text-xs font-medium text-zinc-500 ml-0.5">%</span>
                </motion.span>
              </AnimatePresence>
            </div>
            
            {/* Soft System State Line Status indicator */}
            <div className="w-12 h-[2px] bg-black/5 dark:bg-white/5 rounded-full mt-2 overflow-hidden relative">
              <motion.div 
                className="h-full bg-blue-500 rounded-full absolute left-0 top-0"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

        </motion.div>
      )}