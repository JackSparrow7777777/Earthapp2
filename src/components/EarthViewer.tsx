import React, { useEffect, useRef } from 'react';
import { Viewer, Scene, Globe } from 'resium';
import * as Cesium from 'cesium';

interface EarthViewerProps {
  terrainEnabled: boolean;
  buildingsEnabled: boolean;
  atmosphereEnabled: boolean;
  targetLocation?: { lat: number; lng: number; height: number; heading?: number; pitch?: number } | null;
}

const EarthViewer: React.FC<EarthViewerProps> = ({
  terrainEnabled,
  buildingsEnabled,
  atmosphereEnabled,
  targetLocation
}) => {
  // Use any to bypass resium strict ref typings if needed, or proper resium typings
  const viewerRef = useRef<any>(null);
  const buildingTilesetRef = useRef<Cesium.Cesium3DTileset | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Handle zooming to location
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (viewer && targetLocation) {
      const camera = viewer.camera;
      
      camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          targetLocation.lng, 
          targetLocation.lat, 
          targetLocation.height
        ),
        orientation: {
          heading: Cesium.Math.toRadians(targetLocation.heading || 0),
          pitch: Cesium.Math.toRadians(targetLocation.pitch || -45),
          roll: 0.0
        },
        duration: 3.5, // Cinematic slow duration
        easingFunction: Cesium.EasingFunction.CUBIC_IN_OUT,
      });
    }
  }, [targetLocation]);

  // Initial cinematic space view
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (viewer && !isInitializedRef.current) {
      isInitializedRef.current = true;
      
      // Enable better lighting
      viewer.scene.globe.enableLighting = true;
      
      // Set an initial space view (zoomed out)
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-0.0, 20.0, 25000000.0),
        duration: 0,
      });
      
      // Add 3D buildings layer
      const initBuildings = async () => {
        try {
          const tileset = await Cesium.createOsmBuildingsAsync();
          viewer.scene.primitives.add(tileset);
          tileset.show = buildingsEnabled;
          buildingTilesetRef.current = tileset;
        } catch (error) {
          console.error("Failed to load 3D buildings", error);
        }
      };
      initBuildings();
    }
  }, [buildingsEnabled]); // Needs to depend on viewer readiness, which happens on mount

  // Sync building visibility
  useEffect(() => {
    if (buildingTilesetRef.current) {
      buildingTilesetRef.current.show = buildingsEnabled;
    }
  }, [buildingsEnabled]);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Viewer
        ref={viewerRef}
        full
        animation={false}
        timeline={false}
        baseLayerPicker={false}
        geocoder={false}
        homeButton={false}
        infoBox={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        selectionIndicator={false}
        requestRenderMode={true}
        maximumRenderTimeChange={Infinity}
        // Enable terrain if toggled
        terrainProvider={terrainEnabled ? undefined : new Cesium.EllipsoidTerrainProvider()}
      >
        <Scene />
        <Globe
          enableLighting={true}
          showGroundAtmosphere={atmosphereEnabled}
          depthTestAgainstTerrain={terrainEnabled}
        />
      </Viewer>
    </div>
  );
};

export default EarthViewer;


