import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Video from 'react-native-video';

import {
  getContentOwnCachedVideoPath,
  getContentImageUri,
} from '../../redux/selectors';
import {genCachedUri} from '../../redux/actions';

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
    isCameraView,
  } = props;

  const posterImageUri = useSelector(state =>
    getContentImageUri(state, contentId),
  );

  const cachedVideoPath = useSelector(state =>
    getContentOwnCachedVideoPath(state, contentId),
  );

  useEffect(() => {
    !cachedVideoPath && dispatch(genCachedUri(contentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    cachedVideoPath && (
      <Video
        poster={posterImageUri}
        posterResizeMode="contain"
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
        style={{
          height: videoHeight,
          width: videoWidth,
          transform: [{rotateY: isCameraView ? '180deg' : '0deg'}],
        }}
      />
    )
  );
});

export default ContentVideo;
