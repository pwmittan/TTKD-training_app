import RNFS from 'react-native-fs';
import {
  ADD_RECORDED_VIDEO,
  SET_CATEGORIES,
  SET_CONTENT,
  SET_STEPS,
  SET_VIDEO_URIS,
  ADD_CACHED_VIDEO_PATH,
} from './actionTypes';

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
    fetch(
      'https://sfjy3c2yji.execute-api.us-east-1.amazonaws.com/TestDBFetchall',
    )
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

// Currently not needed as s3 files are publicly readable
// If changed to private this will be needed
// Leaving redux related code in for now
const presignVideoUris = content => {
  return dispatch => {
    const videoPaths = content.reduce((allVals, currVal) => {
      return {...allVals, [currVal.id]: currVal.video_uri};
    }, {});
    const url = new URL(
      'https://g4o9el325j.execute-api.us-east-1.amazonaws.com/TestS3PresignUrl',
    );
    // URL adds a trailing slash when creating a new url, this removes that
    url._url = url.toString().endsWith('/')
      ? url.toString().slice(0, -1)
      : url.toString();
    // Adding the list of video as params to the url
    // There's probably a better way to do this, likely by POSTing instead of GETting
    Object.keys(videoPaths).map(key =>
      url.searchParams.append(key, videoPaths[key]),
    );
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch(setVideoUris(data)));
    console.info("Loaded Presigned URL's");
  };
};

const setVideoUris = videoUris => {
  return {
    type: SET_VIDEO_URIS,
    payload: videoUris,
  };
};

export const genCachedUri = (contentId, directoryUri, videoUri) => {
  return dispatch => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${videoUri}`;
    RNFS.exists(filePath).then(exists => {
      if (exists) {
        console.info('File already Exists, adding to Redux Store', filePath);
        dispatch(addCachedVideoPath({[contentId]: filePath}));
      } else {
        RNFS.downloadFile({
          fromUrl: `${directoryUri}/${videoUri}`,
          toFile: filePath,
          background: true,
        })
          .promise.then(res => {
            console.info(
              'File downloaded, adding to Redux Store',
              res,
              filePath,
            );
            dispatch(addCachedVideoPath({[contentId]: filePath}));
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
