import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Messages from './screens/Messages';
import Settings from './screens/Settings';
import NewDiscussion from './screens/NewDiscussions/NewDiscussion';
import Login from './screens/Login';
import Register from './screens/Register';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EnvelopeIcon as Message } from "react-native-heroicons/mini";
import { PlusCircleIcon as Create } from "react-native-heroicons/mini";
import { Cog6ToothIcon as SettingsIcon } from "react-native-heroicons/mini";
import { createStackNavigator } from '@react-navigation/stack';
import Conversation from './screens/Conversation';
import { useAppSelector } from './utils/redux/hook';
import { selectIsLoggedIn } from './utils/redux/UserSlice';
import { selectState } from './utils/redux/UserSlice';
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

const Navigation = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const state = useAppSelector(selectState)
  return (
    <NavigationContainer>

<Stack.Navigator screenOptions={{
          headerShown: false, // Cela cache le header pour tous les écrans dans ce Stack.Navigator
        }}>
      <Stack.Screen name="Home" component={isLoggedIn ? HomeTabs : Login} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Conversation" component={isLoggedIn ? Conversation : Login}/>
    </Stack.Navigator>
      
    </NavigationContainer>
  )
}

export default Navigation
