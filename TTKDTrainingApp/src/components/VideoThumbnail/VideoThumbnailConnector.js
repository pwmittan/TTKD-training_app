import {connect} from 'react-redux';
import VideoThumbnail from './VideoThumbnail';

import {getVideosForContent} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const videos = getVideosForContent(state, ownProps.contentId);
  return {
    videos,
  };
};

// eslint-disable-next-line prettier/prettier
export const VideoThumbnailConnector = connect(
  mapStateToProps,
  null,
)(VideoThumbnail);
