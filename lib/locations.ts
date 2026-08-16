export interface Hub {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  name: string;
}

export const CITIES: City[] = [
  { id: 'chandigarh', name: 'Chandigarh' },
  { id: 'mohali', name: 'Mohali' },
  { id: 'panchkula', name: 'Panchkula' },
  { id: 'delhi', name: 'Delhi (NCR)' },
];

export const HUBS: Record<string, Hub[]> = {
  chandigarh: [
    { id: 'chd_sec17', name: 'Sector 17 Plaza (Center)', lat: 30.7410, lng: 76.7795 },
    { id: 'chd_sec43', name: 'Sector 43 ISBT Bus Stand', lat: 30.7198, lng: 76.7523 },
    { id: 'chd_railway', name: 'Chandigarh Railway Station', lat: 30.7208, lng: 76.8173 },
    { id: 'chd_elante', name: 'Elante Mall Industrial Area', lat: 30.7061, lng: 76.8013 },
  ],
  mohali: [
    { id: 'moh_3b2', name: 'Phase 3B2 Market', lat: 30.7051, lng: 76.7232 },
    { id: 'moh_sec70', name: 'Phase 7 / Sector 70', lat: 30.7001, lng: 76.7291 },
    { id: 'moh_pca', name: 'PCA Cricket Stadium Phase 9', lat: 30.6908, lng: 76.7377 },
    { id: 'moh_airport', name: 'Airport Road / Junction', lat: 30.6659, lng: 76.7225 },
  ],
  panchkula: [
    { id: 'pkl_sec5', name: 'Sector 5 Downtown', lat: 30.6983, lng: 76.8504 },
    { id: 'pkl_sec11', name: 'Sector 11 Market Area', lat: 30.6917, lng: 76.8458 },
    { id: 'pkl_nada', name: 'Nada Sahib Gurudwara', lat: 30.6974, lng: 76.8817 },
    { id: 'pkl_pinjore', name: 'Pinjore Gardens Outskirts', lat: 30.7963, lng: 76.9152 },
  ],
  delhi: [
    { id: 'del_ndls', name: 'New Delhi Railway Station (NDLS)', lat: 28.6430, lng: 77.2223 },
    { id: 'del_airport', name: 'Indira Gandhi Int\'l Airport (T3)', lat: 28.5562, lng: 77.1000 },
    { id: 'del_isbt', name: 'Kashmiri Gate ISBT Bus Terminal', lat: 28.6677, lng: 77.2291 },
    { id: 'del_noida', name: 'Noida Sector 18 Hub', lat: 28.5708, lng: 77.3260 },
    { id: 'del_gurugram', name: 'Gurugram Cyber City', lat: 28.4950, lng: 77.0896 },
  ],
};

/**
 * Calculates the straight line (geodesic) distance in kilometers between two lat/lng coordinates.
 */
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates a realistic driving distance (in km) between predefined locations.
 * Uses geodesic distance scaled by winding factors for local/highway routes.
 */
export function calculateRouteDistance(
  pickupCityId: string,
  pickupHubId: string,
  dropCityId: string,
  dropHubId: string
): number {
  const pickupCityHubs = HUBS[pickupCityId];
  const dropCityHubs = HUBS[dropCityId];

  if (!pickupCityHubs || !dropCityHubs) return 0;

  const pickupHub = pickupCityHubs.find((h) => h.id === pickupHubId);
  const dropHub = dropCityHubs.find((h) => h.id === dropHubId);

  if (!pickupHub || !dropHub) return 0;

  if (pickupHub.id === dropHub.id) return 0;

  const geoDist = haversineDistance(pickupHub.lat, pickupHub.lng, dropHub.lat, dropHub.lng);

  // Apply routing multipliers:
  // Local or tri-city travel roads are more winding (factor 1.3 - 1.35)
  // Highway travel (Delhi to Tri-city) is straighter (factor 1.1)
  const isTriCity = (cityId: string) => ['chandigarh', 'mohali', 'panchkula'].includes(cityId);

  if (pickupCityId === dropCityId) {
    // Local within same city
    return Math.max(2.5, Math.round(geoDist * 1.3 * 10) / 10);
  } else if (isTriCity(pickupCityId) && isTriCity(dropCityId)) {
    // Inter-tri-city local travel (e.g. Mohali to Panchkula)
    return Math.max(5.0, Math.round(geoDist * 1.35 * 10) / 10);
  } else {
    // Tri-city <-> Delhi long-distance highway travel
    return Math.max(220.0, Math.round(geoDist * 1.1 * 10) / 10);
  }
}

/**
 * Helper to find a predefined Hub by its unique ID, and return the Hub and its City ID.
 */
export function findHubById(hubId: string): { cityId: string; hub: Hub } | null {
  for (const cityId of Object.keys(HUBS)) {
    const hub = HUBS[cityId].find((h) => h.id === hubId);
    if (hub) {
      return { cityId, hub };
    }
  }
  return null;
}
