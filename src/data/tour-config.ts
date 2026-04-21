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
  hideInModal?: boolean;
  thumbnail?: string;
  defaultYaw?: string; // e.g. '1.2345rad'
  defaultPitch?: string; // e.g. '-0.1234rad'
  /** Ограничение горизонтального обзора. Значения в радианах [min, max]. */
  yawRange?: [number, number];
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
            { nodeId: 'yard-1', x: 55, y: 28, rotationOffset: -0.8 },
            { nodeId: 'yard-2', x: 50, y: 31, rotationOffset: -2.2 },
            { nodeId: 'yard-3', x: 56, y: 31, rotationOffset: 0 },
            { nodeId: 'yard-4', x: 56, y: 35, rotationOffset: -4 },
            { nodeId: 'yard-5', x: 58, y: 44, rotationOffset: -0.3 },
            { nodeId: 'yard-6', x: 47, y: 53, rotationOffset: 1.2 },
            { nodeId: 'yard-7', x: 54, y: 64, rotationOffset: -0.6 },
            { nodeId: 'yard-8', x: 62, y: 69, rotationOffset: 1.5 },
            { nodeId: 'yard-9', x: 42, y: 55, rotationOffset: -3 },
            { nodeId: 'yard-10', x: 47, y: 44, rotationOffset: -2 },
            { nodeId: 'yard-11', x: 43, y: 41, rotationOffset: -3.3 },
            { nodeId: 'yard-12', x: 44, y: 37, rotationOffset: -2 },
            { nodeId: 'yard-13', x: 10, y: 10, rotationOffset: -2 },
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

          { nodeId: 'yard-2', position: { yaw: 0.5212, pitch: 0.0099 } },
          { nodeId: 'yard-4', position: { yaw: 6.1360, pitch: 0.0287 } },
          { nodeId: 'yard-3', position: { yaw: 5.9419, pitch: 0.3938 } },
          // { nodeId: 'yard-2', position: { yaw: 5.4754, pitch: 0.0189 } },
          // { nodeId: 'yard-3', position: { yaw: 0.0701, pitch: 0.3350 } },
          // { nodeId: 'yard-4', position: { yaw: 0.9376, pitch: 0.0334 } },
          // { nodeId: 'yard-12', position: { yaw: 2.2690, pitch: 0.0450 } },
          // { nodeId: 'yard-9', position: { yaw: 2.1097, pitch: 0.0526 } },
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
          { nodeId: 'yard-1', position: { yaw: 5.4754, pitch: 0.0189 } },
          { nodeId: 'yard-3', position: { yaw: 0.0701, pitch: 0.3350 } },
          { nodeId: 'yard-4', position: { yaw: 0.9376, pitch: 0.0334 } },
          { nodeId: 'yard-12', position: { yaw: 2.2690, pitch: 0.0450 } },
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
        name: 'Двор - Вид сверху',
        defaultYaw: '5.5253rad', defaultPitch: '-0.1977rad',
        links: [
          { nodeId: 'yard-2', position: { yaw: 2.0158, pitch: -0.2428 } },
          { nodeId: 'yard-1', position: { yaw: 0.4559, pitch: -0.3144 } },
          { nodeId: 'yard-4', position: { yaw: 5.5050, pitch: -0.1936 } },
          { nodeId: 'yard-12', position: { yaw: 6.0990, pitch: -0.0686 } },
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
          { nodeId: 'yard-3', position: { yaw: 0.0940, pitch: 0.3441 } },
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
        name: 'Двор - Вид 4',
        defaultYaw: '1.1776rad', defaultPitch: '0.0046rad',
        links: [
          // { nodeId: 'yard-6', position: { yaw: 0.4372, pitch: 0.0210 } },
          { nodeId: 'yard-10', position: { yaw: 1.5785, pitch: -0.0118 } },
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
          { nodeId: 'yard-7', position: { yaw: 3.9951, pitch: 0.0352 } },
          { nodeId: 'yard-9', position: { yaw: 0.1259, pitch: 0.2916 } },
          { nodeId: 'yard-10', position: { yaw: 1.0741, pitch: -0.0048 } }
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
          width: 8192,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/9/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/9/tile_${col}_${row}.jpg`,
        },
        name: 'Бассейн - Вид сверху',
        defaultYaw: '0.4731rad', defaultPitch: '-0.3426rad',
        links: [
          { nodeId: 'yard-7', position: { yaw: 2.5923, pitch: -0.0544 } },
          { nodeId: 'yard-6', position: { yaw: 1.8233, pitch: -0.4867 }},
          { nodeId: 'yard-10', position: { yaw: 6.1267, pitch: -0.0756 } },
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
        name: 'Перекресток',
        defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
        links: [
          { nodeId: 'yard-6', position: { yaw: 0.9480, pitch: 0.0358 } },
          { nodeId: 'yard-11', position: { yaw: 3.7564, pitch: 0.0266 }},
          { nodeId: 'yard-5', position: { yaw: 5.8855, pitch: -0.0220 } },
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
        name: 'Сквер',
        defaultYaw: '1.3743rad', defaultPitch: '0.0049rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 4.9121, pitch: 0.0347 } },
          { nodeId: 'yard-10', position: { yaw: 1.9127, pitch: 0.0117 } },
          { nodeId: 'yard-12', position: { yaw: 6.2414, pitch: -0.0182 } },
        ],
        markers: [],
      },
      {
        id: 'yard-12',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/12/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/12/tile_${col}_${row}.jpg`,
        },
        name: 'Пруд',
        defaultYaw: '1.3743rad', defaultPitch: '0.0049rad',
                links: [
          { nodeId: 'yard-11', position: { yaw: 1.6561, pitch: -0.0137 } },
          { nodeId: 'yard-1', position: { yaw: 5.0166, pitch: 0.0420 } },
          // { nodeId: 'yard-8', position: { yaw: 0.9582, pitch: 0.0520 } },
          // { nodeId: 'yard-10', position: { yaw: 1.6060, pitch: 0.0229 } },
        ],
        markers: [],
      },
      {
        id: 'yard-13',
        panorama: {
          width: 8000,
          cols: 16,
          rows: 8,
          baseUrl: `assets/tiles/13/preview.jpg`,
          tileUrl: (col, row) => `assets/tiles/13/tile_${col}_${row}.jpg`,
        },
        name: 'Двор - Вид сверху',
        defaultYaw: '6.0316rad', defaultPitch: '-0.5539rad',
        links: [
          { nodeId: 'yard-1', position: { yaw: 5.7086, pitch: -0.4832 } },

        ],
        markers: [],
        yawRange: [5.2522, 0.8155], // wrap-around: разрешено [5.25..2π] ∪ [0..0.82]
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
        name: 'Volna Resort - Стандарт',
        thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
        map: {
          imageUrl: 'assets/rooms/standart/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-std-bedroom-1', x: 61, y: 74, rotationOffset: 1.7 },
            { nodeId: 'room-std-bedroom', x: 30, y: 51, rotationOffset: -2.4 },
            { nodeId: 'room-std-bedroom-2', x: 70, y: 46, rotationOffset: -1.8 },
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
            name: 'Спальня',
            defaultYaw: '0.6978rad', defaultPitch: '-0.4281rad',
            thumbnail: 'assets/rooms/standart/thumbs/1.jpg',
            links: [ { nodeId: 'room-std-bedroom-1', position: { yaw: 0.6102, pitch: -0.3375 } } ],
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
            name: 'Коридор',
            defaultYaw: '6.2279rad', defaultPitch: '-0.4144rad',
            hideInModal: true,
            thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
            links: [ { nodeId: 'room-std-bedroom', position: { yaw: 6.1860, pitch: -0.2614 } },
              { nodeId: 'room-std-bedroom-2', position: { yaw: 2.1295, pitch: -0.0932 } },
             ],
            markers: [],
          },
          {
            id: 'room-std-bedroom-2',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/bedroom2/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/bedroom2/tile_${col}_${row}.jpg`,
            },
            name: 'Санузел',
            defaultYaw: '5.7821rad', defaultPitch: '-0.4855rad',
            thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
            links: [ { nodeId: 'room-std-bedroom-1', position: { yaw: 0.8616, pitch: -0.1845 } } ],
            markers: [],
          },
        ],
      },
      {
        id: 'residence',
        name: 'Residence - Стандарт',
        thumbnail: 'assets/rooms/residence/thumbs/1.png',
        map: {
          imageUrl: 'assets/rooms/residence/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-res-1', x: 21, y: 61, rotationOffset: -3.5 },
            { nodeId: 'room-res-2', x: 42, y: 61, rotationOffset: -3.5 },
            { nodeId: 'room-res-3', x: 75, y: 64, rotationOffset: -4 },
            { nodeId: 'room-res-4', x: 75, y: 37, rotationOffset: -4 },
            { nodeId: 'room-res-5', x: 90, y: 62, rotationOffset: 1 },
          ],
        },
        scenes: [
          {
            id: 'room-res-1',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/res-1/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/res-1/tile_${col}_${row}.jpg`,
            },
            name: 'Спальня',
            defaultYaw: '0rad', defaultPitch: '0rad',
            thumbnail: 'assets/rooms/residence/thumbs/res-1.jpg',
            links: [
              { nodeId: 'room-res-2', position: { yaw: 0.9956, pitch: -0.0413 } },
            ],
            markers: [],
          },
          {
            id: 'room-res-2',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/res-2/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/res-2/tile_${col}_${row}.jpg`,
            },
            name: 'Кухня',
            defaultYaw: '0rad', defaultPitch: '0rad',
            thumbnail: 'assets/rooms/residence/thumbs/res-2.jpg',
            links: [
              { nodeId: 'room-res-1', position: { yaw: 3.9771, pitch: -0.1477 } },
              { nodeId: 'room-res-3', position: { yaw: 0.9477, pitch: -0.0855 } },
            ],
            markers: [],
          },
          {
            id: 'room-res-3',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/res-3/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/res-3/tile_${col}_${row}.jpg`,
            },
            name: 'Коридор',
            defaultYaw: '0rad', defaultPitch: '0rad',
            thumbnail: 'assets/rooms/residence/thumbs/res-3.jpg',
            links: [
              { nodeId: 'room-res-2', position: { yaw: 4.8483, pitch: -0.0659 } },
              { nodeId: 'room-res-4', position: { yaw: 0.1497, pitch: -0.0342 } },
              { nodeId: 'room-res-5', position: { yaw: 1.7066, pitch: -0.0574 } },
            ],
            markers: [],
          },
          {
            id: 'room-res-4',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/res-4/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/res-4/tile_${col}_${row}.jpg`,
            },
            name: 'Санузел',
            defaultYaw: '0.1529rad', defaultPitch: '-0.4919rad',
            thumbnail: 'assets/rooms/residence/thumbs/res-4.jpg',
            links: [
              { nodeId: 'room-res-3', position: { yaw: 2.9048, pitch: -0.0318 } },
            ],
            markers: [],
          },
          {
            id: 'room-res-5',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/res-5/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/res-5/tile_${col}_${row}.jpg`,
            },
            name: 'Прихожая',
            defaultYaw: '0rad', defaultPitch: '0rad',
            thumbnail: 'assets/rooms/residence/thumbs/res-5.jpg',
            links: [
              { nodeId: 'room-res-3', position: { yaw: 0.0600, pitch: -0.0517 } },
            ],
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
