const ADD_VIDEO = 'ADD_VIDEO';

const initialState = {
  videos: [],
};

const reactCamera = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO: {
      return {
        videos: [action.payload.video, ...state.videos],
      };
    }
    default: {
      return state;
    }
  }
};

export default reactCamera;
