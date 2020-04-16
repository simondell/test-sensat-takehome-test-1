import React from 'react'
import './App.css'

const mockData = [
  {"id": "Box-A1-O3", "box_id": "Box-A1", "sensor_type": "O3", "unit": "ppm", "name": "Ozone", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 672, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-NO2", "box_id": "Box-A1", "sensor_type": "NO2", "unit": "ppm", "name": "Nitrogen dioxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 193, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-CO", "box_id": "Box-A1", "sensor_type": "CO", "unit": "ppm", "name": "Carbon monoxide", "range_l": 0.0, "range_u": 1000.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 331, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-TEMP", "box_id": "Box-A1", "sensor_type": "TEMP", "unit": "\u00baC", "name": "Ambient temperature", "range_l": -20.0, "range_u": 80.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 50, "reading_ts": "2019-09-10T00:00:00"},
  {"id": "Box-A1-RH", "box_id": "Box-A1", "sensor_type": "RH", "unit": "%", "name": "Relative humidity", "range_l": 0.0, "range_u": 100.0, "longitude": -0.06507, "latitude": 51.51885, "reading": 73, "reading_ts": "2019-09-10T00:00:00"},
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sensat take-home test 1</h1>
      </header>
    </div>
  )
}

export default App;
