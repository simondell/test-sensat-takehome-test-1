# Sensat programming exercise

Please see the notes at the end for the [original test spec](#spec).

## Decision log

1. I shall use React, rather than Angular. I havn't used Angular since v1.4ish, >5 years ago. I have used React extensively. I don't have time nor the will to learn modern Angular to production level for this test; also the internal recruiter seemed content to accept a React-based solution
2. I'll use create-react-app to scaffold the project: testing with Jest & react-testing-library, linting, good TS support, a dev server with HMR, sane CSS defaults etc... plus this has been my toolset the last >2 years.
3. The JSON file has >8000 entries, as individual lines, not wrapped in an array. The file wouldn't pass JSON validation. It's a lot of data to fetch in one call (although about the size of a high quality photo or low quality pop song as an MP3, so it's not _that_ big). The test suggests plotting graphs of sensor data over time, which would benefit from "lots" of data, so perhaps it's fine as it is. Initially I shall pull a handful of lines out to use in a mock, to develop against. Then I'll wrap the whole lot in a single array and fetch it in one go. This isn't a mock of public data, it's a mock of internal data, so I'd be able to negotiate things like "wrapping in an array" or "page sizes" from the back-end team. If it becomes unweildy and if I feel I have time, I'll look into an API to deliver pages of data. 
4. Oh yeah: indent with 2 spaces; don't use semi-colons
5. Starting out thinking to make a generic "DataTable"
6. The test spec claims the `id` field contains a UUID of a sensor reading. This doesn't match the data in the collection. In the collection, the `id` appears to contain the id of a given sensor in a particular box. In fact, it holds a concatenation of `box_id` and `sensor_type`. Multiple entries in the collection have matching `id` values: indicating multiple readings from a single sensor. These cannot be used as UUIDs. Initially, going to use something else....
7. I thought React Context might help define the table specification (which headers label columns of keys of model data). However, I got lost in a mess of type definitions trying to make this work. It's also too much engineering for this stage. I stripped it back to use arrays of variables, not even useState as I currently don't see a need to maintain state. I'll leave that open 'til later in the test.
8. Basic tests for table operation find rows per data entry, and columns per Column child. I could get more complex and specific--checking the cells hold the data you'd expect to see... but I would rather move on.
9. I tried adding a sort function, so that `<DataTable>` consumers could specify a key to sort on, and a direction. However, I got lost in a morass of type problems: string indexing through `{}` seems disallowed in some circumstances; I don't understand generics enough, plus numerous other sidetracks. Another approach would be to take this in a less generic direction. The `DataTable` was meant to be the starting point for a fully-fledged generic model viewer. However, the bulk of this test app is meant to show sensor readings and sensor metadata. So, there's no firm requirement for a generic data table; that work seems a premature optimisation for a "we need to show any kind of model as a table" problem that wasn't really there. So, instead, I shall model sensors and their outputs, and display that. I think that'll get me moving faster.
10. Rearranged folders to use "topic-first" structure. This better reflects the idea that we're displaying data about an entity (sensors and their readings).
11. 

## Notes

Specify allowed children: https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde/49408900#49408900



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
