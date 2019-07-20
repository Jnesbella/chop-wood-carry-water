import React from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  container: {
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

const DELETE_BUTTON_WIDTH = 68;

export const makeSwipeable = Component => {
  return function(props) {
    const { onDelete } = props;
    const classes = useStyles();
    const ref = React.useRef(null);
    const controls = useAnimation();
    const [buttonWidth, setButtonWidth] = React.useState(DELETE_BUTTON_WIDTH);
    const x = useMotionValue(0);

    React.useEffect(
      () =>
        x.onChange(latest => {
          setButtonWidth(Math.max(DELETE_BUTTON_WIDTH, Math.abs(latest)));
        }),
      []
    );

    const handleDragEnd = (event, info) => {
      if (Math.abs(info.point.x) > DELETE_BUTTON_WIDTH / 2) {
        controls.start({ x: DELETE_BUTTON_WIDTH * -1 });
      } else {
        controls.start({ x: 0 });
      }
    };

    return (
      <div ref={ref}>
        <motion.div
          className={classes.container}
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
