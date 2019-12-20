import {connect} from 'react-redux';
import VideoWithControls from './VideoWithControls';

import {getContentOwnVideo} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const contentId = ownProps.navigation
    ? ownProps.navigation.getParam('contentId')
    : null;

  const contentVideo = contentId ? getContentOwnVideo(state, contentId) : null;
  return {
    contentVideo,
  };
};

// eslint-disable-next-line prettier/prettier
export const VideoWithControlsConnector = connect(
  mapStateToProps,
  null,
)(VideoWithControls);
