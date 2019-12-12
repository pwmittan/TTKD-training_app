import {ADD_VIDEO} from '../actionTypes';

const initialState = {
  videos: [],
};

const reactCamera = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO: {
      const video = action.payload;
      return {
        videos: [video, ...state.videos],
      };
    }
    default: {
      return state;
    }
  }
};

export default reactCamera;
