import {BASE_S3_URI} from '../api/API';

export const getReactCameraState = store => store.reactCamera;
export const getHomeScreenState = store => store.homeScreen;

export const getAllRecordedVideos = store =>
  getReactCameraState(store).recordedVideos;

export const getRecordedVideosForContent = (store, contentId) =>
  getAllRecordedVideos(store).filter(video => video.contentId === contentId);

const getAllCategories = store => getHomeScreenState(store).categories;
const getAllContent = store => getHomeScreenState(store).content;
const getAllSteps = store => getHomeScreenState(store).steps;
const getAllCachedVideoPaths = store =>
  getHomeScreenState(store).cached_video_paths;

export const getCategory = (store, categoryId) =>
  getAllCategories(store).find(category => category.id === categoryId);

export const getSubCategories = (store, parentId) =>
  getAllCategories(store).filter(category => category.parent_id === parentId);

export const getCategoryContent = (store, categoryId) =>
  getAllContent(store).filter(content => content.category_id === categoryId);

export const getContentFromId = (store, contentId) =>
  getAllContent(store).find(content => content.id === contentId);

export const getContentOwnCachedVideoPath = (store, contentId) =>
  getAllCachedVideoPaths(store)[contentId];

export const getContentImageUri = (store, contentId) => {
  const {title, thumbnail_path} = getContentFromId(store, contentId);
  return `${BASE_S3_URI}/${thumbnail_path}`.replace(/ /g, '%20');
};

export const getContentOwnStepsSorted = (store, contentId) =>
  getAllSteps(store)
    .filter(step => step.content_id === contentId)
    .sort(
      (step1, step2) =>
        !step2.start_time || step2.start_time < step1.start_time,
    );
