import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonType {
  onPress: () => void;
  title: string;
  variant: 'little' | 'medium' | 'large';
}

const Button: React.FC<ButtonType> = ({ onPress, title, variant }) => {
  let buttonStyle;

  switch (variant) {
    case 'little':
      buttonStyle = styles.littleButton;
      break;
    case 'medium':
      buttonStyle = styles.mediumButton;
      break;
    case 'large':
      buttonStyle = styles.largeButton;
      break;
    default:
      buttonStyle = styles.mediumButton;
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  littleButton: {
    backgroundColor: 'blue',
    padding: 8,
  },
  mediumButton: {
    backgroundColor: 'blue',
    padding: 12,
  },
  largeButton: {
    backgroundColor: 'blue',
    padding: 16,
  },
});

export default Button;
