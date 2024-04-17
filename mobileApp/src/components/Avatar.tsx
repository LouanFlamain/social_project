import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Avatar} from 'react-native-paper';


interface AvatarProps {
    size: "small" | "medium" |"large",
    image?: string, 

}

const AvatarItem: React.FC<AvatarProps> = ({size, image}) => {
    let avatarStyle;
    let avatarSize;
    const uri =  image ? image : require("../../public/img/default_person.png");


  switch (size) {
    case 'small':
        avatarStyle = styles.littleAvatar;
        avatarSize = 24
      break;
    case 'medium':
        avatarStyle = styles.mediumAvatar;
        avatarSize = 32
      break;
    case 'large':
        avatarStyle = styles.largeAvatar;
        avatarSize = 48
        
      break;
    default:
        avatarStyle = styles.mediumAvatar;
        avatarSize = 32
  }


  return (
    <Avatar.Image source={uri}  size={avatarSize} />

    
  );
};

const styles = StyleSheet.create({
  littleAvatar: {
    height: 24,
    width: 24
  },
  mediumAvatar: {
    height: 32,
    width: 32
  },
  largeAvatar: {
    height: 48,
    width: 48
  },
});

export default AvatarItem;
