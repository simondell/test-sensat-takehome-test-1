import React, {
  useEffect,
  useState,
} from 'react'
import {
  Column,
  DataGrid,
} from '../DataGrid/DataGrid'
import SensorSelector from '../../Sensors/SensorSelector/SensorSelector'
import './App.css'
import Spinner from '../Spinner/Spinner'

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

interface Record {
  id: string // "Box-A1-CO",
  box_id: string // "Box-A1",
  sensor_type: string // "CO",
  unit: string // "ppm",
  name: string // "Carbon monoxide",
  range_l: number // 0.0,
  range_u: number // 1000.0,
  longitude: number // -0.06507,
  latitude: number // 51.51885,
  reading: number // 917,
  reading_ts: string // "2019-09-10T00:30:00"
}

function App() {
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState([] as Record[])

  useEffect(() => {
    (async function fetchRecords () {
      setLoading(true)

      const response = await fetch('http://localhost:3000/data/sensor_readings.json')
      const text = await response.text()

      const sourceRecords: Record[] = []
      for(const line of text.split('\n')) {
        sourceRecords.push(JSON.parse(line))
      }

      if(process.env.NODE_ENV === 'development') {
        console.log(sourceRecords)
      }
      setRecords(sourceRecords)
      setLoading(false)
    })()
  }, [])

  if(loading) return <Spinner />

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensat take-home test 1</h1>
      </header>

      <SensorSelector />

      <section>
        <h2>Readings</h2>
        <DataGrid
          data={records}
          pageSize={15}
        >
          <Column
            field="box_id"
            heading="Box"
          />
          <Column
            field="sensor_type"
            heading="Sensor"
            sortable
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
            sortable
          />
        </DataGrid>
      </section>
    </div>
  )
}

export default App
