import {
  SET_STUDIO,
  SET_CATEGORIES,
  SET_CONTENT,
  SET_STEPS,
  SET_VIDEO_PATHS,
  ADD_CACHED_VIDEO_PATH,
} from '../actionTypes';

import {setStudio} from '../../asyncStorage/asyncStorage';

const initialState = {
  studio: '',
  categories: [],
  content: [],
  steps: [],
  video_paths: {},
  cached_video_paths: {},
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDIO: {
      const studio = action.payload;
      setStudio(studio);
      return {
        ...state,
        studio: studio,
      };
    }
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
    case SET_VIDEO_PATHS: {
      const video_paths = action.payload;
      return {
        ...state,
        video_paths: video_paths,
      };
    }
    case ADD_CACHED_VIDEO_PATH: {
      const videoPathObject = action.payload;
      return {
        ...state,
        cached_video_paths: {...state.cached_video_paths, ...videoPathObject},
      };
    }
    default: {
      return state;
    }
  }
};

export default app;
