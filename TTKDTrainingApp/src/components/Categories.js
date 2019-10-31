import React from 'react';

import {View, Text, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryItem = ({categoryName}) => {
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{categoryName}</Text>
      <Icon name="arrow-right" />
    </View>
  );
};

const Categories = props => {
  const {categories} = props;

  return (
    <FlatList
      data={categories}
      keyExtractor={category => category.id}
      renderItem={({item}) => {
        return <CategoryItem categoryName={item.category_name} />;
      }}
      ItemSeparatorComponent={() => <View style={styles.categorySeparator} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  categoryText: {fontSize: 24},
  categorySeparator: {
    borderBottomWidth: 1,
  },
});

export default Categories;
