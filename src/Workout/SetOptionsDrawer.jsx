import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Container,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Box,
  TextField,
  Typography,
  List
} from "@material-ui/core";

// import {
//   INPUT_NAME_PERCENT_ONE_REP_MAX,
//   INPUT_NAME_VOLUME_MAX,
//   INPUT_NAME_VOLUME_MIN
// } from "./SetInput";

// More options:
// Optional sets
// Rest time

function SetOptionsDrawer(props) {
  const {
    isOpen,
    onClose,
    isAsManyRepsAsPossible,
    onToggleAsManyRepsAsPossibleSwitch,
    isPercentOneRepMax,
    onToggleOneRepMaxSwitch,
    percentOneRepMaxValue,
    percentOneRepMaxRef,
    percentOneRepMaxError,
    onPercentOneRepMaxChange,
    isRepRange,
    onToggleRepRangeSwitch,
    repRangeMinValue,
    repRangeMinRef,
    repRangeMinError,
    onRepRangeMinChange,
    repRangeMaxValue,
    repRangeMaxError,
    onRepRangeMaxChange
  } = props;

  const renderAmrapOption = () => {
    return (
      <ListItem>
        <ListItemIcon>
          <Switch
            checked={isAsManyRepsAsPossible}
            onChange={onToggleAsManyRepsAsPossibleSwitch}
          />
        </ListItemIcon>
        <ListItemText
          primary="AMRAP"
          primaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
    );
  };

  // const renderOneRepMaxOption = () => {
  //   return (
  //     <ListItem>
  //       <ListItemIcon>
  //         <Switch
  //           checked={isPercentOneRepMax}
  //           onChange={onToggleOneRepMaxSwitch}
  //         />
  //       </ListItemIcon>

  //       <ListItemText
  //         primary="%1RM"
  //         primaryTypographyProps={{ noWrap: true }}
  //       />

  //       <Box flex={1} display="flex" justifyContent="flex-end">
  //         <TextField
  //           name={INPUT_NAME_PERCENT_ONE_REP_MAX}
  //           variant="outlined"
  //           margin="dense"
  //           label="%"
  //           disabled={!isPercentOneRepMax}
  //           inputRef={percentOneRepMaxRef}
  //           error={percentOneRepMaxError}
  //           onChange={onPercentOneRepMaxChange}
  //           value={percentOneRepMaxValue}
  //         />
  //       </Box>
  //     </ListItem>
  //   );
  // };

  // const renderRepRangeOption = () => {
  //   return (
  //     <ListItem>
  //       <ListItemIcon>
  //         <Switch checked={isRepRange} onChange={onToggleRepRangeSwitch} />
  //       </ListItemIcon>

  //       <ListItemText
  //         primary="Rep range"
  //         primaryTypographyProps={{ noWrap: true }}
  //       />

  //       <Box flex={5} display="flex" flexDirection="row" alignItems="baseline">
  //         <TextField
  //           name={INPUT_NAME_VOLUME_MIN}
  //           variant="outlined"
  //           margin="dense"
  //           label="min"
  //           value={repRangeMinValue}
  //           disabled={!isRepRange}
  //           inputRef={repRangeMinRef}
  //           error={repRangeMinError}
  //           onChange={onRepRangeMinChange}
  //         />

  //         <Box mx={1}>
  //           <Typography component="span">{"to"}</Typography>
  //         </Box>

  //         <TextField
  //           name={INPUT_NAME_VOLUME_MAX}
  //           variant="outlined"
  //           margin="dense"
  //           label="max"
  //           value={repRangeMaxValue}
  //           disabled={!isRepRange}
  //           error={repRangeMaxError}
  //           onChange={onRepRangeMaxChange}
  //         />
  //       </Box>
  //     </ListItem>
  //   );
  // };

  return (
    <Drawer anchor="bottom" open={isOpen} onClose={onClose}>
      <Container maxWidth="xs">
        <List dense>
          <ListItem>
            <ListItemText
              primary="Set Options"
              primaryTypographyProps={{
                variant: "subtitle1"
              }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Intensity"
              primaryTypographyProps={{
                variant: "subtitle2",
                color: "textSecondary"
              }}
            />
          </ListItem>

          {/* {renderOneRepMaxOption()} */}

          <ListItem>
            <ListItemText
              primary="Volume"
              primaryTypographyProps={{
                variant: "subtitle2",
                color: "textSecondary"
              }}
            />
          </ListItem>

          {renderAmrapOption()}

          {/* {renderRepRangeOption()} */}
        </List>
      </Container>
    </Drawer>
  );
}

// SetOptionsDrawer.protoTypes = {};

// SetOptionsDrawer.defaultProps = {};

export default SetOptionsDrawer;
