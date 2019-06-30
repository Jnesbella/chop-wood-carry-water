import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import {
  Box,
  Switch,
  IconButton,
  TextField,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1)
  }
}));

function SetInput(props) {
  const { onChange, label, className } = props;
  const classes = useStyles();

  const [advanceOptionsOpen, setAdvanceOptionsOpen] = React.useState(false);
  const [volume, setVolume] = React.useState("");
  const [intensity, setIntensity] = React.useState("");
  const [isPercentOneRepMax, setIsPercentOneRepMax] = React.useState(false);
  const [isAsManyRepsAsPossible, setIsAsManyRepsAsPossible] = React.useState(
    false
  );

  const percentOneRepMaxRef = React.useRef(null);
  React.useEffect(() => {
    if (!isPercentOneRepMax) return;

    percentOneRepMaxRef.current.focus();
  }, [isPercentOneRepMax]);

  const fireChange = () => {
    onChange({
      volume: {
        value: 0,
        type: "REPS",
        repRange: false,
        minReps: 0,
        maxReps: 0,
        amrap: false
      },
      intensity: {
        value: 0,
        type: "WEIGHT",
        percentOneRepMax: false
      }
    });
  };

  const renderTags = () => {
    const chips = [
      label.length > 0 && { color: "primary", label },
      isAsManyRepsAsPossible && { variant: "outlined", label: "AMRAP" },
      isPercentOneRepMax && { variant: "outlined", label: "%1RM" }
    ];

    return (
      <Box>
        {chips.map(
          chip =>
            chip && <Chip size="small" className={classes.chip} {...chip} />
        )}
      </Box>
    );
  };

  const renderAdvanceOptions = () => {
    return (
      <Collapse in={advanceOptionsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          <ListItem>
            <ListItemIcon>
              <Switch
                value={isAsManyRepsAsPossible}
                onChange={() =>
                  setIsAsManyRepsAsPossible(!isAsManyRepsAsPossible)
                }
              />
            </ListItemIcon>
            <ListItemText
              primary="AMRAP"
              primaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Switch
                value={isPercentOneRepMax}
                onChange={() => setIsPercentOneRepMax(!isPercentOneRepMax)}
              />
            </ListItemIcon>
            <ListItemText
              primary="%1RM"
              primaryTypographyProps={{ noWrap: true }}
            />
            <Box flex={1}>
              <TextField
                variant="outlined"
                margin="dense"
                label="%"
                disabled={!isPercentOneRepMax}
                inputRef={percentOneRepMaxRef}
              />
            </Box>
          </ListItem>

          {/* <ListItem>
        <ListItemIcon>
          <Switch />
        </ListItemIcon>
        <ListItemText
          primary="Rep range"
          primaryTypographyProps={{ noWrap: true }}
        />
        <Box flex={1}>
          <TextField variant="" margin="dense" label="min" />
          <Typography primary="to" component="span" />
          <TextField variant="outlined" margin="dense" label="max" />
        </Box>
      </ListItem> */}
        </List>
      </Collapse>
    );
  };

  return (
    <Box
      border={1}
      borderColor="grey.500"
      p={1}
      borderRadius={4}
      className={className}
    >
      {renderTags()}
      <Box display="flex" flexWrap="nowrap" alignItems="center">
        <Box mr={1}>
          <TextField variant="outlined" label="lbs" margin="dense" />
        </Box>

        <Box mr={1}>
          <TextField variant="outlined" label="reps" margin="dense" />
        </Box>

        <div>
          <IconButton
            onClick={() => setAdvanceOptionsOpen(!advanceOptionsOpen)}
          >
            {advanceOptionsOpen ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </div>
      </Box>
      {renderAdvanceOptions()}
    </Box>
  );
}

SetInput.protoTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string
};

SetInput.defaultProps = {
  onChange: fp.noop,
  label: "",
  className: ""
};

export default SetInput;
