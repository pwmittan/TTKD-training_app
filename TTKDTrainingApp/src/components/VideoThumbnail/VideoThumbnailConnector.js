import {connect} from 'react-redux';
import VideoThumbnail from './VideoThumbnail';

import {getRecordedVideosForContent} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const recordedVideos = getRecordedVideosForContent(state, ownProps.contentId);
  return {
    recordedVideos,
  };
};

// eslint-disable-next-line prettier/prettier
export const VideoThumbnailConnector = connect(
  mapStateToProps,
  null,
)(VideoThumbnail);
