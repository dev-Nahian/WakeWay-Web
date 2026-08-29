'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Compass,
  ArrowRight,
  History,
  Settings,
  BellRing,
  Moon,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

interface Trip {
  id: string;
  destination: string;
  date: string;
  duration: string;
  status: 'Completed' | 'Alert Triggered' | 'Cancelled';
}

const mockRecentTrips: Trip[] = [
  {
    id: '1',
    destination: 'Cox’s Bazar',
    date: 'Aug 24, 2026',
    duration: '8h 30m',
    status: 'Completed',
  },
  {
    id: '2',
    destination: 'Dhaka Airport',
    date: 'Aug 18, 2026',
    duration: '1h 45m',
    status: 'Alert Triggered',
  },
  {
    id: '3',
    destination: 'Sylhet Bus Terminal',
    date: 'Aug 10, 2026',
    duration: '5h 10m',
    status: 'Completed',
  },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [hasActiveTrip, setHasActiveTrip] = useState(true); // Default to active trip state to showcase prompt specs

  return (
    <div className="max-w-6xl mx-auto space-y-10 selection:bg-primary selection:text-primary-foreground">
      {/* Simulation Bar to toggle active trip state for demonstration */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-xs">
        <div className="flex items-center gap-2 font-medium text-muted-foreground">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Interactive Demo Mode: Toggle trip status view</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setHasActiveTrip(!hasActiveTrip)}
          className="rounded-xl text-xs gap-2"
        >
          {hasActiveTrip ? (
            <>
              <ToggleRight className="w-4 h-4 text-emerald-500" /> Show "No Active Trip" State
            </>
          ) : (
            <>
              <ToggleLeft className="w-4 h-4 text-muted-foreground" /> Show "Active Trip" State
            </>
          )}
        </Button>
      </div>

      {/* Main Hero Banner / Active Journey Section */}
      <AnimatePresence mode="wait">
        {!hasActiveTrip ? (
          /* STATE 1: NO ACTIVE TRIP */
          <motion.div
            key="no-trip"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl border-border/60 bg-gradient-to-r from-card via-card to-secondary/30 p-8 md:p-12 shadow-sm text-center md:text-left relative overflow-hidden">
              <div className="max-w-2xl space-y-6 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-muted-foreground border border-border/40">
                  <Compass className="w-3.5 h-3.5 text-primary" /> Ready for your next journey
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                  Where are you going?
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Set your destination and wake radius on the web. WakeWay will sync with your mobile device so you can sleep peacefully on your commute.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <Button size="lg" asChild className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold shadow-lg">
                    <Link href="/plan-trip">
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Plan a Trip
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          /* STATE 2: ACTIVE TRIP IN PROGRESS */
          <motion.div
            key="active-trip"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="rounded-3xl border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-card to-card p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Journey in Progress</span>
                  </div>

                  <div>
                    <h2 className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
                      Destination
                    </h2>
                    <p className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mt-1 flex items-center gap-2">
                      <MapPin className="w-8 h-8 text-emerald-500 shrink-0" />
                      Chattogram
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-1 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Remaining Distance:</span>
                      <span className="text-foreground font-bold font-mono text-base">2.4 km</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1">
                        <Moon className="w-3 h-3" /> Sleep Mode Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 lg:pt-0">
                  <Button size="lg" className="w-full lg:w-auto rounded-full px-8 py-6 text-base font-semibold shadow-md">
                    View Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUICK ACTIONS SECTION */}
      <div className="space-y-4">
        <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground px-1">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            asChild
            className="h-20 rounded-2xl border-border/60 bg-card hover:bg-secondary/60 justify-start px-6 gap-4 shadow-sm"
          >
            <Link href="/plan-trip">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Plan a Trip</div>
                <div className="text-xs text-muted-foreground">Set new destination</div>
              </div>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="h-20 rounded-2xl border-border/60 bg-card hover:bg-secondary/60 justify-start px-6 gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary text-foreground flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Trip History</div>
              <div className="text-xs text-muted-foreground">View past journeys</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-20 rounded-2xl border-border/60 bg-card hover:bg-secondary/60 justify-start px-6 gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary text-foreground flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Settings</div>
              <div className="text-xs text-muted-foreground">App & alert preferences</div>
            </div>
          </Button>
        </div>
      </div>

      {/* RECENT TRIPS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
            Recent Trips
          </h2>
          <a href="#" className="text-xs font-semibold text-primary hover:underline">
            View All
          </a>
        </div>

        <Card className="rounded-3xl border-border/60 shadow-sm overflow-hidden">
          <div className="divide-y divide-border/40">
            {mockRecentTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm sm:text-base">{trip.destination}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                      <span>{trip.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {trip.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-border/40">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      trip.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : trip.status === 'Alert Triggered'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        : 'bg-muted text-muted-foreground border-border'
                    }`}
                  >
                    {trip.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
