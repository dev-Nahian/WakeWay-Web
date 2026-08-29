'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/landing/Navbar';
import { PlacesAutocomplete, LocationDetail } from '@/features/trips/components/PlacesAutocomplete';
import { RadiusSelector } from '@/features/trips/components/RadiusSelector';
import { TripMap } from '@/features/trips/components/TripMap';
import { TripPreviewCard } from '@/features/trips/components/TripPreviewCard';
import { ArrowLeft, CheckCircle2, Navigation2, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const defaultLocation: LocationDetail = {
  name: 'Chattogram Railway Station',
  address: 'Station Road, Agrabad, Chattogram, Bangladesh',
  lat: 22.3354,
  lng: 91.8315,
  distanceKm: 242.5,
};

export default function PlanTripPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<LocationDetail>(defaultLocation);
  const [radiusMeters, setRadiusMeters] = useState<number>(500); // Default 500m
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleMapAdjust = (newLat: number, newLng: number) => {
    setSelectedLocation((prev) => ({
      ...prev,
      lat: newLat,
      lng: newLng,
      name: `${prev.name} (Fine-tuned Pin)`,
    }));
  };

  const handleCreateTrip = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      setIsCreated(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar / Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Navigation2 className="h-4 w-4 rotate-45" />
              </div>
              <span className="text-lg font-bold tracking-tight">Plan a Trip</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <Smartphone className="w-3.5 h-3.5" /> React Native Sync Ready
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {isCreated ? (
          /* SUCCESS STATE AFTER TRIP CREATION */
          <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl border border-emerald-500/30 bg-card shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-foreground">Trip Successfully Created!</h2>
              <p className="text-sm text-muted-foreground">
                Destination <span className="font-bold text-foreground">{selectedLocation.name}</span> with a{' '}
                <span className="font-bold text-foreground">
                  {radiusMeters >= 1000 ? `${radiusMeters / 1000} km` : `${radiusMeters} m`}
                </span>{' '}
                wake radius has been synchronized.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/60 text-xs text-muted-foreground space-y-1 text-left">
              <p className="font-bold text-foreground flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-500" /> Next Step on Mobile App
              </p>
              <p>Open your WakeWay mobile application to initiate background location tracking and audio alerts.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => setIsCreated(false)}>
                Configure Another Trip
              </Button>
              <Button className="flex-1 rounded-2xl" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </div>
        ) : (
          /* DEFAULT SPLIT LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Configuration & Details) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Where are you going?</h1>
                <p className="text-xs text-muted-foreground">
                  Select your destination using Google Places Autocomplete and configure your trigger radius.
                </p>
              </div>

              {/* Places Autocomplete Input */}
              <PlacesAutocomplete
                selectedLocation={selectedLocation}
                onSelectLocation={setSelectedLocation}
              />

              {/* Alert Radius Selector */}
              <RadiusSelector
                selectedMeters={radiusMeters}
                onRadiusChange={setRadiusMeters}
              />

              {/* Trip Preview & Confirmation */}
              <TripPreviewCard
                destination={selectedLocation}
                radiusMeters={radiusMeters}
                onCreateTrip={handleCreateTrip}
                isCreating={isCreating}
              />
            </div>

            {/* Right Column (Large Interactive Map) */}
            <div className="lg:col-span-7 h-full">
              <div className="sticky top-24">
                <TripMap
                  destination={selectedLocation}
                  radiusMeters={radiusMeters}
                  onMapClick={handleMapAdjust}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
