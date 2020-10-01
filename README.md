# @lampn9397/react-textbook-matching
[![NPM version](https://img.shields.io/npm/v/@wiicamp/react-native-reminders)](https://www.npmjs.com/package/@lampn9397/react-textbook-matching)
[![License](https://img.shields.io/npm/l/@wiicamp/react-native-reminders)](https://github.com/lampn9397/react-textbook-matching/blob/master/LICENSE)

## Installation

```sh
yarn add @lampn9397/react-textbook-matching
```
Or
```sh
npm install @lampn9397/react-textbook-matching
```

## Usage

```js
import { DraggableItem, DroppableZone } from "@lampn9397/react-textbook-matching";

<DraggableItem
  // Item data
  item={{}}
  // DroppableZone rect
  droppableZone={{
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }}
  
  onDragStop={({ isInDroppableZone }) => { }}
/>

// Ref for calculate DroppableZone rect
const droppableZoneRef = React.useRef();
// For calculate DroppableItem in zone
const badgeNumber = 0;
<DroppableZone ref={droppableZoneRef} badgeNumber={badgeNumber} />
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
