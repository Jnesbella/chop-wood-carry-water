import fp from "lodash/fp";
import { useDragLayer } from "react-dnd";

const ITEM_HEIGHT = 64; // px; get this from a ref
const HALF_ITEM_HEIGHT = ITEM_HEIGHT / 2;

const EMPTY_OFFSET = { x: 0, y: 0 };

const DRAG_DIRECTION_UP = "DRAG_DIRECTION_UP";
const DRAG_DIRECTION_DOWN = "DRAG_DIRECTION_DOWN";

function getVerticalOffset(offset) {
  return offset.y * -1;
}

function isHoveringAnotherItem(verticalOffset) {
  return Math.abs(verticalOffset) > HALF_ITEM_HEIGHT;
}

function getDragDirection(offset) {
  const y = getVerticalOffset(offset);
  if (!isHoveringAnotherItem(y)) return null;
  return y > 0 ? DRAG_DIRECTION_UP : DRAG_DIRECTION_DOWN;
}

function getBoundaryIndex(offset, draggingItemIndex, dragDirection) {
  const y = getVerticalOffset(offset);

  const pixelOffsetToIndexOffset = () =>
    isHoveringAnotherItem(y)
      ? 1 + Math.floor((Math.abs(y) - HALF_ITEM_HEIGHT) / ITEM_HEIGHT)
      : 0;

  const determineOffsetDirection = indexOffset =>
    dragDirection === DRAG_DIRECTION_UP ? indexOffset * -1 : indexOffset;

  return fp.flow(
    pixelOffsetToIndexOffset,
    determineOffsetDirection,
    indexOffset => draggingItemIndex + indexOffset
  )();
}

function isItemEffectedByDrag(start, end, toCheck) {
  return toCheck >= Math.min(start, end) && toCheck <= Math.max(start, end);
}

export default function() {
  const { isDragging, getStyles } = useDragLayer((monitor, props) => {
    const { id, index: draggingItemIndex } = monitor.getItem() || {};

    const differenceFromInitialOffset =
      monitor.getDifferenceFromInitialOffset() || EMPTY_OFFSET;
    const dragDirection = getDragDirection(differenceFromInitialOffset);

    const reachOfEffect = !fp.isNil(draggingItemIndex)
      ? getBoundaryIndex(
          differenceFromInitialOffset,
          draggingItemIndex,
          dragDirection
        )
      : draggingItemIndex;

    return {
      isDragging: monitor.isDragging(),
      getStyles: itemIndex => {
        const effectedByDrag = isItemEffectedByDrag(
          draggingItemIndex,
          reachOfEffect,
          itemIndex
        );
        const isItemBeingDragged = itemIndex === draggingItemIndex;

        if (!effectedByDrag || isItemBeingDragged) return {};

        const translateX = 0;
        const translateY =
          dragDirection === DRAG_DIRECTION_UP ? ITEM_HEIGHT : ITEM_HEIGHT * -1;

        return {
          transform: `translate(${translateX}px, ${translateY}px)`
        };
      }
    };
  });

  return [isDragging, getStyles];
}
