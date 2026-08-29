'use client';

import { motion } from 'framer-motion';
import { Smartphone, Bell, Shield, MapPin, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MobileAppSection() {
  return (
    <section id="mobile-app" className="py-20 sm:py-28 bg-card border-y border-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Native iOS & Android App</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              For the most reliable destination alerts, use the WakeWay mobile app.
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              While our web application lets you plan routes on desktop or tablet, our React Native app leverages background location services and hardware alarms to guarantee you wake up on time.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Background GPS tracking with low battery consumption',
                'Loud hardware override alarms & persistent vibration',
                'Instant synchronization with web-planned trips',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto rounded-full px-8 shadow-lg">
                <Smartphone className="mr-2 h-5 w-5" />
                Get the mobile app
              </Button>
            </div>
          </motion.div>

          {/* Mobile Phone Mockup Visual */}
          <motion.div
            className="lg:col-span-6 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative w-[280px] sm:w-[320px] aspect-[9/19] rounded-[48px] border-[8px] border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-primary/10 flex flex-col justify-between overflow-hidden">
              {/* Top Notch / Camera Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-full z-20" />

              {/* Mobile Screen Mockup Header */}
              <div className="mt-6 flex items-center justify-between text-zinc-400 text-xs px-2 z-10">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span className="font-mono text-[10px]">100%</span>
                </div>
              </div>

              {/* Mobile App UI Simulation */}
              <div className="flex-1 my-4 flex flex-col justify-between space-y-4">
                {/* Active Trip Header */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5" /> MONITORING
                    </span>
                    <span>2.1 km away</span>
                  </div>
                  <div className="text-white text-sm font-bold truncate">Downtown Station</div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[78%]" />
                  </div>
                </div>

                {/* Alarm Trigger Screen Preview */}
                <div className="flex-1 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                    <Bell className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">Approaching Stop!</div>
                    <div className="text-emerald-300/80 text-xs mt-1">Wake up radius triggered</div>
                  </div>
                </div>

                {/* Swipe to Dismiss Button */}
                <div className="w-full h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg shadow-emerald-950">
                  <span>DISMISS ALARM</span>
                </div>
              </div>

              {/* Bottom Home Bar */}
              <div className="w-32 h-1 bg-zinc-700 rounded-full mx-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
