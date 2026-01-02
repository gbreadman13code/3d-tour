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
            { nodeId: 'yard-1', x: 55, y: 27, rotationOffset: -0.7 },
            { nodeId: 'yard-2', x: 50, y: 31, rotationOffset: -0.7 },
            { nodeId: 'yard-3', x: 56, y: 35, rotationOffset: -0.5 },
            { nodeId: 'yard-4', x: 60, y: 31, rotationOffset: -0.5 },
            { nodeId: 'yard-5', x: 58, y: 44, rotationOffset: -0.5 },
            { nodeId: 'yard-6', x: 47, y: 53, rotationOffset: -0.5 },
            { nodeId: 'yard-7', x: 54, y: 64, rotationOffset: -0.5 },
          ],
        },
    scenes: [
      {
        id: 'yard-1',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/1/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/1/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 1',
        defaultYaw: '6.2819rad', 
        defaultPitch: '-0.0747rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 0.6723, pitch: -0.0044 } },
          { nodeId: 'yard-3', position: { yaw: 0.1017, pitch: 0.0114 } },
          { nodeId: 'yard-4', position: { yaw: 5.5619, pitch: 0.0056 } },
          { nodeId: 'yard-5', position: { yaw: 0.4506, pitch: 0.0521 } },
        ],
        markers: [],
      },
      {
        id: 'yard-2',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/2/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/2/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 2',
        defaultYaw: '4.7584rad', defaultPitch: '0.0640rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 3.8067, pitch: -0.0026 } },
          { nodeId: 'yard-4', position: { yaw: 4.8527, pitch: 0.0241 } },
          { nodeId: 'yard-3', position: { yaw: 5.6191, pitch: -0.0141 } },
        ],
        markers: [],
      },
      {
        id: 'yard-3',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/3/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/3/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 3',
        defaultYaw: '0.1540rad', defaultPitch: '0.0801rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 2.1859, pitch: -0.0352 } },
          { nodeId: 'yard-1', position: { yaw: 3.2437, pitch: 0.0111 } },
          { nodeId: 'yard-4', position: { yaw: 4.2649, pitch: 0.0012 } },
          { nodeId: 'yard-5', position: { yaw: 0.8786, pitch: 0.0806 } },
        ],
        markers: [],
      },
      {
        id: 'yard-4',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/4/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/4/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 4',
        defaultYaw: '1.0515rad', defaultPitch: '0.1155rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 1.6255, pitch: 0.0264 } },
          { nodeId: 'yard-3', position: { yaw: 0.9611, pitch: 0.0021 } },
          { nodeId: 'yard-1', position: { yaw: 2.2608, pitch: -0.0069 } },
        ],
        markers: [],
      },
      {
        id: 'yard-5',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/5/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/5/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 5',
        defaultYaw: '0.0542rad', defaultPitch: '0.1459rad',
        links: [
          { nodeId: 'yard-6', position: { yaw: 0.9928, pitch: 0.0460 } },
          { nodeId: 'yard-2', position: { yaw: 1.8189, pitch: 0.0469 } },
        ],
        markers: [],
      },
      {
        id: 'yard-6',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/6/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/6/tile_${col}_${row}.jpg`,
        },
        name: 'Бассейн',
        defaultYaw: '6.2443rad', defaultPitch: '0.1073rad',
        links: [
          { nodeId: 'yard-7', position: { yaw: 5.6767, pitch: 0.0115 } },
          { nodeId: 'yard-5', position: { yaw: 3.4343, pitch: 0.0551 } }
        ],
        markers: [],
      },
      {
        id: 'yard-7',
        panorama: {
          width: 4000,
          cols: 8,
          rows: 4,
          baseUrl: `assets/tiles/7/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/7/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-6', position: { yaw: 3.1482, pitch: 0.0385 } },
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
            { nodeId: 'room-std-bedroom-1', x: 38, y: 64, rotationOffset: 0 },
            { nodeId: 'room-std-bedroom', x: 55, y: 64, rotationOffset: -2.2 },
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
            { nodeId: 'room-jun-hall', x: 42, y: 36, rotationOffset: -2.5 },
            { nodeId: 'room-jun-bedroom', x: 52, y: 61, rotationOffset: -2.2 },
            { nodeId: 'room-jun-master-bedroom', x: 37, y: 61, rotationOffset: -2.2 },
            { nodeId: 'room-jun-master-bath', x: 18, y: 63, rotationOffset: -2.2 },
            { nodeId: 'bath', x: 20, y: 20, rotationOffset: -1 },
            { nodeId: 'prihozhaya', x: 20, y: 42, rotationOffset: -2.2 },
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
            links: [ { nodeId: 'room-jun-bedroom', position: { yaw: 2.1896, pitch: -0.3254 } }, {nodeId: 'prihozhaya', position: { yaw: 2.8777, pitch: -0.1605 }} ],
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
            id: 'prihozhaya',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/prihozhaya/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/prihozhaya/tile_${col}_${row}.jpg`,
            },
            name: 'ПРИХОЖАЯ',
            thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
            defaultYaw: '5.5624rad', defaultPitch: '-0.1765rad',
            links: [ 
              { nodeId: 'room-jun-hall', position: { yaw: 6.1745, pitch: -0.0861 } }, 
              { nodeId: 'bath', position: { yaw: 4.6806, pitch: -0.1670 } }, 
             ],
            markers: [],
          },
          {
            id: 'bath',
            panorama: {
    width: 8000,
    cols: 16,
    rows: 8,
    baseUrl: `assets/tiles/bath/preview.jpg`,
    tileUrl: (col, row) => `assets/tiles/bath/tile_${col}_${row}.jpg`,
  },
            name: 'САНУЗЕЛ',
            thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
            defaultYaw: '2.7479rad', defaultPitch: '-0.5634rad',
            links: [ 
              { nodeId: 'prihozhaya', position: { yaw: 6.2679, pitch: -0.1670 } }, 
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
