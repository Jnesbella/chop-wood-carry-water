import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Modal from '../Modal';

import SelectLibraryItem from './SelectLibraryItem';
import AddNewExercise from './AddNewExercise';

const useStyles = makeStyles(theme => ({
  modalContent: {
    outline: "none",
    padding: theme.spacing(2),
  },
}));

function createLibraryItem(id, label, component) {
  return {
    id,
    label,
    component,
  };
};

const LIBRARY_ITEMS = [
  createLibraryItem('exercise', 'Exercise', AddNewExercise),
  createLibraryItem('workout', 'Workout', null),
  createLibraryItem('setTemplate', 'Set Template', null),
  createLibraryItem('gym', 'Gym', null),
];

function AddNewLibraryItemModal(props) {
  const { onClose } = props;
  const classes = useStyles();
  const [value, setValue] = useState(undefined);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(1);
  };

  const handleBack = () =>{
    setActiveStep(0);
  };

  const handleSave = () => {

  };

  const renderNewItemForm = () => {
    const { component: Component } = LIBRARY_ITEMS.find(item => item.id === value) || {};
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
