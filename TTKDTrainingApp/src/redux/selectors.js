export const getReactCameraState = store => store.reactCamera;
export const getHomeScreenState = store => store.homeScreen;

export const getVideos = store => getReactCameraState(store).videos;

const getAllCategories = store => getHomeScreenState(store).categories;
const getAllContent = store => getHomeScreenState(store).content;

export const getCategory = (store, categoryId) =>
  getAllCategories(store).find(category => category.id === categoryId);

export const getSubCategories = (store, parentId) =>
  getAllCategories(store).filter(category => category.parent_id === parentId);

export const getCategoryContent = (store, categoryId) =>
  getAllContent(store).filter(content => content.category_id === categoryId);
