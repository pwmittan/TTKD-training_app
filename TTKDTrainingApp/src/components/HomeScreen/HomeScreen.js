/*
    Placeholder screen to allow for creation of components directory
    Will be either repurposed or deleted as development starts
*/

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Categories from '../Categories';
import VideoThumbnailConnector from '../VideoThumbnail';

class HomeScreen extends Component {
  state = {
    categoryId: null,
    category: this.props.category,
  };
  render() {
    const {category, categoryId} = this.state;
    const {navigation, subCategories} = this.props;

    const renderBackButton = (
      <View style={styles.backButtonContainer}>
        {category && (
          <TouchableOpacity style={styles.backButton} onPress={null}>
            <Icon
              name="angle-left"
              size={20}
              style={styles.backButtonIcon}
              backgroundColor={null}
            />
            <Text style={styles.backButtonText}>{' Back'}</Text>
          </TouchableOpacity>
        )}
      </View>
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
        {renderBackButton}
        {renderTitle}
        <Categories
          navigation={navigation}
          categories={subCategories}
          setCategoryId={null}
        />
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
