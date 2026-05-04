import React from 'react';
import * as Cesium from 'cesium';
import EarthViewer from './components/EarthViewer';
import LocationShortcuts, { Location } from './components/Sidebar/LocationShortcuts';
import LayerControls from './components/Sidebar/LayerControls';
import './index.css';

// Initialize Cesium Ion token
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhNmRiOWQ2ZS1mMmNkLTQyMmMtYWYzNC0yODQ1MjU5ZmM5NTYiLCJpZCI6NDI2OTU4LCJpc3MiOiJodHRwczovL2lvbi5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3Nzc4NzgxNzN9.dRsjW2aXGnEyhAUrcAz9imZ6BJGClTcdd0ESMrU1jiY";

function App() {
  const [terrainEnabled, setTerrainEnabled] = React.useState(true);
  const [buildingsEnabled, setBuildingsEnabled] = React.useState(false);
  const [atmosphereEnabled, setAtmosphereEnabled] = React.useState(true);
  
  const [targetLocation, setTargetLocation] = React.useState<Location | null>(null);

  const handleSelectLocation = (loc: Location) => {
    setTargetLocation(loc);
    // Automatically turn on buildings when zooming into a city
    if (!buildingsEnabled) {
      setBuildingsEnabled(true);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <LocationShortcuts onSelectLocation={handleSelectLocation} />
      
      <LayerControls 
        terrainEnabled={terrainEnabled}
        setTerrainEnabled={setTerrainEnabled}
        buildingsEnabled={buildingsEnabled}
        setBuildingsEnabled={setBuildingsEnabled}
        atmosphereEnabled={atmosphereEnabled}
        setAtmosphereEnabled={setAtmosphereEnabled}
      />
      
      <EarthViewer 
        terrainEnabled={terrainEnabled}
        buildingsEnabled={buildingsEnabled}
        atmosphereEnabled={atmosphereEnabled}
        targetLocation={targetLocation}
      />
      
      {/* Title / Branding */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '2.5rem', 
          fontWeight: 300, 
          letterSpacing: '2px',
          textShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          EARTH<span style={{ fontWeight: 700, color: 'var(--accent-color)' }}>.SYS</span>
        </h1>
        <p style={{ 
          margin: '5px 0 0 0', 
          fontSize: '0.9rem', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          Orbital Command Interface
        </p>
      </div>
    </div>
  );
}

export default App;


