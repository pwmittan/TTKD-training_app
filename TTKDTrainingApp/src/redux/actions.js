import {ADD_VIDEO} from './actionTypes';

export const addVideo = video => {
  return {
    type: ADD_VIDEO,
    payload: video,
  };
};
