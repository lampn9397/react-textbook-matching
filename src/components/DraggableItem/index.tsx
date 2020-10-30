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
  onDragStop: DragFunc,
  item: DraggableItemData,
  droppableZone: DroppableZoneType,
}

const DraggableItem = ({ item, droppableZone, onDragStop }: DraggableItemProps) => {
  const nodeRef = React.useRef(null);

  const onStop: DraggableEventHandler = React.useCallback((e: DraggableEvent) => {
    if (typeof onDragStop === 'function') {
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
      // const itemRightX = itemLeftX + (itemWidth / 2);
      // const itemBottomY = itemTopY + (itemHeight / 2);
      const isInDroppableZone = (
        (itemX >= zoneLeftX && itemX <= zoneRightX) &&
        (itemY >= zoneTopY && itemY <= zoneBottomY)
      );
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
