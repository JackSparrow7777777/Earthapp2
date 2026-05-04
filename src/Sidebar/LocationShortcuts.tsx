import React from 'react';
import GlassPanel from '../UI/GlassPanel';
import { MapPin } from 'lucide-react';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  height: number;
  heading: number;
  pitch: number;
}

const locations: Location[] = [
  { name: 'New York', lat: 40.7128, lng: -74.0060, height: 1500, heading: 0, pitch: -35 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, height: 1200, heading: 25, pitch: -40 },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, height: 1800, heading: 45, pitch: -30 },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, height: 2000, heading: -20, pitch: -45 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, height: 1600, heading: 10, pitch: -35 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, height: 2500, heading: 60, pitch: -30 },
];

interface LocationShortcutsProps {
  onSelectLocation: (loc: Location) => void;
}

const LocationShortcuts: React.FC<LocationShortcutsProps> = ({ onSelectLocation }) => {
  return (
    <GlassPanel className="location-shortcuts" style={{ 
      position: 'absolute', 
      top: '20px', 
      left: '20px', 
      width: '280px',
      zIndex: 10 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        <MapPin size={20} color="var(--accent-color)" style={{ marginRight: '8px' }} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, letterSpacing: '0.5px' }}>Destinations</h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {locations.map((loc) => (
          <button
            key={loc.name}
            onClick={() => onSelectLocation(loc)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '12px 16px',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              fontSize: '0.95rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 210, 255, 0.15)';
              e.currentTarget.style.borderColor = 'var(--accent-color)';
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {loc.name}
          </button>
        ))}
      </div>
    </GlassPanel>
  );
};

export default LocationShortcuts;
