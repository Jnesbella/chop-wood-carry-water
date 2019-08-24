import { useDrop } from "react-dnd";

export default function(accept) {
  const [collectedProps, dropRef] = useDrop({
    accept
  });

  return [dropRef];
}
