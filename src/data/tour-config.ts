export interface SceneConfig {
  id: string;
  panorama: string | {
    width: number;
    cols: number;
    rows: number;
    baseUrl: string;
    tileUrl: (col: number, row: number) => string;
  };
  name: string;
  hideInModal?: boolean; // NEW: Hide this scene in variant modal
  thumbnail?: string; // NEW: thumbnail for modal
  defaultYaw?: string; // e.g. '1.2345rad'
  defaultPitch?: string; // e.g. '-0.1234rad'
  links: Array<{ nodeId: string; position: { yaw: number; pitch: number } }>;
  markers: Array<any>;
}

export interface MapMarker {
  nodeId: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  minimizedX?: number; // percentage (0-100) for minimized state
  minimizedY?: number; // percentage (0-100) for minimized state
  rotationOffset?: number; // radians
}

export interface MapConfig {
  imageUrl: string;
  horizontal?: boolean; // NEW: Horizontal layout flag
  markers: MapMarker[];
}

export interface VariantConfig {
  id: string;
  name: string;
  thumbnail: string;
  scenes: SceneConfig[];
  map?: MapConfig;
}

export interface LocationGroup {
  id: string;
  name: string;
  icon: string; // SVG icon identifier
  scenes?: SceneConfig[]; // For backward compatibility / simple groups
  variants?: VariantConfig[]; // For groups with variants
  defaultVariantId?: string;
  map?: MapConfig;
}

// Location groups for navigation
export const locationGroups: LocationGroup[] = [
  {
    id: 'yard',
    name: 'ДВОР',
    icon: 'yard',
    map: {
          imageUrl: 'assets/yard/map.jpg',
          horizontal: false,
          markers: [
            { nodeId: 'yard-1', x: 55, y: 29, rotationOffset: -0.7 },
            { nodeId: 'yard-2', x: 55, y: 34, rotationOffset: -0.7 },
            // { nodeId: 'yard-3', x: 57, y: 56, rotationOffset: 0.7 },
            // { nodeId: 'yard-4', x: 39, y: 33, rotationOffset: 1 },
          ],
        },
    scenes: [
      {
        id: 'yard-1',
        panorama: {
          width: 2000,
          cols: 4,
          rows: 2,
          baseUrl: 'assets/tiles/1/preview.jpg',
          tileUrl: (col: number, row: number) => `assets/tiles/1/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 1',
        defaultYaw: '6.2819rad', 
        defaultPitch: '-0.0747rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 0, pitch: 0 } },
          // { nodeId: 'yard-3', position: { yaw: 0.5488, pitch: 0.0044 } },
        ],
        markers: [],
      },
      {
        id: 'yard-2',
        panorama: {
          width: 2000,
          cols: 4,
          rows: 2,
          baseUrl: 'assets/tiles/2/preview.jpg',
          tileUrl: (col: number, row: number) => `assets/tiles/2/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 2',
        defaultYaw: '6.2573rad', defaultPitch: '0.0426rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 3.14, pitch: 0 } },
          // { nodeId: 'yard-3', position: { yaw: 0.9152, pitch: 0.0306 } },
        ],
        markers: [],
      },
      {
        id: 'yard-3',
        panorama: {
            width: 1000,
            cols: 2,
            rows: 1,
            baseUrl: 'assets/tiles/3/preview.jpg',
            tileUrl: (col: number, row: number) => `assets/tiles/3/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 3',
        defaultYaw: '0.1540rad', defaultPitch: '0.0801rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 1.7298, pitch: -0.0070 } },
          // { nodeId: 'yard-4', position: { yaw: 0.7868, pitch: -0.0066 } },
        ],
        markers: [],
      },
      {
        id: 'yard-4',
        panorama: {
            width: 1000,
            cols: 2,
            rows: 1,
            baseUrl: 'assets/tiles/4/preview.jpg',
            tileUrl: (col: number, row: number) => `assets/tiles/4/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '0.0542rad', defaultPitch: '0.1459rad',
        links: [
          { nodeId: 'yard-3', position: { yaw: 3.8040, pitch: 0.0012 } },
        ],
        markers: [],
      },
    ],
  },
  {
    id: 'rooms',
    name: 'НОМЕРА',
    icon: 'rooms',
    defaultVariantId: 'standard',
    variants: [
      {
        id: 'standard',
        name: 'СТАНДАРТ',
        thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
        map: {
          imageUrl: 'assets/rooms/standart/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-std-bedroom-1', x: 43, y: 57, rotationOffset: 0 },
            { nodeId: 'room-std-bedroom', x: 57, y: 57, rotationOffset: -2.2 },
          ],
        },
        scenes: [
          {
            id: 'room-std-bedroom',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/bedroom/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/bedroom/tile_${col}_${row}.jpg`,
            },
            name: 'СПАЛЬНЯ',
            defaultYaw: '4.0299rad', 
            defaultPitch: '-0.6012rad',
            thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
            links: [ { nodeId: 'room-std-bedroom-1', position: { yaw: 3.0993, pitch: -0.5008 } } ],
            markers: [],
          },
          {
            id: 'room-std-bedroom-1',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/bedroom1/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/bedroom1/tile_${col}_${row}.jpg`,
            },
            name: 'СПАЛЬНЯ',
            defaultYaw: '5.2931rad', defaultPitch: '-0.5923rad',
            hideInModal: true,
            thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
            links: [ { nodeId: 'room-std-bedroom', position: { yaw: 6.1449, pitch: -0.6061 } } ],
            markers: [],
          },
        ],
      },
      {
        id: 'junior-suite',
        name: 'ДЖУНИОР СЬЮТ',
        thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
        map: {
          imageUrl: 'assets/rooms/junior_suite/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-jun-hall', x: 49, y: 36, rotationOffset: -2.5 },
            { nodeId: 'room-jun-bedroom', x: 55, y: 61, rotationOffset: -2.2 },
            { nodeId: 'room-jun-master-bedroom', x: 45, y: 61, rotationOffset: -2.2 },
            { nodeId: 'room-jun-master-bath', x: 32, y: 63, rotationOffset: -2.2 },
          ],
        },
        scenes: [
          {
            id: 'room-jun-hall',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/hall/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/hall/tile_${col}_${row}.jpg`,
            },
            name: 'ГОСТИНАЯ',
            thumbnail: 'assets/rooms/junior_suite/thumbs/hall.jpg',
            defaultYaw: '5.1549rad', defaultPitch: '-0.4141rad',
            links: [ { nodeId: 'room-jun-bedroom', position: { yaw: 2.1896, pitch: -0.3254 } } ],
            markers: [],
          },
          {
            id: 'room-jun-bedroom',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/master_bedroom1/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom1/tile_${col}_${row}.jpg`,
            },
            name: 'СПАЛЬНЯ',
            thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
            defaultYaw: '2.0335rad', defaultPitch: '-0.5621rad',
            links: [ 
              { nodeId: 'room-jun-master-bath', position: { yaw: 3.1539, pitch: -0.0534 } }, 
              { nodeId: 'room-jun-master-bedroom', position: { yaw: 3.2296, pitch: -0.4722 } }, 
              { nodeId: 'room-jun-hall', position: { yaw: 3.5783, pitch: -0.1019 } }, 
             ],
            markers: [],
          },
          {
            id: 'room-jun-master-bedroom',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/master_bedroom/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom/tile_${col}_${row}.jpg`,
            },
            name: 'СПАЛЬНЯ',
            defaultYaw: '0.9685rad', 
            defaultPitch: '-0.5973rad',
            hideInModal: true,
            thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
            links: [
              { nodeId: 'room-jun-master-bath', position: { yaw: 2.9017, pitch: -0.0842 } }, 
              { nodeId: 'room-jun-hall', position: {yaw: 4.1014, pitch: -0.1626} },
              { nodeId: 'room-jun-bedroom', position: { yaw: 0.1830, pitch: -0.5214 } },
            ],
            markers: [],
          },
          {
            id: 'room-jun-master-bath',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/master_bath/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/master_bath/tile_${col}_${row}.jpg`,
            },
            name: 'МАСТЕР САНУЗЕЛ',
            thumbnail: 'assets/rooms/junior_suite/thumbs/bath.jpg',
            defaultYaw: '2.9017rad',
            defaultPitch: '-0.0842rad',
            links: [{ nodeId: 'room-jun-master-bedroom', position: { yaw: 6.2342, pitch: -0.0877 } }],
            markers: [],
          },
        ],
      },
    ],
  },
  // {
  //   id: 'views',
  //   name: 'ВИДЫ ИЗ ОКОН',
  //   icon: 'views',
  //   scenes: [
  //     {
  //       id: 'view-1',
  //       panorama: '/assets/SHOT_2.jpg',
  //       name: 'Вид из окна 1',
  //       links: [],
  //       markers: [],
  //     },
  //   ],
  // },
];

// Default tour config (for backwards compatibility)
// We need to handle the case where the first group might be variant-based
const firstGroup = locationGroups[0];
export const tourConfig: SceneConfig[] = firstGroup.scenes || (firstGroup.variants ? firstGroup.variants[0].scenes : []);
