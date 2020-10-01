import React from 'react';
import Draggable, { DraggableEvent, DraggableEventHandler } from 'react-draggable';

type DroppableZoneType = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type DragFuncData = {
  isInDroppableZone: boolean;
}

interface DragFunc {
  (data: DragFuncData): false | void;
}

type draggableItemData = {
  imageUrl: string;
}

interface DraggableItemProps {
  onDragStop: DragFunc,
  item: draggableItemData,
  droppableZone: DroppableZoneType,
}

const DraggableItem = ({ item, droppableZone, onDragStop }: DraggableItemProps) => {
  const nodeRef = React.useRef(null);

  const onStop: DraggableEventHandler = React.useCallback((e: DraggableEvent) => {
    if (typeof onDragStop === 'function') {
      const event = e as MouseEvent; // Fix TypeScript error
      const minX = droppableZone.x;
      const minY = droppableZone.y;
      const maxX = droppableZone.x + droppableZone.width;
      const maxY = droppableZone.y + droppableZone.height;
      const isInDroppableZone = (event.clientX >= minX && event.clientX <= maxX) && (event.clientY >= minY && event.clientY <= maxY);
      onDragStop({ isInDroppableZone });
    }
  }, [droppableZone, onDragStop]);

  return (
    <Draggable nodeRef={nodeRef} onStop={onStop}>
      <img ref={nodeRef} src={item.imageUrl} alt="" width={50} height={50} draggable={false} />
    </Draggable>
  );
};

export default React.memo(DraggableItem);
