import { combineReducers } from 'redux';

const initialCalorieState = {
  calories: null,
};

const calorieReducer = (state = initialCalorieState, action) => {
  switch (action.type) {
    case 'SET_CALORIES':
      return {
        ...state,
        calories: action.payload,
      };
    default:
      return state;
  }
};

const initialMealState = {
  meals: [],
};

const mealReducer = (state = initialMealState, action) => {
  return state;
};

const rootReducer = combineReducers({
  calorie: calorieReducer,
  meal: mealReducer,
});

export default rootReducer;
