'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, BellRing, Compass, ShieldCheck } from 'lucide-react';

export function MapVisualMockup() {
  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square sm:aspect-[4/3] rounded-3xl border border-border/60 bg-card/60 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden group">
      {/* Background Map Grid & Styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      {/* Modern Stylized Map Terrain / Roads */}
      <svg
        className="absolute inset-0 w-full h-full stroke-muted-foreground/20 fill-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Road Grid lines */}
        <path d="M-50 120 C 150 100, 250 250, 600 200" strokeWidth="6" className="stroke-muted/40" />
        <path d="M 80 -50 C 100 200, 300 300, 450 550" strokeWidth="4" className="stroke-muted/30" />
        <path d="M 300 -50 C 280 150, 400 350, 600 450" strokeWidth="5" className="stroke-muted/40" />
        
        {/* Active Route Path */}
        <motion.path
          d="M 80 320 C 150 280, 220 180, 380 140"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="8 8"
          className="text-primary/70"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />

        {/* Live Route Pulse Line */}
        <motion.path
          d="M 80 320 C 150 280, 220 180, 380 140"
          stroke="url(#route-gradient)"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
        />

        <defs>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wake-Up Radius Pulse (around Destination) */}
      <div className="absolute top-[140px] left-[380px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Outer pulsating radius ring */}
        <motion.div
          className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-emerald-500/30 bg-emerald-500/10 pointer-events-none"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-emerald-500/50 bg-emerald-500/15 pointer-events-none"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Wake radius label indicator */}
        <div className="absolute -top-7 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-semibold backdrop-blur-md">
          Wake Radius: 1.5 km
        </div>
      </div>

      {/* Current Location Pin */}
      <motion.div
        className="absolute left-[80px] top-[320px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping" />
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 border-2 border-white dark:border-zinc-900">
            <Navigation className="w-5 h-5 fill-white rotate-45" />
          </div>
        </div>
        <div className="mt-1.5 px-2.5 py-1 rounded-md bg-card/90 border border-border text-[11px] font-medium shadow-md backdrop-blur-sm">
          Current Location
        </div>
      </motion.div>

      {/* Destination Pin */}
      <motion.div
        className="absolute left-[380px] top-[140px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white dark:border-zinc-900">
            <MapPin className="w-6 h-6 fill-emerald-600 text-white" />
          </div>
        </div>
        <div className="mt-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-200 border border-emerald-800 text-[11px] font-semibold shadow-md backdrop-blur-sm">
          Central Station
        </div>
      </motion.div>

      {/* Floating Alert Card / Info Banner */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-background/90 border border-border/80 rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md flex items-center justify-between z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Monitoring Active
            </div>
            <div className="text-xs sm:text-sm font-medium text-foreground">
              Arriving in ~12 mins (3.4 km away)
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 border-l border-border pl-4">
          <Compass className="w-4 h-4 text-muted-foreground animate-spin-slow" />
          <span className="text-xs text-muted-foreground font-mono">GPS 99.4%</span>
        </div>
      </motion.div>
    </div>
  );
}
