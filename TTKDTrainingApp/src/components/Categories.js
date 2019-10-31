import React from 'react';

import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryItem = ({categoryName}) => {
  return (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{categoryName}</Text>
      <Icon name="angle-right" size={20} />
    </View>
  );
};

const Categories = props => {
  const {categories, setCategoryId} = props;

  return (
    <FlatList
      data={categories}
      keyExtractor={category => category.id}
      renderItem={({item}) => {
        return (
          <TouchableOpacity onPress={() => setCategoryId(item.id)}>
            <CategoryItem categoryName={item.category_name} />
          </TouchableOpacity>
        );
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
