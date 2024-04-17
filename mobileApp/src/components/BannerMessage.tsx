import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BannerMessageProps {
  message: string;
  variant: 'error' | 'success' | 'info';
}

const BannerMessage: React.FC<BannerMessageProps> = (props) => {
  let backgroundColor = '';

  switch (props.variant) {
    case 'error':
      backgroundColor = 'red';
      break;
    case 'success':
      backgroundColor = 'green';
      break;
    case 'info':
      backgroundColor = 'yellow';
      break;
    default:
      backgroundColor = 'transparent';
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});

export default BannerMessage;
