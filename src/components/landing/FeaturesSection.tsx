'use client';

import { motion } from 'framer-motion';
import {
  Bell,
  Navigation,
  CircleDot,
  Smartphone,
  History,
  CheckCircle,
} from 'lucide-react';

const features = [
  {
    icon: Bell,
    title: 'Destination Alerts',
    description:
      'Receive timely audio, haptic, and visual notifications before reaching your target stop so you never oversleep.',
  },
  {
    icon: Navigation,
    title: 'Smart Location Monitoring',
    description:
      'Leverages GPS & PostGIS spatial algorithms to precisely track your movement along the transit route.',
  },
  {
    icon: CircleDot,
    title: 'Custom Wake-Up Radius',
    description:
      'Tailor your alarm trigger distance anywhere from 500 meters to 10 kilometers based on transit speed.',
  },
  {
    icon: Smartphone,
    title: 'Background Mobile Monitoring',
    description:
      'Reliable native React Native background execution ensures your alarm fires even with your screen turned off.',
  },
  {
    icon: History,
    title: 'Trip History & Analytics',
    description:
      'Revisit frequent routes, review previous commute times, and quickly re-trigger past trip configurations.',
  },
  {
    icon: CheckCircle,
    title: 'Simple 1-Tap Setup',
    description:
      'Effortless setup on web or mobile with instant sync to get your journey configured in seconds.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
            Powerful & Reliable
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Everything You Need For Stress-Free Travel
          </p>
          <p className="text-base text-muted-foreground">
            Designed for commuters, long-distance bus travelers, and train riders seeking complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="flex flex-col p-6 sm:p-8 rounded-3xl border border-border/60 bg-card hover:border-border transition-colors space-y-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-foreground">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
