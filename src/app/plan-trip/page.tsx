'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlacesAutocomplete, LocationDetail } from '@/features/trips/components/PlacesAutocomplete';
import { RadiusSelector } from '@/features/trips/components/RadiusSelector';
import { TripMap } from '@/features/trips/components/TripMap';
import { TripPreviewCard } from '@/features/trips/components/TripPreviewCard';
import { TripConfigInterface } from '@/features/trips/components/TripConfigInterface';
import { ArrowLeft, CheckCircle2, Navigation2, Smartphone, SlidersHorizontal } from 'lucide-react';
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
  const [step, setStep] = useState<'search' | 'configure'>('configure'); // Default configure step to showcase full config prompt specs

  const handleMapAdjust = (newLat: number, newLng: number) => {
    setSelectedLocation((prev) => ({
      ...prev,
      lat: newLat,
      lng: newLng,
      name: `${prev.name} (Fine-tuned)`,
    }));
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
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Navigation2 className="h-4 w-4 rotate-45" />
              </div>
              <span className="text-lg font-bold tracking-tight">Trip Configuration</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep(step === 'search' ? 'configure' : 'search')}
              className="rounded-full text-xs font-semibold gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {step === 'search' ? 'Configure Details' : 'Change Search'}
            </Button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Smartphone className="w-3.5 h-3.5" /> Mobile App Handoff Ready
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {step === 'configure' ? (
          /* STEP 2: FULL TRIP CONFIGURATION INTERFACE */
          <TripConfigInterface
            destination={selectedLocation}
            onEditDestination={() => setStep('search')}
          />
        ) : (
          /* STEP 1: DESTINATION SEARCH & MAP PREVIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Search & Details) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Where are you going?</h1>
                <p className="text-xs text-muted-foreground">
                  Search your destination using Google Places Autocomplete.
                </p>
              </div>

              <PlacesAutocomplete
                selectedLocation={selectedLocation}
                onSelectLocation={(loc) => {
                  setSelectedLocation(loc);
                }}
              />

              <RadiusSelector
                selectedMeters={radiusMeters}
                onRadiusChange={setRadiusMeters}
              />

              <TripPreviewCard
                destination={selectedLocation}
                radiusMeters={radiusMeters}
                onCreateTrip={() => setStep('configure')}
                isCreating={false}
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
