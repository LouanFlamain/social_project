/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useAppDispatch } from '../utils/redux/hook';
import { logout } from '../utils/redux/UserSlice';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';


function Settings(): JSX.Element {

  const dispatch = useAppDispatch()
  const navigation = useNavigation()


  const handleLougout = async () => {
    dispatch(logout());      
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView >
        <View>
        <Button variant='medium' title="Logout" onPress={handleLougout} />
        </View>
      
    </SafeAreaView>
  );
}


export default Settings;
