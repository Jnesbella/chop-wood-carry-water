const FORTY_FIVE_LB_PLATE = 'FORTY_FIVE_LB_PLATE';
const THIRTY_FIVE_LB_PLATE = 'THIRTY_FIVE_LB_PLATE';
const TWENTY_FIVE_LB_PLATE = 'TWENTY_FIVE_LB_PLATE';
const TEN_LB_PLATE = 'TEN_LB_PLATE';
const FIVE_LB_PLATE = 'FIVE_LB_PLATE';
const TWO_AND_A_HALF_LB_PLATE = 'TWO_AND_A_HALF_LB_PLATE';

export const WEIGHT_PLATES = [
    FORTY_FIVE_LB_PLATE,
    THIRTY_FIVE_LB_PLATE,
    TWENTY_FIVE_LB_PLATE,
    TEN_LB_PLATE,
    FIVE_LB_PLATE,
    TWO_AND_A_HALF_LB_PLATE,
];

const laFitness = {
    name: 'LA Fitness',
    availableEquipment: [],
    availableWeightPlates: [...WEIGHT_PLATES],
};

export const gyms = [laFitness];
