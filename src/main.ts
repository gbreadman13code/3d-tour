import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';

import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/plan-plugin/index.css';
import { locationGroups } from './data/tour-config';
import './style.css';
import './loader.css';

const container = document.querySelector('#viewer') as HTMLElement;
const loadingStartTime = Date.now();

const viewer = new Viewer({
  container: container,
  // loadingImg: '/loader.gif', // Removed because file is missing
  touchmoveTwoFingers: false,
  mousewheelCtrlKey: true,
  defaultYaw: '0deg',
  defaultZoomLvl: 0, // Most zoomed out (widest FOV)
  navbar: false,
  mousewheel: false,
  plugins: [
    [VirtualTourPlugin, {
      positionMode: 'manual',
      renderMode: '2d',
      arrowStyle: {
        element: () => {
          const div = document.createElement('div');
          div.className = 'transition-marker';
          div.innerHTML = `
            <img src="assets/icons/marker-arrow-up.svg" alt="Arrow Up" width="27" height="37" />
          `;
          return div;
        },
        size: { width: 80, height: 80 },
      },
      transitionOptions: (toNode: any) => {
        // Find config for the target node
        const sceneConfig = currentSceneConfigs.find(s => s.id === toNode.id);
        if (sceneConfig && (sceneConfig.defaultYaw || sceneConfig.defaultPitch)) {
          return {
            rotateTo: {
              yaw: sceneConfig.defaultYaw,
              pitch: sceneConfig.defaultPitch,
            },
            speed: '10rpm', // Smooth transition speed
          };
        }
        return {};
      },
    }],
    [MarkersPlugin, {}],
  ],
  adapter: [EquirectangularTilesAdapter, {
      background: true,
  }],
});

const virtualTour = viewer.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;

// Note: Initial nodes are loaded by the location navigation system at the bottom of this file

// Event listeners for iframe communication
window.addEventListener('message', (_event) => {
  // Handle messages from parent
  // console.log('Received message:', event.data);
});

// Notify parent that viewer is ready and hide loader
viewer.addEventListener('ready', () => {
  window.parent.postMessage({ type: 'tourLoaded' }, '*');
  
  const loader = document.querySelector('#loader-container');
  if (loader) {
    const elapsedTime = Date.now() - loadingStartTime;
    const minDuration = 2000; // 2 seconds minimum
    const remainingTime = Math.max(0, minDuration - elapsedTime);

    setTimeout(() => {
        loader.classList.add('hidden');
    }, remainingTime);
  }
});

viewer.addEventListener('load-progress', (e: any) => {
    const loaderPercentage = document.querySelector('#loader-percentage');
    if (loaderPercentage) {
        loaderPercentage.textContent = `${e.progress}%`;
    }
});

viewer.addEventListener('panorama-error', (e) => {
    console.error('Viewer Error:', e);
    alert('Viewer Error: ' + (e.error.message || e.error));
});

viewer.addEventListener('position-updated', (e: any) => {
    mapManager.updateRotation(e.position.yaw);
});

// Scene name label
const sceneNameLabel = document.getElementById('scene-name-label');

// Store scene configs for lookup
let currentSceneConfigs: SceneConfig[] = [];

virtualTour.addEventListener('node-changed', (e: any) => {
  if (sceneNameLabel && e.node && e.node.name) {
    sceneNameLabel.textContent = e.node.name;
    sceneNameLabel.classList.remove('hidden');
  } else if (sceneNameLabel) {
    sceneNameLabel.classList.add('hidden');
  }
  
  // Apply default yaw/pitch from scene config
  // Logic moved to transitionOptions in VirtualTourPlugin config
  
  // Update active marker on map
  if (e.node) {
    mapManager.setActiveMarker(e.node.id);
  }
});

// Development helper: log click coordinates for easy config editing
viewer.addEventListener('click', (e: any) => {
  const position = e.data.rightclick ? null : e.data;
  if (position && position.yaw !== undefined && position.pitch !== undefined) {
    console.log(`📍 Click position: { yaw: ${position.yaw.toFixed(4)}, pitch: ${position.pitch.toFixed(4)} }`);
    console.log(`🎯 Default view config: defaultYaw: '${position.yaw.toFixed(4)}rad', defaultPitch: '${position.pitch.toFixed(4)}rad'`);
    // Debug offset helper
    console.log(`🔄 Current Rotation: Yaw=${position.yaw.toFixed(4)}rad. If Map is North-Up (0rad), set rotationOffset (in tour-config.ts) = -Yaw to align North here.`);
  }
});

// Custom UI Controls
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnMap = document.getElementById('btn-map');
const btnScreenshot = document.getElementById('btn-screenshot');

if (btnFullscreen) {
  btnFullscreen.addEventListener('click', () => {
    const wrapper = document.getElementById('tour-wrapper');
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (wrapper) {
      wrapper.requestFullscreen();
    }
  });
}

// Map panel controls
const mapPanel = document.getElementById('map-panel');
const mapToggleSize = document.getElementById('map-toggle-size');

// Map Manager
const mapManager = new MapManager('map-panel', (nodeId) => {
  virtualTour.setCurrentNode(nodeId);
  mapManager.hide();
  // Ensure the button state reflects the closed panel if we managed it manually (though MapManager.hide handles the hidden class on panel)
  // But wait, our toggle logic in listener below uses toggling.
  // We should probably sync them or simple let hide() do the work.
});

// Update Map State Helper
const updateMapState = (location: LocationGroup, variant?: VariantConfig) => {
  const mapConfig = variant?.map || location.map;
  if (mapConfig) {
    mapManager.setMap(mapConfig);
    btnMap?.classList.remove('hidden');
  } else {
    mapManager.clearMap();
    btnMap?.classList.add('hidden');
  }
};

if (btnMap && mapPanel) {
  btnMap.addEventListener('click', () => {
    // Toggle map panel visibility
    mapPanel.classList.toggle('hidden');
  });
}

if (mapToggleSize && mapPanel) {
  mapToggleSize.addEventListener('click', () => {
    // Toggle expanded state
    mapPanel.classList.toggle('expanded');
  });
}

const mapClose = document.getElementById('map-close');
if (mapClose && mapPanel) {
  mapClose.addEventListener('click', () => {
    // Close and collapse the map panel
    mapPanel.classList.add('hidden');
    mapPanel.classList.remove('expanded');
  });
}

if (btnScreenshot) {
  btnScreenshot.addEventListener('click', () => {
    // 1. Get current zoom
    const currentZoom = viewer.getZoomLevel();

    // 2. Setup listener BEFORE changing state
    viewer.addEventListener('render', () => {
        const canvas = viewer.container.querySelector('canvas') as HTMLCanvasElement;
        
        if (!canvas) {
            console.error('Canvas not found');
            viewer.zoom(currentZoom);
            return;
        }
        
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        
        if (gl) {
            const width = canvas.width;
            const height = canvas.height;
            const pixels = new Uint8Array(width * height * 4);
            // Capture synchronously
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
            
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const ctx = tempCanvas.getContext('2d');
            
            if (ctx) {
                const imageData = ctx.createImageData(width, height);
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const srcIndex = (y * width + x) * 4;
                        const dstIndex = ((height - y - 1) * width + x) * 4;
                        imageData.data[dstIndex] = pixels[srcIndex];
                        imageData.data[dstIndex + 1] = pixels[srcIndex + 1];
                        imageData.data[dstIndex + 2] = pixels[srcIndex + 2];
                        imageData.data[dstIndex + 3] = pixels[srcIndex + 3];
                    }
                }
                ctx.putImageData(imageData, 0, 0);
                const dataUrl = tempCanvas.toDataURL('image/png');
                
                const modal = document.getElementById('screenshot-modal');
                const screenshotImage = document.getElementById('screenshot-image') as HTMLImageElement;
                if (modal && screenshotImage) {
                    screenshotImage.src = dataUrl;
                    modal.classList.remove('hidden');
                }
            }
        }
        
        // 4. Restore original zoom
        viewer.zoom(currentZoom);
    }, { once: true });

    // 3. Zoom in (triggers the render which triggers the listener above)
    viewer.zoom(50);
    viewer.needsUpdate();
  });
}

// Screenshot modal controls
const screenshotModal = document.getElementById('screenshot-modal');
const screenshotClose = document.getElementById('screenshot-close');
const screenshotDownload = document.getElementById('screenshot-download');
const screenshotImage = document.getElementById('screenshot-image') as HTMLImageElement;

if (screenshotClose) {
  screenshotClose.addEventListener('click', () => {
    screenshotModal?.classList.add('hidden');
  });
}

if (screenshotDownload && screenshotImage) {
  screenshotDownload.addEventListener('click', () => {
    // Create a download link
    const link = document.createElement('a');
    link.download = `volna-resort-screenshot-${Date.now()}.png`;
    link.href = screenshotImage.src;
    link.click();
  });
}

// Location Navigation Controls
const locationNav = document.getElementById('location-nav');
const locationList = document.getElementById('location-list');
const mainBtn = document.getElementById('location-main-btn');
const mainBtnIcon = document.getElementById('main-btn-icon');
const mainBtnText = document.getElementById('main-btn-text');

// Initialize Variant Selector
import { MapManager } from './components/map-manager';
import { VariantSelector } from './components/variant-selector';
import { SceneConfig, LocationGroup, VariantConfig } from './data/tour-config';

const variantSelector = new VariantSelector({
  container: document.getElementById('tour-wrapper') as HTMLElement,
  onSceneSelect: (scene: SceneConfig, allScenes: SceneConfig[], variant?: VariantConfig) => {
    currentSceneConfigs = allScenes; // Store for default yaw/pitch lookup
    virtualTour.setNodes(
      allScenes.map(s => ({
        id: s.id,
        panorama: s.panorama,
        name: s.name,
        links: s.links,
        markers: s.markers,
      })),
      scene.id
    );

    const locationGroup = locationGroups.find(g => g.id === currentLocationId);
    if (locationGroup) {
      updateMapState(locationGroup, variant);
      mapManager.setActiveMarker(scene.id);
    }
  }
});

let currentLocationId = 'yard'; // Default active location

// SVG icons for each location
const locationIcons: Record<string, string> = {
  yard: `<img src="assets/icons/beach.svg" alt="Двор" width="24" height="24" />`,
  rooms: `<img src="assets/icons/sofa.svg" alt="Номера" width="24" height="24" />`,
  views: `<img src="assets/icons/window.svg" alt="Виды из окон" width="24" height="24" />`,
};

// Render the navigation (main button shows current, list shows others)
const renderLocationNav = () => {
  if (!locationList || !mainBtnIcon || !mainBtnText) return;
  
  // Find current location
  const currentLocation = locationGroups.find(g => g.id === currentLocationId);
  if (!currentLocation) return;
  
  // Update main button with current location
  mainBtnIcon.innerHTML = locationIcons[currentLocation.id] || '';
  mainBtnText.textContent = currentLocation.name;
  
  // Clear and rebuild the list with other locations
  locationList.innerHTML = '';
  
  locationGroups
    .filter(group => group.id !== currentLocationId)
    .forEach(group => {
      const btn = document.createElement('button');
      btn.className = 'location-btn';
      btn.setAttribute('data-location', group.id);
      btn.innerHTML = `
        <span class="location-info">
          <span class="location-icon">${locationIcons[group.id] || ''}</span>
          <span class="location-text">${group.name}</span>
        </span>
      `;
      
      btn.addEventListener('click', () => {
        selectLocation(group.id);
      });
      
      locationList.appendChild(btn);
    });
    
  // Update variant selector
  variantSelector.setLocationGroup(currentLocation);
};

// Select a location
const selectLocation = (locationId: string) => {
  const locationGroup = locationGroups.find(group => group.id === locationId);
  
  if (locationGroup) {
    currentLocationId = locationId;
    
    // Determine which scenes to load
    let scenesToLoad: SceneConfig[] = [];
    let startNodeId: string | undefined;

    // Update navigation UI first
    locationNav?.classList.remove('expanded');
    renderLocationNav();

    if (locationGroup.variants && locationGroup.variants.length > 0) {
      // If variants exist, DO NOT load scenes immediately.
      // Instead, open the variant selector modal.
      variantSelector.openVariantModal();
      return; 
    } else if (locationGroup.scenes) {
      // Fallback to direct scenes
      scenesToLoad = locationGroup.scenes;
    }

    if (scenesToLoad.length > 0) {
      startNodeId = scenesToLoad[0].id;
      currentSceneConfigs = scenesToLoad; // Store for default yaw/pitch lookup
      
      // Load the new scenes
      virtualTour.setNodes(
        scenesToLoad.map(scene => ({
          id: scene.id,
          panorama: scene.panorama,
          name: scene.name,
          links: scene.links,
          markers: scene.markers,
        })),
        startNodeId
      );
      
      updateMapState(locationGroup);
      if (startNodeId) mapManager.setActiveMarker(startNodeId);
    }
  }
};

// Toggle panel expand/collapse
if (mainBtn && locationNav) {
  mainBtn.addEventListener('click', () => {
    locationNav.classList.toggle('expanded');
  });
}

// Initialize navigation
renderLocationNav();

// Load initial location
const initialLocation = locationGroups.find(g => g.id === currentLocationId);
if (initialLocation) {
  // Trigger initial load logic via selectLocation to ensure consistency
  // Trigger initial load logic via selectLocation to ensure consistency
  selectLocation(initialLocation.id);
  // Initial map state provided by selectLocation -> updateMapState
}
