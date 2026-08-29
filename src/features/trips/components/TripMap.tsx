'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Layers, Plus, Minus, Move } from 'lucide-react';
import { LocationDetail } from './PlacesAutocomplete';

interface TripMapProps {
  destination: LocationDetail;
  radiusMeters: number;
  onMapClick?: (lat: number, lng: number) => void;
}

export function TripMap({ destination, radiusMeters, onMapClick }: TripMapProps) {
  // Convert radius in meters to scaled visual SVG radius
  const scaledRadiusPx = Math.min(Math.max((radiusMeters / 100) * 12, 35), 140);

  const handleSimulatedClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onMapClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click coordinates to simulated lat/lng tweak
    const newLat = destination.lat + (y - rect.height / 2) * -0.001;
    const newLng = destination.lng + (x - rect.width / 2) * 0.001;
    onMapClick(newLat, newLng);
  };

  return (
    <div
      onClick={handleSimulatedClick}
      className="relative w-full h-full min-h-[420px] lg:min-h-[600px] rounded-3xl border border-border/80 bg-card overflow-hidden cursor-crosshair shadow-lg group select-none"
    >
      {/* Grid Pattern Simulating Interactive Map Tiles */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />

      {/* Stylized Vector Roads & Routes */}
      <svg className="absolute inset-0 w-full h-full fill-none">
        {/* Road Base Lines */}
        <path d="M 0 200 Q 250 150 600 350" stroke="currentColor" strokeWidth="12" className="text-muted/40" />
        <path d="M 120 0 Q 200 300 450 600" stroke="currentColor" strokeWidth="8" className="text-muted/30" />

        {/* Route Line connecting Current Location to Destination */}
        <path
          d="M 120 420 Q 220 280 420 180"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray="6 6"
          className="text-primary/40"
        />

        {/* Animated Active Route Gradient */}
        <motion.path
          d="M 120 420 Q 220 280 420 180"
          stroke="url(#map-route-gradient)"
          strokeWidth="5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />

        <defs>
          <linearGradient id="map-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      {/* CURRENT LOCATION MARKER */}
      <div className="absolute left-[120px] top-[420px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-10 h-10 rounded-full bg-blue-500/20 animate-ping" />
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
            <Navigation className="w-5 h-5 rotate-45 fill-white" />
          </div>
        </div>
        <div className="mt-1 px-2.5 py-0.5 rounded-md bg-card/90 border border-border text-[10px] font-bold shadow-md backdrop-blur-md">
          Your Location (Dhaka)
        </div>
      </div>

      {/* DESTINATION MARKER & ALERT RADIUS CIRCLE */}
      <div className="absolute left-[420px] top-[180px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
        {/* Dynamic Alert Radius Ring */}
        <motion.div
          style={{ width: `${scaledRadiusPx * 2}px`, height: `${scaledRadiusPx * 2}px` }}
          className="absolute rounded-full border-2 border-emerald-500/50 bg-emerald-500/15 pointer-events-none flex items-center justify-center"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-background/80 px-2 py-0.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
            {radiusMeters >= 1000 ? `${(radiusMeters / 1000).toFixed(1)} km` : `${radiusMeters} m`}
          </div>
        </motion.div>

        {/* Destination Pin */}
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xl border-2 border-white dark:border-zinc-900">
            <MapPin className="w-7 h-7 fill-emerald-600 text-white" />
          </div>
        </div>
        <div className="mt-1 px-3 py-1 rounded-lg bg-emerald-950/90 text-emerald-100 border border-emerald-800 text-xs font-bold shadow-lg backdrop-blur-md">
          {destination.name}
        </div>
      </div>

      {/* Map Control Overlay Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        <div className="bg-card/90 border border-border/80 rounded-2xl p-1.5 shadow-lg backdrop-blur-md flex flex-col gap-1 text-muted-foreground">
          <button className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-px bg-border/40 my-0.5" />
          <button className="p-2 hover:bg-secondary rounded-xl transition-colors">
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Click Map Helper Tag */}
      <div className="absolute bottom-4 left-4 bg-background/80 border border-border/60 rounded-full px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground shadow-md backdrop-blur-md flex items-center gap-1.5">
        <Move className="w-3.5 h-3.5 text-primary" />
        <span>Click map to fine-tune destination</span>
      </div>
    </div>
  );
}
