import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { Box, Chip, Button } from "@material-ui/core";
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
  },
  labelButton: {
    top: theme.spacing(0.25),
    padding: theme.spacing(0.875, 2)
  }
}));

const RANGE_REGEX = /^\d+\s*-?\s*\d+$/gim;
const VOLUME_SCHEMA_REPS = yup.string().matches(RANGE_REGEX);
const INTENSITY_SCHEMA_WEIGHT = yup.number().positive();

const INPUT_NAME_INTENSITY = "intensity";
const INPUT_NAME_VOLUME = "volume";

function SetInput(props) {
  const { onChange, label, className } = props;
  const classes = useStyles();

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [intensity, setIntensity] = React.useState({});

  const isValid = () => true;

  const fireChange = () => {
    if (!isValid()) return;

    // const { volume: volumeValue, intensity: intensityValue } = values;

    onChange({
      volume: {
        value: "", // volumeValue,
        type: "REPS",
        isRepRange: false,
        minReps: 0,
        maxReps: 0,
        amrap: false
      },
      intensity: {
        value: "", // intensityValue,
        type: "WEIGHT",
        percentOneRepMax: false
      }
    });
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    // setValues({ ...values, [name]: value });
  };

  const renderSetActions = () => {
    return null;
  };

  return (
    <Box className={className}>
      <Box display="flex" flexWrap="nowrap" alignItems="center">
        <Box mr={0.5}>
          <Button variant="outlined" className={classes.labelButton}>
            {label}
          </Button>
        </Box>

        <Box mx={0.5} flex={1}>
          <WeightInput
            name={INPUT_NAME_INTENSITY}
            value={intensity.value}
            margin="dense"
            error={!intensity.valid}
            onChange={setIntensity}
            variant="outlined"
          />
        </Box>

        <Box ml={0.5} flex={1}>
          <RepsInput
            name={INPUT_NAME_VOLUME}
            // value={values[INPUT_NAME_VOLUME]}
            margin="dense"
            // error={!validity[INPUT_NAME_VOLUME]}
            // onChange={handleInputChange}
            // min={values[INPUT_NAME_VOLUME_MIN]}
            // max={values[INPUT_NAME_VOLUME_MAX]}
            // amrap={isAsManyRepsAsPossible}
            variant="outlined"
          />
        </Box>
      </Box>

      {renderSetActions()}
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
