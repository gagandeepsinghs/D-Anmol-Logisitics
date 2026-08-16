'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Hub } from '@/lib/locations';

interface RouteMapProps {
  pickupHub?: Hub | null;
  dropHub?: Hub | null;
  distanceKm?: number | null;
}

export default function RouteMap({ pickupHub, dropHub, distanceKm }: RouteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const marker1Ref = useRef<any>(null);
  const marker2Ref = useRef<any>(null);
  const lineRef = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initLeaflet = async () => {
      try {
        const L = await import('leaflet');
        // Fix Leaflet marker icon paths (broken by default in NextJS bundlers)
        delete (L as any).Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
        setLeafletLoaded(true);
      } catch (err) {
        console.error('Error importing Leaflet:', err);
      }
    };

    initLeaflet();
  }, []);

  useEffect(() => {
    if (!leafletLoaded || typeof window === 'undefined' || !mapContainerRef.current) return;
    
    // Get Leaflet instance from window or require
    const L = (window as any).L || require('leaflet');
    if (!L) return;

    // Initialize map if it doesn't exist yet
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [30.7333, 76.7794], // Default to Chandigarh
        zoom: 9,
        scrollWheelZoom: false, // Prevent page scrolling zoom hijacking
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    const map = mapRef.current;

    // Clear previous elements if they exist
    if (marker1Ref.current) map.removeLayer(marker1Ref.current);
    if (marker2Ref.current) map.removeLayer(marker2Ref.current);
    if (lineRef.current) map.removeLayer(lineRef.current);

    marker1Ref.current = null;
    marker2Ref.current = null;
    lineRef.current = null;

    const coords: [number, number][] = [];

    // Create custom pins
    const createCustomIcon = (color: string, label: string) => {
      return L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: ${color}; width: 28px; height: 28px; border-radius: 50%; border: 3.5px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 13px;">${label}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });
    };

    if (pickupHub) {
      marker1Ref.current = L.marker([pickupHub.lat, pickupHub.lng], {
        icon: createCustomIcon('#1E4627', 'A') // Brand Green
      })
        .addTo(map)
        .bindPopup(`<b>Pickup Location</b><br/>${pickupHub.name}`)
        .openPopup();
      coords.push([pickupHub.lat, pickupHub.lng]);
    }

    if (dropHub) {
      marker2Ref.current = L.marker([dropHub.lat, dropHub.lng], {
        icon: createCustomIcon('#E67E22', 'B') // Brand Orange
      })
        .addTo(map)
        .bindPopup(`<b>Drop Location</b><br/>${dropHub.name}`);
      coords.push([dropHub.lat, dropHub.lng]);
    }

    // Draw line and fit bounds if both locations are selected
    if (pickupHub && dropHub) {
      lineRef.current = L.polyline(coords, {
        color: '#2563eb', // Google Maps Blue highlight
        weight: 6,
        opacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map);

      // Fit bounds with animation
      map.fitBounds(L.latLngBounds(coords), {
        padding: [60, 60],
        maxZoom: 15,
        animate: true,
        duration: 1.0,
      });
    } else if (pickupHub) {
      map.setView([pickupHub.lat, pickupHub.lng], 13, { animate: true });
    } else if (dropHub) {
      map.setView([dropHub.lat, dropHub.lng], 13, { animate: true });
    } else {
      // Reset view to tri-city center
      map.setView([30.7333, 76.7794], 10, { animate: true });
    }

    // Force map resize check to render tiles properly
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

  }, [leafletLoaded, pickupHub, dropHub]);

  return (
    <div className="flex flex-col w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-inner mt-2">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-pulse"></span>
          Live Route Visualizer Map
        </span>
        {typeof distanceKm === 'number' && distanceKm > 0 && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-extrabold text-slate-400">Total Route:</span>
            <span className="bg-brand-orange-50 text-brand-orange-700 text-xs font-black px-2.5 py-0.5 rounded-full border border-brand-orange-200">
              {distanceKm} km
            </span>
          </div>
        )}
      </div>
      
      <div 
        ref={mapContainerRef} 
        className="w-full h-[250px] sm:h-[280px] z-10 relative bg-slate-100 flex items-center justify-center text-slate-400 text-xs"
      >
        {!leafletLoaded && (
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-brand-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading interactive route map...</span>
          </div>
        )}
      </div>
    </div>
  );
}
