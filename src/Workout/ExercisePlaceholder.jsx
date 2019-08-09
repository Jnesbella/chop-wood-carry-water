import React from "react";
import fp from "lodash/fp";

function copyNodeStyle(sourceNode, targetNode) {
  const computedStyle = window.getComputedStyle(sourceNode);

  Array.from(computedStyle).forEach(key =>
    targetNode.style.setProperty(
      key,
      computedStyle.getPropertyValue(key),
      computedStyle.getPropertyPriority(key)
    )
  );

  targetNode.style.setProperty(
    "max-height",
    "64px"
    // computedStyle.getPropertyPriority("max-height")
  );

  targetNode.style.setProperty(
    "display",
    "block",
    computedStyle.getPropertyPriority("display")
  );

  targetNode.style.setProperty(
    "border",
    "1px solid black",
    computedStyle.getPropertyPriority("border")
  );
}

function clearInlineStyles(node) {
  node.removeAttribute("style");
}

export default function(props) {
  const { dragging, placeholder } = props;

  const ref = React.useRef(null);

  const getRootElementFromRef = fp.get("current");
  const getWrappedPlaceholderElementFroRef = fp.get("current.childNodes[0]");

  React.useEffect(() => {
    if (!dragging) {
      clearInlineStyles(getRootElementFromRef(ref));
      return;
    }

    setTimeout(() => {
      const root = getRootElementFromRef(ref);
      const placeholder = getWrappedPlaceholderElementFroRef(ref);

      if (!placeholder) return;

      copyNodeStyle(placeholder, root);
    });
  }, [dragging]);

  return (
    <div ref={ref} className="custom-placeholder" style={{ display: "none" }}>
      {placeholder}
    </div>
  );
}
