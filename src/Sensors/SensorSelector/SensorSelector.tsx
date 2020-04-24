import React from 'react'
import {
  GoogleApiWrapper,
  InfoWindow,
  Map,
  Marker,
} from 'google-maps-react'
import Spinner from '../../Shared/Spinner/Spinner'

interface SensorSelectorProps {
  google: typeof google
}

function SensorSelector (props: SensorSelectorProps) {
  return (
    <section>
      <h2>Sensor Selector</h2>
      <div
        id="map-wrapper"
      >
        <Map google={props.google} />
      </div>
    </section>
  )
}

const mapConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  LoadingContainer: Spinner,
}

export default GoogleApiWrapper(mapConfig)(SensorSelector)