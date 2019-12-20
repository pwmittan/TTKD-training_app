import {connect} from 'react-redux';
import ReactCamera from './ReactCamera';

import {addRecordedVideo} from '../../redux/actions';

const mapDispatchToProps = dispatch => {
  return {
    addRecordedVideo: video => dispatch(addRecordedVideo(video)),
  };
};

// eslint-disable-next-line prettier/prettier
export const ReactCameraConnector = connect(
  null,
  mapDispatchToProps,
)(ReactCamera);
