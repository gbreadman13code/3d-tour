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
            { nodeId: 'yard-1', x: 50, y: 31, rotationOffset: -0.7 },
            { nodeId: 'yard-2', x: 55, y: 27, rotationOffset: -0.7 },
            { nodeId: 'yard-3', x: 60, y: 31, rotationOffset: -0.5 },
            { nodeId: 'yard-4', x: 56, y: 35, rotationOffset: -0.5 },
            { nodeId: 'yard-5', x: 58, y: 44, rotationOffset: -0.5 },
            { nodeId: 'yard-6', x: 47, y: 53, rotationOffset: -0.5 },
            { nodeId: 'yard-7', x: 54, y: 64, rotationOffset: -0.5 },
            { nodeId: 'yard-8', x: 62, y: 69, rotationOffset: -0.5 },
            { nodeId: 'yard-9', x: 45, y: 45, rotationOffset: -0.5 },
            { nodeId: 'yard-10', x: 44, y: 41, rotationOffset: -0.5 },
            { nodeId: 'yard-11', x: 44, y: 37, rotationOffset: -0.5 },
          ],
        },
    scenes: [
      {
        id: 'yard-1',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/1/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/1/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 1',
        defaultYaw: '0.0154rad', defaultPitch: '0.0479rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 5.4754, pitch: 0.0189 } },
          { nodeId: 'yard-3', position: { yaw: 0.0568, pitch: 0.0277 } },
          { nodeId: 'yard-4', position: { yaw: 0.9376, pitch: 0.0334 } },
          { nodeId: 'yard-11', position: { yaw: 2.2690, pitch: 0.0450 } },
        ],
        markers: [],
      },
      {
        id: 'yard-2',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/2/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/2/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 2',
defaultYaw: '0.0154rad', defaultPitch: '0.0479rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 0.5212, pitch: 0.0099 } },
          { nodeId: 'yard-4', position: { yaw: 6.1360, pitch: 0.0287 } },
          { nodeId: 'yard-3', position: { yaw: 5.5856, pitch: 0.0144 } },
        ],
        markers: [],
      },
      {
        id: 'yard-3',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/3/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/3/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 3',
        defaultYaw: '0.9313rad', defaultPitch: '0.0335rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 1.7779, pitch: 0.0029 } },
          { nodeId: 'yard-1', position: { yaw: 1.1477, pitch: 0.0162 } },
          { nodeId: 'yard-4', position: { yaw: 0.2122, pitch: 0.0101 } },
        ],
        markers: [],
      },
      {
        id: 'yard-4',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/4/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/4/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 4',
        defaultYaw: '6.1667rad', defaultPitch: '0.0477rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 6.1367, pitch: 0.0146 } },
          { nodeId: 'yard-3', position: { yaw: 0.5214, pitch: 0.0107 } },
          { nodeId: 'yard-1', position: { yaw: 5.6768, pitch: 0.0219 } },
        ],
        markers: [],
      },
      {
        id: 'yard-5',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/5/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/5/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид 5',
        defaultYaw: '1.1776rad', defaultPitch: '0.0046rad',
        links: [
          { nodeId: 'yard-6', position: { yaw: 0.4372, pitch: 0.0210 } },
          { nodeId: 'yard-9', position: { yaw: 1.4009, pitch: 0.0382 } },
        ],
        markers: [],
      },
      {
        id: 'yard-6',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/6/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/6/tile_${col}_${row}.jpg`,
        },
        name: 'Бассейн',
        defaultYaw: '0.1673rad', defaultPitch: '0.0073rad',
        links: [
          { nodeId: 'yard-7', position: { yaw: 4.1754, pitch: 0.0335 } },
          { nodeId: 'yard-9', position: { yaw: 0.8545, pitch: 0.0476 } }
        ],
        markers: [],
      },
      {
        id: 'yard-7',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/7/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/7/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-6', position: { yaw: 3.1362, pitch: 0.2176 } },
          { nodeId: 'yard-8', position: { yaw: 4.6193, pitch: 0.1998 } },
        ],
        markers: [],
      },
      {
        id: 'yard-8',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/8/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/8/tile_${col}_${row}.jpg`,
        },
        name: 'Пирс',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-7', position: { yaw: 5.5855, pitch: -0.2621 } },
          { nodeId: 'yard-6', position: { yaw: 0.7839, pitch: 0.0661 } },
        ],
        markers: [],
      },
      {
        id: 'yard-9',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/9/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/9/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-5', position: { yaw: 5.7735, pitch: 0.0381 } },
          { nodeId: 'yard-6', position: { yaw: 0.8122, pitch: 0.0409 } },
          { nodeId: 'yard-10', position: { yaw: 3.6965, pitch: 0.0097 } },
        ],
        markers: [],
      },
      {
        id: 'yard-10',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/10/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/10/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-5', position: { yaw: 1.5645, pitch: 0.0233 } },
          { nodeId: 'yard-11', position: { yaw: 6.2792, pitch: 0.0123 } },
        ],
        markers: [],
      },
      {
        id: 'yard-11',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/11/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/11/tile_${col}_${row}.jpg`,
        },
        name: 'Пляж',
        defaultYaw: '1.3743rad', defaultPitch: '0.0049rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 4.9121, pitch: 0.0347 } },
          { nodeId: 'yard-6', position: { yaw: 1.1793, pitch: 0.0383 } },
          { nodeId: 'yard-8', position: { yaw: 0.9582, pitch: 0.0520 } },
          { nodeId: 'yard-10', position: { yaw: 1.6060, pitch: 0.0229 } },
        ],
        markers: [],
      },
    ],
  },
  // {
  //   id: 'rooms',
  //   name: 'НОМЕРА',
  //   icon: 'rooms',
  //   defaultVariantId: 'standard',
  //   variants: [
  //     {
  //       id: 'standard',
  //       name: 'СТАНДАРТ',
  //       thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
  //       map: {
  //         imageUrl: 'assets/rooms/standart/map/map.png',
  //         horizontal: true,
  //         markers: [
  //           { nodeId: 'room-std-bedroom-1', x: 38, y: 64, rotationOffset: 0 },
  //           { nodeId: 'room-std-bedroom', x: 55, y: 64, rotationOffset: -2.2 },
  //         ],
  //       },
  //       scenes: [
  //         {
  //           id: 'room-std-bedroom',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/bedroom/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/bedroom/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'СПАЛЬНЯ',
  //           defaultYaw: '4.0299rad', 
  //           defaultPitch: '-0.6012rad',
  //           thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
  //           links: [ { nodeId: 'room-std-bedroom-1', position: { yaw: 3.0993, pitch: -0.5008 } } ],
  //           markers: [],
  //         },
  //         {
  //           id: 'room-std-bedroom-1',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/bedroom1/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/bedroom1/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'СПАЛЬНЯ',
  //           defaultYaw: '5.2931rad', defaultPitch: '-0.5923rad',
  //           hideInModal: true,
  //           thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
  //           links: [ { nodeId: 'room-std-bedroom', position: { yaw: 6.1449, pitch: -0.6061 } } ],
  //           markers: [],
  //         },
  //       ],
  //     },
  //     {
  //       id: 'junior-suite',
  //       name: 'ДЖУНИОР СЬЮТ',
  //       thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
  //       map: {
  //         imageUrl: 'assets/rooms/junior_suite/map/map.png',
  //         horizontal: true,
  //         markers: [
  //           { nodeId: 'room-jun-hall', x: 42, y: 36, rotationOffset: -2.5 },
  //           { nodeId: 'room-jun-bedroom', x: 52, y: 61, rotationOffset: -2.2 },
  //           { nodeId: 'room-jun-master-bedroom', x: 37, y: 61, rotationOffset: -2.2 },
  //           { nodeId: 'room-jun-master-bath', x: 18, y: 63, rotationOffset: -2.2 },
  //           { nodeId: 'bath', x: 20, y: 20, rotationOffset: -1 },
  //           { nodeId: 'prihozhaya', x: 20, y: 42, rotationOffset: -2.2 },
  //         ],
  //       },
  //       scenes: [
  //         {
  //           id: 'room-jun-hall',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/hall/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/hall/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'ГОСТИНАЯ',
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/hall.jpg',
  //           defaultYaw: '5.1549rad', defaultPitch: '-0.4141rad',
  //           links: [ { nodeId: 'room-jun-bedroom', position: { yaw: 2.1896, pitch: -0.3254 } }, {nodeId: 'prihozhaya', position: { yaw: 2.8777, pitch: -0.1605 }} ],
  //           markers: [],
  //         },
  //         {
  //           id: 'room-jun-bedroom',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/master_bedroom1/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom1/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'СПАЛЬНЯ',
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
  //           defaultYaw: '2.0335rad', defaultPitch: '-0.5621rad',
  //           links: [ 
  //             { nodeId: 'room-jun-master-bath', position: { yaw: 3.1539, pitch: -0.0534 } }, 
  //             { nodeId: 'room-jun-master-bedroom', position: { yaw: 3.2296, pitch: -0.4722 } }, 
  //             { nodeId: 'room-jun-hall', position: { yaw: 3.5783, pitch: -0.1019 } }, 
  //            ],
  //           markers: [],
  //         },
  //         {
  //           id: 'prihozhaya',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/prihozhaya/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/prihozhaya/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'ПРИХОЖАЯ',
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
  //           defaultYaw: '5.5624rad', defaultPitch: '-0.1765rad',
  //           links: [ 
  //             { nodeId: 'room-jun-hall', position: { yaw: 6.1745, pitch: -0.0861 } }, 
  //             { nodeId: 'bath', position: { yaw: 4.6806, pitch: -0.1670 } }, 
  //            ],
  //           markers: [],
  //         },
  //         {
  //           id: 'bath',
  //           panorama: {
  //   width: 8000,
  //   cols: 16,
  //   rows: 8,
  //   baseUrl: `assets/tiles/bath/preview.jpg`,
  //   tileUrl: (col, row) => `assets/tiles/bath/tile_${col}_${row}.jpg`,
  // },
  //           name: 'САНУЗЕЛ',
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
  //           defaultYaw: '2.7479rad', defaultPitch: '-0.5634rad',
  //           links: [ 
  //             { nodeId: 'prihozhaya', position: { yaw: 6.2679, pitch: -0.1670 } }, 
  //            ],
  //           markers: [],
  //         },
  //         {
  //           id: 'room-jun-master-bedroom',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/master_bedroom/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'СПАЛЬНЯ',
  //           defaultYaw: '0.9685rad', 
  //           defaultPitch: '-0.5973rad',
  //           hideInModal: true,
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
  //           links: [
  //             { nodeId: 'room-jun-master-bath', position: { yaw: 2.9017, pitch: -0.0842 } }, 
  //             { nodeId: 'room-jun-hall', position: {yaw: 4.1014, pitch: -0.1626} },
  //             { nodeId: 'room-jun-bedroom', position: { yaw: 0.1830, pitch: -0.5214 } },
  //           ],
  //           markers: [],
  //         },
  //         {
  //           id: 'room-jun-master-bath',
  //           panorama: {
  //               width: 8192,
  //               cols: 16,
  //               rows: 8,
  //               baseUrl: 'assets/tiles/master_bath/preview.jpg',
  //               tileUrl: (col: number, row: number) => `assets/tiles/master_bath/tile_${col}_${row}.jpg`,
  //           },
  //           name: 'МАСТЕР САНУЗЕЛ',
  //           thumbnail: 'assets/rooms/junior_suite/thumbs/bath.jpg',
  //           defaultYaw: '2.9017rad',
  //           defaultPitch: '-0.0842rad',
  //           links: [{ nodeId: 'room-jun-master-bedroom', position: { yaw: 6.2342, pitch: -0.0877 } }],
  //           markers: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
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
