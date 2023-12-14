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

interface ConversationProp{
  route: any
}


function Conversations<ConversationProp>({ route }): JSX.Element {
  const {id}= route.params;


  return (
    <SafeAreaView >
        <View>
            <Text>Conversations {id}</Text>
        </View>
      
    </SafeAreaView>
  );
}


export default Conversations;
