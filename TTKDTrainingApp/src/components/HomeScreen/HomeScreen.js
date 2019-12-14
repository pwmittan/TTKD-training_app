/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

import Categories from '../Categories';
import VideoThumbnailConnector from '../VideoThumbnail';

class HomeScreen extends Component {
  render() {
    const {
      navigation,
      category,
      categoryId,
      subCategories,
      content,
    } = this.props;
    console.log('TCL: HomeScreen -> render -> content', content);

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
        <Categories navigation={navigation} categories={subCategories} />
        <Button
          title="Start Recording"
          onPress={() => {
            navigation.navigate('ReactCamera');
          }}
        />
        <VideoThumbnailConnector navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButtonContainer: {
    paddingLeft: 8,
    height: 20,
  },
  backButton: {
    flexDirection: 'row',
  },
  backButtonText: {
    fontSize: 16,
  },
  title: {
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default HomeScreen;
