const categories = require('../mock_data/categories.json').categories;

export const getCategories = (parentId = null) => {
  return categories.filter(category => category.parent_id === parentId);
};
