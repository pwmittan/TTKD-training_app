import React from 'react';

import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Categories = props => {
  const {categories, setCategoryId} = props;

  const renderCategoryItem = category => {
    return (
      <TouchableOpacity onPress={() => setCategoryId(category.id)}>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryText}>{category.category_name}</Text>
          <Icon name="angle-right" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={category => category.id}
      renderItem={({item}) => renderCategoryItem(item)}
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
    padding: 12,
  },
  categoryText: {fontSize: 24},
  categorySeparator: {
    borderBottomWidth: 1,
  },
});

export default Categories;
