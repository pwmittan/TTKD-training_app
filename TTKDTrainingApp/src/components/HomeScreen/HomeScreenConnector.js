import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';

import {
  getCategory,
  getSubCategories,
  getCategoryContent,
} from '../../redux/selectors';

const mapStateToProps = (state, ownProps) => {
  const categoryId = ownProps.navigation.getParam('categoryId') || null;
  const categoryContent = getCategoryContent(state, categoryId);

  const subCategories = getSubCategories(state, categoryId);
  const category = getCategory(state, categoryId);
  return {
    categoryId,
    subCategories,
    category,
    categoryContent,
  };
};

// eslint-disable-next-line prettier/prettier
export const HomeScreenConnector = connect(mapStateToProps, null)(HomeScreen);
