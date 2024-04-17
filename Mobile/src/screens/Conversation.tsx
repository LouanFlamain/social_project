import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../utils/redux/hook';
import { useToken, useId, logout } from '../utils/redux/UserSlice';
import { useNavigation } from '@react-navigation/native';
import { CreateMessage, getMessages } from '../utils/services/MessageService';
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';
import Header from '../components/Header';
import * as SolidIcons from 'react-native-heroicons/solid';
import Mercure from '../utils/Mercure/Mercure';
import { ConversationItem } from './Messages';
import MessagesComponents from './Conversation/MessagesComponents';
import { GetMessages, SendMessages, selectIsLoading, selectMessages } from '../utils/redux/MessagesSlice';



interface ConversationProp {
  route: any
}

function Conversations<ConversationProp>({ route  }): JSX.Element {
  const { id } = route.params;
  const [room, setRoom] = useState();
  const [message, setMessage] = useState('');


  const isMounted = useRef(false);
  const token = useAppSelector(useToken);
  const Myid = useAppSelector(useId);
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const conversations = useAppSelector(selectMessages)

  useEffect(() => {
    if (!isMounted.current) {
        getConversation();

      isMounted.current = true;
    }
  }, [isMounted]);


  const getConversation = async () => {
    try {
      const data = {
        token: token || '',
        userId: Myid || 0, 
        roomId: id,
    };
      await dispatch(GetMessages(data))
    } catch (error: any) {
      console.error('Error fetching conversationsddddd:', error);
      if (error.code === 401) {
         dispatch(logout());
        navigation.navigate('Login' as never);
      }
    }
  };


  const CreateMessage = async () =>{
    console.log("icic")
    if (message.length > 0){
     try {
      const data = {
        token: token || '',
        userId: Myid || 0, 
        roomId: id,
        value: message
    };
    
    dispatch(SendMessages(data))
      setMessage(''); // Clear the input field
       
     } catch (error) {
       console.log(error)
       
     }
    }
 }


  return (
    <>
    <Mercure roomId={id}/>
    <View style={styles.container}>
      <Header title={room?.name ? room.name : "No title"} />

      {isLoading ? 
      <ActivityIndicator animating={isLoading} color={MD2Colors.red800} />
       : conversations && conversations.length > 0 ?
      <MessagesComponents messages={conversations} />
      : null}

        <View style={styles.inputContainer}>
        <TextInput
          label="Ecrire un message"
          value={message}
          onChangeText={(text) => setMessage(text)}
          right={<TextInput.Icon icon={SolidIcons.PaperAirplaneIcon} onPress={CreateMessage}/>}
      
        />
        </View>
    </View>


          </>

  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputContainer: {
    margin: 16,
  },
});

export default Conversations;
