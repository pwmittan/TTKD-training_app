import RNFS from 'react-native-fs';
import {
  ADD_RECORDED_VIDEO,
  SET_CATEGORIES,
  SET_CONTENT,
  SET_STEPS,
  ADD_CACHED_VIDEO_PATH,
} from './actionTypes';
import {getContentFromId} from './selectors';
import {fetchAppData, BASE_S3_URI} from '../api/API';

export const addRecordedVideo = video => {
  return {
    type: ADD_RECORDED_VIDEO,
    payload: video,
  };
};

export const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};
export const setContent = content => {
  return {
    type: SET_CONTENT,
    payload: content,
  };
};
export const setSteps = steps => {
  return {
    type: SET_STEPS,
    payload: steps,
  };
};

export const setHomeScreenData = () => {
  return dispatch => {
    fetchAppData()
      .then(res => res.json())
      .then(data => {
        dispatch(setCategories(data.categories));
        dispatch(setContent(data.content));
        dispatch(setSteps(data.steps));
        //dispatch(presignVideoUris(data.content));
      })
      .catch(console.info);
  };
};

export const genCachedUri = contentId => {
  return (dispatch, getState) => {
    const {video_path} = getContentFromId(getState(), contentId);
    const filePath = `${RNFS.DocumentDirectoryPath}/${video_path}`.replace(
      / |%20/g,
      '_',
    );
    const s3Url = `${BASE_S3_URI}/${video_path}`.replace(/ /g, '%20');
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        console.info('File already exists, adding to Redux Store', filePath);
        dispatch(addCachedVideoPath({[contentId]: `file://${filePath}`}));
      } else {
        RNFS.downloadFile({
          fromUrl: s3Url,
          toFile: filePath,
          background: true,
        })
          .promise.then(res => {
            console.info(
              'File downloaded, adding to Redux Store',
              res,
              filePath,
            );
            dispatch(addCachedVideoPath({[contentId]: `file://${filePath}`}));
          })
          .catch(err => {
            console.info('Error downloading file', err);
          });
      }
    });
  };
};

const addCachedVideoPath = cachedVideoPathObject => {
  return {
    type: ADD_CACHED_VIDEO_PATH,
    payload: cachedVideoPathObject,
  };
};
