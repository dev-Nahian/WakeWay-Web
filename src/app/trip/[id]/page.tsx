'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTripSync } from '@/hooks/useTripSync';
import { LocationDetail } from '@/features/trips/components/PlacesAutocomplete';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Code splitting / Dynamic import for interactive map
const TripMap = dynamic(() => import('@/features/trips/components/TripMap').then((mod) => mod.TripMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-3xl bg-secondary/30 border border-border/60 animate-pulse flex items-center justify-center text-xs text-muted-foreground">
      Loading live map view...
    </div>
  ),
});
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
  Download,
  Share2,
  QrCode,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function ActiveJourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Use Real-Time Sync Hook
  const { trip, deviceStatus, isLoading, isWebSocketConnected, setTripStatus } = useTripSync(
    resolvedParams.id
  );

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAppDownloadBanner, setShowAppDownloadBanner] = useState(true);

  // Deep Link Architecture URLs
  const customSchemeUrl = `wakeway://trip/${resolvedParams.id}`;
  const universalLinkUrl = `https://wakeway.app/trip/${resolvedParams.id}`;

  const sampleTripLocation: LocationDetail = {
    name: trip?.destinationName || 'Chattogram Railway Station',
    address: trip?.destinationAddress || 'Station Road, Agrabad, Chattogram, Bangladesh',
    lat: trip?.lat || 22.3354,
    lng: trip?.lng || 91.8315,
    distanceKm: trip?.distanceRemainingKm ?? 2.4,
  };

  const handleCancelJourney = () => {
    setTripStatus('cancelled');
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
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    trip?.status === 'completed'
                      ? 'bg-blue-500'
                      : trip?.status === 'monitoring'
                      ? 'bg-emerald-500 animate-ping'
                      : 'bg-amber-500'
                  }`}
                />
                <h1 className="text-base font-extrabold text-foreground">Active Journey</h1>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono hidden sm:block">
                ID: {resolvedParams.id}
              </p>
            </div>
          </div>

          {/* Real-time Connection & Mobile Status */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
              <span>Real-time Sync Active</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
              <span>Mobile: {deviceStatus}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* WEB FALLBACK BANNER: GET WAKEWAY MOBILE */}
        {showAppDownloadBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-gradient-to-r from-card via-card to-secondary/50 border border-primary/30 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
                  Get WakeWay Mobile
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    iOS & Android
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You are viewing web fallback visualization. Open link in app for background GPS alerts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 z-10 self-end md:self-auto">
              <Button
                onClick={() => (window.location.href = customSchemeUrl)}
                size="sm"
                className="rounded-2xl text-xs font-bold gap-1.5"
              >
                Open in App <ExternalLink className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAppDownloadBanner(false)}
                className="rounded-full text-xs text-muted-foreground"
              >
                Dismiss
              </Button>
            </div>
          </motion.div>
        )}

        {/* Main Grid: Left Status Metrics + Right Live Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Journey Metrics Card */}
            <Card className="rounded-3xl border-border/60 bg-card shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Current Status
                  </div>
                  <div className="text-xl font-extrabold text-foreground mt-0.5 capitalize">
                    {trip?.status === 'completed'
                      ? 'Destination Reached 🎉'
                      : trip?.status === 'cancelled'
                      ? 'Journey Cancelled'
                      : 'Journey in progress'}
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase">
                  {trip?.status || 'monitoring'}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Destination
                </div>
                <div className="text-3xl font-extrabold text-foreground tracking-tight mt-1 flex items-center gap-2">
                  <MapPin className="w-7 h-7 text-emerald-500 shrink-0" />
                  {trip?.destinationName || 'Chattogram'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {trip?.destinationAddress || 'Station Road, Agrabad, Chattogram'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-primary" /> Distance Remaining
                  </div>
                  <div className="text-2xl font-black text-foreground font-mono">
                    {trip?.distanceRemainingKm ?? 2.4} km
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Est. Arrival
                  </div>
                  <div className="text-2xl font-black text-foreground">
                    {trip?.etaMinutes ?? 8} mins
                  </div>
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
                    Your WakeWay mobile app is monitoring your journey in real time.
                  </p>
                </div>
              </div>
            </Card>

            {/* MOBILE HANDOFF QR CODE CARD */}
            <Card className="rounded-3xl border-border/60 bg-card p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-primary" /> Mobile App Universal Deep Link
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">`wakeway://`</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white border border-zinc-200 shrink-0">
                  <QRCodeSVG value={customSchemeUrl} size={90} level="M" />
                </div>
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-foreground">Open on Mobile</p>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Scan code with your phone camera to transition live tracking to native iOS or Android app.
                  </p>
                </div>
              </div>
            </Card>

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
                <span className="font-mono">Alert Radius: {trip?.radiusMeters || 500}m</span>
              </div>
              <TripMap destination={sampleTripLocation} radiusMeters={trip?.radiusMeters || 500} />
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
                <h3 className="font-bold text-base text-foreground">Trip Details & Sync Payload</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowDetailsModal(false)}>✕</Button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-bold text-foreground">{trip?.destinationName}</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Wake Radius</span>
                  <span className="font-bold text-foreground">{trip?.radiusMeters || 500} meters</span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Universal Link</span>
                  <span className="font-mono text-[10px] text-primary truncate max-w-[200px]">
                    {universalLinkUrl}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-secondary/50 flex justify-between">
                  <span className="text-muted-foreground">Mobile Device</span>
                  <span className="font-bold text-emerald-500">Android / iOS Paired</span>
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
                  This will update status to cancelled and stop tracking on your mobile app.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-2xl text-xs" onClick={() => setShowCancelModal(false)}>
                  Keep Active
                </Button>
                <Button variant="destructive" className="flex-1 rounded-2xl text-xs font-bold" onClick={handleCancelJourney}>
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
