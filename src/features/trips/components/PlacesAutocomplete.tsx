'use client';

import { useState } from 'react';
import { Search, MapPin, Navigation, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface LocationDetail {
  name: string;
  address: string;
  lat: number;
  lng: number;
  distanceKm: number;
}

const mockPlaces: LocationDetail[] = [
  {
    name: 'Chattogram Railway Station',
    address: 'Station Road, Agrabad, Chattogram, Bangladesh',
    lat: 22.3354,
    lng: 91.8315,
    distanceKm: 242.5,
  },
  {
    name: "Cox's Bazar Sea Beach",
    address: 'Kolatoli Road, Cox’s Bazar, Bangladesh',
    lat: 21.4272,
    lng: 91.9702,
    distanceKm: 395.2,
  },
  {
    name: 'Dhaka Hazrat Shahjalal Airport',
    address: 'Airport Road, Kurmitola, Dhaka, Bangladesh',
    lat: 23.8433,
    lng: 90.4047,
    distanceKm: 14.2,
  },
  {
    name: 'Sylhet Central Bus Terminal',
    address: 'Kadamtali, Sylhet, Bangladesh',
    lat: 24.8898,
    lng: 91.8697,
    distanceKm: 238.1,
  },
];

interface PlacesAutocompleteProps {
  onSelectLocation: (loc: LocationDetail) => void;
  selectedLocation: LocationDetail | null;
}

export function PlacesAutocomplete({ onSelectLocation, selectedLocation }: PlacesAutocompleteProps) {
  const [query, setQuery] = useState(selectedLocation?.name || '');
  const [isOpen, setIsOpen] = useState(false);

  const filteredPlaces = mockPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(query.toLowerCase()) ||
      place.address.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (place: LocationDetail) => {
    setQuery(place.name);
    onSelectLocation(place);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5 block">
          Search Destination
        </label>
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search Google Maps location..."
            className="pl-10 h-12 rounded-2xl bg-card border-border/80 shadow-sm"
          />
        </div>

        {/* Autocomplete Suggestions Dropdown */}
        {isOpen && filteredPlaces.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-card border border-border/80 shadow-xl overflow-hidden z-50 divide-y divide-border/40">
            {filteredPlaces.map((place) => (
              <button
                key={place.name}
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full p-3.5 text-left hover:bg-secondary/70 transition-colors flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-foreground truncate">{place.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{place.address}</div>
                </div>
                <div className="text-xs font-mono font-medium text-muted-foreground shrink-0">
                  {place.distanceKm} km
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Location Meta Card */}
      {selectedLocation && (
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-foreground">
            <span className="flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-primary" /> {selectedLocation.name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-mono text-[11px]">
              {selectedLocation.distanceKm} km away
            </span>
          </div>

          <p className="text-muted-foreground">{selectedLocation.address}</p>

          <div className="pt-2 border-t border-border/40 grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-foreground">
            <div>
              <span className="text-foreground font-semibold">Lat:</span> {selectedLocation.lat.toFixed(4)}° N
            </div>
            <div>
              <span className="text-foreground font-semibold">Lng:</span> {selectedLocation.lng.toFixed(4)}° E
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
