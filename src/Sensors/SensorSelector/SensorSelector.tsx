import React from 'react'
import {
  GoogleApiWrapper,
  InfoWindow,
  Map,
  Marker,
} from 'google-maps-react'
import Spinner from '../../Shared/Spinner/Spinner'
import './SensorSelector.css'

interface SensorSelectorProps {
  google: typeof google
}

function SensorSelector (props: SensorSelectorProps) {
  return (
    <section
      className="sensor-selector"
    >
      <h2>Sensor Selector</h2>
      <div
        className="map-wrapper"
      >
        <Map google={props.google} />
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