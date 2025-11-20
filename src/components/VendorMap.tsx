import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Vendor {
  id: number | string;
  name: string;
  type: string;
  rating: number;
  location: string;
  image: string;
  isLive: boolean;
  coordinates: [number, number]; // [longitude, latitude]
  distance?: number | string;
  distanceKm?: number;
}

interface VendorMapProps {
  vendors: Vendor[];
  userLocation?: { lat: number; lng: number } | null;
}

const VendorMap = ({ vendors, userLocation }: VendorMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: userLocation ? [userLocation.lng, userLocation.lat] : [77.5946, 12.9716],
        zoom: 13,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        'top-right'
      );

      map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

      // Add user location marker if available
      if (userLocation) {
        const userEl = document.createElement('div');
        userEl.className = 'user-location-marker';
        userEl.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="bg-blue-500 rounded-full p-3 shadow-lg border-2 border-white animate-pulse">
              <span class="text-white text-xl">📍</span>
            </div>
            <div class="text-xs text-blue-600 font-bold mt-1">You</div>
          </div>
        `;

        userMarkerRef.current = new mapboxgl.Marker(userEl)
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map.current);
      }

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken, userLocation]);

  // Update vendor markers when vendors change
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    vendors.forEach((vendor) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="flex flex-col items-center cursor-pointer">
          <div class="bg-white rounded-full p-2 shadow-lg border-2 ${
            vendor.isLive ? 'border-green-500 animate-pulse' : 'border-gray-300'
          }">
            <span class="text-2xl">${vendor.image}</span>
          </div>
          ${vendor.isLive ? '<div class="text-xs text-green-600 font-bold mt-1">● LIVE</div>' : ''}
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold text-lg mb-1">${vendor.name}</h3>
          <p class="text-sm text-gray-600 mb-1">${vendor.type}</p>
          <p class="text-sm text-gray-500">${vendor.location}</p>
          <div class="flex items-center gap-1 mt-2">
            <span class="text-yellow-500">⭐</span>
            <span class="font-semibold">${vendor.rating}</span>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(vendor.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current[vendor.id] = marker;
    });

    // Fit map to show all vendors and user
    if (vendors.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      vendors.forEach(vendor => bounds.extend(vendor.coordinates));
      if (userLocation) {
        bounds.extend([userLocation.lng, userLocation.lat]);
      }
      
      map.current.fitBounds(bounds, { padding: 80 });
    }
  }, [vendors, userLocation]);

  if (!tokenSubmitted) {
    return (
      <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 text-primary mb-2">
          <MapPin className="h-5 w-5" />
          <h3 className="font-semibold">Setup Map</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          To view the interactive map, please enter your Mapbox public token. 
          Get it from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="space-y-2">
          <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
          <Input
            id="mapbox-token"
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="font-mono text-sm"
          />
        </div>
        <button
          onClick={() => setTokenSubmitted(true)}
          disabled={!mapboxToken}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Load Map
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
    </div>
  );
};

export default VendorMap;
