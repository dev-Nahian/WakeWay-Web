'use client';

import { motion } from 'framer-motion';
import { Search, Sliders, Moon, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose your destination',
    description: 'Search for your destination using Google Maps.',
    icon: Search,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    number: '02',
    title: 'Start your journey',
    description: 'Set how close you want WakeWay to alert you.',
    icon: Sliders,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  {
    number: '03',
    title: 'Sleep peacefully',
    description: 'WakeWay monitors your journey and alerts you near your destination.',
    icon: Moon,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-card border-y border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Simple 3-Step Process
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            How WakeWay Keeps You On Track
          </p>
          <p className="text-base text-muted-foreground">
            Effortlessly plan your travel route on the web and let your mobile device ensure you never miss a stop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative flex flex-col p-8 rounded-3xl bg-background border border-border/60 shadow-sm hover:shadow-md transition-shadow group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-muted-foreground/30 group-hover:text-primary transition-colors">
                    {step.number}
                  </span>
                  <div className={`p-3 rounded-2xl border ${step.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center text-xs font-medium text-muted-foreground gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Instant mobile synchronization</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
