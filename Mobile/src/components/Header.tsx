import React from 'react'
import Avatar from './Avatar'
import { Icon } from 'react-native-paper'
import * as SolidIcons from "react-native-heroicons/solid";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

  const Header = (props: { title: string }) => {
    const navigation = useNavigation()
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.navigate('Home' as never)}>
        <Icon source={SolidIcons.ChevronLeftIcon} size={25}/>
        </TouchableOpacity>
        <Text>{props.title}</Text>
        <Avatar size="small" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      justifyContent: "space-between",
      backgroundColor:'red',
      height: 40,
      alignItems:"center",
      paddingLeft:5,
      paddingRight:5
    }
  });

export default Header
