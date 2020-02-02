import {ADD_RECORDED_VIDEO} from '../actionTypes';

const initialState = {
  recordedVideos: [],
};

const reactCamera = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORDED_VIDEO: {
      const video = action.payload;
      return {
        recordedVideos: [video, ...state.recordedVideos],
      };
    }
    default: {
      return state;
    }
  }
};

export default reactCamera;
