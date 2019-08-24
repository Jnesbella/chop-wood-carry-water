import React from "react";
import { useDrag } from "react-dnd";

import useCustomDragPreview from "./useCustomDragPreview";

export default function(type, id, index) {
  const [collectedProps, dragHandleRef, dragPreviewConnector] = useDrag({
    item: {
      type,
      id,
      index
    },
    previewOptions: {
      captureDraggingState: true
    },
    collect: (monitor, props) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const [drafPreviewSourceRef, DragPreviewImage] = useCustomDragPreview(
    dragPreviewConnector,
    collectedProps.isDragging
  );

  return [
    collectedProps,
    dragHandleRef,
    drafPreviewSourceRef,
    DragPreviewImage
  ];
}
