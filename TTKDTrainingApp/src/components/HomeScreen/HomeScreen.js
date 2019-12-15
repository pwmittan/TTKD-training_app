import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import {isEmpty} from 'lodash';

import Category from '../Category';
import VideoThumbnailConnector from '../VideoThumbnail';
import ContentCard from '../ContentCard';
import {ScrollView} from 'react-native-gesture-handler';

class HomeScreen extends Component {
  render() {
    const {
      navigation,
      category,
      categoryId,
      subCategories,
      categoryContent,
    } = this.props;

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
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
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
          ItemSeparatorComponent={() => (
            <View style={styles.listItemSeparator} />
          )}
        />

        {!categoryId && (
          <Button
            title="Start Recording"
            onPress={() => {
              navigation.navigate('ReactCamera');
            }}
          />
        )}
        <ScrollView horizontal={true}>
          <VideoThumbnailConnector navigation={navigation} />
        </ScrollView>
      </View>
    );
  }
}

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
