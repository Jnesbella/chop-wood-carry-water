import fp from "lodash/fp";
import { useDrop } from "react-dnd";

export default function(accept, drop = fp.noop) {
  const [collectedProps, dropRef] = useDrop({
    accept,
    drop
  });

  return [dropRef];
}
