export interface CabFareConfig {
  baseFare: number;
  ratePerKm: number;
  label: string;
}

export interface TempoFareConfig {
  baseFare: number; // Includes first 3 or 5 kms
  includedKms: number;
  ratePerKm: number;
  label: string;
}

export const CAB_FARES: Record<string, CabFareConfig> = {
  hatchback: { baseFare: 100, ratePerKm: 12, label: 'Hatchback (Alto, Nios, WagonR)' },
  sedan: { baseFare: 150, ratePerKm: 15, label: 'Sedan (Dzire, Aura, Etios)' },
  suv: { baseFare: 250, ratePerKm: 20, label: 'SUV (Ertiga, Innova)' },
  premium: { baseFare: 400, ratePerKm: 30, label: 'Premium Sedan/SUV' },
  tempo: { baseFare: 600, ratePerKm: 25, label: 'Tempo Traveller (12-20 Seater)' },
};

export const TEMPO_FARES: Record<string, TempoFareConfig> = {
  tata_ace: { baseFare: 400, includedKms: 3, ratePerKm: 25, label: 'Tata Ace Gold' },
  mahindra_supro: { baseFare: 450, includedKms: 3, ratePerKm: 24, label: 'Mahindra Supro' },
  pickup: { baseFare: 600, includedKms: 5, ratePerKm: 30, label: 'Bolero Pickup' },
  small_truck: { baseFare: 1000, includedKms: 5, ratePerKm: 40, label: 'Small Truck (4-Tyre)' },
  medium_truck: { baseFare: 1800, includedKms: 5, ratePerKm: 55, label: 'Medium Truck (6-Tyre)' },
};

/**
 * Calculates the estimated cab fare.
 * Returns null if distance is not available (triggering the fallback message).
 */
export function calculateCabFare(cabType: string, distanceKm?: number): number | null {
  if (!distanceKm || distanceKm <= 0) return null;
  
  const key = cabType.toLowerCase().replace(/\s+/g, '_');
  
  // If it is a cargo tempo, calculate using tempo fare function
  if (['tata_ace', 'mahindra_supro', 'pickup'].includes(key)) {
    return calculateTempoFare(key, distanceKm);
  }
  
  const config = CAB_FARES[key];
  if (!config) return null;
  
  const fare = config.baseFare + (distanceKm * config.ratePerKm);
  return Math.round(fare);
}

/**
 * Calculates the estimated tempo fare.
 * Returns null if distance is not available.
 */
export function calculateTempoFare(vehicleType: string, distanceKm?: number): number | null {
  if (!distanceKm || distanceKm <= 0) return null;
  
  const key = vehicleType.toLowerCase().replace(/\s+/g, '_');
  const config = TEMPO_FARES[key];
  if (!config) return null;
  
  let fare = config.baseFare;
  if (distanceKm > config.includedKms) {
    const extraDistance = distanceKm - config.includedKms;
    fare += extraDistance * config.ratePerKm;
  }
  
  return Math.round(fare);
}
