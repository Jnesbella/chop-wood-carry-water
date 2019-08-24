import fp from "lodash/fp";
import React from "react";

const DEFAULT_LONG_PRESS_TIMEOUT = 1000;

export default function(callback = fp.noop) {
  const [timerId, setTimerId] = React.useState(undefined);
  const [longPressActive, setLongPressActive] = React.useState(false);

  React.useEffect(callback, [longPressActive]);

  const start = React.useCallback(() => {
    fp.flow(
      () =>
        setTimeout(() => setLongPressActive(true), DEFAULT_LONG_PRESS_TIMEOUT),
      setTimerId
    )();
  });

  const stop = React.useCallback(() => {
    clearTimeout(timerId);
    setTimerId(undefined);
    setLongPressActive(false);
  });

  return [
    {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop
    },
    longPressActive
  ];
}
