'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { TripMap } from '@/features/trips/components/TripMap';
import { LocationDetail } from '@/features/trips/components/PlacesAutocomplete';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  MapPin,
  Navigation,
  Clock,
  Moon,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Radio,
  XCircle,
  ArrowLeft,
  Info,
  ShieldCheck,
  Bell,
  Sparkles,
  Sliders,
} from 'lucide-react';

type MobileConnectionState = 'Connected' | 'Monitoring' | 'Disconnected' | 'Completed';

const sampleTripLocation: LocationDetail = {
  name: 'Chattogram Railway Station',
  address: 'Station Road, Agrabad, Chattogram, Bangladesh',
  lat: 22.3354,
  lng: 91.8315,
  distanceKm: 2.4,
};

export default function ActiveJourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Mobile Connection State Management
  const [connectionState, setConnectionState] = useState<MobileConnectionState>('Monitoring');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleCancelJourney = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h1 className="text-base font-extrabold text-foreground">Active Journey</h1>
              </div>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Trip ID: {resolvedParams.id}
              </p>
            </div>
          </div>

          {/* Connection Status Badge */}
          <div
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              connectionState === 'Monitoring' || connectionState === 'Connected'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : connectionState === 'Completed'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Mobile Status: {connectionState}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* State Simulator Switcher for Demo Testing */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-xs gap-3">
          <div className="flex items-center gap-2 font-medium text-muted-foreground">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Interactive Connection Simulator:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(['Connected', 'Monitoring', 'Disconnected', 'Completed'] as const).map((st) => (
              <Button
                key={st}
                variant={connectionState === st ? 'default' : 'outline'}
                size="sm"
                onClick={() => setConnectionState(st)}
                className="rounded-xl text-[11px] h-7 px-3 font-semibold"
              >
                {st}
              </Button>
            ))}
          </div>
        </div>

        {/* DISCONNECTED WARNING BANNER */}
        {connectionState === 'Disconnected' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-start gap-3 text-xs font-medium"
          >
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Mobile App Disconnected</p>
              <p className="mt-0.5 text-muted-foreground">
                Your mobile device is not currently connected. Open WakeWay on your phone to ensure reliable destination alerts.
              </p>
            </div>
          </motion.div>
        )}

        {/* Main Grid: Left Status Metrics + Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Metrics, Status Indicator & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Journey Metrics Card */}
            <Card className="rounded-3xl border-border/60 bg-card shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Current Status
                  </div>
                  <div className="text-xl font-extrabold text-foreground mt-0.5">
                    Journey in progress
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                  Active
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Destination
                </div>
                <div className="text-3xl font-extrabold text-foreground tracking-tight mt-1 flex items-center gap-2">
                  <MapPin className="w-7 h-7 text-emerald-500 shrink-0" />
                  Chattogram
                </div>
                <p className="text-xs text-muted-foreground mt-1">Station Road, Agrabad, Chattogram</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-primary" /> Distance Remaining
                  </div>
                  <div className="text-2xl font-black text-foreground font-mono">2.4 km</div>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Est. Arrival
                  </div>
                  <div className="text-2xl font-black text-foreground">8 mins</div>
                </div>
              </div>
            </Card>

            {/* LARGE VISUAL STATUS INDICATOR: SLEEP MODE ACTIVE */}
            <Card className="rounded-3xl border-indigo-500/30 bg-gradient-to-br from-indigo-950/20 via-card to-card p-6 shadow-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0">
                  <Moon className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">Sleep Mode Active</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your WakeWay mobile app is monitoring your journey.
                  </p>
                </div>
              </div>
            </Card>

            {/* ARCHITECTURE CLARITY BOX */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 text-xs space-y-2">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Info className="w-4 h-4 text-primary" /> How Monitoring Works
              </div>
              <ul className="space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                <li><span className="font-semibold text-foreground">Web Dashboard:</span> Real-time route visualization & status dashboard.</li>
                <li><span className="font-semibold text-foreground">Mobile App:</span> Background GPS tracking & hardware alarm triggers.</li>
              </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowDetailsModal(true)}
                className="flex-1 rounded-2xl py-6 font-bold text-xs border-border/80"
              >
                View Trip Details
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowCancelModal(true)}
                className="flex-1 rounded-2xl py-6 font-bold text-xs"
              >
                Cancel Journey
              </Button>
            </div>
          </div>

          {/* Right Column: Live Map View */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                <span className="font-bold uppercase tracking-wider">Live Route Map</span>
                <span className="font-mono">Alert Radius: 500m</span>
              </div>
              <TripMap destination={sampleTripLocation} radiusMeters={500} />
            </div>
          </div>
        </div>
      </main>

      {/* TRIP DETAILS MODAL */}
      <AnimatePresence>
        {showDetailsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-bold text-base text-foreground">Trip Configuration Details</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailsModal(false)}>✕</Button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-bold text-foreground">Chattogram</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Wake-up Radius</span>
                  <span className="font-bold text-foreground">500 meters</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Alert Channels</span>
                  <span className="font-bold text-foreground">Sound + Vibration + Push</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Early Warning</span>
                  <span className="font-bold text-foreground">1 km Pre-alert</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Paired App</span>
                  <span className="font-bold text-emerald-500">WakeWay React Native</span>
                </div>
              </div>

              <Button onClick={() => setShowDetailsModal(false)} className="w-full rounded-2xl">
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CANCEL JOURNEY CONFIRMATION MODAL */}
      <AnimatePresence>
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">Cancel Active Journey?</h3>
                <p className="text-xs text-muted-foreground">
                  This will stop location monitoring on your mobile app and return to the dashboard.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setShowCancelModal(false)}>
                  Keep Active
                </Button>
                <Button variant="destructive" className="flex-1 rounded-2xl" onClick={handleCancelJourney}>
                  Yes, Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
