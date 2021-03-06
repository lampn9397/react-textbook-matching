import React from 'react';

// Components
import { DraggableItem, DroppableZone, DragFuncData, DraggableItemData } from './main';

// Variables
import styles from './app.module.scss';
import waterMelon from './assets/water-melon.png';

const countFunc = (total: number, item: DraggableItemData) => {
  if (item.isInDroppableZone) {
    return total + 1;
  }

  return total;
};

const imageList = Array(10).fill({}).map((_, index) => ({
  id: index,
  imageUrl: waterMelon,
  isInDroppableZone: false,
}));

function TextBookMatching() {
  const droppableZoneRef = React.useRef<HTMLDivElement>(null)

  const [state, setState] = React.useState({
    droppableZone: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
    imageList,
  });

  const badgeNumber = React.useMemo(() => state.imageList.reduce(countFunc, 0), [state.imageList])

  React.useEffect(() => {
    const ref = droppableZoneRef.current;

    if (ref === null) return;

    const clientRect = ref.getBoundingClientRect()

    setState((prevState) => ({
      ...prevState,
      droppableZone: {
        x: clientRect.x,
        y: clientRect.y,
        width: clientRect.width,
        height: clientRect.height,
      }
    }));
  }, []);

  const onDrag = React.useCallback((item, index) => (data: DragFuncData) => {
    if (state.imageList[index].isInDroppableZone === data.isInDroppableZone) return;

    const imageList = JSON.parse(JSON.stringify(state.imageList));
    imageList[index].isInDroppableZone = data.isInDroppableZone;

    setState((prevState) => ({
      ...prevState,
      imageList,
    }));
  }, [state.imageList]);

  const onDragStop = React.useCallback((item, index) => (data: DragFuncData) => {
    if (state.imageList[index].isInDroppableZone === data.isInDroppableZone) return;

    const imageList = JSON.parse(JSON.stringify(state.imageList));

    imageList[index].isInDroppableZone = data.isInDroppableZone;

    setState((prevState) => ({
      ...prevState,
      imageList,
    }));
  }, [state.imageList]);

  const renderItem = React.useCallback((item, index) => {
    return (
      <DraggableItem
        key={index}
        item={item}
        onDrag={onDrag(item, index)}
        onDragStop={onDragStop(item, index)}
        droppableZone={state.droppableZone}
      />
    );
  }, [state.droppableZone, onDrag, onDragStop]);

  return (
    <div className={styles.container}>
      <DroppableZone ref={droppableZoneRef} badgeNumber={badgeNumber} />
      {state.imageList.map(renderItem)}
    </div>
  );
}

export default TextBookMatching;
