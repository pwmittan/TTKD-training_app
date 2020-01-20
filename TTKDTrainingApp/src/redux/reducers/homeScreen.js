import {SET_CATEGORIES, SET_CONTENT, SET_STEPS} from '../actionTypes';

const initialState = {
  categories: [],
  content: [],
  steps: [],
};

const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES: {
      const categories = action.payload;
      return {
        ...state,
        categories: categories,
      };
    }
    case SET_CONTENT: {
      const content = action.payload;
      return {
        ...state,
        content: content,
      };
    }
    case SET_STEPS: {
      const steps = action.payload;
      return {
        ...state,
        steps: steps,
      };
    }
    default: {
      return state;
    }
  }
};

export default homeScreen;
