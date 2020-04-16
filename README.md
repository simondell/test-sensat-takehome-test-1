# Sensat programming exercise

Please see the notes at the end for the [original test spec](#spec).

## Decision log

1. I shall use React, rather than Angular. I havn't used Angular since v1.4ish, >5 years ago. I have used React extensively. I don't have time nor the will to learn modern Angular to production level for this test; also the internal recruiter seemed content to accept a React-based solution
2. I'll use create-react-app to scaffold the project: testing with Jest & react-testing-library, linting, good TS support, a dev server with HMR, sane CSS defaults etc... plus this has been my toolset the last >2 years.


# <a id="spec">Original test spec: Angular Programming Exercise</a>

Some environmental sensors have been deployed on the field.
There are various types of sensors (CO, Temperature, O3, SO2, Humidity, …).
Sensors are housed in boxes, and a box contains one sensor of each kind.
Boxes have been placed at various locations.
The sensor data has been collected in a JSON file with the following schema:

```json
{
  "id": "Box-A1-O3", // UUID for this sensor reading
  "box_id": "Box-A1", // UUID of the box
  "sensor_type": "O3", // type of the sensor
  "name": "Ozone", // type of data read by sensor
  "range_l": 0, // measuring range lower bound
  "range_u": 1000, // measuring range upper bound
  "longitude": -0.06507, // location of the box (lon)
  "latitude": 51.51885, // location of the box (lat)
  "reading": 817, // actual value being read
  "unit": "ppm", // measurement unit
  "reading_ts": "2019-09-10T00:00:00" // when the reading was taken
}
```

The file can be found in the data/ directory

#### Basic Task

Write an Angular application which

1.  reads the records from the sensor_readings.json
2.  displays them in a tabular component (nothing too ugly)
3.  allows the user to sort data by time and sensor type

#### Extra Tasks (two maximum)

- allow user to enter new sensor data.
- allows the user to filter data by sensor type/name.
- plot a graph of sensor readings over time.
- allow user to see sensor location on a map(use any lib google maps, openStreetMaps, openLayers, etc).
- aggregate the data from all readings for the same sensor type, and compute the median of all its values. e.g

| Box         | Sensor Type | Median | Unit |
| ----------- | ----------- | ------ | ---- |
| Box-A1-O3   | O3          | 321    | ppm  |
| Box-A1-TEMP | TEMP        |        |      |

#### Submission

Please include with your submission:

- An explanation of any design decisions you've made (e.g. choice of libs, why you left parts out?, how you could improve this further, etc).
- A brief guide on how to run the project.
