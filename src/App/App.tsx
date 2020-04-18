import React from 'react'
import {
  Column,
  DataTable,
} from '../DataTable/DataTable'
import './App.css'

const mockData = [
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 672, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 193, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-CO", "box_id": "Box-A1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 331, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-TEMP", "box_id": "Box-A1", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 50, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-RH", "box_id": "Box-A1", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 73, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-O3", "box_id": "Box-A2", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 273, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-NO2", "box_id": "Box-A2", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 601, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-CO", "box_id": "Box-A2", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 378, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-TEMP", "box_id": "Box-A2", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 74, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A2-RH", "box_id": "Box-A2", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 0, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-O3", "box_id": "Box-B1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 618, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-NO2", "box_id": "Box-B1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 7, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-CO", "box_id": "Box-B1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 137, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-TEMP", "box_id": "Box-B1", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 50, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B1-RH", "box_id": "Box-B1", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 71, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-O3", "box_id": "Box-B2", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 236, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-NO2", "box_id": "Box-B2", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 628, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-CO", "box_id": "Box-B2", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 376, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-TEMP", "box_id": "Box-B2", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 14, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-B2-RH", "box_id": "Box-B2", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 71, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 207, "reading_ts": "2019-09-10T00:30:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 354, "reading_ts": "2019-09-10T00:30:00"},
  {"id": "Box-A1-CO", "box_id": "Box-A1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 917, "reading_ts": "2019-09-10T00:30:00"},
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensat take-home test 1</h1>
      </header>
      <DataTable
        data={mockData}
      >
        <Column
          field="box_id"
          heading="Box"
        />
        <Column
          field="sensor_type"
          heading="Sensor"
          // sortable={true}
        />
        <Column
          field="reading"
          heading="reading"
        />
        <Column
          field="unit"
          heading="unit"
        />
        <Column
          field="reading_ts"
          heading="Date &amp; time"
        />
      </DataTable>
    </div>
  )
}

export default App;
