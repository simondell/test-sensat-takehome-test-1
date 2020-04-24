import React, {
  useEffect,
  useState,
} from 'react'
import {
  Column,
  DataGrid,
} from '../DataGrid/DataGrid'
import SensorSelector, {
  Box,
  Sensor,
} from '../../Sensors/SensorSelector/SensorSelector'
import './App.css'
import Spinner from '../Spinner/Spinner'

interface Reading {
  id: string // "Box-A1-CO",
  reading: number // 917,
  reading_ts: string // "2019-09-10T00:30:00"
}

type Record = Box & Sensor & Reading

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

      <SensorSelector
        sensors={records}
      />

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
