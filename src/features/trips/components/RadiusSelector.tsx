'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BellRing, Sliders } from 'lucide-react';

export interface RadiusOption {
  label: string;
  valueMeters: number;
}

const presets: RadiusOption[] = [
  { label: '100 m', valueMeters: 100 },
  { label: '250 m', valueMeters: 250 },
  { label: '500 m', valueMeters: 500 },
  { label: '1 km', valueMeters: 1000 },
  { label: '2 km', valueMeters: 2000 },
];

interface RadiusSelectorProps {
  selectedMeters: number;
  onRadiusChange: (meters: number) => void;
}

export function RadiusSelector({ selectedMeters, onRadiusChange }: RadiusSelectorProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState(selectedMeters.toString());

  const handlePresetSelect = (meters: number) => {
    setIsCustom(false);
    onRadiusChange(meters);
  };

  const handleCustomSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setCustomValue(e.target.value);
    if (!isNaN(val) && val > 0) {
      onRadiusChange(val);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <BellRing className="w-3.5 h-3.5 text-primary" /> Wake-Up Alert Radius
        </label>
        <span className="text-xs font-bold font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          {selectedMeters >= 1000 ? `${(selectedMeters / 1000).toFixed(1)} km` : `${selectedMeters} meters`}
        </span>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {presets.map((preset) => {
          const isSelected = !isCustom && selectedMeters === preset.valueMeters;
          return (
            <Button
              key={preset.label}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePresetSelect(preset.valueMeters)}
              className="rounded-xl text-xs font-semibold py-4"
            >
              {preset.label}
            </Button>
          );
        })}

        {/* Custom Button */}
        <Button
          type="button"
          variant={isCustom ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            setIsCustom(true);
            onRadiusChange(parseInt(customValue, 10) || 500);
          }}
          className="rounded-xl text-xs font-semibold py-4"
        >
          Custom
        </Button>
      </div>

      {/* Custom Input Field */}
      {isCustom && (
        <div className="pt-2 flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Enter radius in meters..."
              value={customValue}
              onChange={handleCustomSubmit}
              className="h-10 rounded-xl text-xs"
              min={50}
              max={10000}
            />
          </div>
          <span className="text-xs font-medium text-muted-foreground">meters</span>
        </div>
      )}
    </div>
  );
}
