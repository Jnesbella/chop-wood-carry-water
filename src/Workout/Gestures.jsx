import React from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

import { onClickOutside } from "./utils";

const useStyles = makeStyles(theme => ({
  root: {
    overflow: "hidden"
  },
  motionContainer: {
    display: "flex"
  },
  buttonsContainer: {
    position: "relative"
  },
  button: {
    position: "absolute",
    height: "100%",
    borderRadius: 0,
    background: red[500],
    color: theme.palette.getContrastText(red[500])
  }
}));

export const makeSwipeable = Component => {
  return function(props) {
    const { onDelete } = props;
    const classes = useStyles();
    const buttonRef = React.useRef(null);
    const controls = useAnimation();
    const [minButtonWidth, setMinButtonWidth] = React.useState(0);
    const [buttonWidth, setButtonWidth] = React.useState("initial");
    const x = useMotionValue(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
      setMinButtonWidth(buttonRef.current.clientWidth);
    }, [buttonRef]);

    React.useEffect(() => {
      onClickOutside(ref.current, () => controls.start({ x: 0 }));
    }, [ref]);

    React.useEffect(
      () =>
        x.onChange(latest => {
          setButtonWidth(Math.max(minButtonWidth, Math.abs(latest)));
        }),
      []
    );

    const handleDragEnd = (event, info) => {
      if (Math.abs(info.point.x) > minButtonWidth / 2) {
        controls.start({ x: minButtonWidth * -1 });
      } else {
        controls.start({ x: 0 });
      }
    };

    return (
      <div className={classes.root} ref={ref}>
        <motion.div
          className={classes.motionContainer}
          drag="x"
          dragConstraints={{ right: 0 }}
          dragElastic={0}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
        >
          <div>
            <Component {...props} />
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              style={{ width: buttonWidth }}
              onClick={onDelete}
              className={classes.button}
              ref={buttonRef}
            >
              Delete
            </Button>
          </div>
        </motion.div>
      </div>
    );
  };
};

// export function makeSwipeable(props) {
//   const { children } = props;
//   const ref = React.useRef(null);

//   return (
//     <div ref={ref}>
//       <motion.div drag="x" dragConstraints={ref} dragElastic={1}>
//         {children}
//       </motion.div>
//       <div>
//         <Button>Delete</Button>
//       </div>
//     </div>
//   );
// }
