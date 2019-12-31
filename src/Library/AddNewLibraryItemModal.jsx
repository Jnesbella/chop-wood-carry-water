import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from 'react-redux';
import fp from 'lodash/fp';

import Modal from '../Modal';
import { saveExercise } from '../Redux/Data/data.actions';

import SelectLibraryItem from './SelectLibraryItem';
import AddNewExercise from './AddNewExercise';

const useStyles = makeStyles(theme => {
  return {};
});

function createLibraryItem(id, label, component, action) {
  return {
    id,
    label,
    component,
    action,
  };
};

const LIBRARY_ITEMS = [
  createLibraryItem('exercise', 'Exercise', AddNewExercise, saveExercise),
  createLibraryItem('workout', 'Workout', null, fp.noop),
  createLibraryItem('setTemplate', 'Set Template', null, fp.noop),
  createLibraryItem('gym', 'Gym', null, fp.noop),
];

function AddNewLibraryItemModal(props) {
  const { onClose } = props;
  const classes = useStyles();
  const [value, setValue] = useState(undefined);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep(1);
  };

  const handleBack = () =>{
    setActiveStep(0);
  };

  const handleSave = payload => {
    const action = (LIBRARY_ITEMS.find(item => item.id === value) || {}).action || fp.noop;
    dispatch(
      action(payload)
    );
    onClose();
  };

  const renderNewItemForm = () => {
    const { component: Component } = (LIBRARY_ITEMS.find(item => item.id === value) || {});
    if (Component) return <Component onBack={handleBack} onSave={handleSave} />;
    return null;
  };

  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return renderNewItemForm();
      default:
        return (
          <SelectLibraryItem
            onClose={onClose}
            onNext={handleNext}
            onChange={setValue}
            value={value}
            libraryItems={LIBRARY_ITEMS}
            disableNext={!value}
          />
        );
    }
  };

  return (
    <Modal
      modalContentProps={{
        className: classes.modalContent
      }}
      {...props}
    >
      {renderContent()}
    </Modal>
  );
}

AddNewLibraryItemModal.propTypes = {};

AddNewLibraryItemModal.defaultProps = {};

export default AddNewLibraryItemModal;
