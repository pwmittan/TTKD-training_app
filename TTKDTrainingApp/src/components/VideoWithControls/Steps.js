import React, {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {getContentOwnStepsSorted} from '../../redux/selectors';

const Steps = props => {
  const {videoRefs, contentId, progress, duration} = props;

  const steps = useSelector(state =>
    getContentOwnStepsSorted(state, contentId),
  );

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    Array.isArray(steps) &&
      steps.length &&
      flatListRef.current &&
      flatListRef.current.scrollToIndex({index: currentStepIndex});
  }, [steps, currentStepIndex]);

  const handleStepPress = stepTime =>
    Object.values(videoRefs).map(ref => ref.current.seek(stepTime));

  const flatListRef = useRef();

  return (
    <View style={styles.steps}>
      <FlatList
        onScrollToIndexFailed={error => {
          console.info('onScrollToIndex failed', error);
        }}
        ref={flatListRef}
        data={steps}
        keyExtractor={step => `${step.id}`}
        renderItem={({item, index}) => {
          const progressSeconds = Math.round(progress * duration);
          const isCurrentStep =
            (!item.start_time || item.start_time <= progressSeconds) &&
            (!item.end_time || item.end_time > progressSeconds);
          isCurrentStep &&
            index !== currentStepIndex &&
            setCurrentStepIndex(index);
          return (
            <TouchableOpacity
              onPress={() => handleStepPress(item.start_time || 0)}>
              <View
                style={[
                  styles.step,
                  isCurrentStep ? styles.currentStep : null,
                ]}>
                <Text style={styles.stepText}>
                  {`${index + 1}: ${item.description}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  steps: {
    height: 50,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
  },
  step: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  currentStep: {
    backgroundColor: '#C4BBBB',
  },
  stepText: {
    fontSize: 16,
  },
});

export default Steps;
