# Sensat programming exercise

Please see the notes at the end for the [original test spec](#spec).

You can view a running instance of the solution here: https://sensat-test.theotherdell.com.theotherdell.com/

To build and develop locally, follow this workflow, typical of <dfn>create-react-app (<acronym title="create react app">CRA</acronym>)</dfn> derrived apps:

```bash
git clone https://github.com/simondell/test-sensat-takehome-test-1
cd test-sensat-takehome-test-1
npm install
```

You'll need to register your own Google API key and store it in a file called `.env.local` at the root of the application. Follow this format:

```
REACT_APP_DATA_HOST=http://localhost:3000
REACT_APP_GOOGLE_API_KEY=your_key_here
```

Now, run this:

```bash
npm start
```

... and visit [http://localhost:3000]() to view the example locally.

The application uses create-react-app to scaffold a development and build environment. It's configured to expect typescript; the source and tests are all in typescript. The CSS is plain ol' CSS, and built with the standard webpack configuration supplied by CRA.

I chose React and CSS because I know them well. I've used SASS, Less, material-ui, and Bulma in the past. I've only had bad experiences with CSS-in-JS so far, and whilst newer solutions like style-components and JSS are popular and seem better than what I've used before, I didn't want to take the time to learn them at this stage.

You'll see a data-grid, with sortable columns. And a map. I got bogged down and decided to stop at this point:

- I was aiming for and UI that initiated record filtering when clicking a map pin. However, I discovered only when I reacted the point of developing the pin selection that all the lat/longs are the same, rendering no difference between the boxes. I should look at the data earlier.
- adding a map (via google-maps-react) broke all my tests. it introduces out-of-lifecycle rendering and I felt too rushed by this point to work out how to reconfigure my tests to support it. This seems a disadvantage of react-testing-library's "mostly integration" philosophy over the "mostly unit tests" flow I've used before. I'm on the fence here...



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
14. Adding pagination took a while longer than hoped. I preferred to do this rather than using a plugin. I'm aiming for senior status. I need to demonstrate a balance of "can do it hands on" and "pragmatically choosing 3rd party help". I feel the map and chart parts of this test call on the second skill, and I need to show some ability to do the former. I've left the pagination within the DataGrid component for now. Many other toolkits extract them and make them work with lists, graphs and so on. I currently don't have a usecase for that in this codebase so I'm content to leave it integrated. There's no need to optimise for reusability here. I *have* made a generic datagrid: it's probably the wrong abstraction for this task but the alternatives didn't seem to suit "a technical test": it gave me a chance to show some component-building ability; gives us leverage to talk about the aforementioned 1st/3rd party balance; gives a surface area of my own code across which to discuss programming ideals.
15. Choosing to use google-maps-react to display a map. I've used it before. It's pins functionality is really simple. It's probably too simple for some many cases, but it'll do for this one.
16. google-maps-react has broken my tests. I imagine I need to waitfor a specific component (e.g. the map) to render, but I don't know how this works when running in node on a test environment so I'm giving up on that for now. 
17. 


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
