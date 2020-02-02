import React from 'react';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CategoryCard = props => {
  const {category, navigation} = props;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('HomeScreen', {
          category: category,
        })
      }>
      <View style={styles.categoryItem}>
        <Text style={styles.categoryText}>{category.category_name}</Text>
        <Icon name="angle-right" size={24} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  categoryText: {fontSize: 24},
});

export default CategoryCard;
