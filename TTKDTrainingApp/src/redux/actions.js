import {ADD_RECORDED_VIDEO} from './actionTypes';

export const addRecordedVideo = video => {
  return {
    type: ADD_RECORDED_VIDEO,
    payload: video,
  };
};
