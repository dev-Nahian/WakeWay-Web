import { z } from 'zod';

/**
 * Coordinate validation schema (Latitude: -90 to 90, Longitude: -180 to 180)
 */
export const coordinateSchema = z.object({
  lat: z.number().min(-90, 'Latitude must be >= -90').max(90, 'Latitude must be <= 90'),
  lng: z.number().min(-180, 'Longitude must be >= -180').max(180, 'Longitude must be <= 180'),
});

/**
 * Trip creation validation schema enforcing server-enforced bounds
 */
export const createTripSecuritySchema = z.object({
  destinationName: z
    .string()
    .min(1, 'Destination name is required')
    .max(200, 'Destination name cannot exceed 200 characters')
    .trim(),
  destinationAddress: z
    .string()
    .min(1, 'Destination address is required')
    .max(500, 'Destination address cannot exceed 500 characters')
    .trim(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radiusMeters: z
    .number()
    .min(50, 'Minimum alert radius is 50 meters')
    .max(10000, 'Maximum alert radius is 10,000 meters (10km)'),
  alertSound: z.boolean().optional().default(true),
  alertVibration: z.boolean().optional().default(true),
  alertNotification: z.boolean().optional().default(true),
  earlyWarning: z.enum(['Off', '1km', '2km']).optional().default('1km'),
});

/**
 * User Authorization & Ownership Guard
 * Verifies that the trip's userId matches the authenticated user ID.
 */
export function authorizeTripOwnership(tripUserId: string, currentUserId: string): boolean {
  if (!currentUserId || !tripUserId) return false;
  return tripUserId === currentUserId;
}

/**
 * XSS & HTML Input Sanitizer Utility
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
