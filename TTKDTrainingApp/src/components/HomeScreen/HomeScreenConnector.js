import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';

import {getCategory, getSubCategories} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const categoryId = ownProps.navigation.getParam('categoryId') || null;

  const subCategories = getSubCategories(state, categoryId);
  const category = getCategory(state, categoryId);
  return {
    subCategories,
    category,
  };
};

// eslint-disable-next-line prettier/prettier
export const HomeScreenConnector = connect(mapStateToProps, null)(HomeScreen);
