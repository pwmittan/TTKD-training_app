import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

import {
  getCategory,
  getSubCategories,
  getCategoryContent,
} from './../redux/selectors';

import Category from './Category';
import ContentCard from './ContentCard';

const HomeScreen = ({navigation}) => {
  const categoryId = navigation.getParam('categoryId') || null;
  const category = useSelector(state => getCategory(state, categoryId));
  const categoryContent = useSelector(state =>
    getCategoryContent(state, categoryId),
  );
  const subCategories = useSelector(state =>
    getSubCategories(state, categoryId),
  );

  const renderTitle = (
    <View style={styles.title}>
      <Text style={styles.titleText}>
        {categoryId ? category.category_name : 'TTKD Home'}
      </Text>
    </View>
  );

  return (
    <View>
      {renderTitle}

      <FlatList
        data={subCategories}
        keyExtractor={subCategory => `${subCategory.id}`}
        renderItem={({item}) => (
          <Category navigation={navigation} category={item} />
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
  title: {
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
  },
  listItemSeparator: {
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
