import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

import {getSubCategories, getCategoryContent} from './../redux/selectors';

import CategoryCard from './CategoryCard';
import ContentCard from './ContentCard';

const HomeScreen = ({navigation}) => {
  const category = navigation.getParam('category');
  const categoryId = category ? category.id : null;
  const categoryContent = useSelector(state =>
    getCategoryContent(state, categoryId),
  );
  const subCategories = useSelector(state =>
    getSubCategories(state, categoryId),
  );

  return (
    <View>
      <FlatList
        data={subCategories}
        keyExtractor={subCategory => `${subCategory.id}`}
        renderItem={({item}) => (
          <CategoryCard navigation={navigation} category={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      />
      {!isEmpty(subCategories) && !isEmpty(categoryContent) && (
        <View style={styles.listItemSeparator} />
      )}
      <FlatList
        data={categoryContent}
        keyExtractor={content => `${content.id}`}
        renderItem={({item}) => (
          <ContentCard navigation={navigation} content={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemSeparator: {
    borderBottomWidth: 1,
  },
});

HomeScreen.navigationOptions = ({navigation}) => {
  const category = navigation.getParam('category') || null;
  return {
    title: category ? category.category_name : 'TTKD Home',
  };
};
export default HomeScreen;
