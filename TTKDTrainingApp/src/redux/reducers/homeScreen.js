const categories = require('../../mock_data/categories.json').categories;

const initialState = {
  categories: categories,
};

const homeScreen = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default homeScreen;
