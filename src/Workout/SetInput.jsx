import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { Box, Chip } from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import * as yup from "yup";

import RepsInput from "./VolumeInputReps";
import WeightInput from "./IntensityInputWeight";
import SetOptionsDrawer from "./SetOptionsDrawer";

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1)
  },
  inputDivider: {
    position: "relative",
    top: theme.spacing(3)
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
export const INPUT_NAME_VOLUME_MIN = "volumeMin";
export const INPUT_NAME_VOLUME_MAX = "volumeMax";
export const INPUT_NAME_PERCENT_ONE_REP_MAX = "percentOneRepMax";

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

  const renderAdvanceOptions = () => {
    return (
      <SetOptionsDrawer
        isOpen={advanceOptionsOpen}
        onClose={() => setAdvanceOptionsOpen(false)}
        isAsManyRepsAsPossible={isAsManyRepsAsPossible}
        onToggleAsManyRepsAsPossibleSwitch={() =>
          setIsAsManyRepsAsPossible(!isAsManyRepsAsPossible)
        }
        isPercentOneRepMax={isPercentOneRepMax}
        onToggleOneRepMaxSwitch={() =>
          setIsPercentOneRepMax(!isPercentOneRepMax)
        }
        percentOneRepMaxValue={values[INPUT_NAME_PERCENT_ONE_REP_MAX]}
        percentOneRepMaxRef={percentOneRepMaxRef}
        percentOneRepMaxError={!validity[INPUT_NAME_PERCENT_ONE_REP_MAX]}
        onPercentOneRepMaxChange={handleInputChange}
        isRepRange={isRepRange}
        onToggleRepRangeSwitch={() => setIsRepRange(!isRepRange)}
        repRangeMinValue={values[INPUT_NAME_VOLUME_MIN]}
        repRangeMinRef={volumeMinRef}
        repRangeMinError={!validity[INPUT_NAME_VOLUME_MIN]}
        repRangeMaxValue={values[INPUT_NAME_VOLUME_MIN]}
        onRepRangeMinChange={handleInputChange}
        repRangeMaxValue={values[INPUT_NAME_VOLUME_MAX]}
        repRangeMaxError={!validity[INPUT_NAME_VOLUME_MAX]}
        onRepRangeMaxChange={handleInputChange}
      />
    );
  };

  return (
    <Box className={className}>
      <Box display="flex" flexWrap="nowrap" alignItems="center">
        <Chip
          variant="outlined"
          label={label}
          className={classes.chip}
          size="small"
          color="primary"
          clickable
          onClick={() => setAdvanceOptionsOpen(true)}
        />
      </Box>

      <Box display="flex" flexWrap="nowrap" alignItems="baseline">
        <Box>
          <WeightInput
            name={INPUT_NAME_INTENSITY}
            value={values[INPUT_NAME_INTENSITY]}
            margin="dense"
            error={!validity[INPUT_NAME_INTENSITY]}
            onChange={handleInputChange}
            percentOfOneRepMax={values[INPUT_NAME_PERCENT_ONE_REP_MAX]}
            variant="outlined"
          />
        </Box>

        <Box px={1}>
          <Box className={classes.inputDivider}>
            <ClearIcon fontSize="small" />
          </Box>
        </Box>

        <Box>
          <RepsInput
            name={INPUT_NAME_VOLUME}
            value={values[INPUT_NAME_VOLUME]}
            margin="dense"
            error={!validity[INPUT_NAME_VOLUME]}
            onChange={handleInputChange}
            min={values[INPUT_NAME_VOLUME_MIN]}
            max={values[INPUT_NAME_VOLUME_MAX]}
            amrap={isAsManyRepsAsPossible}
            variant="outlined"
          />
        </Box>
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
