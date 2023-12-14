import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Messages from './src/screens/Messages';
import Settings from './src/screens/Settings';
import NewDiscussion from './src/screens/NewDiscussion';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnvelopeIcon as Message } from "react-native-heroicons/mini";
import { PlusCircleIcon as Create } from "react-native-heroicons/mini";
import { Cog6ToothIcon as SettingsIcon } from "react-native-heroicons/mini";
import { createStackNavigator } from '@react-navigation/stack';
import Conversation from './src/screens/Conversation';





const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Messages"
      screenOptions={{
        tabBarShowLabel : false,
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          backgroundColor: '#F2F2F2',
        }
      }}
      
      >
        <Tab.Screen name="Messages" component={Messages} 
        options={{
          tabBarIcon: () => (
            <Message color="red" />
          ),
          headerShown: false

        }}/>
        <Tab.Screen name="Créer" component={NewDiscussion}
        options={{
          tabBarIcon: () => (
            <Create color="red" />
          ),
          headerShown: false
        }} />
        <Tab.Screen name="Settings" component={Settings} 
        options={{
          tabBarIcon: () => (
            <SettingsIcon color="red" />
          ),
          headerShown: false
        }}/>
      </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>

<Stack.Navigator screenOptions={{
          headerShown: false, // Cela cache le header pour tous les écrans dans ce Stack.Navigator
        }}>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Conversation" component={Conversation}/>
    </Stack.Navigator>
      
    </NavigationContainer>
  );
}