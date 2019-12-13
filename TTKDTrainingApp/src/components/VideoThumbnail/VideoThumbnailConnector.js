import {connect} from 'react-redux';
import VideoThumbnail from './VideoThumbnail';

import {getVideos} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const videos = getVideos(state);
  return {
    videos,
  };
};

// eslint-disable-next-line prettier/prettier
export const VideoThumbnailConnector = connect(
  mapStateToProps,
  null,
)(VideoThumbnail);
