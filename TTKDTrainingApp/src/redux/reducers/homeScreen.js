import {
  SET_CATEGORIES,
  SET_CONTENT,
  SET_STEPS,
  SET_VIDEO_URIS,
} from '../actionTypes';

const initialState = {
  categories: [],
  content: [],
  steps: [],
  video_uris: {},
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
    case SET_VIDEO_URIS: {
      const video_uris = action.payload;
      return {
        ...state,
        video_uris: video_uris,
      };
    }
    default: {
      return state;
    }
  }
};

export default homeScreen;
