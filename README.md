# @lampn9397/react-textbook-questions
[![NPM version](https://img.shields.io/npm/v/@lampn9397/react-textbook-questions)](https://www.npmjs.com/package/@lampn9397/react-textbook-questions)
[![License](https://img.shields.io/npm/l/@lampn9397/react-textbook-questions)](https://github.com/lampn9397/react-textbook-questions/blob/master/LICENSE)

## Installation

```sh
yarn add @lampn9397/react-textbook-questions
```
Or
```sh
npm install @lampn9397/react-textbook-questions
```

## Usage

```js
import { DraggableItem, DroppableZone } from "@lampn9397/react-textbook-questions";

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
