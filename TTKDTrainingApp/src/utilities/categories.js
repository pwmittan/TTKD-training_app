const categories = require('../mock_data/categories.json').categories;

export const getCategory = categoryId => {
  return categories.find(category => category.id === categoryId);
};

export const getCategories = (parentId = null) => {
  return categories.filter(category => category.parent_id === parentId);
};
