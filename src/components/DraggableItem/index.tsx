import React from 'react';
import Draggable, { DraggableEvent, DraggableEventHandler } from 'react-draggable';

type DroppableZoneType = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type DragFuncData = {
  isInDroppableZone: boolean;
}

interface DragFunc {
  (data: DragFuncData): false | void;
}

export interface DraggableItemData extends DragFuncData {
  imageUrl: string;
}

interface DraggableItemProps {
  onDrag?: DragFunc,
  onDragStop?: DragFunc,
  item: DraggableItemData,
  droppableZone: DroppableZoneType,
}

const DraggableItem = ({ item, droppableZone, onDragStop, onDrag, }: DraggableItemProps) => {
  const nodeRef = React.useRef(null);
  const [state, setState] = React.useState({
    position: undefined
  });

  const isItemInZone = React.useCallback((e: DraggableEvent, droppableZone: DroppableZoneType) => {
    const event = e as MouseEvent; // Fix TypeScript error
    const target = event.target as HTMLElement;
    const zoneLeftX = droppableZone.x;
    const zoneTopY = droppableZone.y;
    const zoneRightX = droppableZone.x + droppableZone.width;
    const zoneBottomY = droppableZone.y + droppableZone.height;

    const itemWidth = target.clientWidth;
    const itemHeight = target.clientHeight;

    const itemX = event.x - event.offsetX + (itemWidth / 2);
    const itemY = event.y - event.offsetY + (itemHeight / 2);
    const isInDroppableZone = (
      (itemX >= zoneLeftX && itemX <= zoneRightX) &&
      (itemY >= zoneTopY && itemY <= zoneBottomY)
    );
    return isInDroppableZone;
  }, []);

  const onStop: DraggableEventHandler = React.useCallback((e: DraggableEvent) => {
    if (typeof onDragStop !== 'function') return;

    const isInDroppableZone = isItemInZone(e, droppableZone)

    onDragStop({ isInDroppableZone });

    let position: any;
    if (isInDroppableZone === false) {
      // Not in zone -> reset to origin position
      position = { x: 0, y: 0 };
    }

    setState((prevState) => ({ ...prevState, position }))
  }, [droppableZone, onDragStop, isItemInZone]);

  const onDragging: DraggableEventHandler = React.useCallback((e: DraggableEvent) => {
    if (typeof onDrag !== 'function') return;

    const isInDroppableZone = isItemInZone(e, droppableZone)

    if (item.isInDroppableZone === isInDroppableZone) return;

    onDrag({ isInDroppableZone });
  }, [droppableZone, item.isInDroppableZone, onDrag, isItemInZone]);

  return (
    <Draggable position={state.position} nodeRef={nodeRef} onStop={onStop} onDrag={onDragging}>
      <img ref={nodeRef} src={item.imageUrl} alt="" width={50} height={50} draggable={false} />
    </Draggable>
  );
};

export default React.memo(DraggableItem);
