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
  defaultSceneId?: string; // Which scene to open first (defaults to scenes[0] if omitted)
  map?: MapConfig;
}

// Location groups for navigation
export const locationGroups: LocationGroup[] = [
  {
    id: 'yard',
    name: 'ДВОР',
    icon: 'yard',
    defaultSceneId: 'yard-3',
    map: {
          imageUrl: 'assets/yard/map.jpg',
          horizontal: false,
          markers: [
            { nodeId: 'yard-1', x: 55, y: 28, rotationOffset: -0.8 },
            { nodeId: 'yard-2', x: 50, y: 31, rotationOffset: -2.2 },
            { nodeId: 'yard-3', x: 56, y: 31, rotationOffset: -0.4 },
            { nodeId: 'yard-4', x: 56, y: 35, rotationOffset: -4 },
            { nodeId: 'yard-5', x: 58, y: 45, rotationOffset: -0.9 },
            { nodeId: 'yard-6', x: 44, y: 56, rotationOffset: 1.2 },
            { nodeId: 'yard-7', x: 38, y: 64, rotationOffset: -0.6 },
            { nodeId: 'yard-8', x: 40, y: 69, rotationOffset: 1.5 },
            { nodeId: 'yard-9', x: 42, y: 55, rotationOffset: 3.5 },
            // { nodeId: 'yard-10', x: 47, y: 44, rotationOffset: -2 },
            { nodeId: 'yard-11', x: 43, y: 41, rotationOffset: -3.5 },
            { nodeId: 'yard-12', x: 44, y: 37, rotationOffset: -1 },
            { nodeId: 'yard-13', x: 70, y: 30, rotationOffset: 0.8 },
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

          { nodeId: 'yard-2', position: { yaw: 0.6679, pitch: 0.0099 } },
          { nodeId: 'yard-4', position: { yaw: 6.2488, pitch: 0.0287 } },
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
          { nodeId: 'yard-2', position: { yaw: 1.0495, pitch: -0.3232 } },
          { nodeId: 'yard-1', position: { yaw: 2.4681, pitch: -0.3344 } },
          { nodeId: 'yard-4', position: { yaw: 5.9129, pitch: -0.2542 } },
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
          { nodeId: 'yard-2', position: { yaw: 5.7419, pitch: 0.0296 } },
          { nodeId: 'yard-3', position: { yaw: 0.0940, pitch: 0.3441 } },
          { nodeId: 'yard-1', position: { yaw: 6.2042, pitch: 0.0207 } },
          { nodeId: 'yard-12', position: { yaw: 4.5365, pitch: 0.0267 } }
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
          // { nodeId: 'yard-6', position: { yaw: 0.4372, pitch: 0.0210 } },
          { nodeId: 'yard-11', position: { yaw: 1.5466, pitch: -0.0024 } },
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
          // { nodeId: 'yard-10', position: { yaw: 1.0741, pitch: -0.0048 } }
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
          { nodeId: 'yard-6', position: { yaw: 3.4084, pitch: 0.2000 } },
          { nodeId: 'yard-8', position: { yaw: 5.1895, pitch: 0.2095 } },
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
          { nodeId: 'yard-7', position: { yaw: 6.1356, pitch: -0.2165 } },
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
          { nodeId: 'yard-7', position: { yaw: 2.2971, pitch: -0.0581 } },
          { nodeId: 'yard-6', position: { yaw: 1.3975, pitch: -0.7006 }},
          // { nodeId: 'yard-10', position: { yaw: 6.1267, pitch: -0.0756 } },
        ],
        markers: [],
      },
      // {
      //   id: 'yard-10',
      //   panorama: {
      //     width: 8000,
      //     cols: 16,
      //     rows: 8,
      //     baseUrl: `assets/tiles/10/preview.jpg`,
      //     tileUrl: (col, row) => `assets/tiles/10/tile_${col}_${row}.jpg`,
      //   },
      //   name: 'Перекресток',
      //   defaultYaw: '6.2148rad', defaultPitch: '0.0455rad',
      //   links: [
      //     { nodeId: 'yard-6', position: { yaw: 0.9480, pitch: 0.0358 } },
      //     { nodeId: 'yard-11', position: { yaw: 3.7564, pitch: 0.0266 }},
      //     // { nodeId: 'yard-5', position: { yaw: 5.8855, pitch: -0.0220 } },
      //   ],
      //   markers: [],
      // },
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
          // { nodeId: 'yard-1', position: { yaw: 4.9121, pitch: 0.0347 } },
          // { nodeId: 'yard-10', position: { yaw: 1.9127, pitch: 0.0117 } },
          { nodeId: 'yard-12', position: { yaw: 6.2414, pitch: -0.0182 } },
          { nodeId: 'yard-5', position: { yaw: 1.7913, pitch: -0.0206 } },
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
          { nodeId: 'yard-11', position: { yaw: 0.6349, pitch: -0.0137 } },
          { nodeId: 'yard-1', position: { yaw: 3.8537, pitch: 0.0420 } },
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
          { nodeId: 'yard-1', position: { yaw: 0.0446, pitch: -0.5350 } },
          { nodeId: 'yard-4', position: { yaw: 5.7387, pitch: -0.4583 } },
          { nodeId: 'yard-2', position: { yaw: 6.1727, pitch: -0.4312 } },
          { nodeId: 'yard-3', position: { yaw: 6.0627, pitch: -0.5292 } },
        ],
        markers: [],
        yawRange: [4.4601, 1.7628],
      },
    ],
  },
  {
    id: 'rooms',
    name: 'НОМЕРА',
    icon: 'rooms',
    defaultVariantId: 'alean_family',
    variants: [
      {
        id: 'alean_family',
        name: 'Алеан Фемели Волна 4*',
        thumbnail: 'assets/rooms/alean_family/thumbs/1.jpg',
        map: {
          imageUrl: 'assets/rooms/alean_family/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-alean-bedroom-1', x: 61, y: 74, rotationOffset: 1.7 },
            { nodeId: 'room-alean-bedroom', x: 30, y: 51, rotationOffset: -2.4 },
            { nodeId: 'room-alean-bedroom-2', x: 70, y: 46, rotationOffset: -1.8 },
          ],
        },
        scenes: [
          {
            id: 'room-alean-bedroom',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/alean_family_bedroom/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/alean_family_bedroom/tile_${col}_${row}.jpg`,
            },
            name: 'Спальня',
            defaultYaw: '0.6978rad', defaultPitch: '-0.4281rad',
            thumbnail: 'assets/rooms/alean_family/thumbs/1.jpg',
            links: [ { nodeId: 'room-alean-bedroom-1', position: { yaw: 0.6102, pitch: -0.3375 } } ],
            markers: [],
          },
          {
            id: 'room-alean-bedroom-1',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/alean_family_bedroom1/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/alean_family_bedroom1/tile_${col}_${row}.jpg`,
            },
            name: 'Коридор',
            defaultYaw: '6.2279rad', defaultPitch: '-0.4144rad',
            hideInModal: true,
            thumbnail: 'assets/rooms/alean_family/thumbs/2.jpg',
            links: [ { nodeId: 'room-alean-bedroom', position: { yaw: 6.1860, pitch: -0.2614 } },
              { nodeId: 'room-alean-bedroom-2', position: { yaw: 2.1295, pitch: -0.0932 } },
             ],
            markers: [],
          },
          {
            id: 'room-alean-bedroom-2',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/alean_family_bedroom2/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/alean_family_bedroom2/tile_${col}_${row}.jpg`,
            },
            name: 'Санузел',
            defaultYaw: '5.7821rad', defaultPitch: '-0.4855rad',
            thumbnail: 'assets/rooms/alean_family/thumbs/2.jpg',
            links: [ { nodeId: 'room-alean-bedroom-1', position: { yaw: 0.8616, pitch: -0.1845 } } ],
            markers: [],
          },
        ],
      },
      {
        id: 'residence-volna-standart',
        name: 'Резиденция Волна - Стандарт',
        thumbnail: 'assets/rooms/residence_volna_standart/thumbs/bedroom.jpg',
        map: {
          imageUrl: 'assets/rooms/residence_volna_standart/map/map.png',
          horizontal: true,
          markers: [
            { nodeId: 'room-rvs-bedroom', x: 24, y: 61, rotationOffset: 2.4 },
            { nodeId: 'room-rvs-dining', x: 54, y: 57, rotationOffset: 1.8 },
            { nodeId: 'room-rvs-hall', x: 85, y: 57, rotationOffset: 1 },
            { nodeId: 'room-rvs-bath', x: 72, y: 43, rotationOffset: 2.4 },
          ],
        },
        scenes: [
          {
            id: 'room-rvs-bedroom',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/residence_volna_standart_bedroom/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/residence_volna_standart_bedroom/tile_${col}_${row}.jpg`,
            },
            name: 'Спальня',
            defaultYaw: '0.3832rad', defaultPitch: '-0.3617rad',
            thumbnail: 'assets/rooms/residence_volna_standart/thumbs/bedroom.jpg',
            links: [
              { nodeId: 'room-rvs-dining', position: { yaw: 1.5335, pitch: -0.1153 } },

            ],
            markers: [],
          },
          {
            id: 'room-rvs-dining',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/residence_volna_standart_dining/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/residence_volna_standart_dining/tile_${col}_${row}.jpg`,
            },
            name: 'Столовая',
            defaultYaw: '6.2064rad', defaultPitch: '-0.4422rad',
            thumbnail: 'assets/rooms/residence_volna_standart/thumbs/bedroom.jpg',
            links: [
              { nodeId: 'room-rvs-hall', position: { yaw: 2.3931, pitch: -0.0673 } },
              { nodeId: 'room-rvs-bath', position: { yaw: 2.2098, pitch: -0.1845 } },
              { nodeId: 'room-rvs-bedroom', position: { yaw: 5.3965, pitch: -0.0808 } },

            ],
            markers: [],
          },
          {
            id: 'room-rvs-hall',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/residence_volna_standart_hall/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/residence_volna_standart_hall/tile_${col}_${row}.jpg`,
            },
            name: 'Гостиная',
            defaultYaw: '0.6261rad', defaultPitch: '-0.2426rad',
            thumbnail: 'assets/rooms/residence_volna_standart/thumbs/bedroom.jpg',
            links: [
              { nodeId: 'room-rvs-dining', position: { yaw: 6.2726, pitch: -0.1023 } },
              { nodeId: 'room-rvs-bath', position: { yaw: 0.3635, pitch: -0.1669 } },

            ],
            markers: [],
          },
          {
            id: 'room-rvs-bath',
            panorama: {
                width: 8192,
                cols: 16,
                rows: 8,
                baseUrl: 'assets/tiles/residence_volna_standart_bath/preview.jpg',
                tileUrl: (col: number, row: number) => `assets/tiles/residence_volna_standart_bath/tile_${col}_${row}.jpg`,
            },
            name: 'Санузел',
            defaultYaw: '0.1648rad', defaultPitch: '-0.5423rad',
            thumbnail: 'assets/rooms/residence_volna_standart/thumbs/bedroom.jpg',
            links: [
              { nodeId: 'room-rvs-hall', position: { yaw: 2.8550, pitch: -0.1820 } },
            ],
            markers: [],
          },
        ],
      },
      // {
      //   id: 'volna-alt-standard',
      //   name: 'volna residence - Alt. Standard',
      //   thumbnail: 'assets/rooms/residence_alt_standart/thumbs/preview.jpg',
      //   map: {
      //     imageUrl: 'assets/rooms/residence_alt_standart/map/map.png',
      //     horizontal: true,
      //     markers: [
      //       { nodeId: 'volna-alt-standard-scene-1', x: 20, y: 62, rotationOffset: 2.1 },
      //       { nodeId: 'volna-alt-standard-scene-2', x: 42, y: 59, rotationOffset: 0 },
      //       { nodeId: 'volna-alt-standard-scene-3', x: 78, y: 39, rotationOffset: -0.7 },
      //       { nodeId: 'volna-alt-standard-scene-4', x: 66, y: 59, rotationOffset: -0.8 },
      //     ],
      //   },
      //   scenes: [
      //     {
      //       id: 'volna-alt-standard-scene-1',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/residence_alt_standart_1/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/residence_alt_standart_1/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Спальня',
      //       defaultYaw: '0.6978rad', defaultPitch: '-0.4281rad',
      //       thumbnail: 'assets/tiles/residence_alt_standart_1/preview.jpg',
            
      //       links: [ 
      //         { nodeId: 'volna-alt-standard-scene-2', position: { yaw: 1.6141, pitch: -0.4552 } },
      //         { nodeId: 'volna-alt-standard-scene-3', position: { yaw: 1.4237, pitch: -0.0762 } },
      //         { nodeId: 'volna-alt-standard-scene-4', position: { yaw: 1.6291, pitch: -0.1240 } }
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'volna-alt-standard-scene-2',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/residence_alt_standart_2/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/residence_alt_standart_2/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Кухня',
      //       defaultYaw: '0.0315rad', defaultPitch: '-0.2564rad',
      //       hideInModal: true,
      //       thumbnail: 'assets/tiles/residence_alt_standart_2/preview.jpg',
      //       links: [ 
      //         { nodeId: 'volna-alt-standard-scene-1', position:  { yaw: 0.7240, pitch: -0.1564 } },
      //         { nodeId: 'volna-alt-standard-scene-3', position: { yaw: 3.5685, pitch: -0.1638 } },
      //         { nodeId: 'volna-alt-standard-scene-4', position: { yaw: 4.2165, pitch: -0.1962 } }
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'volna-alt-standard-scene-3',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/residence_alt_standart_3/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/residence_alt_standart_3/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Прихожая',
      //       defaultYaw: '0.4297rad', defaultPitch: '-0.3920rad',
      //       thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
      //       links: [ 
      //         { nodeId: 'volna-alt-standard-scene-2', position: { yaw: 1.5658, pitch: -0.1767 } },
      //         { nodeId: 'volna-alt-standard-scene-4', position: { yaw: 1.2845, pitch: -0.1767 } }
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'volna-alt-standard-scene-4',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/residence_alt_standart_4/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/residence_alt_standart_4/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Санузел',
      //       defaultYaw: '0.4297rad', defaultPitch: '-0.3920rad',
      //       thumbnail: 'assets/rooms/standart/thumbs/2.jpg',
      //       links: [ 
      //         { nodeId: 'volna-alt-standard-scene-2', position: { yaw: 2.5690, pitch: -0.5276 } },
      //         { nodeId: 'volna-alt-standard-scene-3', position: { yaw: 3.4045, pitch: -0.5276 } }
      //        ],
      //       markers: [],
      //     },
      //   ],
      // },
      // {
      //   id: 'residence',
      //   name: 'Residence - Стандарт',
      //   thumbnail: 'assets/rooms/residence/thumbs/1.png',
      //   map: {
      //     imageUrl: 'assets/rooms/residence/map/map.png',
      //     horizontal: true,
      //     markers: [
      //       { nodeId: 'room-res-1', x: 21, y: 61, rotationOffset: -3.5 },
      //       { nodeId: 'room-res-2', x: 42, y: 61, rotationOffset: -3.5 },
      //       { nodeId: 'room-res-3', x: 75, y: 64, rotationOffset: -4 },
      //       { nodeId: 'room-res-4', x: 75, y: 37, rotationOffset: -4 },
      //       { nodeId: 'room-res-5', x: 90, y: 62, rotationOffset: 1 },
      //     ],
      //   },
      //   scenes: [
      //     {
      //       id: 'room-res-1',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/res-1/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/res-1/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Спальня',
      //       defaultYaw: '0rad', defaultPitch: '0rad',
      //       thumbnail: 'assets/rooms/residence/thumbs/res-1.jpg',
      //       links: [
      //         { nodeId: 'room-res-2', position: { yaw: 0.9956, pitch: -0.0413 } },
      //       ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-res-2',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/res-2/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/res-2/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Кухня',
      //       defaultYaw: '0rad', defaultPitch: '0rad',
      //       thumbnail: 'assets/rooms/residence/thumbs/res-2.jpg',
      //       links: [
      //         { nodeId: 'room-res-1', position: { yaw: 3.9771, pitch: -0.1477 } },
      //         { nodeId: 'room-res-3', position: { yaw: 0.9477, pitch: -0.0855 } },
      //       ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-res-3',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/res-3/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/res-3/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Коридор',
      //       defaultYaw: '0rad', defaultPitch: '0rad',
      //       thumbnail: 'assets/rooms/residence/thumbs/res-3.jpg',
      //       links: [
      //         { nodeId: 'room-res-2', position: { yaw: 4.8483, pitch: -0.0659 } },
      //         { nodeId: 'room-res-4', position: { yaw: 0.1497, pitch: -0.0342 } },
      //         { nodeId: 'room-res-5', position: { yaw: 1.7066, pitch: -0.0574 } },
      //       ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-res-4',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/res-4/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/res-4/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Санузел',
      //       defaultYaw: '0.1529rad', defaultPitch: '-0.4919rad',
      //       thumbnail: 'assets/rooms/residence/thumbs/res-4.jpg',
      //       links: [
      //         { nodeId: 'room-res-3', position: { yaw: 2.9048, pitch: -0.0318 } },
      //       ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-res-5',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/res-5/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/res-5/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'Прихожая',
      //       defaultYaw: '0rad', defaultPitch: '0rad',
      //       thumbnail: 'assets/rooms/residence/thumbs/res-5.jpg',
      //       links: [
      //         { nodeId: 'room-res-3', position: { yaw: 0.0600, pitch: -0.0517 } },
      //       ],
      //       markers: [],
      //     },
      //   ],
      // },
      // {
      //   id: 'junior-suite',
      //   name: 'ДЖУНИОР СЬЮТ',
      //   thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
      //   map: {
      //     imageUrl: 'assets/rooms/junior_suite/map/map.png',
      //     horizontal: true,
      //     markers: [
      //       { nodeId: 'room-jun-hall', x: 42, y: 36, rotationOffset: -2.5 },
      //       { nodeId: 'room-jun-bedroom', x: 52, y: 61, rotationOffset: -2.2 },
      //       { nodeId: 'room-jun-master-bedroom', x: 37, y: 61, rotationOffset: -2.2 },
      //       { nodeId: 'room-jun-master-bath', x: 18, y: 63, rotationOffset: -2.2 },
      //       { nodeId: 'bath', x: 20, y: 20, rotationOffset: -1 },
      //       { nodeId: 'prihozhaya', x: 20, y: 42, rotationOffset: -2.2 },
      //     ],
      //   },
      //   scenes: [
      //     {
      //       id: 'room-jun-hall',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/hall/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/hall/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'ГОСТИНАЯ',
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/hall.jpg',
      //       defaultYaw: '5.1549rad', defaultPitch: '-0.4141rad',
      //       links: [ { nodeId: 'room-jun-bedroom', position: { yaw: 2.1896, pitch: -0.3254 } }, {nodeId: 'prihozhaya', position: { yaw: 2.8777, pitch: -0.1605 }} ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-jun-bedroom',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/master_bedroom1/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom1/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'СПАЛЬНЯ',
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
      //       defaultYaw: '2.0335rad', defaultPitch: '-0.5621rad',
      //       links: [ 
      //         { nodeId: 'room-jun-master-bath', position: { yaw: 3.1539, pitch: -0.0534 } }, 
      //         { nodeId: 'room-jun-master-bedroom', position: { yaw: 3.2296, pitch: -0.4722 } }, 
      //         { nodeId: 'room-jun-hall', position: { yaw: 3.5783, pitch: -0.1019 } }, 
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'prihozhaya',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/prihozhaya/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/prihozhaya/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'ПРИХОЖАЯ',
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
      //       defaultYaw: '5.5624rad', defaultPitch: '-0.1765rad',
      //       links: [ 
      //         { nodeId: 'room-jun-hall', position: { yaw: 6.1745, pitch: -0.0861 } }, 
      //         { nodeId: 'bath', position: { yaw: 4.6806, pitch: -0.1670 } }, 
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'bath',
      //       panorama: {
      //       width: 8000,
      //       cols: 16,
      //       rows: 8,
      //       baseUrl: `assets/tiles/bath/preview.jpg`,
      //       tileUrl: (col, row) => `assets/tiles/bath/tile_${col}_${row}.jpg`,
      //     },
      //       name: 'САНУЗЕЛ',
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
      //       defaultYaw: '2.7479rad', defaultPitch: '-0.5634rad',
      //       links: [ 
      //         { nodeId: 'prihozhaya', position: { yaw: 6.2679, pitch: -0.1670 } }, 
      //        ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-jun-master-bedroom',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/master_bedroom/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/master_bedroom/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'СПАЛЬНЯ',
      //       defaultYaw: '0.9685rad', 
      //       defaultPitch: '-0.5973rad',
      //       hideInModal: true,
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/bedroom.jpg',
      //       links: [
      //         { nodeId: 'room-jun-master-bath', position: { yaw: 2.9017, pitch: -0.0842 } }, 
      //         { nodeId: 'room-jun-hall', position: {yaw: 4.1014, pitch: -0.1626} },
      //         { nodeId: 'room-jun-bedroom', position: { yaw: 0.1830, pitch: -0.5214 } },
      //       ],
      //       markers: [],
      //     },
      //     {
      //       id: 'room-jun-master-bath',
      //       panorama: {
      //           width: 8192,
      //           cols: 16,
      //           rows: 8,
      //           baseUrl: 'assets/tiles/master_bath/preview.jpg',
      //           tileUrl: (col: number, row: number) => `assets/tiles/master_bath/tile_${col}_${row}.jpg`,
      //       },
      //       name: 'МАСТЕР САНУЗЕЛ',
      //       thumbnail: 'assets/rooms/junior_suite/thumbs/bath.jpg',
      //       defaultYaw: '2.9017rad',
      //       defaultPitch: '-0.0842rad',
      //       links: [{ nodeId: 'room-jun-master-bedroom', position: { yaw: 6.2342, pitch: -0.0877 } }],
      //       markers: [],
      //     },
      //   ],
      // },
      
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
