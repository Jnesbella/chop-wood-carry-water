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
  Chip,
  Typography,
  Divider
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";

import RepsInput from "./VolumeInputReps";

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1)
  }
}));

const RANGE_REGEX = /^\d+\s*-?\s*\d+$/gim;
const VOLUME_SCHEMA_REPS = yup.string().matches(RANGE_REGEX);
const INTENSITY_SCHEMA_WEIGHT = yup.number().positive();
const VOLUME_SCHEMA_MIN = yup
  .number()
  .positive()
  .integer();
const VOLUME_SCHEMA_MAX = yup
  .number()
  .positive()
  .integer();

const INPUT_NAME_INTENSITY = "intensity";
const INPUT_NAME_VOLUME = "volume";
const INPUT_NAME_VOLUME_MIN = "volumeMin";
const INPUT_NAME_VOLUME_MAX = "volumeMax";
const INPUT_NAME_PERCENT_ONE_REP_MAX = "percentOneRepMax";

function SetInput(props) {
  const { onChange, label, className } = props;
  const classes = useStyles();

  const [advanceOptionsOpen, setAdvanceOptionsOpen] = React.useState(false);
  const [isPercentOneRepMax, setIsPercentOneRepMax] = React.useState(false);
  const [isAsManyRepsAsPossible, setIsAsManyRepsAsPossible] = React.useState(
    false
  );
  const [isRepRange, setIsRepRange] = React.useState(false);
  const [validity, setValidity] = React.useState({
    [INPUT_NAME_INTENSITY]: true,
    [INPUT_NAME_VOLUME]: true,
    [INPUT_NAME_PERCENT_ONE_REP_MAX]: true,
    [INPUT_NAME_VOLUME_MIN]: true,
    [INPUT_NAME_VOLUME_MAX]: true
  });
  const [values, setValues] = React.useState({
    [INPUT_NAME_INTENSITY]: "",
    [INPUT_NAME_VOLUME]: "",
    [INPUT_NAME_PERCENT_ONE_REP_MAX]: "",
    [INPUT_NAME_VOLUME_MIN]: "",
    [INPUT_NAME_VOLUME_MAX]: ""
  });

  const percentOneRepMaxRef = React.useRef(null);
  React.useEffect(() => {
    if (!isPercentOneRepMax) return;

    percentOneRepMaxRef.current.focus();
  }, [isPercentOneRepMax]);
  const volumeMinRef = React.useRef(null);
  React.useEffect(() => {
    if (!isRepRange) return;

    volumeMinRef.current.focus();
  }, [isRepRange]);
  React.useEffect(() => {
    if (!isRepRange) return;

    setValues({
      ...values,
      [INPUT_NAME_VOLUME]: `${values[INPUT_NAME_VOLUME_MIN]} - ${
        values[INPUT_NAME_VOLUME_MAX]
      }`
    });
  }, [values[INPUT_NAME_VOLUME_MIN], values[INPUT_NAME_VOLUME_MAX]]);

  const isValid = () => {
    const { volume: volumeValue, intensity: intensityValue } = values;

    return (
      VOLUME_SCHEMA_REPS.isValid(volumeValue) &&
      INTENSITY_SCHEMA_WEIGHT.isValid(intensityValue)
    );
  };

  const fireChange = () => {
    if (!isValid()) {
      return;
    }

    const { volume: volumeValue, intensity: intensityValue } = values;

    onChange({
      volume: {
        value: volumeValue,
        type: "REPS",
        isRepRange: false,
        minReps: 0,
        maxReps: 0,
        amrap: false
      },
      intensity: {
        value: intensityValue,
        type: "WEIGHT",
        percentOneRepMax: false
      }
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
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
        <List dense>
          <ListItem disableGutters>
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

          <ListItem disableGutters>
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
                name={INPUT_NAME_PERCENT_ONE_REP_MAX}
                variant="outlined"
                margin="dense"
                label="%"
                disabled={!isPercentOneRepMax}
                inputRef={percentOneRepMaxRef}
                error={!validity[INPUT_NAME_PERCENT_ONE_REP_MAX]}
                onChange={handleInputChange}
              />
            </Box>
          </ListItem>

          <ListItem disableGutters>
            <ListItemIcon>
              <Switch
                value={isRepRange}
                onChange={() => setIsRepRange(!isRepRange)}
              />
            </ListItemIcon>

            <ListItemText
              primary="Rep range"
              primaryTypographyProps={{ noWrap: true }}
            />

            <Box
              flex={5}
              display="flex"
              flexDirection="row"
              alignItems="baseline"
            >
              <TextField
                name={INPUT_NAME_VOLUME_MIN}
                variant="outlined"
                margin="dense"
                label="min"
                value={values[INPUT_NAME_VOLUME_MIN]}
                disabled={!isRepRange}
                inputRef={volumeMinRef}
                error={!validity[INPUT_NAME_VOLUME_MIN]}
                onChange={handleInputChange}
              />

              <Box mx={1}>
                <Typography component="span">{"to"}</Typography>
              </Box>

              <TextField
                name={INPUT_NAME_VOLUME_MAX}
                variant="outlined"
                margin="dense"
                label="max"
                value={values[INPUT_NAME_VOLUME_MAX]}
                disabled={!isRepRange}
                error={!validity[INPUT_NAME_VOLUME_MAX]}
                onChange={handleInputChange}
              />
            </Box>
          </ListItem>
        </List>
      </Collapse>
    );
  };

  return (
    <Box
      borderBottom={1}
      borderColor="grey.500"
      py={1}
      borderRadius={4}
      className={className}
    >
      {renderTags()}
      <Box display="flex" flexWrap="nowrap" alignItems="center">
        <Box mr={1}>
          <TextField
            name={INPUT_NAME_INTENSITY}
            variant="outlined"
            label="lbs"
            value={values[INPUT_NAME_INTENSITY]}
            margin="dense"
            error={!validity[INPUT_NAME_INTENSITY]}
            onChange={handleInputChange}
            placeholder="e.g., 135, 85%"
          />
        </Box>

        <Box mr={1}>
          <RepsInput
            name={INPUT_NAME_VOLUME}
            variant="outlined"
            value={values[INPUT_NAME_VOLUME]}
            margin="dense"
            error={!validity[INPUT_NAME_VOLUME]}
            onChange={handleInputChange}
            min={0}
            max={10}
            amrap
          />
        </Box>

        <div>
          <IconButton
            size="small"
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
