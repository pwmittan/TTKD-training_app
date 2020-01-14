import {categories} from '../../mock_data/categories.js';
import {content} from '../../mock_data/content.js';
import {steps} from '../../mock_data/steps.js';

const initialState = {
  categories: categories,
  content: content,
  steps: steps,
};

const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default homeScreen;
