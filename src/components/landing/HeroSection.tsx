'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapVisualMockup } from './MapVisualMockup';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-secondary/30">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTAs */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Companion App for Travel Safety</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
              Sleep. <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-muted-foreground bg-clip-text text-transparent">
                We'll wake you
              </span>{' '}
              when you arrive.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Set your destination, start your journey, and sleep without worrying about missing your stop.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8 text-base shadow-lg hover:shadow-xl transition-all">
                <Link href="/plan-trip">
                  Plan a Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 text-base" asChild>
                <a href="#how-it-works">How It Works</a>
              </Button>
            </div>

            {/* Micro reassurance tag */}
            <div className="flex items-center gap-2 pt-4 text-xs text-muted-foreground">
              <ShieldAlert className="h-4 w-4 text-primary/70" />
              <span>Seamless sync with WakeWay React Native mobile app</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Map Graphic Mockup */}
          <motion.div
            className="lg:col-span-6 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MapVisualMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
