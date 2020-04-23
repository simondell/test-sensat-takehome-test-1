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
9. Typing is hard. I spent way longer than expected trying to get the type of `bySpec()` (and its predescessor `byKey()`) brief yet descriptive. I'm fairly sure I tried the current typing and was told it didn't work by the compilor, at one point. There were two interacting factors: it needed to return a function of type which would match the comparator of `Array.prototype.sort()`, but also allow me to index arbitrarily through properties of the arguments which would be passed to the comparator. I invented a type which allowed indexing by string key through an array. I also created a `<SortableColumn/>` with the extra props needed for sorting. I elected not to export this so that  `<Column sortable />` will work as interface enough. The DataTable decides whether to render `<SortableColumn />`s in place of `<Column/>`s. This allowed me to skip checking whether every sort-related prop had been passed to the `<Column>`. 
10. App should request data from the server. Wrote a basic `useEffect()` to fetch from localhost. Many, many issues:

    *  `fetch()` needs mocking; there's a few helpers. Most blogs suggest jest-fetch-mock when also working in TS.
    *  The docs on how to use the `jest-fetch-mock` in tests are full of confusion. Do you need to import it into the test set-up or not? Do you need to `enableFetchMocks()`? I settled on my individual test script importing lib.enableFetchMocks and running it explicitly. This seemed to make `fetchMock` available in the scope of the tests.
    *  Because the `useEffect()` callback is called immediately, and the useState setters get set after fetch returns, state updates happen after the simple render tests completes. This causes React to warn that we should use `act()`, but the docs for react-testing-library tell us we shouldn't need `act()` in most cases. They have two approaches: use the built in `waitforX` functions to wait for things like loading spinners to be removed, or mock the promise returned from the external API call. I tried the latter because I didn't want to get into rendering spinners at this point, but I couldn't get the shape/typing of the mock response correct. It had taken me about 3 hours of reading and testing different approaches because I wanted to learn how to do it, but in the end I gave up and added in a brittle spinner. I'm not convinced by react-testing-library yet. It makes hard things even harder. I get that I now have a test that proves my component responds to the API request and that is a "better reflection of live", but this test WILL break when I update the (currently text-only) spinner. This is the exact reason other frameworks advise NOT testing markup.

11. Loading all 8000 records takes ages, even from localhost. It's as much as seconds!! I assume it's more to do with parsing the JSON than the loading. A quick scan of the Performance panel didn't confirm this, but there's a really long task labelled "Promise Callback" which does a lot of garbage collecting, so my confidence rises. The worst of this is that it blocks the render process: even a loading spinner animated gif doesn't animate. Firefox reached the point of telling me my web page was slow and inviting me to refresh it. Something needs to be done. I suspect using a worker will free up the rendering, so at least we'll get the spinner. 
12. I read around a little on workers and service workers. Both might help... but the former seems to be more direct. However, there was a lot to learn, so before I dived into that I double-checked where the slow-down was. Turns out, it's in rendering, not in parsing. If I do this:
    
        (async function fetchRecords () {
          setLoading(true)

          const response = await fetch('http://localhost:3000/data/sensor_readings.json')
          const text = await response.text()

          const records: Record[] = []
          for(const line of text.split('\n')) {
            records.push(JSON.parse(line))
          }
          console.log(records)
          // setRecords(records)
          setLoading(false)
        })()

    ... then the browser happily logs out an array 8000s items long, in no time at all. This is disappointing. 

13. I know of two strategies for displaying large amounts of data: explicit pagination and virtualised rows (render enough rows to fit within the visible height plus one and then cycle as you scroll). The latter makes for a more modern-feeling UI (I'm hesitant to say "better": infinite scroll doesn't suit applications with footers, and makes it harder to answer "where am I?"). I don't fancy my chances of building an infinite scroll/virtualised rows implmeentation in a time-frame sane for this exercies. My choices are: roll my own pagination, use a plugin + recipe for virtualised rows. I've already started to build a datagrid, so I'm going to pick that one. It should allow me to show some TDD and one approach to problem solving. If I get really lost, I'll probably use [react-table](https://react-table.js.org): it looks like a handy blend of helpers for the data part, with hand-rolled mark-up (which would support using a UI library too). React-table also supports pagination and virtualised row style UI rendering: handy!
14. Adding pagination took a while longer than hoped. I preferred to do this rather than using a plugin. I'm aiming for senior status. I need to demonstrate a balance of "can do it hands on" and "pragmatically choosing 3rd party help". I feel the map and chart parts of this call on the second skill, and I need to show some ability to do the former.

## Notes

Specify allowed type of children: https://stackoverflow.com/questions/44475309/how-do-i-restrict-the-type-of-react-children-in-typescript-using-the-newly-adde/49408900#49408900

Dynamically assign values to objects, in typescript: https://stackoverflow.com/questions/12710905/how-do-i-dynamically-assign-properties-to-an-object-in-typescript

Typing state: https://www.carlrippon.com/typed-usestate-with-typescript/

Typing Context: https://rjzaworski.com/2018/05/react-context-with-typescript

Update context from within a child: https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component

Remind myself how to sort: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

Default element role types: https://github.com/A11yance/aria-query#elements-to-roles

Mock Fetch: https://github.com/jefflau/jest-fetch-mock#api

Testing hooks: https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407/

Jest tips, but w/out TypeScript: https://blog.sapegin.me/all/react-testing-3-jest-and-react-testing-library/

Avoid the `act()` warning: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning

Response: https://developer.mozilla.org/en-US/docs/Web/API/Response



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
