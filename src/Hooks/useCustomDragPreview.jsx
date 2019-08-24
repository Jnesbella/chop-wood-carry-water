import React from "react";
import { DragPreviewImage } from "react-dnd";
import domtoimage from "dom-to-image";

export default function(dragPreviewConnector, isDragging) {
  const dragSourceRef = React.useRef(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  React.useEffect(() => {
    const updateDragSourcePreview = async () => {
      const { current: node } = dragSourceRef;
      if (!node) return;

      const scaleBy = 1;
      const width = 364 * scaleBy;
      const height = 48 * scaleBy;
      const style = {
        transformOrigin: "top left",
        transform: `scale(${scaleBy})`
      };

      const src = await domtoimage.toPng(node, {
        width,
        height,
        style
      });
      setPreviewImage(src);
    };
    updateDragSourcePreview();
  }, [isDragging, dragSourceRef.current]);

  return [
    dragSourceRef,
    () => <DragPreviewImage connect={dragPreviewConnector} src={previewImage} />
  ];
}
