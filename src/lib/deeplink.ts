export interface TripConfigParams {
  tripId?: string;
  destinationName: string;
  destinationAddress: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  alertSound: boolean;
  alertVibration: boolean;
  alertNotification: boolean;
  earlyWarning: 'Off' | '1km' | '2km';
}

/**
 * Generates universal and custom scheme deep links for opening trips directly in the WakeWay React Native Mobile App.
 */
export function generateTripDeepLink(config: TripConfigParams): {
  customSchemeUrl: string;
  universalLinkUrl: string;
  jsonPayload: string;
} {
  const tripId = config.tripId || `trip_${Date.now()}`;
  const params = new URLSearchParams({
    id: tripId,
    dest: config.destinationName,
    addr: config.destinationAddress,
    lat: config.lat.toString(),
    lng: config.lng.toString(),
    radius: config.radiusMeters.toString(),
    sound: config.alertSound ? '1' : '0',
    vib: config.alertVibration ? '1' : '0',
    notif: config.alertNotification ? '1' : '0',
    earlyWarn: config.earlyWarning,
  });

  const customSchemeUrl = `wakeway://trip/configure?${params.toString()}`;
  const universalLinkUrl = `https://wakeway.app/trip/configure?${params.toString()}`;

  return {
    customSchemeUrl,
    universalLinkUrl,
    jsonPayload: JSON.stringify({ tripId, ...config }),
  };
}
