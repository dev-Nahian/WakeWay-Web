'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocationDetail } from './PlacesAutocomplete';
import { MapPin, Navigation, Clock, Bell, Smartphone, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface TripPreviewCardProps {
  destination: LocationDetail;
  radiusMeters: number;
  onCreateTrip: () => void;
  isCreating: boolean;
}

export function TripPreviewCard({
  destination,
  radiusMeters,
  onCreateTrip,
  isCreating,
}: TripPreviewCardProps) {
  // Calculate approximate travel time assuming average speed of ~55 km/h for intercity transit
  const totalMinutes = Math.round((destination.distanceKm / 55) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const travelTimeFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins} mins`;

  return (
    <Card className="rounded-3xl border-border/80 bg-card shadow-sm space-y-4">
      <CardHeader className="pb-3 border-b border-border/40">
        <CardTitle className="text-base font-bold flex items-center justify-between">
          <span>Trip Summary & Preview</span>
          <span className="text-xs font-normal text-muted-foreground">Ready to sync</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" /> Destination
            </div>
            <div className="text-sm font-bold text-foreground truncate">{destination.name}</div>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-primary" /> Distance
            </div>
            <div className="text-sm font-bold text-foreground font-mono">{destination.distanceKm} km</div>
          </div>

          <div className="p-3 rounded-2xl bg-secondary/50 border border-border/40 space-y-1">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-primary" /> Travel Time
            </div>
            <div className="text-sm font-bold text-foreground">{travelTimeFormatted}</div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              <Bell className="w-3.5 h-3.5 text-emerald-500" /> Alert Radius
            </div>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {radiusMeters >= 1000 ? `${(radiusMeters / 1000).toFixed(1)} km` : `${radiusMeters} m`}
            </div>
          </div>
        </div>

        {/* Mandatory Reliability Notice Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
          <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" /> Mobile App Priority Notice
          </div>
          <p className="text-muted-foreground leading-relaxed text-[11px]">
            This website configures your trip. For reliable continuous background location monitoring and guaranteed loud wake-up alarms, please ensure your <span className="font-bold text-foreground">WakeWay React Native mobile app</span> is open during travel.
          </p>
        </div>

        <Button
          onClick={onCreateTrip}
          disabled={isCreating}
          size="lg"
          className="w-full rounded-2xl py-6 text-base font-bold shadow-lg shadow-primary/10"
        >
          {isCreating ? (
            'Creating Trip...'
          ) : (
            <>
              Create Trip <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
