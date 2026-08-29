'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationDetail } from './PlacesAutocomplete';
import { RadiusSelector } from './RadiusSelector';
import { TripMap } from './TripMap';
import { generateTripDeepLink } from '@/lib/deeplink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  MapPin,
  Volume2,
  VolumeX,
  Vibrate,
  Bell,
  AlertCircle,
  Smartphone,
  QrCode,
  ArrowRight,
  Edit3,
  CheckCircle2,
  Copy,
  Check,
  ShieldAlert,
  Play,
  Navigation,
  Clock,
} from 'lucide-react';

interface TripConfigInterfaceProps {
  destination: LocationDetail;
  onEditDestination: () => void;
}

export function TripConfigInterface({ destination, onEditDestination }: TripConfigInterfaceProps) {
  // Configuration States
  const [radiusMeters, setRadiusMeters] = useState<number>(500);
  const [alertSound, setAlertSound] = useState<boolean>(true);
  const [alertVibration, setAlertVibration] = useState<boolean>(true);
  const [alertNotification, setAlertNotification] = useState<boolean>(true);
  const [earlyWarning, setEarlyWarning] = useState<'Off' | '1km' | '2km'>('1km');

  // Handoff & Journey Active States
  const [showMobileHandoff, setShowMobileHandoff] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const deepLinks = generateTripDeepLink({
    destinationName: destination.name,
    destinationAddress: destination.address,
    lat: destination.lat,
    lng: destination.lng,
    radiusMeters,
    alertSound,
    alertVibration,
    alertNotification,
    earlyWarning,
  });

  const handleStartJourney = () => {
    setIsJourneyStarted(true);
    // Show mobile handoff explanation modal on desktop
    setShowMobileHandoff(true);
  };

  const handleCopyDeepLink = () => {
    navigator.clipboard.writeText(deepLinks.universalLinkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 selection:bg-primary selection:text-primary-foreground">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            Trip Configuration
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="w-7 h-7 text-primary" /> {destination.name}
          </h1>
        </div>

        <Button
          variant="outline"
          onClick={onEditDestination}
          className="rounded-2xl border-border/80 hover:bg-secondary text-xs gap-2 self-start sm:self-auto"
        >
          <Edit3 className="w-4 h-4 text-muted-foreground" /> Edit Destination
        </Button>
      </div>

      {/* Main Grid: Left Config Form + Right Visual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Section 1: Wake-Up Radius */}
          <Card className="rounded-3xl border-border/60 bg-card shadow-sm p-6 space-y-4">
            <RadiusSelector selectedMeters={radiusMeters} onRadiusChange={setRadiusMeters} />
          </Card>

          {/* Section 2: Alert Preferences */}
          <Card className="rounded-3xl border-border/60 bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Alert Preferences
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setAlertSound(!alertSound)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                  alertSound
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  {alertSound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span className={`w-2.5 h-2.5 rounded-full ${alertSound ? 'bg-primary' : 'bg-muted'}`} />
                </div>
                <div>
                  <div className="font-bold text-xs">Audio Sound</div>
                  <div className="text-[10px] opacity-80">{alertSound ? 'Loud Alarm' : 'Muted'}</div>
                </div>
              </button>

              {/* Vibration Toggle */}
              <button
                type="button"
                onClick={() => setAlertVibration(!alertVibration)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                  alertVibration
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Vibrate className="w-5 h-5" />
                  <span className={`w-2.5 h-2.5 rounded-full ${alertVibration ? 'bg-primary' : 'bg-muted'}`} />
                </div>
                <div>
                  <div className="font-bold text-xs">Vibration</div>
                  <div className="text-[10px] opacity-80">{alertVibration ? 'Enabled' : 'Disabled'}</div>
                </div>
              </button>

              {/* Push Notification Toggle */}
              <button
                type="button"
                onClick={() => setAlertNotification(!alertNotification)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between h-24 ${
                  alertNotification
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Bell className="w-5 h-5" />
                  <span className={`w-2.5 h-2.5 rounded-full ${alertNotification ? 'bg-primary' : 'bg-muted'}`} />
                </div>
                <div>
                  <div className="font-bold text-xs">Notification</div>
                  <div className="text-[10px] opacity-80">{alertNotification ? 'High Priority' : 'Off'}</div>
                </div>
              </button>
            </div>
          </Card>

          {/* Section 3: Early Warning */}
          <Card className="rounded-3xl border-border/60 bg-card shadow-sm p-6 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Early Warning (Optional)
              </label>
              <span className="text-xs font-semibold text-primary">{earlyWarning}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['Off', '1km', '2km'] as const).map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={earlyWarning === option ? 'default' : 'outline'}
                  onClick={() => setEarlyWarning(option)}
                  className="rounded-xl text-xs font-semibold py-4"
                >
                  {option === 'Off' ? 'Off' : `Pre-alert ${option}`}
                </Button>
              ))}
            </div>
          </Card>

          {/* Section 4: Trip Summary Card */}
          <Card className="rounded-3xl border-border/80 bg-secondary/30 p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center justify-between">
              <span>Trip Summary</span>
              <span className="text-primary font-mono">{destination.distanceKm} km total</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-card border border-border/40">
                <span className="text-muted-foreground block text-[11px]">Wake-up Radius</span>
                <span className="font-bold font-mono text-foreground">
                  {radiusMeters >= 1000 ? `${radiusMeters / 1000} km` : `${radiusMeters} m`}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-card border border-border/40">
                <span className="text-muted-foreground block text-[11px]">Early Warning</span>
                <span className="font-bold text-foreground">{earlyWarning}</span>
              </div>
              <div className="p-3 rounded-2xl bg-card border border-border/40 col-span-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[11px]">Active Alerts</span>
                <span className="font-bold text-foreground">
                  {[alertSound && 'Sound', alertVibration && 'Vibration', alertNotification && 'Push']
                    .filter(Boolean)
                    .join(' + ') || 'None'}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              <Button
                onClick={handleStartJourney}
                size="lg"
                className="w-full rounded-2xl py-6 text-base font-bold shadow-lg shadow-primary/20"
              >
                <Play className="mr-2 h-5 w-5 fill-current" /> Start Journey
              </Button>
              <Button
                variant="outline"
                onClick={onEditDestination}
                className="w-full rounded-2xl border-border/80 text-xs font-medium"
              >
                Edit Destination
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Visual Preview Map */}
        <div className="lg:col-span-6 sticky top-24 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
            Visual Radius Preview
          </div>
          <TripMap destination={destination} radiusMeters={radiusMeters} />
        </div>
      </div>

      {/* DESKTOP HANDOFF / QR CODE / DEEP LINK MODAL */}
      <AnimatePresence>
        {showMobileHandoff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-foreground">Continue on Mobile</h3>
                    <p className="text-xs text-muted-foreground">WakeWay Companion Handoff</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileHandoff(false)}
                  className="rounded-full"
                >
                  ✕
                </Button>
              </div>

              {/* Explanatory Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Desktop Browser Notice
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Web browsers cannot guarantee background location tracking when your computer sleeps or screen turns off. For continuous monitoring and loud wake-up alarms, continue this journey in your <span className="font-bold text-foreground">WakeWay Mobile App</span>.
                </p>
              </div>

              {/* Real Interactive QR Code */}
              <div className="flex flex-col items-center justify-center space-y-3 p-6 rounded-2xl bg-white border border-zinc-200 text-center shadow-inner">
                <QRCodeSVG
                  value={deepLinks.customSchemeUrl}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
                <p className="text-xs text-zinc-600 font-medium">Scan with your smartphone camera</p>
              </div>

              {/* Deep Link & Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleCopyDeepLink}
                  variant="outline"
                  className="w-full rounded-2xl py-5 text-xs font-semibold gap-2 border-border/80"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" /> Deep Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Universal Mobile Link
                    </>
                  )}
                </Button>

                <div className="flex gap-3">
                  <Button
                    onClick={() => (window.location.href = deepLinks.customSchemeUrl)}
                    className="flex-1 rounded-2xl py-5 text-xs font-bold shadow-md"
                  >
                    Open App (`wakeway://`)
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowMobileHandoff(false)}
                    className="rounded-2xl text-xs text-muted-foreground"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
