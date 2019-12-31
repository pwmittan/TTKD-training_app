import {connect} from 'react-redux';
import ReactCamera from './ReactCamera';

import {addRecordedVideo} from '../../redux/actions';

const mapStateToProps = (state, ownProps) => {
  const contentId = ownProps.navigation.getParam('contentId');
  return {
    contentId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRecordedVideo: video => dispatch(addRecordedVideo(video)),
  };
};

// eslint-disable-next-line prettier/prettier
export const ReactCameraConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReactCamera);
