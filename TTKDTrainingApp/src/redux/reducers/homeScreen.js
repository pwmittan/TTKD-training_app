import {categories} from '../../mock_data/categories.js';
import {content} from '../../mock_data/content.js';

const initialState = {
  categories: categories,
  content: content,
};

const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default homeScreen;
