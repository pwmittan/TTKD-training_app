import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';

import {
  getContentOwnVideoPath,
  getContentOwnCachedVideoPath,
} from '../../redux/selectors';
import {genCachedUri} from '../../redux/actions';

import {BASE_URI} from './constants';

const ContentVideo = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const {
    contentId,
    paused,
    rate,
    handleLoad,
    handleProgress,
    handleEnd,
    videoHeight,
    videoWidth,
  } = props;

  const contentVideoPath = useSelector(state =>
    getContentOwnVideoPath(state, contentId),
  );
  const cachedVideoPath = useSelector(state =>
    getContentOwnCachedVideoPath(state, contentId),
  );

  useEffect(() => {
    !cachedVideoPath &&
      dispatch(genCachedUri(contentId, BASE_URI, contentVideoPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    cachedVideoPath && (
      <Video
        source={{
          uri: cachedVideoPath,
        }}
        paused={paused}
        rate={rate}
        resizeMode="contain"
        onLoad={handleLoad}
        onError={e => console.info('Error on Video', e)}
        onProgress={handleProgress}
        onEnd={handleEnd}
        ref={ref}
        style={{height: videoHeight, width: videoWidth}}
      />
    )
  );
});

export default ContentVideo;
