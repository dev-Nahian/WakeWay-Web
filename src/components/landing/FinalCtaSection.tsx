'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-secondary/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          className="space-y-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground mx-auto flex items-center justify-center shadow-lg">
            <Navigation2 className="w-6 h-6 rotate-45" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Never miss your stop again.
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of smart travelers who sleep peacefully knowing WakeWay will trigger their alarm before arrival.
          </p>

          <div className="pt-4 flex justify-center">
            <Button size="lg" className="rounded-full px-10 text-base shadow-xl hover:shadow-2xl transition-all">
              Plan Your Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
