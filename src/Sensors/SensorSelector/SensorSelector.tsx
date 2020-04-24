import React from 'react'
import {
  GoogleApiWrapper,
  Map,
  Marker,
} from 'google-maps-react'
import Spinner from '../../Shared/Spinner/Spinner'
import './SensorSelector.css'

export interface Box {
  box_id: string // "Box-A1",
  longitude: number // -0.06507,
  latitude: number // 51.51885,
}

export interface Sensor {
  id: string // "Box-A1-CO",
  box_id: string // "Box-A1",
  sensor_type: string // "CO",
  unit: string // "ppm",
  name: string // "Carbon monoxide",
  range_l: number // 0.0,
  range_u: number // 1000.0,
}

interface SensorSelectorProps {
  google: typeof google
  sensors: Record[]
}

type Record = Sensor & Box

function SensorSelector (props: SensorSelectorProps) {
  const boxes = props.sensors.reduce((boxes, record) => {
    if(boxes.find(box => box.box_id && box.box_id === record.box_id)) return boxes

    return [
      ...boxes,
      {
        box_id: record.box_id,
        longitude: record.longitude,
        latitude: record.latitude,
      }
    ]
  }, [] as Box[])

  console.log(boxes)

  return (
    <section
      className="sensor-selector"
    >
      <h2>Sensor Selector</h2>
      <div
        className="map-wrapper"
      >
        <Map
          initialCenter={{
            // London, taken from some map docs
            lat: 51.505,
            lng: -0.09
          }}
          google={props.google}
          zoom={8}
        >
        {
          boxes.map(box =>
            <Marker
              key={box.box_id}
              position={{
                lat: box.latitude,
                lng: box.longitude,
              }}
            />
          )
        }
        </Map>
      </div>

      <div
        className="box-data"
      >
      </div>
    </section>
  )
}

const mapConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  LoadingContainer: Spinner,
}

export default GoogleApiWrapper(mapConfig)(SensorSelector)