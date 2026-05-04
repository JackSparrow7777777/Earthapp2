import React from 'react';
import GlassPanel from '../UI/GlassPanel';
import { Layers, Mountain, Building, Cloud } from 'lucide-react';

interface LayerControlsProps {
  terrainEnabled: boolean;
  setTerrainEnabled: (val: boolean) => void;
  buildingsEnabled: boolean;
  setBuildingsEnabled: (val: boolean) => void;
  atmosphereEnabled: boolean;
  setAtmosphereEnabled: (val: boolean) => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({
  terrainEnabled, setTerrainEnabled,
  buildingsEnabled, setBuildingsEnabled,
  atmosphereEnabled, setAtmosphereEnabled
}) => {
  
  const ToggleButton = ({ active, onClick, icon, label }: any) => (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: active ? 'rgba(0, 210, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '8px',
        padding: '10px 14px',
        color: active ? 'white' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        fontSize: '0.9rem'
      }}
    >
      <div style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
        {icon}
      </div>
      {label}
    </button>
  );

  return (
    <GlassPanel className="layer-controls" style={{ 
      position: 'absolute', 
      top: '20px', 
      right: '20px', 
      width: '260px',
      zIndex: 10 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
        <Layers size={20} color="var(--accent-color)" style={{ marginRight: '8px' }} />
        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, letterSpacing: '0.5px' }}>Layers</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ToggleButton 
          active={terrainEnabled} 
          onClick={() => setTerrainEnabled(!terrainEnabled)} 
          icon={<Mountain size={18} color={terrainEnabled ? 'var(--accent-color)' : 'currentColor'} />} 
          label="3D Terrain" 
        />
        <ToggleButton 
          active={buildingsEnabled} 
          onClick={() => setBuildingsEnabled(!buildingsEnabled)} 
          icon={<Building size={18} color={buildingsEnabled ? 'var(--accent-color)' : 'currentColor'} />} 
          label="3D Buildings" 
        />
        <ToggleButton 
          active={atmosphereEnabled} 
          onClick={() => setAtmosphereEnabled(!atmosphereEnabled)} 
          icon={<Cloud size={18} color={atmosphereEnabled ? 'var(--accent-color)' : 'currentColor'} />} 
          label="Atmosphere / Sky" 
        />
      </div>
    </GlassPanel>
  );
};

export default LayerControls;
