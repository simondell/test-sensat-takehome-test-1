export interface SensorRecord {
  id: string // "Box-A1-O3",
  box_id: string // "Box-A1",
  sensor_type: string // "O3",
  unit: string // "ppm",
  name: string // "Ozone",
  range_l: number // 0.0,
  range_u: number // 1000.0,
  longitude: number // -0.06507,
  latitude: number // 51.51885,
  reading: number // 672,
  reading_ts: string // "2019-09-10T00:00:00"
}

// interface Reading {
//   sensor_id: string // "Box-A1-O3",
//   reading: number // 672,
//   reading_ts: string // "2019-09-10T00:00:00"
// }

// interface Sensor {
//   id: string // "Box-A1-O3",
//   box_id: string // "Box-A1",
//   type: string // "O3",
//   unit: string // "ppm",
//   name: string // "Ozone",
//   range_l: number // 0.0,
//   range_u: number // 1000.0,
// }

// interface Box {
//   id: string // "Box-A1",
//   longitude: number // -0.06507,
//   latitude: number // 51.51885,
// }