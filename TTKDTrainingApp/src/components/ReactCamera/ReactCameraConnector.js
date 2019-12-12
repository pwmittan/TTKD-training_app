import {connect} from 'react-redux';
import ReactCamera from './ReactCamera';

import {addVideo} from '../../redux/actions';

const mapDispatchToProps = dispatch => {
  return {
    addVideo: video => dispatch(addVideo(video)),
  };
};

// eslint-disable-next-line prettier/prettier
export const ReactCameraConnector = connect(
  null,
  mapDispatchToProps,
)(ReactCamera);
